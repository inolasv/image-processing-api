import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;



// set view engine as ejs 
app.set('view engine', 'ejs');
app.use(express.static('assets'))

// using main api route
app.use('/api', routes);

// Starts the Express Server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;