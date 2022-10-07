/// <reference types="cypress" />


describe('I Complete the Contact Form', () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/')
    })

    it('verify the form inputs are visible', () => {
        cy.get('[data-testid="ContactName"]').should('be.visible')
        cy.get('[data-testid="ContactEmail"]').should('be.visible')
        cy.get('[data-testid="ContactPhone"]').should('be.visible')
        cy.get('[data-testid="ContactSubject"]').should('be.visible')
        cy.get('[data-testid="ContactDescription"]').should('be.visible')
    })
    it('Fill out form with 20 characters', () => {
        cy.get('[data-testid="ContactName"]').type("tester")
        cy.get('[data-testid="ContactEmail"]').type("tester@example.com")
        cy.get('[data-testid="ContactPhone"]').type("111-111-1111")
        cy.get('[data-testid="ContactSubject"]').type("test subject")
        cy.get('[data-testid="ContactDescription"]').type("123456789012345678909")
        cy.intercept('POST', '/message').as('message')
        cy.get('#submitContact').click()
        cy.get('@message').should('have.a.property', 'state', 'Received')



    })
    it('Fill out form with 2000 characters', () => {
        cy.get('[data-testid="ContactName"]').type("tester")
        cy.get('[data-testid="ContactEmail"]').type("tester@example.com")
        cy.get('[data-testid="ContactPhone"]').type("111-111-1111")
        cy.get('[data-testid="ContactSubject"]').type("test subject")
        cy.get('[data-testid="ContactDescription"]').type('a'.repeat(2000), {delay: 0})
        cy.intercept('POST', '/message').as('message')
        cy.get('#submitContact').click()
        cy.get('@message').should('have.a.property', 'state', 'Received')
    })
    it('Contact form Description has a 20 character min value restriction,  alert is presented to user', () => {
        cy.get('[data-testid="ContactName"]').type("tester")
        cy.get('[data-testid="ContactEmail"]').type("tester@example.com")
        cy.get('[data-testid="ContactPhone"]').type("111-111-1111")
        cy.get('[data-testid="ContactSubject"]').type("test subject")
        cy.get('[data-testid="ContactDescription"]').type("123")
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')

    })
    it('Contact form Description requires a 2000 character max value restriction,  alert is presented to user', () => {
        cy.get('[data-testid="ContactName"]').type("tester")
        cy.get('[data-testid="ContactEmail"]').type("tester@example.com")
        cy.get('[data-testid="ContactPhone"]').type("111-111-1111")
        cy.get('[data-testid="ContactSubject"]').type("test subject")
        cy.get('[data-testid="ContactDescription"]').type('a'.repeat(2001), {delay: 0}) // sending 2001 chars
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')

    })
})