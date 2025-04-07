import { NextResponse } from "next/server"
import { searchCampusData } from "@/lib/ai-context"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the latest user message
    const latestUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

    // Search for relevant campus data based on the user's query
    const relevantData = searchCampusData(latestUserMessage)

    // Generate a response based on the search results
    const response = generateResponse(latestUserMessage, relevantData)

    // Return the response
    return NextResponse.json({
      role: "assistant",
      content: response,
    })
  } catch (error) {
    console.error("Chat fallback API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

function generateResponse(query, relevantData) {
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

