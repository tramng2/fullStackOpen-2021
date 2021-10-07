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
          cy.createBlog({ title: 'add 1', author: 'author cypress', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', likes:'111' })
          cy.createBlog({ title: 'add 2', author: 'author cypress', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', likes:'222' })
        })

        it('one of those can be click like', function () {
          cy.contains('add 1').parent().find('button').as('theButton')
          cy.get('@theButton').first().click()
          cy.contains('add 1').parent().find('button').as('likeButon')
          cy.get('@likeButon').contains('like').click()
        })
        it('blogs are order based on amount of likes', function() {

          cy.get('[data-cy="blogList"]').then(($blog) => {
            expect($blog).to.have.length(2)
            for (let i = 0; i < $blog.length; i++) {
              // Check if the number of likes of current blog is higher than or equal to that of next blog
              if (i < $blog.length - 1) {
                expect(Number($blog.find('[data-cy="likes"]')[i].innerText)).to.be.least( Number($blog.find('[data-cy="likes"]')[i + 1].innerText) )
                // Check if number of likes of last blog is lower than or equal to that of first blog
              } else {
                expect(Number($blog.find('[data-cy="likes"]')[i].innerText)).to.be.most(Number($blog.find('[data-cy="likes"]')[0].innerText))
              }
            }
          })


        })
      })
    })

  })
})

// describe('log out and another user login', function () {
//   beforeEach(function() {
//     cy.request({ method: 'POST', url:'http://localhost:3001/api/testing/reset', failOnStatusCode: false })
//     const user = {
//       username: 'cuccut',
//       password: 'anhhaibede1994'
//     }
//     cy.request({ method:'POST', url: 'http://localhost:3001/api/users/', body:user, failOnStatusCode: false })
//     cy.visit('http://localhost:3000')
//   })
//   describe('cuc cut login', function() {
//     beforeEach(function(){
//       cy.login({ username: 'cuccut', password: 'anhhaibede1994' })
//     })
//     it('a new note can be created by cuc cut', function() {
//       cy.contains('Create new blog').click()
//       cy.createBlog({ title: 'a blog created by cuc cut', author: 'author created by cuc cut', url:'https://www.youtube.com/watch?v=fI9FM_unXaE', like:'111' })
//       cy.contains('a blog created by cuc cut')
//     })
//     it('user can delete their blogs', function () {
//       cy.contains('a blog created by cuc cut').parent().find('button').as('theButton')
//       cy.get('@theButton').contains('view').click()
//       cy.get('@theButton').contains('remove').click()
//     })
//     it('user cannot delete their blogs', function () {
//       cy.contains('a blog created by cypress').parent().find('button').as('theButton')
//       cy.get('@theButton').contains('view').click()
//       cy.get('@theButton').contains('remove').should('not.visible')
//     })
//   })
// })