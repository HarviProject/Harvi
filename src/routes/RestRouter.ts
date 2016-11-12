import * as express from "express";
import {Provider} from '../harvi/providers/Provider';


export class RestRouter<T> {


    private static model;

    constructor(model: Provider<T>) {
        RestRouter.model = model;
    }

    private async get(req: express.Request, res: express.Response, next: express.NextFunction) {

        try {
            let id = req.params.id;
            if (id) {
                let model = await RestRouter.model.findOneAsync(id);
                res.json(model);
            } else {
                let model = await RestRouter.model.findAsync({});
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
                let model = await RestRouter.model.updateAsync(id, data);
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
                let model = await RestRouter.model.createAsync(data);
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
                let model = await RestRouter.model.deleteAsync(id);
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

        router.get('/', this.get);
        router.get('/:id', this.get);
        router.put('/:id', this.update);
        router.post('/', this.create);
        router.delete('/:id', this.delete);

        return router;
    }

}