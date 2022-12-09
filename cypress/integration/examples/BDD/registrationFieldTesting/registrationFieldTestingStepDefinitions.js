import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import HomePagePowerUs from "../../../../support/pageObjects/HomePagePowerUs";
import DetailsPage from "../../../../support/pageObjects/DetailsPage";
import ResultsPage from "../../../../support/pageObjects/ResultsPage";

const homePage = new HomePagePowerUs();
const resultPage = new ResultsPage();
const detailsPage = new DetailsPage();
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
var randomEmailAddress = faker.internet.email();
const randomPhoneNumber = faker.phone.number("50345####");
const randomPassword = faker.internet.password(10);

Given("user is on the registration page", function () {
  cy.visit(Cypress.env("baseURL"));
  //cy.wait(10000);
  cy.wait(5000);
  homePage.getCookies().click();
  homePage.getMenuIcon().click();
  homePage.getBlogMenu().click();
  homePage.getElectricianJobType().click();
  homePage.getKostenlosGehaltButton().click();
  detailsPage.selectDegree(String(this.data.degree));
  detailsPage.selectExperience(String(this.data.experience));
  detailsPage.selectMobility(String(this.data.mobility));
  detailsPage.selectState(String(this.data.state));
  detailsPage.getKostenlosDeinGehaltButton().click();
});

When("user enters no credentials and clicks on the weiter button", () => {
  detailsPage.getWeiterButton().click();
});

Then("user receives Erforderlich warning message for each input field", () => {
  detailsPage.assertEachErforderlichError();
});

When(/^user enters invalid first name "([^"]*)"$/, function (first_name) {
  var invalidFirstName = first_name + "";
  detailsPage.fillOutRegistrationForm(
    invalidFirstName,
    randomFirstName,
    randomEmailAddress,
    randomPassword
  );
});
Then("user should not proceed to the Phone page", () => {
  cy.wait(3000);
  cy.url().should("include", "registeration-form");
});

When(/^user enters invalid last name "([^"]*)"$/, function (last_name) {
  var invalidLastName = last_name + "";
  detailsPage.fillOutRegistrationForm(
    randomFirstName,
    invalidLastName,
    randomEmailAddress,
    randomPassword
  );
});

When(/^user enters invalid password "([^"]*)"$/, function (password) {
  var invalidPassword = password + "";
  detailsPage.fillOutRegistrationForm(
    randomFirstName,
    randomLastName,
    randomEmailAddress,
    invalidPassword
  );
});

When(/^user enters invalid email "([^"]*)"$/, function (email) {
  var invalidEmail = email + "";
  detailsPage.fillOutRegistrationForm(
    randomFirstName,
    randomLastName,
    invalidEmail,
    randomPassword
  );
});

When("user enters credentials on password input field", () => {
  detailsPage.getPasswordInput().type(randomPassword);
});

Then("the password is shown in bullet points", () => {
  detailsPage.getPasswordInput().should("have.attr", "type", "password");
});

When(
  "user enters valid first_name, last_name, password, and email and clicks on the Weiter button",
  () => {
    detailsPage.fillOutRegistrationForm(
      randomFirstName,
      randomLastName,
      randomEmailAddress,
      randomPassword
    );
  }
);

Then("user should proceed to the phone number page", () => {
  cy.url().should("include", "phone-number");
});

Given("user is on the phone number page", function () {
  cy.visit(Cypress.env("baseURL"));
  //cy.wait(10000);
  cy.wait(5000);
  homePage.getCookies().click();
  homePage.getMenuIcon().click();
  homePage.getBlogMenu().click();
  homePage.getElectricianJobType().click();
  homePage.getKostenlosGehaltButton().click();
  detailsPage.selectDegree(String(this.data.degree));
  detailsPage.selectExperience(String(this.data.experience));
  detailsPage.selectMobility(String(this.data.mobility));
  detailsPage.selectState(String(this.data.state));
  detailsPage.getKostenlosDeinGehaltButton().click();
  detailsPage.fillOutRegistrationForm(
    randomFirstName,
    randomLastName,
    randomEmailAddress,
    randomPassword
  );
});

When("user enters valid phone number in the input field", () => {
  detailsPage.getPhoneNumberInput(randomPhoneNumber);
});

Then("user cannot change Germany Country code", () => {
  detailsPage.assertCountryCodeDimmed();
});

When("user clicks on the Kostenlos registrieren button", () => {
  // cy.wait(2000);
  detailsPage.getKostenlosRegistrierenButton().click({ force: true });
  //cy.wait(2000);
});

Then("the Ergebnis header is displayed", () => {
  resultPage.getErgebnisHeader().should("not.be.disabled").and("be.visible");
});
