import {Provider} from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface DeviceSchema {
    name: string;
    type: string;
}

var deviceSchema = {
    name: String,
    _type: {type: Schema.Types.ObjectId, ref: 'DeviceType'}
};


export class DeviceModel extends Provider<DeviceSchema> {


    constructor() {
        super('Device', deviceSchema, "_type");
    }

}