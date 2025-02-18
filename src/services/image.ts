import { IImageRepository } from "../repository/image";
import fs from 'fs'
import config from "../config/config";
import path from "path";

interface IImageService {
    getAll(): Promise<any>;
    upload(uploadedData: Array<{ title: string, url: string }>): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, title: string): Promise<any>;
} 

class ImageService implements IImageService {
    constructor(private imageRepository: IImageRepository) {}

    async getAll(): Promise<any> {
        const data = await this.imageRepository.findAll()
        data.forEach((item: any) => item.url = `${config.HOST}:${config.PORT}/${item.url}`) 
        return data
    }

    async upload(uploadedData: Array<{ title: string, url: string }>): Promise<any> {
        return await this.imageRepository.create(uploadedData)
    }

    async delete(id: string): Promise<any> {
        const data = await this.imageRepository.findOne(id)
        if (!data) {
            throw new Error('Data not found')
        }
        
        if (fs.existsSync(`./public/images/${data.url}`)) {
            fs.unlinkSync(`./public/images/${data.url}`)
        }
        return await this.imageRepository.delete(id)
    }

    async update(id: string, title: string): Promise<any> {
        const data = await this.imageRepository.findOne(id)
        if (!data) {
            throw new Error('Data not found')
        }

        await this.imageRepository.update(id, title)
        const result = await this.imageRepository.findOne(id)
        result.url = `${config.HOST}:${config.PORT}/${data.url}`
        return result
    }
}

export { ImageService, IImageService }