import { Request, Response } from 'express';
import { IImageService } from "../services/image";
import config from '../config/config';
import path from 'path';

interface IImageController {
    getAll: (req: Request, res: Response) => Promise<void>;
    upload: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
}

class ImageController implements IImageController {
    constructor(private imageService: IImageService) {}

    getAll = async (req: Request, res: Response) => {
        await this.imageService.getAll().then((data: any) => {
            res.status(200).json({ success: true, data })
        })
    };

    upload = async(req: Request, res: Response) => {
        try {
            const titles = req.body.titles;
            const files: any = req.files;

            if (titles.length !== files.length) {
                res.status(400).json({ message: 'The number of titles must match the number of images' });
            }

            let uploadedData: Array<{ title: string, url: string }> = files.map((file, index) => ({
                title: titles[index],
                url: `${config.PATH_IMAGES}/${file.filename}`
            }));
   
            await this.imageService.upload(uploadedData).then((data: any) => {
                uploadedData.forEach((item: any) => item.url = `${config.HOST}:${config.PORT}/${item.url}`)
                res.status(200).json({ success: true, uploadedItems: uploadedData })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            await this.imageService.delete(id).then((data: any) => {
                res.status(200).json({ success: true })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const title = req.body.title

            if (!title || title.trim() === '') {
                new Error('Title is required')
            }

            await this.imageService.update(id, title).then((data: any) => {
                res.status(200).json( { success: true, data })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export { ImageController, IImageController }