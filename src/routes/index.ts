import express from 'express';
import { images } from './api/images';

const routes = express.Router();

// creating the main route
routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('main api route');
});

routes.use('/images', images);

// exporting main route
export default routes;
