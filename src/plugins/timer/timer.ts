import {IPlugin} from "../../harvi/plugin/IPlugin";
import {HarviHttpResponseModel} from "../../harvi/HarviHttpResponseModel";

const validator = require('validator');


export class Index implements IPlugin {
    action(data: any, callback: { (response: HarviHttpResponseModel)}, config?: any) {
        var date = new Date();

        var time = data.data;

        time = time.trim();

        var words = time.split(" ");

        var number = null;
        var unit = null;


        words.forEach(function (word) {
            if (validator.isNumeric(word)) {
                number = word;
            }
            else if (word == "secondes" || word == "seconde") {
                unit = 1000;
            }
            else if (word == "minutes" || word == "minute") {
                unit = 1000 * 60;
            }
            else if (word == "heure" || word == "heures") {
                unit = 6000 * 6000;
            }

        });

        var timeToWakeUp = number * unit;

        console.log(timeToWakeUp);

        setTimeout(function () {

            callback({
                type: "song",
                content: "./clock-tick.mp3"
            })
        }, timeToWakeUp);

    }
}
