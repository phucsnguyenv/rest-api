import express from 'express';
import bodyJson from 'body-parser';

let commentRotue = express.Router();
commentRotue.use(bodyJson.json());

commentRotue.get('/', (req, res, next) => {
    res.status(200);
    res.send(req.store.posts[req.postId].comments);
})

commentRotue.get('/:commentId', (req, res, next) => {
    res.status(200);
    res.send(req.store.posts[req.postId].comments[req.params.commentId]);
})

commentRotue.post('/', (req, res, next) => {
    req.store.posts[req.postId].comments.push(req.body);
    res.status(201).send({ "msg": "success" });
})

commentRotue.delete('/:commentId', (req, res, next) => {
    req.store.posts[req.postId].comments.pop(req.params.commentId);
    res.status(200).send({ "msg": "success" });
})

export default commentRotue;