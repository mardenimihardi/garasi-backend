import { Client } from '../config/pg'

interface IImageRepository {
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(uploadedData: Array<{ title: string, path: string }>): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, title: string): Promise<any>;
} 

class ImageRepository implements IImageRepository {    
    constructor(private db: Client) {}

    async findOne(id: string): Promise<any> {
        try {
            const response = await this.db.query('SELECT * FROM images WHERE id = $1', [id])
            return response.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async findAll(): Promise<any> {
        try {
            const response = await this.db.query('SELECT * FROM images ORDER BY id DESC')
            return response.rows
        } catch (error) {
            console.log(error)
        }
    }

    async create(uploadedData: Array<{ title: string, path: string }>): Promise<any> {
        try {
            const data = uploadedData.map((item) => `('${item.title}', '${item.path}')`)
            return await this.db.query(`INSERT INTO images (title, path) VALUES ${data.join(',')}`)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const response = await this.db.query('DELETE FROM images WHERE id = $1', [id])
            return response
        } catch (error) {
            console.log(error)
        }
    }
    
    async update(id: string, title: string): Promise<any> {
        try {
            const updatedAt = new Date().toISOString()
            const response = await this.db.query('UPDATE images SET title = $1, updated_at = $3 WHERE id = $2', [title, id, updatedAt])
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export { ImageRepository, IImageRepository }