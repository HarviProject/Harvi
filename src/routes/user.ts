import * as express from "express";
import { HarviRouter } from './HarviRouteur';


export class User {

    private get(req: express.Request, res: express.Response, next: express.NextFunction) {
        //render page
        res.render("index");
    }

    private update(req: express.Request, res: express.Response, next: express.NextFunction) {
            
    }

    getRoutes() {
        let router: express.Router = express.Router();

        router.get('/:id', this.get);
        router.put('/:id', this.update);
    }

}