import {HarviHttpResponseModel} from "./HarviHttpResponseModel";
import {Harvi} from "./Harvi";

export class HarviHttpResponse {

    compute(reponse: HarviHttpResponseModel): void {

        if (!reponse.content) return;

        Harvi.logger.debug("Compute response. Type : " + reponse.type);
        Harvi.logger.debug("Compute response. Content : " + reponse.content);

        if (reponse.type === HarviHttpResponseModel.TYPE_TTS) {
            Harvi.speak(reponse.content);
        } else if (reponse.type === HarviHttpResponseModel.TYPE_SONG) {
            Harvi.play(reponse.content);
        }
    }
}