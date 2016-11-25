export interface IActionType {
    name: string;
    listening: string;
}

export class ActionType {
    static get(): Array<IActionType> {
        return [
            {
                name: "reminder",
                listening: "reminder"
            }, {
                name: "alarm-clock",
                listening: "alarm-clock"
            },
            {
                name: "temperature",
                listening: "temperature"
            },
            {
                name: "tts",
                listening: "tts"
            }
        ];
    }

    static getAlarmClock() {
        return {
            name: "alarm-clock",
            listening: "alarm-clock"
        }
    }
}
