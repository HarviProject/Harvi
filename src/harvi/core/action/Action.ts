import {IActionType} from "../action-type/ActionType";
export interface IAction {
    name: string;
    actionType: IActionType;
    config: IConfigAction;
    subAction?: IAction;
}

export interface IConfigAction {
    //TODO : implement this
    type: string;
    content?: string;
    sentence?: string;
}

export class Action {
    static getByName(name: string) {
        if (name == "reminder") {
            return {}
        } else {
            return {}
        }

    }
}