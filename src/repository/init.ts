import { Client, db } from '../config/pg'
import { ImageRepository, IImageRepository } from './image'

interface IRepository {
    imageRepository: IImageRepository
}

class Repository {
    private repository: IRepository
    private db: Client
    constructor() {
        this.db = db
    }

    init() {
        this.repository = {
            imageRepository: new ImageRepository(this.db)
        }
        return this.repository
    }
}

export { Repository, IRepository }