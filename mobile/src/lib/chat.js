import io from 'socket.io-client';

class Message {
    constructor(sender, text) {
        this.sender = sender;
        this.text = text;
    }
}

class Chat {
    constructor(roomIp, nickname) {
        this.roomIp = roomIp;
        this.nickname = nickname;

        let [ip, port] = roomIp.split(':');
        port = port || 8555;

        this.socket = io(`http://${ip}:${port}`);
        this.socket.on('connect', () => {
            console.log(`Connected to '${ip}' on port '${port}'.`);
            this.socket.emit('presentation', nickname);
        });

    }

    onConnect(fn) {
        this.socket.on('connect', fn);
    }

    onConnectError(fn) {
        this.socket.on('connect_error', fn);
    }

    onError(fn) {
        this.socket.on('error', fn);
    }

    onDisconnect(fn) {
        this.socket.on('disconnect', fn);
    }

    onMessage(fn) {
        this.socket.on('message', fn);
    }

    send(text) {
        this.socket.emit('message', buildUserMessage(this.nickname, text));
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export function connect(roomIp, nickname) {
    return new Chat(roomIp, nickname);
}

export function buildUserMessage(sender, text) {
    return new Message(sender, text);
}