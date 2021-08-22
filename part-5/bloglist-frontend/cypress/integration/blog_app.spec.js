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
  //   it('front page can be opened', function() {
  //     cy.visit('http://localhost:3000')
  //     cy.contains('Blogs')
  //     cy.contains('Humans of MFF na')
  //   })
  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username').type('tram')
    cy.get('#password').type('anhhaibede1994')
    cy.get('#login-button').click()
  })
})