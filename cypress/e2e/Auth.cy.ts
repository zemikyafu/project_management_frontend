describe("Auth tests", function () {
  beforeEach("Loading test user data", function () {
    cy.fixture("user").then((userData) => {
      this.userData = userData
    })
    cy.visit(Cypress.env("baseUrl") || "http://localhost:3000")
  })

  it("Should sign up a new user successfully", function () {
    cy.visit("/signup")

    cy.signup(
      this.userData.newUser.name,
      this.userData.newUser.email,
      this.userData.newUser.password
    )
    cy.get("@signup").its("response.statusCode").should("eq", 201)
  })

  it("Should show 'User already exists' if the user tries to sign up with an existing email", function () {
    cy.visit("/signup")

    cy.signup(
      this.userData.newUser.name,
      this.userData.newUser.email,
      this.userData.newUser.password
    )
    cy.get("@signup").its("response.statusCode").should("eq", 409)
    cy.contains(`User already exists with email: ${this.userData.newUser.email}`)
  })

  it("Should login a user successfully", function () {
    cy.login(this.userData.validUser.email, this.userData.validUser.password)
    cy.get("@login").its("response.statusCode").should("eq", 200)
    cy.url().should("include", "/")
  })

  it("Should show 'User not found with the provided email' if the user tries to log in with incorrect password", function () {
    cy.login(this.userData.invalidUser.email, this.userData.invalidUser.password)
    cy.get("@login").its("response.statusCode").should("eq", 404)
    cy.contains("User not found with the provided email").should("be.visible")
  })
})
