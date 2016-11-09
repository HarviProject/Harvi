/**
 * Created by johan on 16/11/2015.
 */
const shelljs = require('shelljs');
import {Harvi} from "../Harvi";


export class Sound {
    private exec = shelljs.exec;
    private isTalking:boolean = false;


    play(file:string) {

        this.exec('./play-sound.sh ' + file, (error, stdout, stderr) => {
            Harvi.logger.info('stdout : ' + stdout);
            Harvi.logger.error('stderr : ' + stderr);

            this.isTalking = false;
        });
    }


}