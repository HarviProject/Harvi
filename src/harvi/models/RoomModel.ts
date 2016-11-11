
import { Provider } from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


interface RoomSchema {
    name: string;
    stair: number;
}

var RoomSchema = {
    name: String,
    stair: Number
};

export class RoomModel extends Provider<RoomSchema> {

    constructor() {
        super("Room", RoomSchema);
    }
}