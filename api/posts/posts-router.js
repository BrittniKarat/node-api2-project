// implement your posts router here
const express = require('express')
const router = express.Router()

const Posts = require('./posts-model')

router.get('/', (req, res) => {
    Posts.find()
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch( () => {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then( post => {
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            if(!req.body.title || !req.body.contents){
                res.status(400).json({ message: "Please provide title and contents for the post" })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
})

module.exports = router