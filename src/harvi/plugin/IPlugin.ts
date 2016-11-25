import {HarviHttpResponseModel} from "../HarviHttpResponseModel";

export interface IDataPlugin {
    path: string;
    script: string;
    action: string;
    sentence: string;
    data: string
    config: any;
}

export interface IPlugin {
    action(data: IDataPlugin, callback: { (response: HarviHttpResponseModel)}, config?: any);
}