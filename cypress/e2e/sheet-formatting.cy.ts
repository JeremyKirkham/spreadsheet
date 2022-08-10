describe("Spreadsheet formatting", { scrollBehavior: false }, () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("sets font size", () => {
    cy.get("#A-1>.calculatedValue").should("have.css", "font-size", "12px");
    cy.get("#A-1").click().type("Text");
    cy.get(".fontSize").click();
    cy.contains("8px").click();
    cy.get("#A-1>.calculatedValue").should("have.css", "font-size", "8px");
  });

  it("sets bold", () => {
    cy.get("#A-1>.calculatedValue").should("have.css", "font-weight", "400");
    cy.get("#A-1").click().type("Text");
    cy.get(".fontWeight").click();
    cy.get("#A-1>.calculatedValue").should("have.css", "font-weight", "700");
  });

  it("sets italic", () => {
    cy.get("#A-1>.calculatedValue").should("have.css", "font-style", "normal");
    cy.get("#A-1").click().type("Text");
    cy.get(".fontStyle").click();
    cy.get("#A-1>.calculatedValue").should("have.css", "font-style", "italic");
  });
});
