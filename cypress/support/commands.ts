/// <reference types="cypress" />

Cypress.Commands.add("signup", (name, email, password) => {
  cy.get('input[name="name"]').clear().type(name)
  cy.get('input[name="email"]').clear().type(email)
  cy.get('input[name="password"]').clear().type(password)
  cy.intercept("POST", "http://localhost:8080/api/v1/auth/signup").as("signup")
  cy.get('button[type="submit"]').click()
  cy.wait("@signup")
})
Cypress.Commands.add("login", (email, password) => {
  cy.get('input[name="email"]').clear().type(email)
  cy.get('input[name="password"]').clear().type(password)
  cy.intercept("POST", "http://localhost:8080/api/v1/auth/signin").as("login")
  cy.get('button[type="submit"]').click()
  cy.wait("@login")
})
