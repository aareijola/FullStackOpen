const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { TestWatcher } = require('jest')

const api = supertest(app)

describe('When there is initially one user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('salsana', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const startUsers = await helper.usersInDb()

        const newUser = {
            username: 'testUser',
            name: 'Test User',
            password: 'pword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.usersInDb()
        expect(endUsers).toHaveLength(startUsers.length + 1)
        expect(endUsers.map(u => u.username)).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is taken', async () => {
        const startUsers = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Taken User',
            password: 'pword'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')

        const endUsers = await helper.usersInDb()
        expect(endUsers).toHaveLength(startUsers.length)
    })

    test('creation fails with proper statuscode if password is too short', async () => {
        const startUsers = await helper.usersInDb()

        const newUser = {
            username: 'useruseruser',
            name: 'Testing User',
            password: 'pw'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('longer than 3 characters')

        const endUsers = await helper.usersInDb()
        expect(endUsers).toHaveLength(startUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})