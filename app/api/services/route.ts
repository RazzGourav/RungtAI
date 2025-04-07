import { NextResponse } from "next/server"
import { campusServices } from "@/lib/campus-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")

  if (id) {
    // Find a specific service by ID
    const service = campusServices.find((s) => s.id === id)

    if (service) {
      return NextResponse.json(service)
    } else {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }
  }

  if (category) {
    // Find services by category
    const filteredServices = campusServices.filter((s) => s.category.toLowerCase() === category.toLowerCase())

    if (filteredServices.length > 0) {
      return NextResponse.json(filteredServices)
    } else {
      return NextResponse.json([])
    }
  }

  // Return all services
  return NextResponse.json(campusServices)
}

