import {RestRouter} from "./RestRouter";
import {DeviceTypeModel, DeviceTypeSchema} from "../harvi/models/DeviceTypeModel";


export class DeviceType extends RestRouter<DeviceTypeSchema> {
    constructor() {
        super(new DeviceTypeModel());
    }
}