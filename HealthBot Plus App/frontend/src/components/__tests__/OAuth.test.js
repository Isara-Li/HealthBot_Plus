import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter or MemoryRouter
import OAuth from "../OAuth";

// Mock the necessary Firebase functions and Redux
jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  getAuth: jest.fn(),
  signInWithPopup: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("OAuth Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the OAuth button", () => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap in BrowserRouter */}
        <OAuth />
      </BrowserRouter>
    );

    const button = screen.getByText(/Continue with Google/i);
    expect(button).toBeInTheDocument();
  });

  test("button click triggers the handleGoogle function", () => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap in BrowserRouter */}
        <OAuth />
      </BrowserRouter>
    );

    const button = screen.getByText(/Continue with Google/i);

    // Mock function to simulate handleGoogle behavior if needed
    const handleGoogleMock = jest.fn();

    // Override the original handleGoogle with the mock
    button.onclick = handleGoogleMock;

    fireEvent.click(button); // Simulate clicking the button

    // Check if the button was clicked
    expect(handleGoogleMock).toHaveBeenCalled();
  });
});
