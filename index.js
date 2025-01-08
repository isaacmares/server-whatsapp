const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Inicializar cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('Escanea este código QR con WhatsApp:');
    require('qrcode-terminal').generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente de WhatsApp está listo.');
});

client.initialize();

// Ruta para enviar mensajes
app.post('/send-message', async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Número de teléfono y mensaje son requeridos.' });
    }

    try {
        await client.sendMessage(`${phoneNumber}@c.us`, message);
        res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el mensaje.', details: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
