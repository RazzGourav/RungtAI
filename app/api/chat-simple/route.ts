import { NextResponse } from "next/server"
import { searchCampusData } from "@/lib/ai-context"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the latest user message
    const latestUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

    // Search for relevant campus data based on the user's query
    const relevantData = searchCampusData(latestUserMessage)

    // Generate a simple response based on the search results
    let response = "I'm sorry, I couldn't find specific information about that. Can you try asking in a different way?"

    if (relevantData.buildings.length > 0) {
      const building = relevantData.buildings[0]
      response = `Here's information about ${building.name}:\n\nLocation: ${building.location}\n\nDescription: ${building.description}\n\nFacilities: ${building.facilities.join(", ")}\n\nHistory: ${building.history}`
    } else if (relevantData.events.length > 0) {
      const event = relevantData.events[0]
      response = `Here's information about ${event.title}:\n\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nDescription: ${event.description}`
    } else if (relevantData.academic.length > 0) {
      const info = relevantData.academic[0]
      response = `Here's information about ${info.title}:\n\n${info.description}${info.deadline ? `\n\nDeadline: ${info.deadline}` : ""}`
    } else if (relevantData.services.length > 0) {
      const service = relevantData.services[0]
      response = `Here's information about ${service.name}:\n\nLocation: ${service.location}\nHours: ${service.hours}\n\nDescription: ${service.description}\n\nContact: ${service.contactInfo}`
    }

    // Return the response
    return NextResponse.json({
      role: "assistant",
      content: response,
    })
  } catch (error) {
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

