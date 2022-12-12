import DetailsPage from "./DetailsPage";
import { faker } from "@faker-js/faker";
const detailsPage = new DetailsPage();
var data = require("../../fixtures/example.json");
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
var randomEmailAddress = faker.internet.email();
const randomPhoneNumber = faker.phone.number("50345####");
const randomPassword = faker.internet.password(10);

class HomePagePowerUs {
  getBlogMenu() {
    return cy
      .get("button[class='mat-focus-indicator btn mat-button mat-button-base']")
      .eq(1);
  }

  getElectricianJobType() {
    return cy
      .get(
        "a[class='mat-focus-indicator menu-item mat-button mat-button-base']"
      )
      .contains(" Elektriker Gehalt Übersicht ");
  }

  getMenuIcon() {
    return cy.get(
      "button[class='mat-focus-indicator mat-icon-button mat-button-base']"
    );
  }

  getKostenlosGehaltButton() {
    return cy.contains(" Kostenlos Gehalt checken");
  }

  getElektrikerGehaltHeader() {
    return cy.get("h1[class='title']");
  }

  getElektrikerGehaltLink() {
    return cy.get("a[routerlink='/elektriker-gehalt-übersicht']");
  }

  // Under blog menu, checks each job type buttons are displayed and clickable or not
  assertJobTypes() {
    cy.get(
      "a[class='mat-focus-indicator menu-item mat-button mat-button-base']"
    ).each(($el) => {
      cy.wrap($el).should("be.visible").and("not.be.disabled");
    });
  }

  // Under Allgemeine Gehaltsübersicht header, checks whether each link is displayed and clickable
  assertGehaltsübersichtLinks() {
    cy.get("[class='nav-link']").each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("not.be.disabled");
    });
  }

  // Asserts all the links at the bottom of the page whether each link is displayed and clickable
  assertLinksAtTheBottom() {
    cy.get(".links .link").each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("not.be.disabled");
    });

    cy.get(".social .icon-container").each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("not.be.disabled");
    });
  }

  // Scrolls down to the bottom of the page
  scrollDown() {
    cy.scrollTo("bottomRight");
    cy.wait(2000);
  }

  // Accepts arguments for the degree, experience and mobility options and automatically gets until the state step page is appeared
  getStateStepPage(degree, experience, mobility) {
    cy.visit(Cypress.env("baseURL"));
    this.getMenuIcon().click();
    this.getBlogMenu().click();
    this.getElectricianJobType().click();
    this.getKostenlosGehaltButton().click();
    detailsPage.selectDegree(String(degree));
    detailsPage.selectExperience(String(experience));
    detailsPage.selectMobility(String(mobility));
  }

  // Accepts arguments for the degree, experience, mobility, and state options and automatically gets until the registration step page is appeared
  getRegistrationPage(degree, experience, mobility, state) {
    this.getStateStepPage(degree, experience, mobility);
    detailsPage.selectState(String(state));
    detailsPage.getKostenlosDeinGehaltButton().click();
  }

  // Accepts arguments for the degree, experience, mobility, and state options, and automatically gets until the phone number step page is appeared
  getPhoneNumberPage(degree, experience, mobility, state) {
    this.getRegistrationPage(degree, experience, mobility, state);
    detailsPage.fillOutRegistrationForm(
      randomFirstName,
      randomLastName,
      randomEmailAddress,
      randomPassword
    );
  }

  // Accepts arguments for the degree, experience, mobility, and state options, and automatically gets until the result step page is appeared
  getResultPage(degree, experience, mobility, state) {
    this.getPhoneNumberPage(degree, experience, mobility, state);
    detailsPage.getPhoneNumberInput(randomPhoneNumber);
    detailsPage.getKostenlosRegistrierenButton().click();
  }
}
export default HomePagePowerUs;
