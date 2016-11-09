import {Harvi} from "../Harvi";
import {HarviHttpResponseModel} from "../HarviHttpResponseModel";
import {ICorePlugin} from "./ICorePlugin";
import {HarviWitResponse, EntitiesWit} from "../../vendor-tds/Wit";

const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

const accessToken = (() => {
    return "API_KEI";
})();


export class CorePlugins {

    clientWit = null;

    mActions = {
        send(request, response){
            const {sessionId, context, entities} = request;
            const {text, quickreplies} = response;
            return new Promise(function (resolve, reject) {
                // console.log('sending...', JSON.stringify(response));
                return resolve();
            });
        }
    };

    constructor() {

    }

    init() {
        //TODO Here read all folder on core-plugins
        //console.log(__dirname);
        let req = require('./turn-light/index');
        let light: ICorePlugin = new req.Index();

        this.mActions[light.actionName] = ({context, entities}) => {
            return new Promise(function (resolve, reject) {
                try {
                    light.action({context, entities}, null).then((harviWitResponse: HarviWitResponse) => {
                        resolve(harviWitResponse.harvi);
                    });
                } catch (e) {
                    Harvi.logger.error(e);
                    reject(e);
                }
            });
        };

        let reqTime = require('./time/index');
        let time: ICorePlugin = new reqTime.Index();

        this.mActions[time.actionName] = ({context, entities}) => {
            return new Promise(function (resolve, reject) {
                try {
                    time.action({context, entities}, null).then((harviWitResponse: HarviWitResponse) => {
                        resolve(harviWitResponse.harvi);
                    });
                } catch (e) {
                    Harvi.logger.error(e);
                    reject(e);
                }
            });
        };

        let actions = this.mActions;
        this.clientWit = new Wit({accessToken, actions});

    }

    run(sentence: string) {
        console.log('Launch action with sentence : ' + sentence);
        this.clientWit.runActions(uuid.v1(), sentence, {}, 5).then((ctx: HarviHttpResponseModel) => {
            // HarviHttpResponse.compute(ctx)
            console.log(ctx);
        })

    }

    protected firstEntityValue(entities: EntitiesWit, entity: string) {
        const val = entities && entities[entity] &&
                Array.isArray(entities[entity]) &&
                entities[entity].length > 0 &&
                entities[entity][0].value
            ;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }


}