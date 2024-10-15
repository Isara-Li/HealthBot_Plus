import React from "react";
import { render, screen } from "@testing-library/react";
import ActionAreaCard from "../patient_card"; // Adjust the import path as necessary

describe("ActionAreaCard Component", () => {
  const title = "Patient Name";
  const imageSrc = "http://example.com/image.jpg";
  const description = ["Symptom 1", "Symptom 2", "Symptom 3"];

  test("renders the card with title, image, and description", () => {
    render(
      <ActionAreaCard
        title={title}
        imageSrc={imageSrc}
        description={description}
      />
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    // Check if the image is rendered
    const imageElement = screen.getByRole("img", { name: title });
    expect(imageElement).toHaveAttribute("src", imageSrc);

    // Check if the description is rendered
    description.forEach((item) => {
      const listItem = screen.getByText(item);
      expect(listItem).toBeInTheDocument();
    });
  });

  test("does not render any description items if none are provided", () => {
    render(
      <ActionAreaCard title={title} imageSrc={imageSrc} description={[]} />
    );

    // Ensure that no list items are present
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });
});
