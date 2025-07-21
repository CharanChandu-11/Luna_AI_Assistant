import { useContext } from 'react';
import { CiMicrophoneOn } from 'react-icons/ci';
import { MdStop } from 'react-icons/md'; // Add stop icon
import { dataContext } from './UserContext';
import Orb from './Orb';
import LunaImg from './assets/Luna.png';
import LunaThinking from './assets/Luna_think.png';
import Lightning from './Lightning';
import TrueFocus from './TrueFocus';

function App() {
  const {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useContext(dataContext);

  // Function to stop speech and reset state
  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stop current speech
    setSpeaking(false);
    setResponse(false);
    setPrompt("Listening...");
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black z-0" />

      {/* Orb Animation */}
      <div className="absolute inset-0 z-10">
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      </div>

      {/* Lightning */}
      {/* <div className="absolute inset-0 z-10">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div> */}

      {/* Luna Image: Dynamically switch based on speaking state */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          src={speaking ? LunaThinking : LunaImg}
          alt="Luna"
          className="w-[300px] md:w-[400px] lg:w-[500px] opacity-100 object-contain"
        />
      </div>

      {/* Foreground Text & Button */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 mt-24">
          I'm{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text">
            Luna
          </span>
          , Your Personalized Virtual Assistant
        </h1>

        <p className="text-lg md:text-xl text-gray-300 text-center mb-8 max-w-xl">
          Speak to me and I'll help you with anything you need
        </p>

        {!speaking ? (
          <button
            onClick={() => {
              setPrompt('Listening...');
              setSpeaking(true);
              setResponse(false);
              recognition.start();
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
          >
            Click here <CiMicrophoneOn className="text-2xl" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Response/Listening Display */}
            <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <p className="text-lg">{prompt}</p>
            </div>
            
            {/* Stop Button - Only show when there's an active response */}
            {response && (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
              >
                Stop <MdStop className="text-2xl" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;