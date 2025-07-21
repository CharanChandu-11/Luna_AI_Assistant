import React, { createContext, useState } from 'react';
import run from './gemini';
export const dataContext = createContext(null);

function UserContext({ children }) {
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("Listening...");
    let [response, setResponse] = useState(false);

    function speak(text) {
        window.speechSynthesis.cancel();
        
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "en-GB";
        
        text_speak.onstart = () => {
            setResponse(true);
        };
        
        text_speak.onend = () => {
            setSpeaking(false);
            setResponse(false);
        };
        
        text_speak.onerror = () => {
            setSpeaking(false);
            setResponse(false);
        };
        
        window.speechSynthesis.speak(text_speak);
    }

    // Function to attempt opening desktop applications
    function openDesktopApp(appName, protocolUrl) {
        try {
            // Try to open using custom protocol
            window.location.href = protocolUrl;
            return true;
        } catch (error) {
            console.log(`Could not open ${appName} via protocol`);
            return false;
        }
    }

    async function aiResponse(prompt) {
        try {
            let text = await run(prompt);
            let newText = text.split("**").join("").split("*").join("").replace(/google/gi, "Charan");
            setPrompt(newText);
            speak(newText);
        } catch (error) {
            console.error("AI Response Error:", error);
            setPrompt("Sorry, I encountered an error. Please try again.");
            speak("Sorry, I encountered an error. Please try again.");
        }
    }

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript;
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (e) => {
        console.error("Speech recognition error:", e.error);
        setSpeaking(false);
        setResponse(false);
        setPrompt("Speech recognition error. Please try again.");
    };

    recognition.onend = () => {
        if (speaking && !response) {
            recognition.start();
        }
    };

    function takeCommand(command) {
        // Website commands (existing)
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening Youtube");
            setPrompt("Opening Youtube");
        }
        else if (command.includes("open") && command.includes("whatsapp")) {
            window.open("https://web.whatsapp.com", "_blank");
            speak("Opening Whatsapp");
            setPrompt("Opening Whatsapp");
        }
        else if (command.includes("open") && command.includes("instagram") && command.includes("reels")) {
            window.open("https://www.instagram.com/reels", "_blank");
            speak("Opening Instagram reels");
            setPrompt("Opening Instagram reels");
        }
        else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com", "_blank");
            speak("Opening Instagram");
            setPrompt("Opening Instagram");
        }
        else if (command.includes("open") && command.includes("google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google");
            setPrompt("Opening Google");
        }
        else if (command.includes("open") && command.includes("linkedin")) {
            window.open("https://linkedin.com", "_blank");
            speak("Opening Linkedin");
            setPrompt("Opening Linkedin");
        }
        else if (command.includes("open") && command.includes("github")) {
            window.open("https://github.com", "_blank");
            speak("Opening Github");
            setPrompt("Opening Github");
        }
        else if (command.includes("open") && command.includes("netflix")) {
            window.open("https://netflix.com", "_blank");
            speak("Opening Netflix");
            setPrompt("Opening Netflix");
        }
                else if (command.includes("open") && command.includes("pornhub")) {
            window.open("https://pornhub.com", "_blank");
            speak("Opening Pornhub");
            setPrompt("Opening Pornhub");
        }
        
        // Desktop Application Commands
        else if (command.includes("open") && command.includes("notepad")) {
            if (openDesktopApp("Notepad", "ms-settings:")) {
                speak("Opening Notepad");
                setPrompt("Opening Notepad");
            } else {
                speak("I cannot open Notepad from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("calculator")) {
            if (openDesktopApp("Calculator", "calculator:")) {
                speak("Opening Calculator");
                setPrompt("Opening Calculator");
            } else {
                speak("I cannot open Calculator from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("paint")) {
            if (openDesktopApp("Paint", "ms-paint:")) {
                speak("Opening Paint");
                setPrompt("Opening Paint");
            } else {
                speak("I cannot open Paint from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("file") && command.includes("explorer")) {
            if (openDesktopApp("File Explorer", "ms-availablenetworks:")) {
                speak("Opening File Explorer");
                setPrompt("Opening File Explorer");
            } else {
                speak("I cannot open File Explorer from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("word")) {
            if (openDesktopApp("Microsoft Word", "ms-word:")) {
                speak("Opening Microsoft Word");
                setPrompt("Opening Microsoft Word");
            } else {
                speak("I cannot open Microsoft Word from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("excel")) {
            if (openDesktopApp("Microsoft Excel", "ms-excel:")) {
                speak("Opening Microsoft Excel");
                setPrompt("Opening Microsoft Excel");
            } else {
                speak("I cannot open Microsoft Excel from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("powerpoint")) {
            if (openDesktopApp("Microsoft PowerPoint", "ms-powerpoint:")) {
                speak("Opening Microsoft PowerPoint");
                setPrompt("Opening Microsoft PowerPoint");
            } else {
                speak("I cannot open Microsoft PowerPoint from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("cmd") || command.includes("command") && command.includes("prompt")) {
            speak("I cannot open Command Prompt from the browser due to security restrictions. Please use the desktop version of this app.");
            setPrompt("Cannot open Command Prompt from browser");
        }
        else if (command.includes("open") && command.includes("valorant")) {
            if (openDesktopApp("Valorant", "Valorant:")) {
                speak("Opening Valorant");
                setPrompt("Opening Valorant");
            } else {
                speak("I cannot open Valorant from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("settings")) {
            if (openDesktopApp("Settings", "ms-settings:")) {
                speak("Opening Settings");
                setPrompt("Opening Settings");
            } else {
                speak("I cannot open Settings from the browser. Please try using the desktop version of this app.");
                setPrompt("Cannot open desktop apps from browser");
            }
        }
        else if (command.includes("open") && command.includes("spotify")) {
            if (openDesktopApp("Spotify", "spotify:")) {
                speak("Opening Spotify");
                setPrompt("Opening Spotify");
            } else {
                // Fallback to web version
                window.open("https://open.spotify.com", "_blank");
                speak("Opening Spotify Web Player");
                setPrompt("Opening Spotify Web Player");
            }
        }
        else if (command.includes("open") && command.includes("discord")) {
            if (openDesktopApp("Discord", "discord:")) {
                speak("Opening Discord");
                setPrompt("Opening Discord");
            } else {
                window.open("https://discord.com/app", "_blank");
                speak("Opening Discord Web");
                setPrompt("Opening Discord Web");
            }
        }
        else if (command.includes("open") && command.includes("steam")) {
            if (openDesktopApp("Steam", "steam:")) {
                speak("Opening Steam");
                setPrompt("Opening Steam");
            } else {
                window.open("https://store.steampowered.com", "_blank");
                speak("Opening Steam Store");
                setPrompt("Opening Steam Store");
            }
        }
        else if (command.includes("open") && command.includes("vscode") || command.includes("visual") || command.includes("studio") || command.includes("code")) {
            if (openDesktopApp("Visual Studio Code", "vscode:")) {
                speak("Opening Visual Studio Code");
                setPrompt("Opening Visual Studio Code");
            } else {
                window.open("https://vscode.dev", "_blank");
                speak("Opening VS Code Web");
                setPrompt("Opening VS Code Web");
            }
        }
        else if (command.includes("open") && command.includes("zoom")) {
            if (openDesktopApp("Zoom", "zoommtg:")) {
                speak("Opening Zoom");
                setPrompt("Opening Zoom");
            } else {
                window.open("https://zoom.us/join", "_blank");
                speak("Opening Zoom Web");
                setPrompt("Opening Zoom Web");
            }
        }
        
        // Time and Date commands
        else if (command.includes("what") && command.includes("time")) {
            let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
            speak(`The time is ${time}`);
            setPrompt(`The time is ${time}`);
        }
        else if (command.includes("what") && command.includes("date")) {
            let date = new Date().toLocaleDateString();
            speak(`Today's date is ${date}`);
            setPrompt(`Today's date is ${date}`);
        }
        
        // Default AI response
        else {
            aiResponse(command);
        }
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
    
    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext;