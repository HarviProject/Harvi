import {HarviHttpResponseModel} from "../HarviHttpResponseModel";
export interface IPlugin {
    action(data: any, callback: { (response: HarviHttpResponseModel)}, config?: any);
}