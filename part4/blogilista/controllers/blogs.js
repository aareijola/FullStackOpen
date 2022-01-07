const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(400).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined) {
    res.status(400).end()
  } else {
    const result = await blog.save()
    res.status(201).json(result)
  }
})

module.exports = blogsRouter