describe('Blog app', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Cypress Tester',
            username: 'ctester',
            password: 'test_password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function(){
        cy.contains('Blog app')
        cy.contains('Login to application')
    })

    describe('Login', function() {
        it('suceeds with correct credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('ctester')
            cy.get('#password').type('test_password')
            cy.get('#login-button').click()

            cy.contains('Cypress Tester is logged in.')
        })

        it('fails with wrong credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('ctester')
            cy.get('#password').type('wrong password')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('when logged in', function() {
        beforeEach(function () {
            cy.login({ username: 'ctester', password: 'test_password' })
        })

        it('can create a blog', function() {
            cy.contains('Add a blog').click()
            cy.get('#title').type('Cypress test title')
            cy.get('#author').type('Cypress test author')
            cy.get('#url').type('Cypress test URL')
            cy.get('#submit-blog').click()

            cy.contains('Cypress test title')
        })
    })




})