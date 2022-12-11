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
}
export default HomePagePowerUs; // makes your Homepage class accessible to all other pages
