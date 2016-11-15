import {RestRouter} from "./RestRouter";
import {DeviceSchema, DeviceModel} from "../harvi/models/DeviceModel";


export class Device extends RestRouter<DeviceSchema> {
    constructor() {
        super(new DeviceModel());
    }
}