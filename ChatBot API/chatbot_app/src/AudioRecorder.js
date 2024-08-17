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
            const res = await axios.post('http://localhost:5000/diagnose', formData, {
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
            <ReactMic
                record={record}
                className="sound-wave"
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#FF4081"
            />
            <button onClick={startRecording} type="button">Start</button>
            <button onClick={stopRecording} type="button">Stop</button>
            {response && (
                <div>
                    <p>Recognized Text: {response.text}</p>
                    <p>Diagnosis: {response.diagnosis}</p>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
