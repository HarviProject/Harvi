import {IPlugin} from "../../harvi/plugin/IPlugin";
import {HarviHttpResponseModel} from "../../harvi/HarviHttpResponseModel";


export class Index implements IPlugin {
    action(data: any, callback: { (response: HarviHttpResponseModel)}, config?: any) {
        var date = new Date();

        callback({
            type: "tts",
            content: "Il est " + date.getHours() + " heures " + date.getMinutes()
        })
    }
}