/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request({ method: 'POST', url:'http://localhost:3001/api/testing/reset', failOnStatusCode: false })
    const user = {
      username: 'tram',
      password: 'anhhaibede1994'
    }
    cy.request({ method:'POST', url: 'http://localhost:3001/api/users/', body:user, failOnStatusCode: false })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('login').click()
  })
  describe('when logged in ', function() {
    beforeEach(function() {
      cy.login({ username: 'tram', password: 'anhhaibede1994' })
    })
    it('a new note can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('author created by cypress')
      cy.get('#url').type('https://www.youtube.com/watch?v=fI9FM_unXaE')
      cy.get('#likes').type('111')
      cy.contains('add').click()
      cy.contains('new note added')
    })
  })
})