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
            cy.get('#title').type('Cypress test title from UI')
            cy.get('#author').type('Cypress test author')
            cy.get('#url').type('Cypress test URL')
            cy.get('#submit-blog').click()

            cy.contains('Cypress test title')
        })

        it('can like a blog', function() {
            // cy.addBlog({
            //     title: 'Cypress test blog',
            //     author: 'Cypress test title',
            //     url: 'Cypress test URL'
            // })
            cy.contains('Add a blog').click()
            cy.get('#title').type('Cypress test title from UI')
            cy.get('#author').type('Cypress test author')
            cy.get('#url').type('Cypress test URL')
            cy.get('#submit-blog').click()

            cy.contains('View').click()
            cy.contains('Like').click()
            cy.contains('Likes: 1')
        })

        it('can delete a blog', function() {
            cy.contains('Add a blog').click()
            cy.get('#title').type('Cypress test title from UI')
            cy.get('#author').type('Cypress test author')
            cy.get('#url').type('Cypress test URL')
            cy.get('#submit-blog').click()

            cy.contains('View').click()
            cy.contains('Remove').click()
            cy.contains('was deleted')
        })

        it('cannot delete a blog created by another user', function() {
            cy.contains('Add a blog').click()
            cy.get('#title').type('Cypress test title from UI')
            cy.get('#author').type('Cypress test author')
            cy.get('#url').type('Cypress test URL')
            cy.get('#submit-blog').click()

            cy.contains('Logout').click()
            const user = {
                name: 'Cypress Tester2',
                username: 'ctester2',
                password: 'test_password'
            }
            cy.request('POST', 'http://localhost:3003/api/users', user)
            cy.login({ username: 'ctester2', password: 'test_password' })

            cy.contains('View').should('not.exist')

        })
    })
})