describe("Spreadsheet", { scrollBehavior: false }, () => {
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

  it("navigates with keyboard", () => {
    cy.get("#1-1").click();
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("A1");
    // Down
    cy.get("body").type("{downArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-2").should("have.class", "selected");
    cy.get(".selectedCells").contains("A2");
    // Right
    cy.get("body").type("{rightArrow}");
    cy.get("#header-B").should("have.class", "selected");
    cy.get("#row-2").should("have.class", "selected");
    cy.get(".selectedCells").contains("B2");
    // Up
    cy.get("body").type("{upArrow}");
    cy.get("#header-B").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("B1");
    // Left
    cy.get("body").type("{leftArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("A1");
    // Enter key
    cy.get("body").type("{enter}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-2").should("have.class", "selected");
    cy.get(".selectedCells").contains("A2");
    // Shift Enter key
    cy.get("body").type("{shift}{enter}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("A1");
    // Test you can't navigate outside of the sheet parameters.
    cy.get("body").type("{leftArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("A1");
    cy.get("body").type("{upArrow}");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
    cy.get(".selectedCells").contains("A1");
  });

  it("calculates values", () => {
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

  it("calculates values with multiple dependencies", () => {
    cy.get("#1-1").click().type("1");
    cy.get("#1-2").click().type("2");
    cy.get("#2-1").click().type("= A1 + A2 + 2");
    cy.get("#2-2").click();
    cy.get("#2-1>input").should("have.value", "5");
    cy.get("#1-1").click().clear().type("2");
    cy.get("#2-2").click();
    cy.get("#2-1>input").should("have.value", "6");
    cy.get("#1-2").click().clear().type("3");
    cy.get("#2-2").click();
    cy.get("#2-1>input").should("have.value", "7");
  });

  it("typing in cell updates sheet menu input", () => {
    cy.get("#1-1").click().type("This");
    cy.get(".cellInput>input").should("have.value", "This");
  });

  it("typing in sheet menu input updates cell", () => {
    cy.get("#1-1").click();
    cy.get(".cellInput>input").type("That");
    cy.get("#1-1>input").should("have.value", "That");
  });

  it("selects ranges of cells", () => {
    cy.get("#1-1").trigger("mousedown");
    cy.get("#2-2").trigger("mouseover");
    cy.get("#2-2").trigger("mouseup");
    cy.get(".selectedCells").contains("A1:B2");
    cy.get("#1-1").should("have.class", "highlighted");
    cy.get("#1-2").should("have.class", "highlighted");
    cy.get("#2-1").should("have.class", "highlighted");
    cy.get("#2-2").should("have.class", "highlighted");
  });

  it("selects ranges of cells 2", () => {
    cy.get("#1-1").trigger("mousedown");
    cy.get("#1-2").trigger("mouseover");
    cy.get("#1-3").trigger("mouseover");
    cy.get("#1-1").should("have.class", "highlighted");
    cy.get("#1-2").should("have.class", "highlighted");
    cy.get("#1-3").should("have.class", "highlighted");
    cy.get(".selectedCells").contains("A1:A3");
    cy.get("#1-2").trigger("mouseover");
    cy.get("#1-2").trigger("mouseup");
    cy.get("#1-1").should("have.class", "highlighted");
    cy.get("#1-2").should("have.class", "highlighted");
    cy.get("#1-3").should("not.have.class", "highlighted");
    cy.get(".selectedCells").contains("A1:A2");
  });

  it("selects ranges of cells in reverse", () => {
    cy.get("#2-2").trigger("mousedown");
    cy.get("#1-1").trigger("mouseover");
    cy.get("#1-1").trigger("mouseup");
    cy.get("#1-1").should("have.class", "highlighted");
    cy.get("#1-2").should("have.class", "highlighted");
    cy.get("#2-1").should("have.class", "highlighted");
    cy.get("#2-2").should("have.class", "highlighted");
  });

  it("selects ranges of cells in reverse 2", () => {
    cy.get("#1-2").trigger("mousedown");
    cy.get("#2-1").trigger("mouseover");
    cy.get("#2-1").trigger("mouseup");
    cy.get("#1-1").should("have.class", "highlighted");
    cy.get("#1-2").should("have.class", "highlighted");
    cy.get("#2-1").should("have.class", "highlighted");
    cy.get("#2-2").should("have.class", "highlighted");
  });
});
