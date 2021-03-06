const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { TestWatcher } = require('jest')
const api = supertest(app)

let auth = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const testUser = new User({
      username: "root",
      name: "test user",
      passwordHash: await bcrypt.hash('salasananen', 10)
  })
  await testUser.save()
  const firstResponse = await api.post('/api/login').send({
      username: testUser.username,
      password: 'salasananen'
  })
  auth = 'bearer '.concat(firstResponse.body.token)
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
    const newBlog = {
        title: "This is a new blog",
        author: "aareijo",
        url: "www.validurl.com",
        likes: 32
    }
    
    test('adding blogs adds the blog to the db', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const res = await api.get('/api/blogs')
        const titles = res.body.map(b => b.title)
        expect(titles).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain("This is a new blog")
    })
    test('adding a blog without the like field sets likes to 0', async () => {
        const {likes, ...newBlogWithoutLikes} = newBlog
        await api.post('/api/blogs').set('Authorization', auth).send(newBlogWithoutLikes)
        const res = await api.get('/api/blogs')
        const addedBlog = res.body.find(b => b.author === 'aareijo')
        expect(addedBlog.likes).toEqual(0)
    })
    test('adding a blog without the title-field results in status code 400', async () => {
        const {title, ...newBlogWithoutTitle} = newBlog
        await api.post('/api/blogs').set('Authorization', auth).send(newBlogWithoutTitle).expect(400)
    })
    test('adding a blog without the url-field results in status code 400', async () => {
        const {url, ...newBlogWithoutUrl} = newBlog
        await api.post('/api/blogs').set('Authorization', auth).send(newBlogWithoutUrl).expect(400)
    })
    test('adding a blog without auth header fails with status code 401', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('HTTP DELETE', () => {
    test.skip('deleting a blog reduces size by one and removes the right blog', async () => {
        var res = await api.get('/api/blogs')
        const blogsAtStart = res.body 
        const idToRemove = blogsAtStart[0].id
        await api.delete(`/api/blogs/${idToRemove}`)
        res = await api.get('/api/blogs')
        const titles = res.body.map(r => r.title)
        expect(res.body).toHaveLength(helper.initialBlogs.length - 1)
        expect(titles).not.toContain("React Patterns")
    })
})

afterAll(() => {
    mongoose.connection.close()
})