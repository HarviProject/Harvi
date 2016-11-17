import {Harvi} from "../Harvi";
import {HarviHttpResponseModel} from "../HarviHttpResponseModel";
import {ICorePlugin} from "./ICorePlugin";
import {HarviWitResponse, EntitiesWit} from "../../vendor-tds/Wit";


const fs = require("fs");
const path = require('path');
const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

const accessToken = (() => {
    return "AFIZMTEQMMSVFXDILQ35MG6OMPO36BQE";
})();


export class CorePlugins {

    clientWit = null;
    actionCalled:boolean;

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
        fs.readdir(__dirname, (err, files) => {
            if (err) {
                Harvi.logger.error("Erreur dans le chargement des plugins : " + err);
            } else {

                files.forEach((file) => {
                    file = path.resolve(__dirname, file);
                    if (fs.lstatSync(file).isDirectory()) {
                        let req = require(file);
                        let currentCorePlugin: ICorePlugin = new req.Index();
                        this.mActions[currentCorePlugin.actionName] = ({context, entities}) => {
                            return new Promise((resolve, reject) => {
                                try {
                                    Harvi.logger.debug("Launch WIT actions: " + JSON.stringify(currentCorePlugin));
                                    currentCorePlugin.action({
                                        context,
                                        entities
                                    }, null).then((harviWitResponse: HarviWitResponse) => {
                                        Harvi.logger.debug("Response WIT actions: " + JSON.stringify(harviWitResponse));
                                        resolve(harviWitResponse.harvi);
                                    });
                                } catch (e) {
                                    Harvi.logger.error(e);
                                    reject(e);
                                }
                            });
                        };
                    }
                });
            }
        });

        let actions = this.mActions;
        this.clientWit = new Wit({accessToken, actions});

    }

    runAsync(sentence: string): Promise<HarviHttpResponseModel> {
        return new Promise((resolve, reject) => {
            this.actionCalled = false;
            console.log('Launch action with sentence : ' + sentence);
            this.clientWit.runActions(uuid.v1(), sentence, {}, 1).then((ctx: HarviHttpResponseModel) => {
                // HarviHttpResponse.computeAsync(ctx)
                // console.log(ctx);
                if (ctx) {
                    resolve(ctx);
                } else {
                    resolve(null);
                }

            })
        });


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