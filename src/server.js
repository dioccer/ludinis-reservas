const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/salonDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Definir el esquema y modelo de la base de datos
const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    time: String,
    message: String,
    selectedItems: [String],
});

const FormData = mongoose.model('FormData', formDataSchema);

// Ruta para guardar datos del formulario
app.post('/submit-form', async (req, res) => {
    const { name, email, time, message, selectedItems } = req.body;
    const newFormData = new FormData({ name, email, time, message, selectedItems });

    try {
        await newFormData.save();
        res.status(201).send('Datos guardados correctamente');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).send('Error al guardar los datos');
    }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
