import { NextResponse } from "next/server"
import { campusEvents } from "@/lib/campus-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")

  if (id) {
    // Find a specific event by ID
    const event = campusEvents.find((e) => e.id === id)

    if (event) {
      return NextResponse.json(event)
    } else {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }
  }

  if (category) {
    // Find events by category
    const filteredEvents = campusEvents.filter((e) => e.category.toLowerCase() === category.toLowerCase())

    if (filteredEvents.length > 0) {
      return NextResponse.json(filteredEvents)
    } else {
      return NextResponse.json([])
    }
  }

  // Return all events
  return NextResponse.json(campusEvents)
}

