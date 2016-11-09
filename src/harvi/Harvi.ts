import {Speak} from "./speak/Speak";
import {Config} from "./config/Config";
import {SentenceComputer} from "./sentence/SentenceComputer";
import {Sound} from "./sound/Sound";
import {SentenceHistory} from "./sentence/SentenceHistory";
import {HarviLogger} from "./logger/HarviLogger";


export class Harvi {
    private config: Config = new Config();
    private sentenceComputer: SentenceComputer = new SentenceComputer();
    private sentenceHistory: SentenceHistory = new SentenceHistory();
    static logger: HarviLogger = new HarviLogger();

    constructor() {

    }

    init(language: string = "fr"): boolean {


        let loaded: boolean = this.config.load();

        if (!loaded) {
            Harvi.logger.error("Erreur a chargement du fichier de configuration: config.json");
            return false;
        }


        this.sentenceComputer.init();

        this.sentenceHistory.loadSentences();

        return true;
    }

    newSentenceListened(text) {
        this.sentenceComputer.compute(text);
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