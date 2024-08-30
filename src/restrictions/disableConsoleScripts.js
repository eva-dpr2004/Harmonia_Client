import { useEffect, useRef } from 'react';

function DisableConsoleScripts() {
  const originalAlert = useRef();
  const originalPrompt = useRef();
  const originalConfirm = useRef();
  const originalFetch = useRef();
  const originalXMLHttpRequest = useRef();

  useEffect(() => {
    const noop = () => {};

    // Stocker les valeurs originales
    originalAlert.current = window.alert;
    originalPrompt.current = window.prompt;
    originalConfirm.current = window.confirm;
    originalFetch.current = window.fetch;
    originalXMLHttpRequest.current = window.XMLHttpRequest;

    // Remplacer les fonctions globales
    window.alert = noop;
    window.prompt = noop;
    window.confirm = noop;

    // Neutraliser les tentatives d'injection SQL via fetch et XMLHttpRequest
    window.fetch = function(...args) {
      if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('select')) {
        console.warn('Tentative de requête SQL bloquée.');
        return Promise.resolve({ json: () => Promise.resolve(null) });
      }
      return originalFetch.current(...args);
    };

    window.XMLHttpRequest = function() {
      const xhr = new originalXMLHttpRequest.current();
      const originalOpen = xhr.open;

      xhr.open = function(method, url, ...rest) {
        if (url.toLowerCase().includes('select')) {
          console.warn('Tentative de requête SQL bloquée.');
          return;
        }
        originalOpen.call(xhr, method, url, ...rest);
      };

      return xhr;
    };    

    return () => {
      // Restauration des méthodes originales lors du démontage
      if (originalAlert.current) window.alert = originalAlert.current;
      if (originalPrompt.current) window.prompt = originalPrompt.current;
      if (originalConfirm.current) window.confirm = originalConfirm.current;
      if (originalFetch.current) window.fetch = originalFetch.current;
      if (originalXMLHttpRequest.current) window.XMLHttpRequest = originalXMLHttpRequest.current;
    };
  }, []);

  return null;
}

export default DisableConsoleScripts;
