import express from 'express';
import morgan from 'morgan'
import router from './routes'

const app = express();

app.use(morgan('dev'));

app.use('/', router);

app.get('/ping', (req, res) => {
    res.send({ msg: 'ok' });
})

app.listen(3000, () => {
    console.log("app is listening on port 3000");
});