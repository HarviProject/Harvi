import {Harvi} from "../../Harvi";
import {EventSchema} from "../../models/EventModel";
export class EventWatcher {

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