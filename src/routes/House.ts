import {RestRouter} from "./RestRouter";
import {HouseSchema, HouseModel} from "../harvi/models/HouseModel";


export class House extends RestRouter<HouseSchema> {
    constructor() {
        super(new HouseModel());
    }
}