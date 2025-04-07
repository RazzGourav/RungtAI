import { NextResponse } from "next/server"
import { campusBuildings, campusEvents, academicInfo, campusServices } from "@/lib/campus-data"
import { searchCampusData } from "@/lib/ai-context"

// Get all campus data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const id = searchParams.get("id")
  const query = searchParams.get("query")

  // If there's a search query, use the search function
  if (query) {
    const searchResults = searchCampusData(query)
    return NextResponse.json(searchResults)
  }

  // If category is specified, filter by category
  if (category) {
    switch (category) {
      case "buildings":
        if (id) {
          // Find specific building by ID
          const allBuildings = campusBuildings.flatMap((cat) => cat.buildings)
          const building = allBuildings.find((b) => b.id === id)
          return building
            ? NextResponse.json(building)
            : NextResponse.json({ error: "Building not found" }, { status: 404 })
        }
        return NextResponse.json(campusBuildings)

      case "events":
        if (id) {
          const event = campusEvents.find((e) => e.id === id)
          return event ? NextResponse.json(event) : NextResponse.json({ error: "Event not found" }, { status: 404 })
        }
        return NextResponse.json(campusEvents)

      case "academic":
        if (id) {
          const info = academicInfo.find((a) => a.id === id)
          return info
            ? NextResponse.json(info)
            : NextResponse.json({ error: "Academic information not found" }, { status: 404 })
        }
        return NextResponse.json(academicInfo)

      case "services":
        if (id) {
          const service = campusServices.find((s) => s.id === id)
          return service
            ? NextResponse.json(service)
            : NextResponse.json({ error: "Service not found" }, { status: 404 })
        }
        return NextResponse.json(campusServices)

      default:
        return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }
  }

  // If no category specified, return all data
  return NextResponse.json({
    buildings: campusBuildings,
    events: campusEvents,
    academic: academicInfo,
    services: campusServices,
  })
}

