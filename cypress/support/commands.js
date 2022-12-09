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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add("login_valid", () => {
  cy.get(loc).clear().type(username);
  cy.get(loc).clear().type(password);
  cy.get(loc).click();
});

/* Cypress.Commands.add("assertJobTypes", () => {
  cy.get(".mat-focus-indicator.menu-item mat-button.mat-button-base").each(
    ($el, index) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("be.clickable");
    }
  );
}); */

/* Cypress.Commands.add("assertDegreeTypes", () => {
  cy.get("div[class='cards'] div[class='icon-wrapper']").each(($el, index) => {
    if (index <= 4) {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("be.clickable");
    }
  });
}); */

/* Cypress.Commands.add("assertMobilityTypes", () => {
  cy.get("div[class='cards'] div[class='icon-wrapper']").each(($el, index) => {
    if (index >= 4) {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("be.clickable");
    }
  });
}); */

/* Cypress.Commands.add("assertExperienceTypes", () => {
  cy.get(".chip.clickable.ng-star-inserted']").each(($el) => {
    cy.wrap($el).should("be.visible");
    cy.wrap($el).should("be.clickable");
  });
}); */

/* Cypress.Commands.add("assertAllStates", (stateName) => {
  cy.get("[class='mat-option-text']").each(($el) => {
    cy.wrap($el).should("be.visible");
    cy.wrap($el).should("be.clickable");
    var eachState = cy.wrap($el).text().trim();
    if (eachState == stateName) {
      cy.wrap($el).click();
    }
  });
}); */
