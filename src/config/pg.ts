import { Client } from 'pg'
import config from './config'

const db = new Client(config.PG_URL)
db.connect()

const imageTable = `
    CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    );
`;

db.query(imageTable)

export { db, Client}
