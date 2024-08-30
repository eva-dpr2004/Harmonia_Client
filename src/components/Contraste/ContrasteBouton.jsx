import React, { useState, useEffect } from 'react';
import '../../styles/Contraste.css';
import '../../styles/Boutons.css';

function ContrasteBouton() {
    const [isContraste, setIsContraste] = useState(false);

    useEffect(() => {
        const savedContrasteMode = localStorage.getItem('contrasteMode') === 'true';
        if (savedContrasteMode) {
            document.body.classList.add('contraste-mode');
            setIsContraste(true);
        }
    }, []);

    const toggleContrasteMode = () => {
        const body = document.body;
        if (isContraste) {
            body.classList.remove('contraste-mode');
            localStorage.setItem('contrasteMode', 'false');
        } else {
            body.classList.add('contraste-mode');
            localStorage.setItem('contrasteMode', 'true');
        }
        setIsContraste(!isContraste);
    };

    return (
        <button onClick={toggleContrasteMode} className='contraste-btn'>
            {isContraste ? 'Désactiver le mode contraste' : 'Activer le mode contraste'}
        </button>
    );
}

export default ContrasteBouton;
