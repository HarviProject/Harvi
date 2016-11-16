import {Provider} from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface SchedulerSchema {
    endDate: string;
    _eventType: string;
    status: string;
}

var schedulerSchema = {
    endDate: String,
    _eventType: {type: Schema.Types.ObjectId, ref: 'Event'},
    status: String
};


export class SchedulerModel extends Provider<SchedulerSchema> {


    constructor() {
        super('Scheduler', schedulerSchema);
    }

}