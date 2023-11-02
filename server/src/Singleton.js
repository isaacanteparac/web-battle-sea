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
            this.players[newNickname.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')] = {
                board: random_.getMatrix(), inGame: false, idRoom: "", score: 200, defaultBoard: random_.getDefaultMatrix(), yourTurn: false, color:""
            };
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