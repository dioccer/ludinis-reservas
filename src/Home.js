import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css';
import NavBar from './NavBar'; // Importa el componente de navegación
import ComodidadesSection from './ComodidadesSection';
import Popup from './Popup'; // Importa el componente Popup
import { useGoogleOAuth } from '@react-oauth/google'; // Importa los componentes de OAuth de Google

const Home = () => {
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

    // Estado local para controlar la ventana emergente
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupImages, setPopupImages] = useState([]);

    // Función para abrir la ventana emergente con imágenes específicas
    const handlePopupOpen = (images) => {
        setPopupImages(images);
        setIsPopupOpen(true);
    };

    // Función para cerrar la ventana emergente
    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setPopupImages([]);
    };

    const PrevArrow = ({ className, onClick }) => (
        <button className={`${className} arrow-prev`} onClick={onClick}>
        </button>
    );

    const NextArrow = ({ className, onClick }) => (
        <button className={`${className} arrow-next`} onClick={onClick}>
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

    // Integración de la autenticación de Google
    const { signIn, signOut, isSignedIn } = useGoogleOAuth();

    // Función para manejar el inicio de sesión con Google
    const handleSignIn = () => {
        signIn().then(response => {
            console.log('Login success:', response);
            // Aquí podrías manejar la lógica después de que el usuario haya iniciado sesión correctamente.
        }).catch(error => {
            console.error('Login failure:', error);
            // Aquí podrías manejar los errores de inicio de sesión.
        });
    };

    // Función para manejar el clic en "Ver Más"
    const handleVerMasClick = (e, salonId) => {
        e.preventDefault();
        // Aquí podrías implementar la lógica para mostrar más información o expandir el contenido
        // Por ejemplo, podrías desplazar la página a la sección del salón correspondiente
        const element = document.getElementById(salonId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                            <a href="/" className="btn-secondary" onClick={(e) => handleVerMasClick(e, 'salon1')}>Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://i.pinimg.com/originals/d3/9c/47/d39c47ca03f3bb85d9bf753d0fc1ebe0.jpg" alt="Slide 2" />
                        <div className="slide-content">
                            <h2>Salón "Vicenzo"</h2>
                            <p>Un salón donde tus noches serán a pura fiesta y comodidad para los invitados.</p>
                            <a href="/" className="btn-secondary" onClick={(e) => handleVerMasClick(e, 'salon2')}>Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://pandacam.com.ar/wp-content/uploads/2024/01/300429431_490119813122092_369817.webp" alt="Slide 3" />
                        <div className="slide-content">
                            <h2>Salón "Pacará Center"</h2>
                            <p>En este salón encontrarás lugar para todos y la mejor atención en todos sus servicios.</p>
                            <a href="/" className="btn-secondary" onClick={(e) => handleVerMasClick(e, 'salon3')}>Ver Más</a>
                        </div>
                    </div>
                    <div className="slide">
                        <img src="https://eventosplatinum.com.mx/wp-content/uploads/eventosplatinum/2023/09/WTC-1.jpg" alt="Slide 4" />
                        <div className="slide-content">
                            <h2>Salón "Las Marías"</h2>
                            <p>Si buscás un salón alejado y a la vez conectado con la naturaleza, ésta será tu mejor opción al aire libre.</p>
                            <a href="/" className="btn-secondary" onClick={(e) => handleVerMasClick(e, 'salon4')}>Ver Más</a>
                        </div>
                    </div>
                    {/* Agrega más slides según sea necesario */}
                </Slider>
            </div>
            {/* Formularios y secciones de comodidades para cada salón */}
            <ComodidadesSection
                id="salon1"
                salonName="Lafayette"
                ratings={ratings.salon1Comodidades}
                handleStarClick={handleStarClick}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleOpenGallery={() => handlePopupOpen([
                    "https://hips.hearstapps.com/hmg-prod/images/salon-1-1-1527066991.jpg",
                    "https://i.pinimg.com/originals/d4/b0/a5/d4b0a5f24bff107c39bf5f35afba0de9.jpg"
                ])}
            />
            <ComodidadesSection
                id="salon2"
                salonName="Vicenzo"
                ratings={ratings.salon2Comodidades}
                handleStarClick={handleStarClick}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleOpenGallery={() => handlePopupOpen([
                    "https://www.hjargentina.com/img/eventos/30.jpg",
                    "https://hips.hearstapps.com/hmg-prod/images/salon05-1527075518.jpg"
                ])}
            />
            <ComodidadesSection
                id="salon3"
                salonName="Pacara_Center"
                ratings={ratings.salon3Comodidades}
                handleStarClick={handleStarClick}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleOpenGallery={() => handlePopupOpen([
                    "https://www.copna.org.ar/wp-content/uploads/2016/01/Salones_6.jpg",
                    "https://www.hola.com/imagenes/decoracion/20200113156982/decoracion-salones-reglas-oro/0-762-829/salon-perfecto-8a-a.jpg",
                ])}
            />
            <ComodidadesSection
                id="salon4"
                salonName="Las_Marias"
                ratings={ratings.salon4Comodidades}
                handleStarClick={handleStarClick}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleOpenGallery={() => handlePopupOpen([
                    "https://www.programatufiesta.com.ar/sistema/uploads/283/entradas/salon-perfil-chacabuco-programa-tu-fiesta--2-.jpg",
                    "https://www.copna.org.ar/wp-content/uploads/2016/01/Salones_1.jpg"
                ])}
            />
            
            {/* Ventana emergente */}
            <Popup isOpen={isPopupOpen} handlePopupClose={handlePopupClose} images={popupImages} />
            
            {/* Botón de login con Google */}
            {!isSignedIn ? (
                <in
                    clientId="1068434512211-u2nsrcigpghor5svvs81c4km77h0qtqa.apps.googleusercontent.com"
                    onSuccess={handleSignIn}
                    onFailure={error => console.error('Inicio de sesión fallido:', error)}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            Iniciar sesión con Google
                        </button>
                    )}
                />
            ) : (
                <div>
                    <p>Usuario autenticado con Google.</p>
                    <button onClick={signOut}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
