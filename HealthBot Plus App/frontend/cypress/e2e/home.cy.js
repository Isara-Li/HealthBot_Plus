describe("Home Page Tests", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/"); // Adjust the path if necessary
  });

  it("should display the correct title", () => {
    cy.title().should("eq", "HealthBot+"); // Expected title
  });

  it("should display essential components on the home page", () => {
    // Verify header text
    cy.get("h1.text-6xl.font-bold", { timeout: 10000 })
      .should("be.visible")
      .then(($h1) => {
        const headerText = $h1.text(); // Get the actual header text for debugging
        console.log("Header Text:", headerText); // Log the actual header text
        expect(headerText).to.contain(
          "Are your moles getting under your skin?"
        ); // Update with expected header text
      });

    // Verify paragraph text
    cy.get("p")
      .should("be.visible")
      .then(($p) => {
        const paragraphText = $p.text(); // Get the actual paragraph text for debugging
        console.log("Paragraph Text:", paragraphText); // Log the actual paragraph text
        expect(paragraphText).to.include(
          "HealthBot+ CustomersSkin ChecksSkin Cancers Detected90%of skin cancerswant to chat?"
        ); // Ensure it includes the expected text
      });
  });

  it("should navigate to the login/signup page", () => {
    // Adjust the selector to find the div containing the login/signup text
    cy.get("div") // Select the div element
      .contains("Login / SignUp", { matchCase: false }) // Make case-insensitive match
      .should("be.visible") // Ensure the div is visible
      .click(); // Click the div

    // Verify the URL is correct after navigation
    cy.url().should("include", "/login_signup"); // Adjust the path if necessary
  });
});
