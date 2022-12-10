import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import HomePagePowerUs from "../../../../support/pageObjects/HomePagePowerUs";
import DetailsPage from "../../../../support/pageObjects/DetailsPage";

const homePage = new HomePagePowerUs();

const detailsPage = new DetailsPage();

Given("user is on the Home page", () => {
  cy.visit(Cypress.env("baseURL"));
  cy.wait(5000);
  homePage.getCookies().click();
});

When("user clicks on the Blog button", () => {
  homePage.getMenuIcon().click();
  homePage.getBlogMenu().click();
});

Then("all menu items are shown and clickable", () => {
  homePage.assertJobTypes();
});

When("user clicks on the Elektriker Gehalt option", () => {
  homePage.getElectricianJobType().click();
});

Then("elektriker gehalt header is displayed", () => {
  homePage.getElektrikerGehaltHeader().should("be.visible");
});

And("the url contains elektriker gehalt as an endpoint", () => {
  cy.url().should("include", "elektriker-gehalt");
});

And("Kostenlos Gehalt checken button is clickable", () => {
  homePage.getKostenlosGehaltButton().should("be.visible");
  homePage.getKostenlosGehaltButton().should("not.be.disabled");
});

And("all Allgemeine Gehaltsübersicht links should be clickable", () => {
  homePage.assertGehaltsübersichtLinks();
});

When("user scrolls down to the page", () => {
  homePage.scrollDown();
});

Then("all the buttons at the bottom of the page should be clickable", () => {
  homePage.assertLinksAtTheBottom();
});

And("clicks on the Elektriker Gehalt link", () => {
  homePage.getElektrikerGehaltLink().click();
});

Then(
  "the page should scroll up and elektriker gehalt header should be displayed",
  () => {
    cy.window().its("scrollY").should("equal", 0);
  }
);

When("user click on the Kostenlos Gehalt checken button", () => {
  homePage.getKostenlosGehaltButton().click();
});

Then("progress bar is %25 filled", () => {
  detailsPage.getLinkBarPercentage("0.25");
});

And("proficiency options are displayed", () => {
  detailsPage.assertDegreeTypes();
});

When("user clicks on one degree option", function () {
  detailsPage.selectDegree(String(this.data.degree));
});

Then("progress bar is %50 filled", () => {
  detailsPage.getLinkBarPercentage("0.5");
});

And("years of experience options are displayed and clickable", () => {
  detailsPage.assertExperienceTypes();
});

When("user clicks on one years of experience option", function () {
  detailsPage.selectExperience(String(this.data.experience));
});

Then("progress bar is %75 filled", () => {
  detailsPage.getLinkBarPercentage("0.75");
});

And("willingness to travel options are displayed and clickable", () => {
  detailsPage.assertMobilityTypes();
});

When("user clicks on one mobility option", function () {
  detailsPage.selectMobility(String(this.data.mobility));
});

Then("progress bar is %100 filled", () => {
  detailsPage.getLinkBarPercentage("1");
});

And("state header is displayed", () => {
  detailsPage.assertStateHeader();
});

And("all states are clickable", () => {
  detailsPage.assertAllStatesOptions();
});

And("the Kostenlos Dein Gehalt sehen button is displayed", () => {
  detailsPage.getKostenlosDeinGehaltButton().should("be.visible");
});

Given("user is on the state step page", function () {
  cy.visit(Cypress.env("baseURL"));
  cy.wait(5000);
  homePage.getCookies().click();
  homePage.getMenuIcon().click();
  homePage.getBlogMenu().click();
  homePage.getElectricianJobType().click();
  homePage.getKostenlosGehaltButton().click();
  detailsPage.selectDegree(String(this.data.degree));
  detailsPage.selectExperience(String(this.data.experience));
  detailsPage.selectMobility(String(this.data.mobility));
});

When(
  "user tries to proceed to the next section without choosing any state",
  () => {
    detailsPage.getKostenlosDeinGehaltButton().click();
  }
);

Then("user receives Erforderlich warning message", () => {
  detailsPage.getErforderlichWarning().should("be.visible");
});

When("user chooses one state", function () {
  detailsPage.selectState(String(this.data.state));
});

And("user clicks on the Kostenlos Dein Gehalt sehen button", () => {
  detailsPage.getKostenlosDeinGehaltButton().click();
});

Then("user is on the registration form page", () => {
  cy.url().should("include", "registeration-form");
});
