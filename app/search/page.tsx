"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Calendar, Book, Coffee, SearchIcon, MapPin, Clock } from "lucide-react"
import { searchCampus } from "@/lib/api-utils"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setIsSearching(true)
      const results = await searchCampus(searchQuery)
      setSearchResults(results)

      // Set active tab based on which has results
      if (results) {
        if (results.buildings?.length > 0) {
          setActiveTab("buildings")
        } else if (results.events?.length > 0) {
          setActiveTab("events")
        } else if (results.academic?.length > 0) {
          setActiveTab("academic")
        } else if (results.services?.length > 0) {
          setActiveTab("services")
        } else {
          setActiveTab("all")
        }
      }
    } catch (error) {
      console.error("Error searching campus data:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Campus Search</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-2xl mx-auto">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for buildings, events, services..."
            className="flex-grow border-emerald-200 focus-visible:ring-emerald-500"
          />
          <Button
            type="submit"
            className="ml-2 bg-emerald-700 hover:bg-emerald-800"
            disabled={isSearching || !searchQuery.trim()}
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      {isSearching ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
        </div>
      ) : searchResults ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all" className="flex items-center">
                <SearchIcon className="h-4 w-4 mr-2" /> All Results
              </TabsTrigger>
              <TabsTrigger value="buildings" className="flex items-center">
                <Building className="h-4 w-4 mr-2" /> Buildings
                {searchResults.buildings && (
                  <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 rounded-full px-2">
                    {searchResults.buildings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" /> Events
                {searchResults.events && (
                  <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 rounded-full px-2">
                    {searchResults.events.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center">
                <Book className="h-4 w-4 mr-2" /> Academic
                {searchResults.academic && (
                  <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 rounded-full px-2">
                    {searchResults.academic.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center">
                <Coffee className="h-4 w-4 mr-2" /> Services
                {searchResults.services && (
                  <span className="ml-1 text-xs bg-emerald-100 text-emerald-800 rounded-full px-2">
                    {searchResults.services.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-8">
                {/* Buildings Section */}
                {searchResults.buildings && searchResults.buildings.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2" /> Buildings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.buildings.slice(0, 3).map((building, index) => (
                        <Card key={index}>
                          <CardHeader className="bg-emerald-50 pb-2">
                            <CardTitle className="text-lg text-emerald-800">{building.name}</CardTitle>
                            <CardDescription className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" /> {building.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-700 text-sm line-clamp-3">{building.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events Section */}
                {searchResults.events && searchResults.events.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" /> Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.events.slice(0, 3).map((event, index) => (
                        <Card key={index}>
                          <CardHeader className="bg-emerald-50 pb-2">
                            <CardTitle className="text-lg text-emerald-800">{event.title}</CardTitle>
                            <CardDescription className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" /> {event.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-700 text-sm line-clamp-3">{event.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Section */}
                {searchResults.services && searchResults.services.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                      <Coffee className="h-5 w-5 mr-2" /> Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.services.slice(0, 3).map((service, index) => (
                        <Card key={index}>
                          <CardHeader className="bg-emerald-50 pb-2">
                            <CardTitle className="text-lg text-emerald-800">{service.name}</CardTitle>
                            <CardDescription className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" /> {service.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-gray-700 text-sm line-clamp-3">{service.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {(!searchResults.buildings || searchResults.buildings.length === 0) &&
                  (!searchResults.events || searchResults.events.length === 0) &&
                  (!searchResults.academic || searchResults.academic.length === 0) &&
                  (!searchResults.services || searchResults.services.length === 0) && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                      <p className="text-gray-500 mt-2">Try different keywords or check your spelling</p>
                    </div>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="buildings" className="mt-0">
              {searchResults.buildings && searchResults.buildings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.buildings.map((building, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-emerald-50 pb-2">
                        <CardTitle className="text-lg text-emerald-800">{building.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> {building.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700 mb-3">{building.description}</p>
                        <div className="text-sm text-gray-600 font-medium mt-2">Facilities:</div>
                        <ul className="text-sm text-gray-600 list-disc pl-5">
                          {building.facilities.slice(0, 3).map((facility, idx) => (
                            <li key={idx}>{facility}</li>
                          ))}
                          {building.facilities.length > 3 && <li>And more...</li>}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No buildings found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              {searchResults.events && searchResults.events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.events.map((event, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-emerald-50 pb-2">
                        <CardTitle className="text-lg text-emerald-800">{event.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700 mb-3">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" /> {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" /> {event.location}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No events found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="academic" className="mt-0">
              {searchResults.academic && searchResults.academic.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.academic.map((info, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-emerald-50 pb-2">
                        <CardTitle className="text-lg text-emerald-800">{info.title}</CardTitle>
                        {info.deadline && (
                          <CardDescription className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> Deadline: {info.deadline}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700">{info.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No academic information found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="services" className="mt-0">
              {searchResults.services && searchResults.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.services.map((service, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-emerald-50 pb-2">
                        <CardTitle className="text-lg text-emerald-800">{service.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> {service.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700 mb-3">{service.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" /> {service.hours}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No services found for "{searchQuery}"</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <SearchIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Search the Campus</h2>
          <p className="text-gray-500">
            Enter keywords to find information about buildings, events, academic deadlines, or campus services
          </p>
        </div>
      )}
    </div>
  )
}

