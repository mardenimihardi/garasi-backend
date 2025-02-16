import { IRepository } from '../repository/init'
import { ImageService, IImageService } from './image'

interface IService {
    imageService: IImageService
}

class Service {
    private service: IService
    constructor(private repository: IRepository) {}

    init() {
        this.service = {
            imageService: new ImageService(this.repository.imageRepository)
        }
        return this.service
    }
}

export { Service, IService }