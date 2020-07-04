describe('Blog app', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.clearLocalStorage()

    cy.request('POST', 'http://localhost:3003/api/users', {
      'username': 'brian',
      'name': 'brian',
      'password': '1234'
    })

    cy.visit('http://localhost:3000')
  })
  it('Should Login form is shown', function () {
    cy.contains('login')
    cy.get('form')
    cy.get('input[name=username]')
    cy.get('input[name=password]')
    cy.get('button').contains('login')
    cy.get('button').contains('new blog').should('not.be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // login
      cy.get('input[name=username]').type('brian')
      cy.get('input[name=password]').type('1234')
      cy.get('button').click()
      // check
      cy.contains('brian logged in')
      cy.get('button').contains('logout').should('be.visible')
    })
    const badCredentials = [{username: 'brian2', password: '1234'}, {username: 'brian', password: '12345'}]
    for (let i = 0; i < badCredentials.length; i++) {
      it(`fails with wrong credentials ${i + 1}`, function () {
        cy.get('input[name=username]').type(badCredentials[i].username)
        cy.get('input[name=password]').type(badCredentials[i].username)
        cy.get('button').click()

        // check
        cy.contains('brian logged in').should('not.be.visible')
        cy.get('form').contains('invalid username or password')
        // still login form
        cy.get('form')
        cy.get('input[name=username]')
        cy.get('input[name=password]')
        cy.get('button').contains('login')
        cy.get('button').contains('new blog').should('not.be.visible')

      })
    }
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({username: 'brian', password: '1234'})
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('form')
      cy.get('input[name=title]').type('this is new blog title')
      cy.get('input[name=url]').type('https://blog.com')
      cy.get('input[name=author]').type('alexander joe')
      cy.contains('add').click()
      cy.contains('this is new blog title by alexander joe added')
      cy.contains('this is new blog title')
      cy.get('.blog').should('have.length', 1)
    })
    describe('When Blog exist', function () {
      beforeEach(function () {
        cy.createBlog({title: 'first blog', url: 'https://blog.com', author: 'alexander joe'})
        cy.createBlog({title: 'second blog', url: 'https://bloganother.com', author: 'lalalal'})
        cy.createBlog({title: 'third blog', url: 'https://bloganother3.com', author: 'shara'})
      })
      it('user can like', function () {
        cy.get('.blog').first().as('firstBlog').contains('show').click()
        cy.get('@firstBlog').contains('like').click()
        cy.get('@firstBlog').contains('likes 1')
        cy.get('@firstBlog').contains('like').click()
        cy.get('@firstBlog').contains('like').click()
        cy.get('@firstBlog').contains('likes 3')
      })
      it('blogs is sort by like desc', function () {
        cy.get('.blog').eq(0).as('i')
        cy.get('.blog').eq(1).as('ii')
        cy.get('.blog').eq(2).as('iii')
        cy.get('@i').contains('show').click()
        cy.get('@ii').contains('show').click()
        cy.get('@iii').contains('show').click()

        // 3rd like 3 like
        cy.get('@iii').contains('like').click()
        cy.get('@iii').contains('like').click()
        cy.get('@iii').contains('like').click()

        // 2nd like 5 likes
        cy.get('@ii').contains('like').click()
        cy.get('@ii').contains('like').click()
        cy.get('@ii').contains('like').click()
        cy.get('@ii').contains('like').click()
        cy.get('@ii').contains('like').click()

        cy.get('.blog').eq(0).contains('likes 5')
        cy.get('.blog').eq(1).contains('likes 3')
        cy.get('.blog').eq(2).contains('likes 0')

      })


      describe('In case remove blog', function () {
        beforeEach(function () {
          // cy.register({username: 'brian2', password: '1234', name: 'vule'})
        })
        it('Owner can delete his blog', function () {
          cy.get('.blog').should('have.length', 3)
          cy.get('.blog').first().as('firstBlog').contains('show').click()
          cy.get('@firstBlog').contains(new RegExp(/remove/, 'i')).click()
          cy.get('.blog').should('have.length', 2)

        })
      })
      describe('In case login with another person', function () {
        beforeEach(function () {
          cy.clearLocalStorage()
          cy.register({username: 'brian2', password: '1234', name: 'vule'})
        })
        it('Other cannot view remove button', function () {
          cy.get('.blog').should('have.length', 3)
          cy.get('.blog').contains('show').click()
          cy.get('.blog').contains(new RegExp(/remove/, 'i')).should('not.be.visible')
        })
      })
    })

  })
})

