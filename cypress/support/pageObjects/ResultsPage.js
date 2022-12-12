class ResultsPage {
  getErgebnisHeader() {
    return cy.get("h1[class=suptitle]");
  }

  getDisplayedState() {
    return cy.contains("Bundesland");
  }

  getAverageSalary() {
    return cy.get(".avg-salary");
  }

  getFilter() {
    return cy.contains("Filter anpassen");
  }

  getDegreeOnFilter() {
    return cy.get("#mat-select-value-3");
  }

  getExperienceOnFilter() {
    return cy.get("#mat-select-value-5");
  }

  getRenewedExperienceOnFilter() {
    return cy.get("#mat-select-value-13");
  }

  getMobilityOnFilter() {
    return cy.get("#mat-select-value-7");
  }

  getCityOnFilter() {
    return cy.get("#mat-select-value-9");
  }

  getRenewedCityOnFilter() {
    return cy.get("#mat-select-value-17");
  }

  getKostenlosDeinGehaltSehen() {
    return cy.contains(" Kostenlos Dein Gehalt sehen ");
  }

  get_0_2_JahreButton() {
    return cy.get("#mat-option-20");
  }

  get2_5_JahreButton() {
    return cy.get("#mat-option-21");
  }

  get5_10_JahreButton() {
    return cy.get("#mat-option-22");
  }

  get_10_20_JahreButton() {
    return cy.get("#mat-option-23");
  }

  get_20_More_JahreButton() {
    return cy.get("#mat-option-24");
  }

  getExperienceCursor() {
    return cy.get("[class='mat-select-arrow-wrapper ng-tns-c113-11']");
  }

  getStateCursor() {
    return cy.get("[class='mat-select-arrow-wrapper ng-tns-c113-15']");
  }

  // Accepts an experience name as an argument and clicks on the corresponding experience option on the filter menu
  reSelectExperience(experience) {
    experience = experience + "";
    this.getExperienceCursor().click();
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

  // Accepts a state option as an argument and clicks on the corresponding state
  reSelectState(city) {
    this.getStateCursor().click();
    cy.get("mat-option[role='option']").filter(`:contains(${city})`).click();
  }

  // Converts the degree option that's selected in the first place to the format that is given in the filter menu
  getDegreeText(degreeName) {
    degreeName = degreeName + "";
    switch (degreeName) {
      case "Nein / Noch nicht anerkannt":
        return "Keine Ausbildung";

      case "Aktuell in der Ausbildung":
        return "In Ausbildung";

      case "Abgeschlossene Berufsausbildung":
        return "Berufsausbildung";

      case "Techniker / Meister":
        return "Techniker / Meister";
    }
  }

  // Converts the mobility option that's selected in the first place to the format that is given in the filter menu
  getMobilityText(travel) {
    travel = travel + "";
    switch (travel) {
      case "Keine Reisen":
        return "Keine Reisebereitschaft";

      case "Wenig":
        return "Ein paar Tage im Monat";

      case "Häufig":
        return "Montagebereitschaft (Montag-Freitag)";

      case "Uneingeschränkt":
        return "Uneingeschränkte Reisebereitschaft";
    }
  }
}
export default ResultsPage;
