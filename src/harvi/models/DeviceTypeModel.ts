import {Provider} from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface DeviceTypeSchema {
    name: string;
    type: string;
    devices: Array<any>;
}

var deviceTypeSchema = {
    name: String,
    type: String,
    devices: [{type: Schema.Types.ObjectId, ref: 'Device'}]
};


export class DeviceTypeModel extends Provider<DeviceTypeSchema> {


    constructor() {
        super('DeviceType', deviceTypeSchema);
    }

}