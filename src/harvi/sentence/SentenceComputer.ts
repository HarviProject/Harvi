import {Sentence} from "./Sentence";
import {PluginModel} from "../plugin/PluginModel";
import {PluginManager} from "../plugin/PluginManager";
import {IPluginLoaded} from "../plugin/IPluginLoaded";
const request = require('request');
const clj_fuzzy = require('clj-fuzzy');
import {HarviHttpResponseModel} from "../HarviHttpResponseModel";
import {HarviHttpResponse} from "../HarviHttpResponse";
import {SentenceHistory} from "./SentenceHistory";
import {Harvi} from "../Harvi";
import {Config} from "../config/Config";

/**
 * Created by johan on 11/11/2015.
 */
export class SentenceComputer implements IPluginLoaded {


    private static plugins: Array<PluginModel> = new Array<PluginModel>();
    private sentence: Sentence;
    private config: Config = new Config();

    constructor() {
    }

    init() {
        let plugingManager: PluginManager = new PluginManager();
        plugingManager.setOnPluginLoadedListener(this);
        plugingManager.readPluginFolder();
    }

    compute(sentence: string) {

        var pluginFound: PluginModel = null;
        let data: string = null;
        let finded: boolean = false;
        let action: string = null;
        let score: number = 0;
        let confidence: number = 0.6;

        sentence = sentence.trim();

        SentenceComputer.plugins.forEach((plugin: PluginModel) => {

            plugin.sentences.forEach(s => {
                if (finded) return false;

                var levens = clj_fuzzy.metrics.levenshtein(sentence, s);
                levens = 1 - (levens / s.length);
                if ((levens > score && levens > confidence) ||
                    sentence.trim().indexOf(s.trim()) != -1) {
                // if (sentence.trim().indexOf(s.trim()) != -1) {

                    // if () {
                    pluginFound = plugin;

                    action = s;
                    data = sentence.substr(s.length, sentence.length);
                    //console.log(data);
                    finded = true;
                    return true;
                }
            });
        });

        if (pluginFound) {
            Harvi.logger.debug('Plugin: "' + pluginFound.name + '" called with sentence: "' + sentence + '"');
            Harvi.logger.debug('IAction: ' + action);
            Harvi.logger.debug('data: ' + data);
            Harvi.logger.debug('URL : ' + pluginFound.url);
            //make request

            let query: string = "?path=plugins/" + pluginFound.folder + "&script=" + pluginFound.script;

            query += "&action=" + action;
            query += "&sentence=" + sentence;
            query += "&data=" + data;
            query += "&config=" + JSON.stringify(Config.config);


            let sentenceHistory: SentenceHistory = new SentenceHistory();
            sentenceHistory.addSentence(sentence);


            let url: string = 'http://localhost:8888/plugin' + pluginFound.url + query;

            Harvi.logger.debug('Request : ' + url);

            request(url, function (error, response, body) {

                if (!error && response.statusCode == 200) {

                    let aviResponseModel: HarviHttpResponseModel = JSON.parse(body);

                    let aviResponse: HarviHttpResponse = new HarviHttpResponse();
                    aviResponse.compute(aviResponseModel);
                } else {
                    Harvi.logger.error(error);
                }
            })
        }else{
            let aviResponse: HarviHttpResponse = new HarviHttpResponse();
            aviResponse.compute({
                type:"tts",
                content: "Désolé, mais je n'ai pas compris"
            });
        }
    }


    onPluginsLoaded(plugins: Array<PluginModel>) {
        SentenceComputer.plugins = plugins;
    }
}