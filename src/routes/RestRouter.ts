import * as express from "express";
import {Provider} from '../harvi/providers/Provider';


export class RestRouter<T> {


    private model;

    constructor(model: Provider<T>) {
        this.model = model;
    }

    private async get(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            let id = req.params.id;
            if (id) {
                let model = await this.model.findOneAsync(id);
                res.json(model);
            } else {
                let model = await this.model.findAsync({});
                res.json(model);
            }
        } catch (e) {
            res.status(500).json(e);
        }

    }

    private async update(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let id = req.params.id;
            let data = req.body;
            if (id && data) {
                let model = await this.model.updateAsync(id, data);
                res.json(model);
            } else {
                res.status(400).json({
                    message: "Id or body is missing "
                });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }


    private async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let data = req.body;
            if (data) {
                let model = await this.model.createAsync(data);
                res.json(model);
            } else {
                res.status(400).json({
                    message: "Body is missing "
                });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }


    private async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let id = req.params.id;
            if (id) {
                let model = await this.model.deleteAsync(id);
                res.json(model);
            } else {
                res.status(400).json({
                    message: "Id is missing "
                });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }

    getRoutes(): express.Router {
        let router: express.Router = express.Router();

        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.get(req, res, next);
        });
        router.get('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.get(req, res, next);
        });
        router.put('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.update(req, res, next);
        });
        router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.create(req, res, next);
        });
        router.delete('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.delete(req, res, next);
        });

        return router;
    }

}