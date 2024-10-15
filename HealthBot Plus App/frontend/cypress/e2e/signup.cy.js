describe("Signup Component Tests", () => {
  beforeEach(() => {
    cy.visit("/signup"); // Change this path to match your routing
  });

  it("renders the Signup component", () => {
    cy.get("h2").contains("Enter Your Details");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="birthday"]').should("be.visible");
    cy.get('select[name="sex"]').should("be.visible");
    cy.get('textarea[name="description"]').should("be.visible");
  });

  it("validates required fields in Step 1", () => {
    // Click Next without filling the fields
    cy.get("button").contains("Next").click();

    // Check for validation messages
    cy.get(".text-red-500").should("have.length", 4);
    cy.get(".text-red-500").first().contains("Name is required");
    cy.get(".text-red-500").eq(1).contains("Birthday is required");
    cy.get(".text-red-500").eq(2).contains("Please select your gender");
    cy.get(".text-red-500").eq(3).contains("Description is required");
  });

  it("validates fields in Step 1 and navigates to Step 2", () => {
    // Fill in the required fields
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="birthday"]').type("1990-01-01");
    cy.get('select[name="sex"]').select("male");
    cy.get('textarea[name="description"]').type("A short description.");

    // Click Next to go to Step 2
    cy.get("button").contains("Next").click();

    // Check if Step 2 is rendered
    cy.get("h2").contains("Create Account");
  });

  //   it("validates required fields in Step 2", () => {
  //     // Click Sign Up without filling the fields
  //     cy.get("button").filter(':contains("Sign Up")').click();

  //     // Check for validation messages
  //     cy.get(".text-red-500").should("have.length", 3); // Adjust count based on the number of required fields
  //     cy.get(".text-red-500").first().contains("Email is required");
  //     cy.get(".text-red-500").eq(1).contains("Password is required");
  //     cy.get(".text-red-500").eq(2).contains("Please select a doctor");
  //   });

  it("submits the form successfully", () => {
    // Fill in Step 1
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="birthday"]').type("1990-01-01");
    cy.get('select[name="sex"]').select("male");
    cy.get('textarea[name="description"]').type("A short description.");
    cy.get("button").contains("Next").click();

    // Fill in Step 2
    cy.get('input[name="email"]').type("johndoe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('select[name="doctor"]').select("Dr. Athula");

    // Mock the POST request to prevent actual submission
    cy.intercept("POST", "http://localhost:5000/signup", {
      statusCode: 200,
      body: {
        status: "Ok",
        user: { id: 1, name: "John Doe" },
      },
    }).as("signupRequest");

    // Click Sign Up
    cy.get("button").contains("Sign Up").click();

    // Wait for the request and check for successful navigation
    cy.wait("@signupRequest");
    cy.url().should("eq", "http://localhost:3000/"); // Change this to your expected landing page
  });
});
