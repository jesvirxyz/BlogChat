const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.post('/', async (req, res) => {
    const blog = new Blog({
        description: req.body.description,
        name: req.body.whoPosted,
        postedBy: req.body.postedBy,
    });
    await blog.save().then(res.redirect('/home'));
});

router.post('/profile_post', async (req, res) => {
    const blog = new Blog({
        description: req.body.description,
        name: req.body.whoPosted,
        postedBy: req.body.postedBy,
    });
    await blog.save().then(res.redirect('/profile'));
});

router.delete('/home/:id', async (req, res) => {
    const blog_remove = Blog.findById(req.params.id);
    await blog_remove.remove().then(res.redirect('/home'));
});

router.delete('/profile/:id', async (req, res) => {
    const blog_remove = Blog.findById(req.params.id);
    await blog_remove.remove().then(res.redirect('/profile'));
});

module.exports = router;
