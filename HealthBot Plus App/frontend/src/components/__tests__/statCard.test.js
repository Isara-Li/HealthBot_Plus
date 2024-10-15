import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "../statCard"; // Adjust the import path as necessary

describe("StatCard Component", () => {
  const title = "Total Patients";
  const value = "250";

  test("renders the StatCard with title and value", () => {
    render(<StatCard title={title} value={value} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    // Check if the value is rendered
    const valueElement = screen.getByText(value);
    expect(valueElement).toBeInTheDocument();
  });

  test("renders correct value and title text", () => {
    render(<StatCard title={title} value={value} />);

    // Check if title has correct text
    const titleElement = screen.getByText(title);
    expect(titleElement).toHaveTextContent("Total Patients");

    // Check if value has correct text
    const valueElement = screen.getByText(value);
    expect(valueElement).toHaveTextContent("250");
  });
});
