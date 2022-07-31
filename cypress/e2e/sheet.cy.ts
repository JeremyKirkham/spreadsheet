describe("Spreadsheet", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("starts empty", () => {
    cy.get(".selectedCells").should("have.value", "");
    cy.get("#header-A").should("not.have.class", "selected");
    cy.get("#row-1").should("not.have.class", "selected");
  });

  it("selects cell", () => {
    cy.get("#11").click();
    cy.get(".selectedCells").contains("A1");
    cy.get(".selectedCells").contains("A1");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
  });
});
