import {Wit, HarviWitResponse} from "../../vendor-tds/Wit";
export interface ICorePlugin {
    actionName: string;
    action(wit: Wit, harvi: any): Promise<HarviWitResponse> ;
}