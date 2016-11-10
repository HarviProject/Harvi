import {CorePlugins} from "../CorePlugins";
import {ICorePlugin} from "../ICorePlugin";
import {Wit, HarviWitResponse} from "../../../vendor-tds/Wit";

export class Index extends CorePlugins implements ICorePlugin {

    //The action name on your WIT console
    actionName: string = "getTimeNow";

    action(wit: Wit, harvi: any): Promise<HarviWitResponse> {
        return new Promise((resolve, reject) => {

            let date = new Date();

            let response = {
                type: "tts",
                value: "Il est " + date.getHours() + " heures " + date.getMinutes()
            };

            resolve({
                wit: wit,
                harvi: response
            });
        });


    }
}