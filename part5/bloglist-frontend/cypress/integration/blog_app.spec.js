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
})