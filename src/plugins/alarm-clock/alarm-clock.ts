import {IPlugin, IDataPlugin} from "../../harvi/plugin/IPlugin";
import {HarviHttpResponseModel} from "../../harvi/HarviHttpResponseModel";
import {Scheduler} from "../../harvi/core/scheduler/Scheduler";
import {SchedulerOption} from "../../harvi/core/scheduler/SchedulerOption";
import {ActionType} from "../../harvi/core/action-type/ActionType";

export class Index implements IPlugin {
    action(data: IDataPlugin, callback: { (response: HarviHttpResponseModel)}, config?: any) {
        var time = data.data.trim();


        var words = time.split(" ");

        var hour = 0;
        var minute = 0;
        var second = 0;


        words.forEach(function (word, i) {

            if (word == "secondes" || word == "seconde") {
                second = words[i - 1];
            }
            else if (word == "minutes" || word == "minute") {
                minute = words[i - 1];
            }
            else if (word == "heure" || word == "heures") {
                hour = words[i - 1];
            }

        });


        var year = new Date().getFullYear();
        var month = new Date().getMonth();
        var day = new Date().getDate();


        var date = new Date(year, month, day, hour, minute, second);


        let schedule = new Scheduler();
        let options = new SchedulerOption();

        options.rule = date;
        options.eventType = {
            name: "alarm-clock",
            action: {
                actionType: ActionType.getAlarmClock(),
                name: "alarm-clock",
                config: {
                    type: 'song',
                    content: 'clock-tick.mp3'
                }
            }
        };
        schedule.createAsync(options);

        callback({
            type: "tts",
            content: "C'est fait"
        });
    }

}