document.addEventListener('DOMContentLoaded', () => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:8080');

    const messageContainer = document.querySelector(".container");
    const messageInput = document.getElementById('message');
    const form = document.getElementById('send-container');

    const audio = new Audio('tingu.mp3');


    const append = (message, position) => {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        if (position == 'left') {
            audio.play();
        }
    }
    const name = prompt("Enter your name to joined");

    socket.emit('new-user-joined', name)

    socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'right')

    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`You:${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    })




    // Listen for messages from the server
    // socket.on('message', (data) => {
    //     const messageList = document.getElementById('message1');
    //     const newMessage = document.createElement('div');
    //     newMessage.textContent = data;
    //     messageList.appendChild(newMessage);
    // });

    socket.on('receive', data => {
        append(`${data.name}: ${data.message}`, 'left')
    });

    socket.on('left', name => {
        append(`${name} left the chat`, 'left')
    })

    // Send a message to the server when the button is clicked
    document.getElementById('sendMessage').addEventListener('click', () => {
        const message = document.getElementById('message').value;
        socket.emit('message', message);
    });
});
