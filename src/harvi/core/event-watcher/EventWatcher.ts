import {Harvi} from "../../Harvi";
import {EventSchema} from "../../models/EventModel";
const schedule = require('node-schedule');
export class EventWatcher {


    /**
     * Check every minutes all plugins activate
     * @param rule
     */
    watchInterval(rule?: any) {

        if (!rule) {
            rule = "*/1 * * * *";
        }
        schedule.scheduleJob(rule, function (data: EventSchema) {
            Harvi.event.emit(data.eventType.name, data);
        });
    }

    init() {

        Harvi.event.on('reminder', (data: EventSchema) => {
            if (data.eventType.action.config.type == "tts") {
                Harvi.speak(data.eventType.action.config.sentence);
            }
        });

        Harvi.event.on('temperature', (data: EventSchema) => {

        });
    }

    update() {
        //Called when new plugins are installed
    }


}