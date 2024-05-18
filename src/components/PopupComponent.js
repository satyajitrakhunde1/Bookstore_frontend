import React from 'react';
import './styles.css';

const PopupComponent = ({ message, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PopupComponent;
