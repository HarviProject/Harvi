import {Speak} from "./speak/Speak";
import {Config} from "./config/Config";
import {SentenceComputer} from "./sentence/SentenceComputer";
import {Sound} from "./sound/Sound";
import {SentenceHistory} from "./sentence/SentenceHistory";
import {HarviLogger} from "./logger/HarviLogger";
import {EventEmitter} from "events";
import {HarviEventEmitter} from "./core/event-emitter/HarviEventEmitter";
import {Scheduler} from "./core/scheduler/Scheduler";
import {SchedulerOption} from "./core/scheduler/SchedulerOption";
import {UserModel, UserSchema} from "./models/UserModel";
import {EventWatcher} from "./core/event-watcher/EventWatcher";


export class Harvi {
    private config: Config = new Config();
    private sentenceComputer: SentenceComputer = new SentenceComputer();
    private sentenceHistory: SentenceHistory = new SentenceHistory();
    static logger: HarviLogger = new HarviLogger();
    static event = new HarviEventEmitter();
    private static mCurrentUser: UserSchema;
    // static socket;

    constructor() {
    }

    init(language: string = "fr"): boolean {


        let loaded: boolean = this.config.load();

        if (!loaded) {
            Harvi.logger.error("Erreur a chargement du fichier de configuration: config.json");
            return false;
        }


        this.initEventWatcher();


        this.sentenceComputer.init();

        this.sentenceHistory.loadSentences();

        return true;
    }

    private initEventWatcher() {
        let event = new EventWatcher();

        event.init();
    }

    newSentenceListened(text) {
        this.sentenceComputer.compute(text);
    }

    async testSchedulerAsync() {
        let shcdu = new Scheduler();
        let optiosn = new SchedulerOption();

        // var schedule = require('node-schedule');
        // var rule = new schedule.RecurrenceRule();
        // rule.second = 20;
        optiosn.rule = "*/1 * * * *";
        optiosn.eventType = {
            name: "reminder",
            action: {
                name: "reminder wakeup",
                actionType: {
                    name: "reminder",
                    listening: "reminder"
                },
                config: {
                    type: "tts",
                    sentence: "Il est l'heure de se réveiller"
                }

            }
        };

        let userModel = new UserModel();
      //  let user = await userModel.findByNameAsync("admin");
        shcdu.createAsync(optiosn);

    }

    async getCurrentUserAsync() {
        //FIXME: for now return firstUser
        let userModel = new UserModel();
        // Harvi.mCurrentUser = await userModel.findByNameAsync("admin");
        // return Harvi.mCurrentUser;
    }

    static getCurrentUser() {
        return Harvi.mCurrentUser;
    }

    static speak(text: string): string {
        if (text) {
            Speak.tts(text);
            return text;
        } else {
            let error: string = 'Il faut minimun un mot pour pouvoir faire du text to speech';

            return "Erreur :" + error;
        }

    }

    static play(content: string): void {
        if (!content) {
            Harvi.logger.error("Play need a file");
            return;
        }
        //play sound
        let sound: Sound = new Sound();
        sound.play(content);
    }
}