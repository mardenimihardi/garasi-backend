import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.HOST || 'http://127.0.0.1',
    PORT: process.env.PORT || 3000,
    PG_URL: process.env.PG_URL || 'postgresql://postgres:gvzdpZLCylFuORpCuUEMMSZeGIThzArC@yamanote.proxy.rlwy.net:31399/garasi',
    PATH_PUBLIC: process.env.PATH_PUBLIC || 'public',
    PATH_IMAGES: process.env.PATH_IMAGES || 'images',
    CLOUDINARY_ENABLED: process.env.CLOUDINARY_ENABLED || false,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ''
}

