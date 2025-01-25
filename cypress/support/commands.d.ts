export {}
declare global {
  namespace Cypress {
    interface Chainable {
      signup: (name: string, email: string, password: string) => void
      login: (email: string, password: string) => void
    }
  }
}
