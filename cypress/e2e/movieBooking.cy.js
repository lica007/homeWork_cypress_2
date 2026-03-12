const testData = require("../fixtures/testData.json");
const selector = require('../fixtures/selectors.json');

describe("movie booking", () => {

  it("Should book tickets", () => {

    cy.visit("https://qamid.tmweb.ru/admin/");
    cy.login(testData.AdminPage.email, testData.AdminPage.password);
    cy.saveAdminHalls();

    cy.visit("/");
    cy.pickDay(testData.booking.dayIndex);
    cy.openSeanceByAdminHallsAndTime(testData.booking.targetTime);
    cy.selectSeat(testData.hall.row, testData.hall.seat);
    cy.confirmBooking();
    cy.assertTicketTitle();
  });

});