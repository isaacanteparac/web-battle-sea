import { random_ } from "./randomShips.js";

export default class Singleton {
    constructor() {
        if (Singleton.instance) {

            return Singleton.instance;
        }

        this.players = {};
        this.rooms = {}
        Singleton.instance = this;
        return this;
    }

    addNickname(newNickname) {
        if (!this.players.hasOwnProperty(newNickname)) {
            random_.run();
            this.players[newNickname.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')] = { board: random_.getMatrix(), inGame: false, idRoom: "" };
            return true;
        } else {
            console.log("ya existe usuario")
            return false;
        }
    }


    getPlayers() {
        return this.players;
    }

    getRooms() {
        return this.rooms;
    }

}

/*
// Uso del Singleton
const instance2 = new Singleton();

console.log(instance1 === instance2); // Devuelve true, ya que es la misma instancia

instance1.setData([1, 2, 3]);
console.log(instance2.getData()); // Devuelve [1, 2, 3]
*/