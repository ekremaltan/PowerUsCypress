import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import HomePagePowerUs from "../../../../support/pageObjects/HomePagePowerUs";
import DetailsPage from "../../../../support/pageObjects/DetailsPage";
import ResultsPage from "../../../../support/pageObjects/ResultsPage";

const homePage = new HomePagePowerUs();
const resultPage = new ResultsPage();
const detailsPage = new DetailsPage();
var avgSalary;

Given("user is on the phone number page", function () {
  homePage.getPhoneNumberPage(
    this.data.degree,
    this.data.experience,
    this.data.mobility,
    this.data.state
  );
});

Then("an invalid phone number error message is displayed", () => {
  detailsPage.assertInvalidPhoneNumber();
});

Then("user should not proceed to the next page", () => {
  cy.url().should("include", "phone-number");
});

When("user clicks on the Kostenlos registrieren button", () => {
  detailsPage.getKostenlosRegistrierenButton().click({ force: true });
});

Then("an already registered phone number error message is displayed", () => {
  detailsPage.assertAlreadyRegisteredPhoneNumber();
});

When(/^user enters invalid phone number "([^"]*)"$/, function (phoneNumber) {
  var invalidPhoneNumber = phoneNumber + "";
  detailsPage.getPhoneNumberInput(invalidPhoneNumber);
});

When(
  /^user enters a phone_number that is already registered before "([^"]*)"$/,
  function (phoneNumber) {
    var invalidPhoneNumber = phoneNumber + "";
    detailsPage.getPhoneNumberInput(invalidPhoneNumber);
  }
);

Given("user is on the result page", function () {
  homePage.getResultPage(
    this.data.degree,
    this.data.experience,
    this.data.mobility,
    this.data.state
  );
});

Then("the average salary is displayed", () => {
  const avgSalaryElement = resultPage.getAverageSalary().should("be.visible");
  avgSalaryElement.then(($el) => {
    avgSalary = $el.text();
  });
});

When("user clicks on the filter button", () => {
  resultPage.getFilter().click({ force: true });
});

Then("the degree is displayed and matches with the selected one", function () {
  const actualText = resultPage.getDegreeText(String(this.data.degree));
  resultPage.getDegreeOnFilter().should("have.text", actualText);
});

And(
  "the experience is displayed and matches with the selected one",
  function () {
    resultPage
      .getExperienceOnFilter()
      .should("have.text", String(this.data.experience));
  }
);

And("the mobility is displayed and matches with the selected one", function () {
  const actualText = resultPage.getMobilityText(String(this.data.mobility));
  resultPage.getMobilityOnFilter().should("have.text", actualText);
});

And("the state is displayed and matches with the selected one", function () {
  resultPage.getCityOnFilter().should("have.text", String(this.data.state));
});

When("user changes the years of experience", function () {
  const newExperience = this.data.newExperience;
  resultPage.reSelectExperience(String(newExperience));
});

And("user changes the state", function () {
  const newState = this.data.newState;
  resultPage.reSelectState(String(newState));
});

And("clicks on the Kostenlos Dein Gehalt sehen button", function () {
  resultPage.getKostenlosDeinGehaltSehen().click();
});

Then("the average salary amount is changed", function () {
  const revisedSalaryElement = resultPage.getAverageSalary();
  revisedSalaryElement.then(($el) => {
    expect(avgSalary).not.to.equal($el.text());
  });
});

And("the new selected state is displayed", function () {
  const newState = "Bundesland " + this.data.newState + "*";
  resultPage.getDisplayedState().should("have.text", newState);
});

Then("the years of experience is updated on the filter section", function () {
  resultPage
    .getRenewedExperienceOnFilter()
    .should("have.text", String(this.data.newExperience));
});

And("the state is updated on the filter section", function () {
  resultPage
    .getRenewedCityOnFilter()
    .should("have.text", String(this.data.newState));
});
