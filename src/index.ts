/**
 * Created by johan on 11/11/2015.
 */
import express = require("express");
import path = require("path");
const bodyParser = require('body-parser');
import index = require("./routes/index")
const plugins = require("./routes/plugin");
import {Harvi} from "./harvi/Harvi";
import {ProviderFactory} from "./harvi/providers/ProviderFactory";
import {HarviDataInitializer} from "./harvi/HarviDataInitializer";
import {Room} from "./routes/Room";
import {House} from "./routes/House";
import {DeviceType} from "./routes/DeviceType";
import {Device} from "./routes/Device";
import {EventWatcher} from "./harvi/core/event-watcher/EventWatcher";

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


class HttpServer {
    NodePort: number;
    harvi: Harvi;
    private harviDateInit = new HarviDataInitializer();

    constructor(port: number) {
        this.NodePort = port;
        this.configure();
        this.harvi = new Harvi();
    }

    private configure(): void {
        app.use(express.static(path.join('../', 'public')));
        //app.set('views', __dirname + '/views');
        //app.set('view engine', 'jade');
        app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
        app.use(bodyParser.json());
        app.get('/', index.index);

        let room = new Room();
        let house = new House();
        let deviceType = new DeviceType();
        let device = new Device();

        app.use('/house', house.getRoutes());

        app.use('/device-type', deviceType.getRoutes());
        app.use('/device', device.getRoutes());


        app.use('/room', room.getRoutes());
        //app.use('/history', new History());
        app.use('/plugin', plugins);
        app.get('/voice-listener', async(req, res) => {
            res.json(await this.harvi.newSentenceListenedAsync(req.query.q));
        });


    }

    onRequest() {

    }

    onStartAsync() {
        new Promise((resolve, reject) => {
            ProviderFactory.connect("mongodb://localhost/harvi");

            app.listen(this.NodePort, (err) => {
                if (err) {
                    Harvi.logger.error(err);
                    reject(err);
                } else {
                    Harvi.logger.debug("Listening on port " + this.NodePort);
                    resolve();
                }
            });


            io.on('connection', function (socket) {
                console.log("Yeah connection");
            });
        });

    }

    async initHarvi() {
        // Harvi.logger.debug("Init Default user");
        // await this.harviDateInit.initUserAdminAsync();

        Harvi.logger.debug("Start harvi");
        this.harvi.init();

        this.harvi.testSchedulerAsync();
    }
}


class Startup {

    async start() {
        let server = new HttpServer(8888);
        await server.onStartAsync();

        server.initHarvi();

    }
}

let startup = new Startup();
startup.start();

// let test = new EventWatcher();
// test.watchInterval();