import {Wit, HarviWitResponse} from "./turn-light";
export interface ICorePlugin {
    actionName: string;
    action(wit: Wit, harvi: any): Promise<HarviWitResponse> ;
}