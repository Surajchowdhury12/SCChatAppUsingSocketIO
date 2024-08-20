//const { Socket } = require('socket.io')
//import socket from Socket;
const socket = io('http://localhost:8080');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messele = document.createElement('div')
    messele.innerText = message;
    messele.classList.add('message')
    messele.classList.add(position)
    messageContainer.append(messele)
}

const name1 = prompt("Enter your name to start chat");
socket.emit('new-user-joined', name1);
socket.on('user-joined', name1 => {
    append(`${name1} joined the chat`, 'right')
})
