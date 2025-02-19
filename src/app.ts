import express, { Router } from 'express';
import cors from 'cors';
import { Repository } from "./repository/init";
import { Service } from "./services/init";
import { Controller } from "./controllers/init";
import Route from "./routes/init";
import config from "./config/config";

const app = express();
const host = config.HOST;
const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'], origin: '*' }));
app.use(express.static('public'));

const repository = new Repository()
const service = new Service(repository.init())
const controller = new Controller(service.init())
const route = new Route(controller.init())

app.get('/', (req, res) => {res.send('Hello World!')})
app.use('/api/image', route.imageRoutes());

app.listen(port, () => {
  return console.log(`Garasi Backend is listening at ${host}:${port}`);
});