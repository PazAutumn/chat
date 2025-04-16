const socket = io();
const chatBox = document.getElementById('chat-box');

// Pedir un nombre de usuario al entrar
const username = prompt("Ingresa tu nombre:");
if (!username) {
    alert("Debes ingresar un nombre para chatear.");
    location.reload();
}

// Enviar mensaje con nombre de usuario
const sendMessage = () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    
    if (message) {
        // Enviar mensaje con el nombre del usuario
        socket.emit('chat:message', { username, message });

        // Agregar mensaje del usuario en la pantalla
        addMessage(message, 'user', username);

        // Limpiar el input
        messageInput.value = '';
    }
}

// Función para agregar mensajes al chat
const addMessage = (text, type, username) => {
    const messageAuthor = document.createElement('span')
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    if (type === 'user') {
        messageAuthor.classList.add('messageSender');
    } else {
        messageAuthor.classList.add('messageReciever');
    }
    messageAuthor.textContent = username;
    messageElement.textContent = text;
    chatBox.appendChild(messageAuthor);
    chatBox.appendChild(messageElement);

    // Hacer scroll hacia abajo automáticamente
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Recibir mensajes del servidor y verificar si son del usuario actual
socket.on('chat:message', (data) => {
    if (data.username !== username) {
        addMessage(data.message, 'other', data.username);
    }
});