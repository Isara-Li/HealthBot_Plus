import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store"; // Mock Redux store
import Navbar from "../navbar.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Mock Redux store
const mockStore = configureStore([]);

// Mock the user state
const initialState = {
  user: {
    currentUser: {
      _id: "12345",
      name: "John Doe",
      profile: "https://via.placeholder.com/150",
      is_patient: true,
    },
  },
};

// Create a helper function to render the component with Redux and Router
const renderWithProviders = (ui, { store } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

// Mock useNavigate before running the tests
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Keep actual implementations
  useNavigate: jest.fn(),
}));

describe("Navbar Component", () => {
  let store;
  const mockNavigate = jest.fn(); // Create a mock function

  beforeEach(() => {
    store = mockStore(initialState);
    useNavigate.mockImplementation(() => mockNavigate); // Mock useNavigate
  });

  test("renders the logo and navigates to home when clicked", () => {
    renderWithProviders(<Navbar />, { store });

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    fireEvent.click(logo);

    // Assert that navigate is called when logo is clicked
    expect(mockNavigate).toHaveBeenCalledWith("/"); // Change '/' to your home route
  });

  test("renders the login/signup button when no user is logged in", () => {
    const noUserStore = mockStore({ user: { currentUser: null } });
    renderWithProviders(<Navbar />, { store: noUserStore });

    const loginSignupButton = screen.getByText("Login / SignUp");
    expect(loginSignupButton).toBeInTheDocument();
    fireEvent.click(loginSignupButton);

    // Assert that navigate is called for the login/signup route
    expect(mockNavigate).toHaveBeenCalledWith("/login_signup"); // Update to '/login_signup'
  });

  test("renders user profile when user is logged in", () => {
    renderWithProviders(<Navbar />, { store });

    const profileImg = screen.getByAltText("Profile Pic");
    expect(profileImg).toBeInTheDocument();
    const profileName = screen.getByText("John Doe");
    expect(profileName).toBeInTheDocument();
  });

  test("renders dropdown buttons for navbar sections", () => {
    renderWithProviders(<Navbar />, { store });

    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    expect(screen.getByText("Skin Health")).toBeInTheDocument();
    expect(screen.getByText("Stories")).toBeInTheDocument();
  });
});
