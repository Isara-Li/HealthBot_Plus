// src/jest.setup.js
const mockAudioContext = {
  createGain: jest.fn().mockReturnValue({ gain: { value: 0 } }),
  // Add any other methods you might need to mock
};

// Mock global AudioContext
global.AudioContext = jest.fn().mockImplementation(() => mockAudioContext);
global.webkitAudioContext = jest
  .fn()
  .mockImplementation(() => mockAudioContext);
