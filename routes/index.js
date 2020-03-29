import express from 'express';
import postRoute from './posts';
let router = express.Router();

router.use('/posts', postRoute);
router.get('/', (req, res, next) => {
    res.json('ok');
});

export default router;
