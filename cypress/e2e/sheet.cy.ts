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
    cy.get("#A-1").click();
    cy.get(".selectedCells").contains("A1");
    cy.get(".selectedCells").contains("A1");
    cy.get("#header-A").should("have.class", "selected");
    cy.get("#row-1").should("have.class", "selected");
  });

  it("navigates with keyboard", () => {
    cy.get("#A-1").click();
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
    cy.get("#A-1").click().type("1");
    cy.get("#B-1").click().type("= A1 + 2");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "3");
    cy.get("#C-1").click().type("= B1 - 1");
    cy.get("#B-2").click();
    cy.get("#C-1>input").should("have.value", "2");
    cy.get("#A-1").click().clear().type("2");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "4");
    cy.get("#C-1>input").should("have.value", "3");
  });

  it("calculates values with multiple dependencies", () => {
    cy.get("#A-1").click().type("1");
    cy.get("#A-2").click().type("2");
    cy.get("#B-1").click().type("= A1 + A2 + 2");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "5");
    cy.get("#A-1").click().clear().type("2");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "6");
    cy.get("#A-2").click().clear().type("3");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "7");
  });

  it("calculates values with range values", () => {
    cy.get("#A-1").click().type("1");
    cy.get("#A-2").click().type("2");
    cy.get("#B-1").click().type("= SUM(A1:A2)");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "3");
    cy.get("#A-1").click().clear().type("2");
    cy.get("#B-2").click();
    cy.get("#B-1>input").should("have.value", "4");
  });

  it("typing in cell updates sheet menu input", () => {
    cy.get("#A-1").click().type("This");
    cy.get(".cellInput>input").should("have.value", "This");
  });

  it("typing in sheet menu input updates cell", () => {
    cy.get("#A-1").click();
    cy.get(".cellInput>input").type("That");
    cy.get("#A-1>input").should("have.value", "That");
  });

  it("selects ranges of cells", () => {
    cy.get("#A-1").trigger("mousedown");
    cy.get("#B-2").trigger("mouseover");
    cy.get("#B-2").trigger("mouseup");
    cy.get(".selectedCells").contains("A1:B2");
    cy.get("#A-1").should("have.class", "highlighted");
    cy.get("#A-2").should("have.class", "highlighted");
    cy.get("#B-1").should("have.class", "highlighted");
    cy.get("#B-2").should("have.class", "highlighted");
  });

  it("selects ranges of cells 2", () => {
    cy.get("#A-1").trigger("mousedown");
    cy.get("#A-2").trigger("mouseover");
    cy.get("#A-3").trigger("mouseover");
    cy.get("#A-1").should("have.class", "highlighted");
    cy.get("#A-2").should("have.class", "highlighted");
    cy.get("#A-3").should("have.class", "highlighted");
    cy.get(".selectedCells").contains("A1:A3");
    cy.get("#A-2").trigger("mouseover");
    cy.get("#A-2").trigger("mouseup");
    cy.get("#A-1").should("have.class", "highlighted");
    cy.get("#A-2").should("have.class", "highlighted");
    cy.get("#A-3").should("not.have.class", "highlighted");
    cy.get(".selectedCells").contains("A1:A2");
  });

  it("selects ranges of cells in reverse", () => {
    cy.get("#B-2").trigger("mousedown");
    cy.get("#A-1").trigger("mouseover");
    cy.get("#A-1").trigger("mouseup");
    cy.get("#A-1").should("have.class", "highlighted");
    cy.get("#A-2").should("have.class", "highlighted");
    cy.get("#B-1").should("have.class", "highlighted");
    cy.get("#B-2").should("have.class", "highlighted");
  });

  it("selects ranges of cells in reverse 2", () => {
    cy.get("#A-2").trigger("mousedown");
    cy.get("#B-1").trigger("mouseover");
    cy.get("#B-1").trigger("mouseup");
    cy.get("#A-1").should("have.class", "highlighted");
    cy.get("#A-2").should("have.class", "highlighted");
    cy.get("#B-1").should("have.class", "highlighted");
    cy.get("#B-2").should("have.class", "highlighted");
  });

  it("resizes columns", () => {
    cy.get("#header-B").should("have.css", "width", "110px");
    cy.get("#header-B>.rightBorder").trigger("mousedown");
    cy.wait(10);
    cy.get("#header-B>.rightBorder").trigger("mousemove", 30, 0, {
      force: true,
    });
    cy.get(".resizeLine").should("be.visible");
    cy.wait(10);
    cy.get("#header-B>.rightBorder").trigger("mouseup", {
      force: true,
    });
    cy.get("#header-B").should("have.css", "width", "135px");
  });

  it("resizes rows", () => {
    cy.get("#row-1").should("have.css", "height", "24px");
    cy.get("#row-1>.bottomBorder").trigger("mousedown");
    cy.wait(10);
    cy.get("#row-1>.bottomBorder").trigger("mousemove", 0, 30, {
      force: true,
    });
    cy.get(".resizeLine").should("be.visible");
    cy.wait(10);
    cy.get("#row-1>.bottomBorder").trigger("mouseup", {
      force: true,
    });
    cy.get("#row-1").should("have.css", "height", "49px");
  });
});
