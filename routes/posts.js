import express from 'express';
import bodyJson from 'body-parser';
import commentRoute from './comments';

let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you donâ€™t know what is ES6, itâ€™s a new JavaScript implementation.',
            comments: [
                { text: 'Cruelâ€¦..var { house, mouse} = No type optimization at all' },
                { text: 'I think youâ€™re undervaluing the benefit of â€˜letâ€™ and â€˜constâ€™.' },
                { text: '(p1,p2)=>{ â€¦ } ,i understand this ,thank you !' }
            ]
        }
    ]
}

let postRoute = express.Router();

postRoute.use(bodyJson.json());
postRoute.use((req, res, next) => {
    req.store = store;
    next();
})

postRoute.use('/:postId/comments', (req, res, next) => {
    req.postId = req.params.postId;
    next();
    //is this middleware neccessary???
})
postRoute.use('/:postId/comments', commentRoute);

postRoute.get('/', (req, res, next) => {
    res.status(200);
    res.json(req.store.posts)
})

postRoute.get('/:postId', (req, res, next) => {
    res.send(req.store.posts[req.params.postId]);
})

postRoute.post('/', (req, res, next) => {
    store.posts.push(req.body);
    console.log('created', store.posts);
    res.status(201).send({ msg: 'success' });
})

postRoute.delete('/:postId', (req, rest, next) => {
    req.store.posts.pop(req.params.postId);
    res.status(200).send({ msg: 'success' });
})



export default postRoute;
