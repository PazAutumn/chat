module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado:', socket.id);

        // Escuchar mensajes desde el cliente
        socket.on('chat:message', (data) => {
            console.log('Mensaje recibido:', data);
            io.emit('chat:message', data); // Reenviar mensaje a todos
        });

        // Manejo de desconexión
        socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.id);
        });

        // Manejo de errores
        socket.on('error', (err) => {
            console.error('Error en Socket.io:', err);
        });
    });
};