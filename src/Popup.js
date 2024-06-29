import React from 'react';

const Popup = ({ isOpen, handlePopupClose, images }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={handlePopupClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {images.map((image, index) => (
                    <img key={`popup-image-${index}`} src={image} alt={`Imagen ${index + 1}`} />
                ))}
                <button className="close-btn" onClick={handlePopupClose}>Cerrar</button>
            </div>
        </div>
    );
};
export default Popup;
