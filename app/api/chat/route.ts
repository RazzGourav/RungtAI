import { NextResponse } from "next/server"
import { generateGeminiResponse } from "@/lib/gemini-client"
import { searchCampusData } from "@/lib/ai-context"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the latest user message
    const latestUserMessage = messages.filter((m: any) => m.role === "user").pop()?.content || ""

    // Search for relevant campus data based on the user's query
    const relevantData = searchCampusData(latestUserMessage)

    // Prepare the prompt with context and user query
    let prompt = `You are RUNGTAI, an AI assistant designed to provide virtual tours and information about a college campus.
    
    You have detailed knowledge about:
    1. Campus buildings and their locations
    2. Historical facts about the campus and buildings
    3. Available facilities in each building
    4. Academic deadlines and requirements
    5. Campus services including counseling, dining, and healthcare
    6. Extracurricular activities and student organizations
    
    Always be helpful, informative, and friendly. If you don't know specific details about a particular building or service, 
    you can provide general information that would be typical for a college campus, but make it clear that you're providing general information rather than specific details about this particular campus.
    
    Respond in a conversational, helpful tone and offer to provide additional information when appropriate.`

    // Add relevant data to the prompt if found
    if (
      relevantData.buildings.length > 0 ||
      relevantData.events.length > 0 ||
      relevantData.academic.length > 0 ||
      relevantData.services.length > 0
    ) {
      prompt += `\n\nHere is specific information that might be relevant to the user's query:\n\n`

      // Add building information
      if (relevantData.buildings.length > 0) {
        prompt += `BUILDINGS:\n`
        relevantData.buildings.forEach((building) => {
          prompt += `- ${building.name} (${building.location}): ${building.description}\n`
          prompt += `  Facilities: ${building.facilities.join(", ")}\n`
          prompt += `  History: ${building.history}\n\n`
        })
      }

      // Add event information
      if (relevantData.events.length > 0) {
        prompt += `EVENTS:\n`
        relevantData.events.forEach((event) => {
          prompt += `- ${event.title} (${event.date}, ${event.time}): ${event.description}\n`
          prompt += `  Location: ${event.location}\n\n`
        })
      }

      // Add academic information
      if (relevantData.academic.length > 0) {
        prompt += `ACADEMIC INFORMATION:\n`
        relevantData.academic.forEach((info) => {
          prompt += `- ${info.title}: ${info.description}\n`
          if (info.deadline) {
            prompt += `  Deadline: ${info.deadline}\n\n`
          }
        })
      }

      // Add service information
      if (relevantData.services.length > 0) {
        prompt += `CAMPUS SERVICES:\n`
        relevantData.services.forEach((service) => {
          prompt += `- ${service.name} (${service.location}): ${service.description}\n`
          prompt += `  Hours: ${service.hours}\n`
          prompt += `  Contact: ${service.contactInfo}\n\n`
        })
      }
    }

    // Add conversation history context (last 5 messages)
    if (messages.length > 1) {
      prompt += "\n\nConversation history:\n"
      const recentMessages = messages.slice(-5)
      recentMessages.forEach((msg: any) => {
        prompt += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`
      })
    }

    // Add the user's query to the prompt
    prompt += `\nUser's latest query: ${latestUserMessage}`

    try {
      // Try to use the Gemini API
      const generatedText = await generateGeminiResponse(prompt)

      // Return the response
      return NextResponse.json({
        role: "assistant",
        content: generatedText,
      })
    } catch (apiError) {
      console.error("Gemini API error:", apiError)

      // Fall back to the local response generator
      const fallbackResponse = generateLocalResponse(latestUserMessage, relevantData)

      return NextResponse.json({
        role: "assistant",
        content: fallbackResponse,
      })
    }
  } catch (error: any) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

// Local response generator that doesn't rely on external APIs
function generateLocalResponse(query: string, relevantData: any) {
  // Check if we have any relevant data
  const hasData =
    relevantData.buildings.length > 0 ||
    relevantData.events.length > 0 ||
    relevantData.academic.length > 0 ||
    relevantData.services.length > 0

  if (!hasData) {
    // Handle common questions that might not have specific data
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      return "Hello! I'm RUNGTAI, your virtual campus guide. How can I help you today? You can ask me about campus buildings, events, academic deadlines, or services."
    }

    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you") || lowerQuery.includes("about you")) {
      return "I'm RUNGTAI, an AI assistant designed to provide information about the campus. I can tell you about buildings, events, academic deadlines, and campus services. How can I assist you today?"
    }

    if (lowerQuery.includes("thank")) {
      return "You're welcome! If you have any other questions about the campus, feel free to ask."
    }

    return "I'm sorry, I don't have specific information about that. You can ask me about campus buildings, events, academic deadlines, or services like dining, counseling, or tutoring."
  }

  // Prioritize which data to respond with
  if (relevantData.buildings.length > 0) {
    const building = relevantData.buildings[0]
    return `Here's information about ${building.name}:\n\nLocation: ${building.location}\n\nDescription: ${building.description}\n\nFacilities: ${building.facilities.join(", ")}\n\nHistory: ${building.history}\n\nIs there anything specific about ${building.name} you'd like to know?`
  }

  if (relevantData.events.length > 0) {
    const event = relevantData.events[0]
    return `Here's information about ${event.title}:\n\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nDescription: ${event.description}\n\nCategory: ${event.category}\n\nWould you like to know about other ${event.category.toLowerCase()} events?`
  }

  if (relevantData.academic.length > 0) {
    const info = relevantData.academic[0]
    let response = `Here's information about ${info.title}:\n\n${info.description}`
    if (info.deadline) {
      response += `\n\nDeadline: ${info.deadline}`
    }
    response += `\n\nCategory: ${info.category}\n\nIs there anything else about academic information you'd like to know?`
    return response
  }

  if (relevantData.services.length > 0) {
    const service = relevantData.services[0]
    return `Here's information about ${service.name}:\n\nLocation: ${service.location}\nHours: ${service.hours}\n\nDescription: ${service.description}\n\nContact: ${service.contactInfo}\n\nCategory: ${service.category}\n\nCan I help you with information about other campus services?`
  }

  return "I'm sorry, I couldn't find specific information about that. Can you try asking in a different way?"
}

