import {Provider} from "../providers/Provider";
import {UserSchema} from "./UserModel";
import {EventType} from "../core/event-type/EventType";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface EventSchema {
    eventType: EventType;
    user: UserSchema;
}

var eventSchema = {
    eventType: Object,
    user: Object
};


export class EventModel extends Provider<EventSchema> {

    constructor() {
        super("Event", eventSchema);
    }

}