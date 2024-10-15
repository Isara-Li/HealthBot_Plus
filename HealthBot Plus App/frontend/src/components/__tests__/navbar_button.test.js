import { render, screen, fireEvent } from "@testing-library/react";
import NavbarButton from "../navbar_button";

const mockLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

describe("NavbarButton", () => {
  test("renders dropdown links correctly", () => {
    render(<NavbarButton label="Menu" links={mockLinks} />);

    // Dropdown element should exist but be hidden initially
    const dropdown = screen.getByText(mockLinks[0].label).parentElement;
    expect(dropdown).toHaveClass("hidden");

    // Simulate hover by manually removing the hidden class
    fireEvent.mouseOver(screen.getByText("Menu"));
    dropdown.classList.remove("hidden");

    // Now check that the dropdown is visible
    expect(dropdown).not.toHaveClass("hidden");

    // Ensure all links are rendered in the document
    mockLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});
