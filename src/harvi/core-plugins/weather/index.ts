import {CorePlugins} from "../CorePlugins";
import {ICorePlugin} from "../ICorePlugin";
import {Wit, HarviWitResponse} from "../../../vendor-tds/Wit";

export class Index extends CorePlugins implements ICorePlugin {

    //The action name on your WIT console
    actionName: string = "getForecast";

    action(wit: Wit, harvi: any): Promise<HarviWitResponse> {
        return new Promise((resolve, reject) => {
            let location = this.firstEntityValue(wit.entities, "location");


            let response = {
                type: "tts",
                value: ""
            };

            resolve({
                wit: wit,
                harvi: response
            });
        });


    }
}