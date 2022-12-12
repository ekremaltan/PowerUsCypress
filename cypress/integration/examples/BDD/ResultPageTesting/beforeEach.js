beforeEach(function () {
  // runs once before each scenario
  cy.fixture("example").then(function (data) {
    this.data = data; // used to make your data parameter global
  });
  cy.viewport("iphone-x");
  cy.acceptCookies();
});
