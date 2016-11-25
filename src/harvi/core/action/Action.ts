import {IActionType} from "../action-type/ActionType";
import {HarviHttpResponseModel} from "../../HarviHttpResponseModel";
export interface IAction {
    name: string;
    actionType: IActionType;
    config: IConfigAction;
    subAction?: IAction;
}

export interface IConfigAction extends HarviHttpResponseModel {
    //TODO : implement this
    condition?: IConditionAction;
    sentence?: string;
}

export interface IConditionAction {
    value?: string| number;

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