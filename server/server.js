const io = require('socket.io')(8555);

class Message {
    constructor(sender, text) {
        this.sender = sender;
        this.text = text;
    }
}

io.on('connection', (socket) => {
    socket.emit('message', new Message('Server', 'Welcome to the server'));

    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    });
})