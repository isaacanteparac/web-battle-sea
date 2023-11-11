import { io } from "socket.io-client";

export default class Singleton {
    static socket = null;

    constructor() {
        if (!Singleton.socket) {
            Singleton.socket = io(process.env.REACT_APP_API_URL);
        }
    }

    getSocket() {
        return Singleton.socket;
    }
}
