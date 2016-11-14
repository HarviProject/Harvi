import {Provider} from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface HouseSchema {
    name: string;
    address: string;
    zipCode: string;
    country: string;
    latitude: string;
    longitude: string;
}

var houseSchema = {
    username: String,
    password: String,
    email: String,
    role: String,
};


export class HouseModel extends Provider<HouseSchema> {

    constructor() {
        super("House", houseSchema);
    }

}