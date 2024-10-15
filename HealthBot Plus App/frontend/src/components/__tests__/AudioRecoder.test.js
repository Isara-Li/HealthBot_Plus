import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import AudioRecorder from "../AudioRecorder";

// Mock axios
jest.mock("axios");

// Mock ReactMic to bypass real AudioContext
jest.mock("react-mic", () => ({
  ReactMic: ({ onStop }) => {
    // Simulate the onStop callback when the Stop button is clicked
    return (
      <div data-testid="mocked-react-mic">
        <button
          onClick={() =>
            onStop({ blob: new Blob(["mock data"], { type: "audio/wav" }) })
          }
        >
          Mock Stop
        </button>
      </div>
    );
  },
}));

describe("AudioRecorder Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send the recorded blob to the server when recording stops", async () => {
    const mockResponse = {
      data: { text: "test text", diagnosis: "test diagnosis" },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<AudioRecorder />);

    // Click the "Start" and "Stop" buttons to simulate recording
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Mock Stop")); // Simulates stopping the recording

    // Wait for axios.post to be called with the correct arguments
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/chatbot",
        expect.any(FormData),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    });

    // Check if the recognized text and diagnosis are displayed correctly
    await waitFor(() => {
      expect(
        screen.getByText("Recognized Text: test text")
      ).toBeInTheDocument();
      expect(screen.getByText("Diagnosis: test diagnosis")).toBeInTheDocument();
    });
  });
});
