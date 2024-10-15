describe("Login/Signup Page Tests", () => {
  beforeEach(() => {
    // Visit the Login/Signup page before each test
    cy.visit("/login_signup"); // Adjust the path as necessary
  });

  it("should display the correct title", () => {
    cy.title().should("eq", "HealthBot+"); // Ensure this matches your expected title
  });

  it("should render the empowering message", () => {
    cy.get("div")
      .contains("Empowering skin health") // Check for the empowering message
      .should("be.visible");
  });

  it("should render the AI message", () => {
    cy.get("span.font-extrabold").contains("with AI.").should("be.visible");
  });

  it("should display 'Get started' heading", () => {
    cy.get("div.flex.font-bold").contains("Get started").should("be.visible");
  });

  it("should navigate to the login page when 'Log In' button is clicked", () => {
    cy.get("button").contains("Log In").should("be.visible").click(); // Click the Log In button

    // Verify the URL is correct after navigation
    cy.url().should("include", "/login"); // Adjust the path if necessary
  });

  it("should navigate to the signup page when 'Sign Up' button is clicked", () => {
    cy.get("button").contains("Sign Up").should("be.visible").click(); // Click the Sign Up button

    // Verify the URL is correct after navigation
    cy.url().should("include", "/signup"); // Adjust the path if necessary
  });
});
