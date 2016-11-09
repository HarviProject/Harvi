import fs = require('fs');
import {Harvi} from "../Harvi";


export class Config {
    static config = null;

    load():boolean {
        let content:string = fs.readFileSync('config.json', {encoding: 'utf8'});

        try {
            var toto:string = content;

            var test = JSON.parse(toto);

            Harvi.logger.debug("Config loaded " +test.home.address);

            Config.config =test;
            return true;
        } catch (e) {
            Harvi.logger.error(e);
            return false;
        }

    }

    static isLoaded():boolean {
        if (Config.config === null) return false;

        return true;
    }
}