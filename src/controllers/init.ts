import { IService } from '../services/init'
import { ImageController, IImageController } from './image'

interface IController {
    imageController: IImageController
}

class Controller {
    private controller: IController
    constructor(private service: IService) {}

    init() {
        this.controller = {
            imageController: new ImageController(this.service.imageService)
        }
        return this.controller
    }
}

export { Controller, IController }