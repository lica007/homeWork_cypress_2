const testData = require('../fixtures/testData.json');

describe("login verification in the admin area", () => {

  beforeEach(() => {
    cy.visit("https://qamid.tmweb.ru/admin/");
  });

  it("Successful authorization with a username", () => {
    cy.login(testData.AdminPage.email, testData.AdminPage.password);
    cy.adminPanel();
  });
  it("Authorization with a different email address", () => {
    cy.login(testData.AdminPage.notValidEmail.testEmail, testData.AdminPage.password);
    cy.authorizationError()
  });
  it("Authorization with an empty mail field", () => {
    cy.login(" ", testData.AdminPage.password);
    cy.errorMessageEmail();
  });
});
