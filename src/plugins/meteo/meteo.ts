import {IPlugin} from "../../harvi/plugin/IPlugin";
import {HarviHttpResponseModel} from "../../harvi/HarviHttpResponseModel";


export class Index implements IPlugin {
    action(data: any, callback: { (response: HarviHttpResponseModel)}, config?: any) {

        callback({
            type: "tts",
            content: "Cette fonctionnalité n'est pas encore implémentée"
        })
    }
}