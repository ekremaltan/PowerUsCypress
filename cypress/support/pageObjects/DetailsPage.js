var data = require("../../fixtures/example.json");

class DetailsPage {
  getAbgeschlosseneButton() {
    return cy.contains("Abgeschlossene Berufsausbildung");
  }

  getAktuellButton() {
    return cy.contains("Aktuell in der Ausbildung");
  }

  getNichtAnerkanntButton() {
    return cy.contains("Nein / Noch nicht anerkannt");
  }

  getTeknikerButton() {
    return cy.contains("Techniker / Meister");
  }

  getProgressBar() {
    return cy.get("app-progress-bar");
  }

  get2_5_JahreButton() {
    return cy.contains(" 2-5 Jahre ");
  }

  get5_10_JahreButton() {
    return cy.contains(" 5-10 Jahre ");
  }

  get_0_2_JahreButton() {
    return cy.contains(" 0-2 Jahre ");
  }

  get_10_20_JahreButton() {
    return cy.contains(" 10-20 Jahre ");
  }

  get_20_More_JahreButton() {
    return cy.contains(" 20+ Jahre ");
  }

  getKeineButton() {
    return cy.contains("Keine Reisen");
  }

  getWenigButton() {
    return cy.contains("Wenig");
  }

  getHäufigButton() {
    return cy.contains("Häufig");
  }

  getUneingeschränktButton() {
    return cy.contains("Uneingeschränkt");
  }

  getErforderlichWarning() {
    return cy.get(".error");
  }

  getKostenlosDeinGehaltButton() {
    return cy.contains(" Kostenlos Dein Gehalt sehen ");
  }

  getFirstNameInput() {
    return cy.get("#mat-input-2");
  }

  getLastNameInput() {
    return cy.get("#mat-input-3");
  }

  getEmailInput() {
    return cy.get("#mat-input-4");
  }

  getPasswordInput() {
    return cy.get("#mat-input-5");
  }

  getWeiterButton() {
    return cy.get(".registration-form > .mat-focus-indicator");
  }

  getPhoneNumberInput(phoneNumber) {
    return cy.get("#mat-input-1").clear().type(phoneNumber);
  }

  getKostenlosRegistrierenButton() {
    return cy
      .get(
        ".mat-focus-indicator.btn.cta-register.mat-flat-button.mat-button-base.mat-primary"
      )
      .wait(2000);
  }

  // Under "Was ist Dein höchster Abschluss?" question, checks whether each degree option is visible or not
  assertDegreeTypes() {
    cy.get("div[class='cards'] div[class='icon-wrapper']").each(
      ($el, index) => {
        while (index <= 4) {
          cy.wrap($el).should("not.be.disabled");
          index++;
        }
      }
    );
  }

  // Under "Wie hoch ist Deine Reisebereitschaft?" question, checks whether each mobility option is clickable and visible or not
  assertMobilityTypes() {
    cy.get("div[class='cards'] div[class='icon-wrapper']").each(
      ($el, index) => {
        while (index > 4 && index <= 8) {
          cy.wrap($el).should("be.visible");
          cy.wrap($el).should("not.be.disabled");
          index++;
        }
      }
    );
  }

  // Under "Wie viele Jahre Berufserfahrung hast Du?" question, checks whether each experience option is clickable and visible or not
  assertExperienceTypes() {
    cy.get(".chip.clickable.ng-star-inserted").each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("not.be.disabled");
    });
  }

  // Under "In welchem Bundesland wohnst Du?" question, checks whether each state option is clickable and visible or not
  assertAllStatesOptions() {
    cy.get("[class='mat-form-field-infix ng-tns-c34-2']").click();
    cy.get(".mat-option-text").each(($el) => {
      cy.wrap($el).should("not.be.disabled");
    });
  }

  // On the state selection, asserts that the header is visible
  assertStateHeader() {
    cy.contains("In welchem Bundesland wohnst Du?").should("be.visible");
  }

  // On the registration form, checks each error message is displayed or not
  assertEachErforderlichError() {
    cy.get(".error").each(($el) => {
      cy.wrap($el).should("be.visible");
      if ($el.text() === "  Erforderlich ") {
        console.log(true);
      }
    });
  }

  // On the phone number section, checks whether the system provides a warning message if you try to enter a phone number that's already registered before
  assertAlreadyRegisteredPhoneNumber() {
    cy.get(".error").should("be.visible");
    cy.get(".error").then(function (each) {
      var errorMessage = each.text();
      expect(errorMessage).to.equals(" Telefonnummer wird bereits verwendet. ");
    });
  }

  // Asserts that the user cannot change the country code
  assertCountryCodeDimmed() {
    cy.get(".mat-form-field-infix.ng-tns-c34-0").then(function (element) {
      const result = element.prop("isContentEditable");
      expect(result).to.equals(false);
    });
  }

  // Assert that the user gets a warning message when s/he enters invalid phone number
  assertInvalidPhoneNumber() {
    cy.get(".error").should("be.visible");
    cy.get(".error").then(function (each) {
      var errorMessage = each.text();
      expect(errorMessage).to.equal(" Ungültige Telefonnummer. ");
    });
  }

  // Returns the percentage of the link progress bar
  getLinkBarPercentage(percentage) {
    this.getProgressBar().invoke("attr", "style").should("contain", percentage);
  }

  // Accepts four different arguments and fills out the registration form accordingly
  fillOutRegistrationForm(firstName, lastName, email, password) {
    this.getFirstNameInput().clear().type(String(firstName));
    this.getLastNameInput().clear().type(String(lastName));
    this.getEmailInput().clear().type(String(email));
    this.getPasswordInput().clear().type(String(password));
    cy.wait(2000);
    this.getWeiterButton().click({ force: true });
  }

  // Accepts a degree level as an argument and clicks on the corresponding state
  selectDegree(degreeName) {
    switch (degreeName) {
      case "Nein / Noch nicht anerkannt":
        this.getNichtAnerkanntButton().click();
        break;
      case "Aktuell in der Ausbildung":
        this.getAktuellButton().click();
        break;
      case "Abgeschlossene Berufsausbildung":
        this.getAbgeschlosseneButton().click();
        break;
      case "Techniker / Meister":
        this.getTeknikerButton().click();
        break;
    }
  }

  // Accepts an experience level as an argument and clicks on the corresponding experience
  selectExperience(experience) {
    switch (experience) {
      case "0-2 Jahre":
        this.get_0_2_JahreButton().click();
        break;
      case "2-5 Jahre":
        this.get2_5_JahreButton().click();
        break;
      case "5-10 Jahre":
        this.get5_10_JahreButton().click();
        break;
      case "10-20 Jahre":
        this.get_10_20_JahreButton().click();
        break;
      case "20+ Jahre":
        this.get_20_More_JahreButton().click();
        break;
    }
  }

  // Accepts an experience level as an argument and clicks on the corresponding experience
  selectMobility(travel) {
    switch (travel) {
      case "Keine Reisen":
        this.getKeineButton().click();
        break;
      case "Wenig":
        this.getWenigButton().click();
        break;
      case "Häufig":
        this.getHäufigButton.click();
        break;
      case "Uneingeschränkt":
        this.getUneingeschränktButton.click();
        break;
    }
  }

  // Accepts a state option as an argument and clicks on the corresponding state
  selectState(city) {
    cy.get("div[class='mat-form-field-infix ng-tns-c34-2']").click();
    cy.get("mat-option[role='option']").filter(`:contains(${city})`).click();
  }
}
export default DetailsPage;
