import React, { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
            {isContraste ? (
                <Visibility style={{ color: 'gray', marginLeft: '5px' }} />
            ) : (
                <VisibilityOff style={{ marginLeft: '5px' }} />
            )}
        </button>
    );
}

export default ContrasteBouton;
