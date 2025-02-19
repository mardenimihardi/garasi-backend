import multer from 'multer'
import fs from 'fs'
import path from 'path';
import config from '../config/config';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const pathPublic = config.PATH_PUBLIC
const pathImages = config.PATH_IMAGES

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(pathPublic, pathImages));
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, Date.now() + extension);
    },
});

if (config.CLOUDINARY_ENABLED === 'true') {
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            const extension = path.extname(file.originalname);
            return {
                folder: "images",
                format: file.mimetype.split("/")[1],
                public_id: Date.now() + extension,
            };
        },
    });
}


const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true); 
    } else {
        return cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter, 
});

if (!fs.existsSync(pathPublic)) {
    fs.mkdirSync(pathPublic);
}

if (!fs.existsSync(path.join(pathPublic, pathImages))) {
    fs.mkdirSync(path.join(pathPublic, pathImages));
}

export default upload