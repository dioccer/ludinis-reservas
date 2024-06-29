import React, { useState } from 'react';
import './ComodidadesSection.css';
import emailjs from 'emailjs-com'; //Importa emailjs
import axios from 'axios';

const ComodidadesSection = ({ id, salonName, handleOpenGallery }) => {
    const [ratings, setRatings] = useState(0);
    const [selectedComodidades, setSelectedComodidades] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        time: '',
        message: ''
    });

    const comentariosPorSalon = {
        Lafayette: [
            { author: "Ana María", date: "Junio 1, 2024", text: "¡Excelente servicio y ambiente! Me encantó la decoración y la atención del personal." },
            { author: "Juan Pérez", date: "Mayo 28, 2024", text: "Un lugar perfecto para celebrar eventos importantes. Recomendado al 100%." },
            { author: "María Fernanda", date: "Junio 10, 2024", text: "Siempre me impresiona la elegancia y la calidad del servicio en Lafayette. ¡Volveré pronto!" }
        ],
        Vicenzo: [
            { author: "Carlos Gutiérrez", date: "Mayo 15, 2024", text: "Vicenzo es el lugar ideal para una fiesta elegante. Nos sentimos muy bien atendidos." },
            { author: "Laura Pérez", date: "Abril 20, 2024", text: "¡Una noche inolvidable en Vicenzo! El diseño interior y el ambiente son únicos." },
            { author: "Roberto Sánchez", date: "Junio 8, 2024", text: "¡Increíble experiencia en Vicenzo! La comida y el servicio estuvieron a la altura de las expectativas." }
        ],
        Pacara_Center: [
            { author: "Elena López", date: "Junio 5, 2024", text: "Pacará Center tiene todo lo necesario para una reunión corporativa exitosa." },
            { author: "Andrés Martínez", date: "Mayo 25, 2024", text: "Excelente atención al cliente en Pacará Center. Las instalaciones son modernas y confortables." },
            { author: "Isabel Gómez", date: "Junio 12, 2024", text: "Me encanta la versatilidad de Pacará Center para adaptarse a diferentes tipos de eventos. ¡Muy recomendado!" }
        ],
        Las_Marias: [
            { author: "Daniel Herrera", date: "Mayo 12, 2024", text: "Las Marías ofrece un entorno natural perfecto para eventos al aire libre. ¡Increíble!" },
            { author: "Ana Laura Ramírez", date: "Abril 8, 2024", text: "Celebramos nuestra boda en Las Marías y fue mágico. La vista y el servicio fueron espectaculares." },
            { author: "Ricardo Fernández", date: "Junio 7, 2024", text: "Las Marías superó nuestras expectativas con su belleza natural y el profesionalismo del equipo. ¡Definitivamente regresaremos!" }
        ]
    };

    const comodidadesPorSalon = {
        Lafayette: [
            "Servicio de catering",
            "Pista de baile",
            "Decoración personalizada",
            "Sistema de sonido profesional"
        ],
        Vicenzo: [
            "Sistema de iluminación profesional",
            "Barra de cócteles",
            "Área de lounge",
            "Zona VIP"
        ],
        Pacara_Center: [
            "Salas de reuniones equipadas",
            "Servicio de coffee break",
            "Acceso a tecnología de vanguardia",
            "Soporte técnico especializado"
        ],
        Las_Marias: [
            "Espacio al aire libre",
            "Jardines paisajísticos",
            "Vistas panorámicas",
            "Zona de juegos infantiles"
        ]
    };

    const comentarios = comentariosPorSalon[salonName] || [];
    const comodidades = comodidadesPorSalon[salonName] || [];

    const handleStarClick = (star) => {
        setRatings(star === ratings ? 0 : star);
    };

    const handleComodidadClick = (comodidad) => {
        setSelectedComodidades((prevSelected) =>
            prevSelected.includes(comodidad)
                ? prevSelected.filter(item => item !== comodidad)
                : [...prevSelected, comodidad]
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { name, email, time, message } = formData;
        const selectedItems = selectedComodidades;

        try {
            const templateParams = {
                from_name: name,
                from_email: email,
                time: time,
                message: message,
                comodidades: selectedItems,
                salonName: salonName // Agrega el nombre del salón aquí
            };

            await emailjs.send(
                'default_service',
                'template_41wpds3',
                templateParams,
                'sDMyk74kG2Wf_Rlo-'
            );

            alert('Correo enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
        }
        
        try {
            const response = await axios.post('http://localhost:5000/submit-form', {
                name,
                email,
                time,
                message,
                selectedItems,
            });
            console.log('Respuesta del servidor:', response.data);
            alert('Datos guardados correctamente');
        } catch (error) {
            console.error('Error al enviar los datos:', error.response ? error.response.data : error.message);
            alert('Error al enviar los datos');
        }
    };

    return (
        <section id={id} className="comodidades-section">
            <div className="comodidades-content">
                <h2>Imágenes del Salón "{salonName}"</h2>
                <button className="view-more-btn" onClick={handleOpenGallery}>Ver más imágenes</button>
            </div>
            <div className="ratings">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={`${id}-comodidad-star-${star}`}
                        className={`star ${star <= ratings ? 'selected' : ''}`}
                        onClick={() => handleStarClick(star)}
                    >
                        ★
                    </span>
                )).reverse()}
            </div>
            <div className="comments-section">
                <h3>Comentarios:</h3>
                <div className="comment">
                    {comentarios.map((comentario, index) => (
                        <div key={`${id}-comentario-${index}`} className="single-comment">
                            <p className="author">{comentario.author}</p>
                            <p className="date">{comentario.date}</p>
                            <p className="text">{comentario.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="comodidades-section">

                <div className="comodidades">
                    {comodidades.slice(0, 4).map((comodidad, index) => (
                        <div
                            key={`${id}-comodidad-${index}`}
                            className={`single-comodidad ${selectedComodidades.includes(comodidad) ? 'selected' : ''}`}
                            onClick={() => handleComodidadClick(comodidad)}
                        >
                            <p>{comodidad}</p>
                        </div>
                    ))}
                </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
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
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="Horario"
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
    );
};

export default ComodidadesSection;

