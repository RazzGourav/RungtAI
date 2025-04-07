import { NextResponse } from "next/server"
import { academicInfo } from "@/lib/campus-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")

  if (id) {
    // Find specific academic information by ID
    const info = academicInfo.find((a) => a.id === id)

    if (info) {
      return NextResponse.json(info)
    } else {
      return NextResponse.json({ error: "Academic information not found" }, { status: 404 })
    }
  }

  if (category) {
    // Find academic information by category
    const filteredInfo = academicInfo.filter((a) => a.category.toLowerCase() === category.toLowerCase())

    if (filteredInfo.length > 0) {
      return NextResponse.json(filteredInfo)
    } else {
      return NextResponse.json([])
    }
  }

  // Return all academic information
  return NextResponse.json(academicInfo)
}

