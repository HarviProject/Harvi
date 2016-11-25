import {Harvi} from "../../Harvi";
import {EventSchema} from "../../models/EventModel";
import {ActionType} from "../action-type/ActionType";
import {HarviHttpResponse} from "../../HarviHttpResponse";
const schedule = require('node-schedule');
export class EventWatcher {


    /**
     * Check every minutes all plugins activate
     * @param rule
     */
    watchInterval(rule?: any) {

        if (!rule) {
            rule = "* * * * *";
        }

        let arr = [
            {
                id: 0,
                type: "time",
                trigger: {
                    value: '17:20',
                },
                triggered: {
                    type: "light",
                    value: {
                        pin: 9
                    }
                },
                notified: false
            },
            {
                id: 2,
                type: 'time_recursive',
                trigger: {
                    value: '17:00',
                    days: [0, 1]

                },
                triggered: {},
                notified: false
            }, {
                id: 1,
                type: "temperature",
                trigger: {
                    min: 17,
                    max: 20,
                    pin: 9
                },
                notified: false
            }
        ];

// schedule.scheduleJob(rule, function (data: EventSchema) {
//     console.log('Event');
// Harvi.event.emit(data.eventType.name, data);
// });

        // setInterval(() => {
        //     console.log('Event');
        // }, 1000);


        //Launch all plugin


        //TO listening
        arr.forEach((event) => {
            if (event.type == "time_recursive") {
                Harvi.event.on('time_recursive', (data) => {
                    //TODO : compute in function of data type

                    // if (data.value > event.trigger.value) {
                    //
                    // }
                });
            }
        });
    }

    init() {

        Harvi.event.on('reminder', (data: EventSchema) => {
            if (data.eventType.action.config.type == "tts") {
                Harvi.speak(data.eventType.action.config.sentence);
            }
        });

        Harvi.event.on(ActionType.getAlarmClock().name, (data: EventSchema) => {
            let aviResponse: HarviHttpResponse = new HarviHttpResponse();
            aviResponse.compute(data.eventType.action.config);
        });

        Harvi.event.on('temperature', (data: EventSchema) => {

        });
    }

    update() {
        //Called when new plugins are installed
    }


}