"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Send, User, Bot, Search, AlertCircle, RefreshCw } from "lucide-react"
import { searchCampus } from "@/lib/api-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChatPage() {
  // Use useState with null initial values to prevent hydration mismatches
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use useEffect for client-side only code
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Reset search results when a new message is sent
  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false)
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message to chat
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    // Clear input and set loading state
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || `API returned status ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.details || data.error)
      }

      // Add assistant message to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])

      // Reset retry count on successful message
      setRetryCount(0)
    } catch (err: any) {
      console.error("Chat error:", err)
      setError(`Failed to get a response: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Use setTimeout to ensure state updates before submitting
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(fakeEvent)
    }, 100)
  }

  const handleSearch = async () => {
    if (!input.trim()) return

    try {
      setIsSearching(true)
      const results = await searchCampus(input)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching campus data:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    setRetryCount((prev) => prev + 1)

    // If there's a last user message, retry it
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
    if (lastUserMessage) {
      setInput(lastUserMessage.content)
      // Remove the last user message and any subsequent assistant messages
      const lastUserIndex = messages.lastIndexOf(lastUserMessage)
      setMessages(messages.slice(0, lastUserIndex))
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="w-full">
        <CardHeader className="bg-emerald-50 border-b">
          <CardTitle className="text-emerald-800">Chat with RUNGTAI</CardTitle>
          <CardDescription>
            Ask me anything about campus buildings, history, facilities, or student life.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 h-[60vh] overflow-y-auto flex flex-col space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="flex items-center"
                    disabled={retryCount >= 3}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" /> Retry
                  </Button>
                  {retryCount >= 3 && (
                    <p className="text-xs mt-1">Maximum retry attempts reached. Try asking a different question.</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {messages.length === 0 && showSuggestions ? (
            <div className="flex flex-col space-y-4 mt-4">
              <p className="text-gray-500 italic">Here are some questions you can ask:</p>
              {[
                "Tell me about the main library",
                "Where can I find the student center?",
                "What dining options are available on campus?",
                "When is the next academic deadline?",
                "What counseling services are available?",
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left hover:bg-emerald-50 border-emerald-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] ${
                      message.role === "user"
                        ? "bg-emerald-100 rounded-l-lg rounded-br-lg"
                        : "bg-gray-100 rounded-r-lg rounded-bl-lg"
                    } p-3`}
                  >
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        {message.role === "user" ? (
                          <Avatar className="h-6 w-6 bg-emerald-700">
                            <User className="h-4 w-4 text-white" />
                          </Avatar>
                        ) : (
                          <Avatar className="h-6 w-6 bg-gray-700">
                            <Bot className="h-4 w-4 text-white" />
                          </Avatar>
                        )}
                      </div>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Search results display */}
              {searchResults && (
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-4">
                  <h3 className="font-medium text-emerald-800 mb-2">Related Campus Information:</h3>

                  {searchResults.buildings && searchResults.buildings.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold">Buildings:</h4>
                      <ul className="text-xs text-gray-700">
                        {searchResults.buildings.slice(0, 2).map((building: any, idx: number) => (
                          <li key={idx} className="mb-1">
                            <span className="font-medium">{building.name}</span> - {building.location}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.events && searchResults.events.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold">Events:</h4>
                      <ul className="text-xs text-gray-700">
                        {searchResults.events.slice(0, 2).map((event: any, idx: number) => (
                          <li key={idx} className="mb-1">
                            <span className="font-medium">{event.title}</span> - {event.date}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResults.services && searchResults.services.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold">Services:</h4>
                      <ul className="text-xs text-gray-700">
                        {searchResults.services.slice(0, 2).map((service: any, idx: number) => (
                          <li key={idx} className="mb-1">
                            <span className="font-medium">{service.name}</span> - {service.location}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    variant="link"
                    size="sm"
                    className="text-emerald-700 p-0 mt-2"
                    onClick={() => setSearchResults(null)}
                  >
                    Hide results
                  </Button>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-r-lg rounded-bl-lg p-3 max-w-[80%]">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Avatar className="h-6 w-6 bg-gray-700">
                      <Bot className="h-4 w-4 text-white" />
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-4 border-t bg-white">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about campus buildings, services, or events..."
              className="flex-grow border-emerald-200 focus-visible:ring-emerald-500"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="outline"
              className="border-emerald-200 text-emerald-700"
              onClick={handleSearch}
              disabled={isSearching || !input.trim() || isLoading}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

