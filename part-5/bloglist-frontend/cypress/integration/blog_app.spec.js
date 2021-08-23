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
  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tram')
      cy.get('#password').type('anhhaibede1994')
      cy.get('#login-button').click()
      cy.contains('tram logged in')
    })
    it.only('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tram')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Username or Password is invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style','solid')

    })
  })
})