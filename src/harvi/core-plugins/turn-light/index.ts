import {CorePlugins} from "../CorePlugins";
import {ICorePlugin} from "../ICorePlugin";
import {Wit, HarviWitResponse} from "../../../vendor-tds/Wit";


export class Index extends CorePlugins implements ICorePlugin {

    //The action name on your WIT console
    actionName: string = "turnOnLight";

    action(wit: Wit, harvi: any): Promise<HarviWitResponse> {
        return new Promise((resolve, reject) => {
            let location = this.firstEntityValue(wit.entities, "everywhere");
            let toggle = this.firstEntityValue(wit.entities, "on_off");

            let response = {
                type: "tts",
                value: "Ok, j'allume la lumière"
            };


            resolve({
                wit: wit,
                harvi: response
            });
        });


    }
}