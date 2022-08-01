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
    cy.get("#1-1").click();
    cy.get(".selectedCells").contains("A1");
    cy.get(".selectedCells").contains("A1");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
  });

  it("navigates with arrows", { scrollBehavior: false }, () => {
    cy.get("#1-1").click();
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get("body").type("{downArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-2").should("have.class", "selected");
    cy.get("body").type("{rightArrow}");
    cy.get("#header-B").should("have.class", "selected");
    cy.get("#row-2").should("have.class", "selected");
    cy.get("body").type("{upArrow}");
    cy.get("#header-B").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get("body").type("{leftArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
  });

  it.only("calculates values", { scrollBehavior: false }, () => {
    cy.get("#1-1").click().type("1");
    cy.get("#2-1").click().type("= A1 + 2");
    cy.get("#2-2").click();
    cy.get("#2-1>input").should("have.value", "3");
    cy.get("#3-1").click().type("= B1 - 1");
    cy.get("#2-2").click();
    cy.get("#3-1>input").should("have.value", "2");
    cy.get("#1-1").click().clear().type("2");
    cy.get("#2-2").click();
    cy.get("#2-1>input").should("have.value", "4");
    cy.get("#3-1>input").should("have.value", "3");
  });
});
