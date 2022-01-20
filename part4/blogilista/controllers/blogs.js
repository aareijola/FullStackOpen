const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const { db } = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
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

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(400).json({ error: 'invalid blog id'})
  }
  if (user.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    const dbUser = await User.findById(user)
    dbUser.blogs = dbUser.blogs.filter(b => b.toString() !== req.params.id)
    await User.findByIdAndUpdate(user, dbUser, { new: true })
    res.status(204).end()
  }
  else {
    res.status(401).json({ error: 'unauthorized token'})
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true }).populate('user', {username: 1, name: 1, id: 1})
  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(400).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = await User.findById(req.user)
  if (!req.user || !user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id 
  })
  if (!blog.likes) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined || !blog.title) {
    res.status(400).end()
  } else {
    const result = await blog.save()
    result.populate('user', {username: 1, name: 1, id: 1})
    user.blogs = user.blogs.concat(result._id)
    try {
      await User.findByIdAndUpdate(user._id, user, { new: true })
      res.status(201).json(result)
    } catch (e) {
      console.log('Error saving user to database:', e)
    }
  }
})

module.exports = blogsRouter