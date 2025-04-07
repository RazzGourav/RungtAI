/**
 * Utility functions for testing the RUNGTAI application
 */

// Test the chat API with a sample question
export async function testChatAPI(question: string): Promise<any> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    // For streaming responses, we need to handle them differently
    const reader = response.body.getReader()
    let result = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      // Convert the Uint8Array to a string
      const chunk = new TextDecoder().decode(value)
      result += chunk
    }

    return { success: true, data: result }
  } catch (error) {
    console.error("Test chat API error:", error)
    return { success: false, error: error.message }
  }
}

// Test the campus data API
export async function testCampusAPI(): Promise<any> {
  try {
    const response = await fetch("/api/campus")

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Test campus API error:", error)
    return { success: false, error: error.message }
  }
}

// Test the search functionality
export async function testSearchAPI(query: string): Promise<any> {
  try {
    const response = await fetch(`/api/campus?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Test search API error:", error)
    return { success: false, error: error.message }
  }
}

