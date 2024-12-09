import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

const AudioRecorder = () => {
    const [record, setRecord] = useState(false);
    const [response, setResponse] = useState(null);

    const startRecording = () => {
        setRecord(true);
    };

    const stopRecording = () => {
        setRecord(false);
    };

    const onData = (recordedBlob) => {
        // can do something with chunk of audio data here
    };

    const onStop = async (recordedBlob) => {
        const formData = new FormData();
        formData.append('audio_file', recordedBlob.blob, 'audio.wav');

        try {
            const res = await axios.post('https://essential-carin-isara-373532ad.koyeb.app/chatbot', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="w-full max-w-s mx-auto rounded-lg overflow-hidden border border-gray-300"> {/* Tailwind classes to round corners */}
                <ReactMic
                    record={record}
                    className="sound-wave w-full rounded-lg" 
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#c9c6c5"
                />
            </div>
            <div className="flex space-x-4 mt-4">
                <button onClick={startRecording} type="button" className="bg-blue-500 text-white py-2 px-4 rounded">Start</button>
                <button onClick={stopRecording} type="button" className="bg-red-500 text-white py-2 px-4 rounded">Stop</button>
            </div>
            {response && (
                <div className="mt-4">
                    <p>Recognized Text: {response.text}</p>
                    <p>Diagnosis: {response.diagnosis}</p>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
