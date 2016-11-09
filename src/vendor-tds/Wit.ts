import {HarviHttpResponseModel} from "../harvi/HarviHttpResponseModel";
export interface EntitiesWit {
}

export interface Wit {
    context: any;
    entities: EntitiesWit;
}

export interface HarviWitResponse {
    wit: Wit;
    harvi: HarviHttpResponseModel
}
