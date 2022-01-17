const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(400).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const users = await User.find({})
  const user = users[0]
  console.log('user:', user)
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
  if (blog.title === undefined || blog.url === undefined) {
    res.status(400).end()
  } else {
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)

    await user.save()
    res.status(201).json(result)
  }
})

module.exports = blogsRouter