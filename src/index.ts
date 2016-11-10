/**
 * Created by johan on 11/11/2015.
 */
import express = require("express");
import path = require("path");
const bodyParser = require('body-parser');
import index = require("./routes/index")
const plugins = require("./routes/plugin");
import {Harvi} from "./harvi/Harvi";
import {CorePlugins} from "./harvi/core-plugins/CorePlugins";

var app = express();


class HttpServer {
    NodePort: number;
    harvi: Harvi;

    constructor(port: number) {
        this.NodePort = port;
        this.configure();
        this.harvi = new Harvi();
    }

    private configure(): void {
        app.use(express.static(path.join('../','public')));
        //app.set('views', __dirname + '/views');
        //app.set('view engine', 'jade');
        app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
        app.use(bodyParser.json());
        app.get('/', index.index);
        //app.use('/history', new History());
        app.use('/plugin', plugins);
        app.get('/voice-listener', (req, res) => {
            this.harvi.newSentenceListened(req.query.q);
        });
    }

    onRequest() {

    }

    onStart() {
        app.listen(this.NodePort, (err) => {
            if (err) {
                Harvi.logger.error(err);
            } else {
                Harvi.logger.info("Listening on port " + this.NodePort);
            }
        });
    }

    initAvi() {
        this.harvi.init();
    }
}

var server = new HttpServer(8888);
server.onStart();


server.initAvi();
//
// let test = new CorePlugins();
//
// test.init();
// test.run("Quelle heure il est");