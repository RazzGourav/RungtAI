import { NextResponse } from "next/server"
import { campusBuildings } from "@/lib/campus-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")

  if (id) {
    // Find a specific building by ID
    const allBuildings = campusBuildings.flatMap((cat) => cat.buildings)
    const building = allBuildings.find((b) => b.id === id)

    if (building) {
      return NextResponse.json(building)
    } else {
      return NextResponse.json({ error: "Building not found" }, { status: 404 })
    }
  }

  if (category) {
    // Find buildings by category
    const categoryData = campusBuildings.find((cat) => cat.id === category)

    if (categoryData) {
      return NextResponse.json(categoryData.buildings)
    } else {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }
  }

  // Return all building categories
  return NextResponse.json(campusBuildings)
}

