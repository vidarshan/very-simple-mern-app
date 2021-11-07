const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})

        res.json(posts)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getPost, async (req, res) => {
    res.json(res.post);
})

router.post('/', async (req, res) => {

    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {

        const newPost = await post.save();
        res.status(201).json(newPost)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }

    if (req.body.description != null) {
        res.post.description = req.body.description;
    }

    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', getPost, async (req, res) => {

    try {
        await res.post.remove();
        res.json({ message: 'Deleted Post' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

async function getPost(req, res, next) {

    let post;
    try {
        post = await Post.findById(req.params.id)

        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post;
    next();
}

module.exports = router;