import {Provider} from "../providers/Provider";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export interface UserSchema {
    username: string;
    password: string;
    email: string;
    role: string;
    date?: string
}

var userSchema = {
    username: String,
    password: String,
    email: String,
    date: {type: Date, default: Date.now},
    role: String
};

// var Cat = mongoose.model('Cat', {name: String});

export class UserModel extends Provider<UserSchema> {

    constructor() {
        super("User", userSchema);
    }

    async findByNameAsync(name: string): Promise<UserSchema> {
        let founds = await this.findAsync({username: name});

        if (founds.length == 0) {
            return null;
        } else {
            return founds[0];
        }
    }

}