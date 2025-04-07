import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Initialize the Google Generative AI client
const API_KEY = "Api key goes here"
const MODEL_NAME = "gemini-1.5-flash" // Using the latest model

// Initialize the API client
const genAI = new GoogleGenerativeAI(API_KEY)

// Safety settings to prevent harmful content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

// Generation configuration
const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
}

/**
 * Generate a response using the Gemini API
 * @param prompt The prompt to send to the API
 * @returns The generated text
 */
export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      safetySettings,
      generationConfig,
    })

    // Generate content
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error generating Gemini response:", error)
    throw error
  }
}

/**
 * Create a chat session with the Gemini API
 * @returns A chat session object
 */
export function createGeminiChat() {
  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      safetySettings,
      generationConfig,
    })

    return model.startChat({
      history: [],
      generationConfig,
    })
  } catch (error) {
    console.error("Error creating Gemini chat:", error)
    throw error
  }
}

