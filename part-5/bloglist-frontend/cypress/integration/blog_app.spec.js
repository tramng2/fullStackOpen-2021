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
      cy.createBlog({ title: 'a blog created by cypress', author: 'author created by cypress', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', like:'111' })
      cy.contains('a blog created by cypress')
    })
    describe('and a blog exists', function () {
      describe('and several notes exist', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'add 1', author: 'author cypress', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', like:'222' })
          cy.createBlog({ title: 'add 2', author: 'author cypress', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', like:'222' })
        })

        it('one of those can be click like', function () {
          cy.contains('add 1').parent().find('button').as('theButton')
          cy.get('@theButton').first().click()
          cy.contains('add 1').parent().find('button').as('likeButon')
          cy.get('@likeButon').contains('like').click()
        })
      })
    })

  })
})

describe('log out and create new user', function () {
  beforeEach(function() {
    cy.request({ method: 'POST', url:'http://localhost:3001/api/testing/reset', failOnStatusCode: false })
    const user = {
      username: 'cuccut',
      password: 'anhhaibede1994'
    }
    cy.request({ method:'POST', url: 'http://localhost:3001/api/users/', body:user, failOnStatusCode: false })
    cy.visit('http://localhost:3000')
  })
  describe('when cuc cut login', function() {
    beforeEach(function(){
      cy.login({ username: 'cuccut', password: 'anhhaibede1994' })
    })
    it('a new note can be created by cuc cut', function() {
      cy.contains('Create new blog').click()
      cy.createBlog({ title: 'a blog created by cuc cut', author: 'author created by cuc cut', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', like:'111' })
      cy.contains('a blog created by cuc cut')
    })
    it('user can delete their blogs', function () {
      cy.contains('a blog created by cuc cut').parent().find('button').as('theButton')
      cy.get('@theButton').contains('view').click()
      cy.get('@theButton').contains('remove').click()
    })
    it('user cannot delete their blogs', function () {
      cy.contains('a blog created by cypress').parent().find('button').as('theButton')
      cy.get('@theButton').contains('view').click()
      cy.get('@theButton').contains('remove').should('not.visible')
    })
  })
})