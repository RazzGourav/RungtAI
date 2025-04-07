import { campusBuildings, campusEvents, academicInfo, campusServices } from "./campus-data"

/**
 * Generates a comprehensive context document about the campus for the AI
 * This helps the AI provide more accurate and detailed responses
 */
export function generateAIContext(): string {
  // Create a context document with all campus information
  const buildingsContext = campusBuildings
    .map((category) => {
      const buildingDetails = category.buildings
        .map((building) => {
          return `
            Building Name: ${building.name}
            Category: ${category.name}
            Location: ${building.location}
            Description: ${building.description}
            Facilities: ${building.facilities.join(", ")}
            History: ${building.history}
          `
        })
        .join("\n\n")

      return `Category: ${category.name}\n${buildingDetails}`
    })
    .join("\n\n")

  // Add events information
  const eventsContext = campusEvents
    .map((event) => {
      return `
        Event: ${event.title}
        Date: ${event.date}
        Time: ${event.time}
        Location: ${event.location}
        Description: ${event.description}
        Category: ${event.category}
      `
    })
    .join("\n\n")

  // Add academic information
  const academicContext = academicInfo
    .map((info) => {
      return `
        Academic Item: ${info.title}
        ${info.deadline ? `Deadline: ${info.deadline}` : ""}
        Description: ${info.description}
        Category: ${info.category}
      `
    })
    .join("\n\n")

  // Add campus services information
  const servicesContext = campusServices
    .map((service) => {
      return `
        Service: ${service.name}
        Location: ${service.location}
        Hours: ${service.hours}
        Description: ${service.description}
        Contact: ${service.contactInfo}
        Category: ${service.category}
      `
    })
    .join("\n\n")

  // Combine all context information
  return `
    # RUNGTAI Campus Information Database
    
    ## Campus Buildings
    ${buildingsContext}
    
    ## Campus Events
    ${eventsContext}
    
    ## Academic Information
    ${academicContext}
    
    ## Campus Services
    ${servicesContext}
  `
}

/**
 * Improved search function that uses natural language understanding
 * to find relevant information based on a query
 */
export function searchCampusData(query: string): {
  buildings: any[]
  events: any[]
  academic: any[]
  services: any[]
} {
  const normalizedQuery = query.toLowerCase()
  const queryTerms = normalizedQuery.split(/\s+/).filter((term) => term.length > 2)

  // Helper function to calculate relevance score
  const calculateRelevance = (text: string): number => {
    if (!text) return 0
    const lowerText = text.toLowerCase()

    // Exact match gets highest score
    if (lowerText.includes(normalizedQuery)) return 10

    // Count how many query terms appear in the text
    let score = 0
    for (const term of queryTerms) {
      if (lowerText.includes(term)) {
        score += 1
      }
    }

    return score
  }

  // Search buildings with relevance scoring
  const buildingsWithScores = campusBuildings.flatMap((category) =>
    category.buildings.map((building) => {
      const nameScore = calculateRelevance(building.name) * 2 // Name matches are more important
      const descriptionScore = calculateRelevance(building.description)
      const locationScore = calculateRelevance(building.location)
      const facilitiesScore = building.facilities.reduce((score, facility) => score + calculateRelevance(facility), 0)
      const historyScore = calculateRelevance(building.history)

      const totalScore = nameScore + descriptionScore + locationScore + facilitiesScore + historyScore

      return {
        building,
        score: totalScore,
      }
    }),
  )

  // Search events with relevance scoring
  const eventsWithScores = campusEvents.map((event) => {
    const titleScore = calculateRelevance(event.title) * 2
    const descriptionScore = calculateRelevance(event.description)
    const locationScore = calculateRelevance(event.location)
    const categoryScore = calculateRelevance(event.category)
    const dateScore = calculateRelevance(event.date)

    const totalScore = titleScore + descriptionScore + locationScore + categoryScore + dateScore

    return {
      event,
      score: totalScore,
    }
  })

  // Search academic info with relevance scoring
  const academicWithScores = academicInfo.map((info) => {
    const titleScore = calculateRelevance(info.title) * 2
    const descriptionScore = calculateRelevance(info.description)
    const deadlineScore = info.deadline ? calculateRelevance(info.deadline) : 0
    const categoryScore = calculateRelevance(info.category)

    const totalScore = titleScore + descriptionScore + deadlineScore + categoryScore

    return {
      info,
      score: totalScore,
    }
  })

  // Search services with relevance scoring
  const servicesWithScores = campusServices.map((service) => {
    const nameScore = calculateRelevance(service.name) * 2
    const descriptionScore = calculateRelevance(service.description)
    const locationScore = calculateRelevance(service.location)
    const hoursScore = calculateRelevance(service.hours)
    const contactScore = calculateRelevance(service.contactInfo)
    const categoryScore = calculateRelevance(service.category)

    const totalScore = nameScore + descriptionScore + locationScore + hoursScore + contactScore + categoryScore

    return {
      service,
      score: totalScore,
    }
  })

  // Filter and sort results by relevance score
  const buildings = buildingsWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.building)

  const events = eventsWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.event)

  const academic = academicWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.info)

  const services = servicesWithScores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.service)

  return {
    buildings,
    events,
    academic,
    services,
  }
}

