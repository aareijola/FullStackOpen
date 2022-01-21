describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aaro Reijola',
      username: 'aareijo',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('aareijo')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('Aaro Reijola logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('eioikea')
      cy.get('#password').type('tiikeri')
      cy.contains('login').click()
      cy.contains('Wrong username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'aareijo', password: 'salasana' })
    })
    it('a new blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('This is a test blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('testurl.url')
      cy.contains('create').click()
      cy.contains('This is a test blog Cypress')
    })
    describe('when there are blogs in the app', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'joku',
          title: 'my first blog',
          url: 'blogurl.com'
        })
        cy.createBlog({
          author: 'john doe',
          title: 'second cool blog',
          url: 'blogurl.com'
        })
        cy.createBlog({
          author: 'kolmas',
          title: 'third blog',
          url: 'blogurl.com'
        })
      })
      it('A blog can be liked', function() {
        cy.contains('my first blog').as('firstBlog')
          .contains('show').click()
        cy.get('@firstBlog')
          .contains('likes 0')
        cy.get('@firstBlog')
          .contains('like').click()
        cy.get('@firstBlog')
          .contains('likes 1')
      })
      it('User can remove blogs they added', function () {
        cy.contains('second cool blog').as('secondBlog')
          .contains('show').click()
        cy.get('@secondBlog')
          .contains('remove').click()
        cy.on('window:alert', () => {
          cy.contains('OK').click()
        })
        cy.get('html').should('not.contain', 'second cool blog')
      })
      it('blogs are sorted by amount of likes, top blog on top', function() {
        cy.contains('third blog')
          .contains('show').click()
        cy.contains('third blog')
          .contains('likes 0')
        cy.contains('third blog')
          .contains('like').click()
        cy.contains('third blog')
          .contains('like').click()
        cy.contains('second cool blog')
          .contains('show').click()
        cy.contains('second cool blog')
          .contains('like').click()
        cy.get('.blog').eq(0)
          .contains('likes 2')
        cy.get('.blog').eq(1)
          .contains('likes 1')
        cy.get('.blog').eq(2)
          .contains('show').click()
        cy.get('.blog').eq(2)
          .contains('likes 0')
      })
    })
  })
})