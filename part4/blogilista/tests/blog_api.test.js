const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const { TestWatcher } = require('jest')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })
    test('blog id field is named exactly "id"', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })
})

describe('HTTP POST', () => {
    test('adding blogs adds the blog to the db', async () => {
        const newBlog = {
            title: "This is a new blog",
            author: "aareijo",
            url: "www.validurl.com",
            likes: 32
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = await api.get('/api/blogs')
        const titles = res.body.map(b => b.title)
        expect(titles).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain("This is a new blog")
    })
})

afterAll(() => {
    mongoose.connection.close()
})