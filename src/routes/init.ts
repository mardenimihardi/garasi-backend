import { IController } from '../controllers/init'
import { Router } from 'express'
import upload from '../middleware/multer'

class Route {
    constructor(private controller: IController) {}

    imageRoutes() {
        const router = Router();

        router.delete('/:id', this.controller.imageController.delete);
        router.patch('/:id', this.controller.imageController.update);
        router.get('/', this.controller.imageController.getAll);
        router.post('/', upload.array('images'), this.controller.imageController.upload);

        return router;
    }
}

export default Route