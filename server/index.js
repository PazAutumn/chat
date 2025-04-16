const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public/'))); // Opcional para servir HTML

// Importar configuración de sockets
require('./sockets')(io);

// Ruta principal para servir HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/login', (req, res) => {
    const username = req.query.username; // Obtener usuario de la URL
    if (!username) return res.status(400).send('Nombre de usuario requerido');

    // Guardar el usuario en una cookie
    res.cookie('username', username, { httpOnly: true });
    res.send({ message: `Bienvenido, ${username}!` });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

