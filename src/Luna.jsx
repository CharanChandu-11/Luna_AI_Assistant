import React, { useContext } from 'react';
import { dataContext } from './UserContext';

const Luna = () => {
  const {
    recognition,
    listening,
    setListening,
    speaking,
    prompt,
    response,
    isRecognitionRunning,
    setIsRecognitionRunning,
  } = useContext(dataContext);
  
  const handleMic = () => {
    if (isRecognitionRunning) {
      console.warn("Recognition already in progress.");
      return;
    }

    try {
      recognition.start();
      setListening(true);
      setIsRecognitionRunning(true);
    } catch (err) {
      console.error("Failed to start speech recognition", err);
    }
  };

  return (
<div className="max-w-xl mx-auto mt-10 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-blue-50 border border-blue-200 backdrop-blur-lg">
  <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-800 drop-shadow-sm">✨ Talk to Luna</h1>

  <div className="flex justify-center mb-6">
    <button
      className={`px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 ${
        listening
          ? 'bg-red-500 animate-pulse text-white cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
      onClick={handleMic}
      disabled={speaking}
    >
      {listening ? '🎧 Listening...' : '🎤 Talk to Luna'}
    </button>
  </div>

  {prompt && (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-600">You said:</p>
      <p className="italic bg-gray-100 p-3 rounded-xl text-gray-800">{prompt}</p>
    </div>
  )}

  {response && (
    <div className="mb-4">
      <p className="text-sm font-medium text-green-700">Luna says:</p>
      <p className="p-3 bg-green-50 border border-green-300 rounded-xl text-green-900 shadow-sm">
        {response}
      </p>
    </div>
  )}

  {speaking && !response && (
    <p className="text-sm text-center text-purple-500 animate-pulse mt-4">
      Luna is thinking...
    </p>
  )}
</div>
  );
};

export default Luna;
