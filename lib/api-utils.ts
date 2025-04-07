/**
 * Utility functions for working with the campus API
 */

// Base URL for API requests
const API_BASE_URL = "/api"

// Fetch all campus buildings
export async function fetchAllBuildings() {
  const response = await fetch(`${API_BASE_URL}/buildings`)
  if (!response.ok) {
    throw new Error("Failed to fetch buildings")
  }
  return response.json()
}

// Fetch a specific building by ID
export async function fetchBuildingById(id: string) {
  const response = await fetch(`${API_BASE_URL}/buildings?id=${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch building")
  }
  return response.json()
}

// Fetch buildings by category
export async function fetchBuildingsByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}/buildings?category=${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch buildings by category")
  }
  return response.json()
}

// Fetch all campus events
export async function fetchAllEvents() {
  const response = await fetch(`${API_BASE_URL}/events`)
  if (!response.ok) {
    throw new Error("Failed to fetch events")
  }
  return response.json()
}

// Fetch a specific event by ID
export async function fetchEventById(id: string) {
  const response = await fetch(`${API_BASE_URL}/events?id=${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch event")
  }
  return response.json()
}

// Fetch events by category
export async function fetchEventsByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}/events?category=${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch events by category")
  }
  return response.json()
}

// Fetch all academic information
export async function fetchAllAcademicInfo() {
  const response = await fetch(`${API_BASE_URL}/academic`)
  if (!response.ok) {
    throw new Error("Failed to fetch academic information")
  }
  return response.json()
}

// Fetch academic information by ID
export async function fetchAcademicInfoById(id: string) {
  const response = await fetch(`${API_BASE_URL}/academic?id=${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch academic information")
  }
  return response.json()
}

// Fetch academic information by category
export async function fetchAcademicInfoByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}/academic?category=${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch academic information by category")
  }
  return response.json()
}

// Fetch all campus services
export async function fetchAllServices() {
  const response = await fetch(`${API_BASE_URL}/services`)
  if (!response.ok) {
    throw new Error("Failed to fetch services")
  }
  return response.json()
}

// Fetch a specific service by ID
export async function fetchServiceById(id: string) {
  const response = await fetch(`${API_BASE_URL}/services?id=${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch service")
  }
  return response.json()
}

// Fetch services by category
export async function fetchServicesByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}/services?category=${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch services by category")
  }
  return response.json()
}

// Search across all campus data
export async function searchCampus(query: string) {
  const response = await fetch(`${API_BASE_URL}/campus?query=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error("Failed to search campus data")
  }
  return response.json()
}

