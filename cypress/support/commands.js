// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
const selector = require('../fixtures/selectors.json');
const testData = require('../fixtures/testData.json'); 

Cypress.Commands.add('login', (email, password) => {
    cy.get(selector.AdminPage.email).type(email);
    cy.get(selector.AdminPage.passvord).type(password);
    cy.contains(testData.AdminPage.button).click();
})

Cypress.Commands.add('adminPanel', () => {
    cy.contains(testData.AdminPanel.hallManagement.title).should('be.visible');
})

Cypress.Commands.add('authorizationError', () => {
    cy.get(selector.errorAuthorization.body).should('have.text', 'Ошибка авторизации!');
})

Cypress.Commands.add('errorMessageEmail', () => {
    cy.get(selector.AdminPage.email)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
})

Cypress.Commands.add("saveAdminHalls", (aliasName = "adminHalls") => {
    cy.get(selector.AdminPage.hallsListItems).then(($lis) => {
      const adminHalls = [...$lis].map((li) => {
          return li.childNodes[0].textContent.replace(/"/g, "").trim();
        }).filter(Boolean);

      cy.wrap(adminHalls).as("adminHalls");
    });
});

Cypress.Commands.add("pickDay", (dayIndex) => {
  cy.get(`${selector.homePage.nav.day}:nth-of-type(${dayIndex})`)
  .click();
});

Cypress.Commands.add("openSeanceByAdminHallsAndTime", (targetTime) => {
  cy.get("@adminHalls").then((adminHalls) => {
      cy.get("h3.movie-seances__hall-title").then(($hallTitles) => {
        const availableHalls = [...$hallTitles].map((title) => {
          const hallName = title.textContent.replace(/"/g, "").trim();

          const times = [
            ...title
              .closest(".movie-seances__hall")
              .querySelectorAll(".movie-seances__time"),
          ].map((a) => a.textContent.trim());

          return {
            name: hallName,
            times: times,
          };
        });

        const targetHall = adminHalls.find((hallName) => {
          const hallOnPage = availableHalls.find((h) => h.name === hallName);
          if (!hallOnPage) return false;
          if (!hallOnPage.times.includes(targetTime)) return false;
          return true;
        });

        cy.contains(
          selector.homePage.home.hallTitle,
          new RegExp(`^"?${targetHall}"?$`),
        )
          .closest(selector.homePage.home.hallBlock)
          .contains(selector.homePage.home.seanceTime, targetTime)
          .click();
      });
    });
});

Cypress.Commands.add("selectSeat", (row, seat) => {
  cy.get(`${selector.homePage.booking.schemeWrapper} > :nth-child(${row}) > :nth-child(${seat})`).click();
});

Cypress.Commands.add("confirmBooking", () => {
  cy.contains(testData.homePage.button).click();
});

Cypress.Commands.add("assertTicketTitle", () => {
  cy.get(selector.homePage.ticket.title).should('have.text', 'Вы выбрали билеты:');
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })