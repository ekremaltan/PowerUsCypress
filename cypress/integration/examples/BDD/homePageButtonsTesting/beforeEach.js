beforeEach(function () {
  // runs once before each scenario
  cy.fixture("example").then(function (data) {
    // you need to add promise to the fixture method
    this.data = data; // used to make your data parameter global
  });
  cy.viewport("iphone-x");
  cy.acceptCookies();
});
