import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCPUXObP96WpMcxZ94X22vxAO_wNMkng90"; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    // ✅ Safely extract text response
    const reply = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, something went wrong while getting a response.";
  }
}

export default run;
