import React, { useEffect } from 'react';

const DisableRightClick = ({ children }) => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      if (event.target.tagName === 'IMG' && event.target.src.includes(`${process.env.PUBLIC_URL}/assets/img`)) {
        event.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <>{children}</>;
};

export default DisableRightClick;
