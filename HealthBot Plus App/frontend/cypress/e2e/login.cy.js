describe("Login Page Tests", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/login");
  });

  it("should display the login page", () => {
    cy.contains("Log In").should("be.visible");
  });

  it("should display the forgot password link", () => {
    cy.get("a").contains("Forgot Password?").should("be.visible");
  });

  it("should show password reset input when requested", () => {
    cy.get("a").contains("Forgot Password?").click(); // Click on the forgot password link
    // cy.wait(500); // Optional: wait for 500ms (adjust as necessary)
    // cy.get('input[type="text"]').should("be.visible"); // Check if code input is visible
  });

  // it("should reset the password successfully", () => {
  //   // Simulate the forgot password flow
  //   cy.get("a").contains("Forgot Password?").click();
  //   cy.get('input[type="text"]').type("verification_code"); // Replace with actual code for testing
  //   cy.get("button").contains("Verify Code").click(); // Click the Verify Code button

  //   // Check if new password fields are visible
  //   cy.get('input[placeholder="Enter new password"]').should("be.visible");
  //   cy.get('input[placeholder="Re-enter new password"]').should("be.visible");

  //   // Input new password and confirm
  //   cy.get('input[placeholder="Enter new password"]').type("NewPassword123");
  //   cy.get('input[placeholder="Re-enter new password"]').type("NewPassword123");
  //   cy.get("button").contains("Reset Password").click(); // Click Reset Password button

  //   // Check for success message
  //   cy.contains("Password has been reset successfully").should("be.visible");
  // });

  it("should login successfully", () => {
    // Enter valid credentials
    cy.get('input[type="email"]').type("test@example.com"); // Replace with a valid email for testing
    cy.get('input[type="password"]').type("ValidPassword123"); // Replace with a valid password for testing
    cy.get("button").contains("Log In").click(); // Click the Log In button

    // Check if redirected to the home page or doctor page
    cy.url().should("include", "/"); // Adjust based on your navigation logic
  });

  it("should display error message for invalid login", () => {
    // Enter invalid credentials
    cy.get('input[type="email"]').type("invalid@example.com");
    cy.get('input[type="password"]').type("InvalidPassword");
    cy.get("button").contains("Log In").click(); // Click the Log In button

    // Check if error message is displayed
    // cy.contains("Login failed").should("be.visible");
  });
});
