import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDpo18AtzG8mLnqb-Jqzeeu3TdSUkJlgPU"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Updated to match available model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 100,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    console.log("Sending prompt:", prompt);
    
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    
    console.log("Full result:", result);

    // ✅ Safely extract text response
    const reply = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Extracted reply:", reply);

    return reply || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    console.error("Error details:", error.message);
    
    // Check for specific errors
    if (error.message?.includes("not found") || error.message?.includes("model")) {
      return "Model not available. Please check the model name.";
    }
    
    if (error.message?.includes("API key")) {
      return "Invalid API key. Please check your configuration.";
    }
    
    return "Sorry, something went wrong while getting a response.";
  }
}

export default run;