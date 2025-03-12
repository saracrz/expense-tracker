describe("Dashboard page", () => {
  it("should display the add expense option when clicking in + button", () => {
    cy.visit("http://localhost:5173/"); // Cypress automatically uses baseUrl from config
    cy.get("button").contains("+").click();
    cy.compareSnapshot("add-expense");
  });
});
