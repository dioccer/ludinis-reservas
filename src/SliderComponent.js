// SliderComponent.js
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css';
import NavBar from './NavBar'; // Importa el componente de navegación

const SliderComponent = () => {
    const sliderRef = useRef(null); // Referencia al componente Slider

    // Estado local para las calificaciones de comodidades de cada salón
    const [ratings, setRatings] = useState({
        salon1Comodidades: 0,
        salon2Comodidades: 0,
        salon3Comodidades: 0,
        salon4Comodidades: 0,
    });

    // Estado local para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const PrevArrow = ({ className, onClick }) => (
        <button className={`${className} arrow-prev`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                <path fill="none" d="M0 0h24v24H0z"/>
            </svg>
        </button>
    );

    const NextArrow = ({ className, onClick }) => (
        <button className={`${className} arrow-next`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                <path fill="none" d="M0 0h24v24H0z"/>
            </svg>
        </button>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        vertical: false,
        verticalSwiping: false,
        draggable: false,
        afterChange: (index) => {
            const slideContents = document.querySelectorAll('.slide-content');
            slideContents.forEach((content, idx) => {
                if (index === idx) {
                    content.classList.add('animate-slide-in-left');
                } else {
                    content.classList.remove('animate-slide-in-left');
                }
            });
        }
    };

    // Manejar el clic en las estrellas
    const handleStarClick = (section, stars) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [section]: prevRatings[section] === stars ? 0 : stars,
        }));
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        console.log(formData);
        // Puedes resetear los campos del formulario después de enviarlo si es necesario
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    useEffect(() => {
        // Al montar el componente, asegúrate de que la primera sección tiene la animación
        const firstSection = document.querySelector('.slide-content');
        if (firstSection) {
            firstSection.classList.add('animate-slide-in-left');
        }
    }, []);

    return (
        <div className="app-container">
            <NavBar /> {/* Agrega el componente de navegación aquí */}
            <div className="slider-wrapper">
                <Slider ref={sliderRef} {...settings}>
                    <div className="slide">
                        <img src="https://image-tc.galaxy.tf/wijpeg-b95ljije7tjgre0vtwmzpw0to/salon-country-3-y-4-medias-lunas_wide.jpg?crop=0%2C100%2C1920%2C1080&width=2100" alt="Slide 1" />
                        <div className="slide-content">
                            <h2>Salón "Lafayette"</h2>
                            <p>Salón grande con múltiples comodidades para una fiesta única e inolvidable.</p>
                            <a href="#salon1" className="btn-secondary">Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://i.pinimg.com/originals/d3/9c/47/d39c47ca03f3bb85d9bf753d0fc1ebe0.jpg" alt="Slide 2" />
                        <div className="slide-content">
                            <h2>Salón "Vicenzo"</h2>
                            <p>Un salón donde tus noches serán a pura fiesta y comodidad para los invitados.</p>
                            <a href="#salon2" className="btn-secondary">Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://pandacam.com.ar/wp-content/uploads/2024/01/300429431_490119813122092_369817.webp" alt="Slide 3" />
                        <div className="slide-content">
                            <h2>Salón "Pacará Center"</h2>
                            <p>En este salón encontrarás lugar para todos y la mejor atención en todos sus servicios.</p>
                            <a href="#salon3" className="btn-secondary">Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://eventosplatinum.com.mx/wp-content/uploads/eventosplatinum/2023/09/WTC-1.jpg" alt="Slide 4" />
                        <div className="slide-content">
                            <h2>Salón "Las Marías"</h2>
                            <p>Si buscás un salón alejado y a la vez conectado con la naturaleza, ésta será tu mejor opción al aire libre.</p>
                            <a href="#salon4" className="btn-secondary">Ver Más</a>
                        </div>
                    </div>
                
                    {/* Agrega más slides según sea necesario */}
                </Slider>
            </div>
            {/* Formularios y secciones de comodidades para cada salón */}
            <section id="salon1" className="comodidades-section">
                <div className="comodidades-content">
                    <h2>Servicios del Salón "Lafayette"</h2>
                    <ul>
                        <li>- Comodidad 1</li>
                        <li>- Comodidad 2</li>
                        <li>- Comodidad 3</li>
                        {/* Agrega más comodidades según sea necesario */}
                    </ul>
                </div>
                <div className="ratings">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={`salon1-comodidad-star-${star}`}
                            className={`star ${star <= ratings.salon1Comodidades ? 'selected' : ''}`}
                            onClick={() => handleStarClick('salon1Comodidades', star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje"
                        required
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </section>

            <section id="salon2" className="comodidades-section">
                <div className="comodidades-content">
                    <h2>Servicio del Salón "Vicenzo"</h2>
                    <ul>
                        <li>- Comodidad 1</li>
                        <li>- Comodidad 2</li>
                        <li>- Comodidad 3</li>
                        {/* Agrega más comodidades según sea necesario */}
                    </ul>
                </div>
                <div className="ratings">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={`salon2-comodidad-star-${star}`}
                            className={`star ${star <= ratings.salon2Comodidades ? 'selected' : ''}`}
                            onClick={() => handleStarClick('salon2Comodidades', star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje"
                        required
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </section>

            <section id="salon3" className="comodidades-section">
                <div className="comodidades-content">
                    <h2>Servicios del Salón "Pacará Center"</h2>
                    <ul>
                        <li>- Comodidad 1</li>
                        <li>- Comodidad 2</li>
                        <li>- Comodidad 3</li>
                        {/* Agrega más comodidades según sea necesario */}
                    </ul>
                </div>
                <div className="ratings">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={`salon3-comodidad-star-${star}`}
                            className={`star ${star <= ratings.salon3Comodidades ? 'selected' : ''}`}
                            onClick={() => handleStarClick('salon3Comodidades', star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje"
                        required
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </section>

            <section id="salon4" className="comodidades-section">
                <div className="comodidades-content">
                    <h2>Servicios del Salón "Las Marías"</h2>
                    <ul>
                        <li>- Comodidad 1</li>
                        <li>- Comodidad 2</li>
                        <li>-Comodidad 3</li>
                        {/* Agrega más comodidades según sea necesario */}
                    </ul>
                </div>
                <div className="ratings">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={`salon4-comodidad-star-${star}`}
                            className={`star ${star <= ratings.salon4Comodidades ? 'selected' : ''}`}
                            onClick={() => handleStarClick('salon4Comodidades', star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo electrónico"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje"
                        required
                    ></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </section>
            {/* Agrega más secciones de salones según sea necesario */}
        </div>
    );
};
export default SliderComponent;