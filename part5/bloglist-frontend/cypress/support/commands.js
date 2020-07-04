const baseUrl = 'http://localhost:3003/api'

Cypress.Commands.add('register', ({ username,name, password }) => {
  cy.request('POST', `${baseUrl}/users`, {
    username, password, name
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${baseUrl}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    localStorage.setItem('access_token', JSON.stringify(body.token))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, url, author }) => {
  cy.request({
    url: `${baseUrl}/blogs`,
    method: 'POST',
    body: { title, url, author },
    headers: {
      'authorization': `bearer ${JSON.parse(localStorage.getItem('access_token'))}`
    }
  })

  cy.visit('http://localhost:3000')
})
