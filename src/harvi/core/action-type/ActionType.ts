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
}
