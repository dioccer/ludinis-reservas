import React from 'react';

const Slide = ({ imageSrc, title, description, handleOpenGallery }) => {
    return (
        <div className="slide-container">
            <div className="slide-image">
                <img src={imageSrc} alt={title} />
            </div>
            <div className="slide-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <button onClick={handleOpenGallery}>Ver más imágenes</button>
            </div>
        </div>
    );
};

export default Slide;
