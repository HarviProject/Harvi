import {SchedulerOption} from "./SchedulerOption";
import {Harvi} from "../../Harvi";
import {EventType} from "../event-type/EventType";
import {UserSchema} from "../../models/UserModel";
import {EventModel, EventSchema} from "../../models/EventModel";
const schedule = require('node-schedule');


export class Scheduler {
    private schedulers = [];

    async createAsync(options: SchedulerOption, user?: UserSchema) {
        return new Promise(async(resolve, reject) => {
            if (!options || !options.eventType || !options.rule) {
                return reject(new Error('Wrong parameters, need eventType and rule'));
            }

            if (!user) {
                user = Harvi.getCurrentUser();
            }
            //Create EventModel
            let event: EventSchema = {
                user: user,
                eventType: options.eventType
            };
            let provider = new EventModel();
            let eventCreated: EventSchema = await provider.createAsync(event);


            schedule.scheduleJob(options.rule, function (data: EventSchema) {
                Harvi.event.emit(data.eventType.name, data);
            }.bind(null, eventCreated));

            // let scheduleModel = new SchedulerModel();
            // scheduleModel.createAsync({
            //     endDate: options.rule,
            //     _eventType: '',
            //     status: 'IN_PROGRESS'
            // });

            return resolve();
        });
    }

    delete(options: SchedulerOption) {

    }
}