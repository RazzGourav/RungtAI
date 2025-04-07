"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, BookOpen, Home, Users, MapPin, Info } from "lucide-react"
import { fetchAllBuildings } from "@/lib/api-utils"
import type { BuildingCategory, Building as BuildingType } from "@/lib/campus-data"

export default function TourPage() {
  const [buildingCategories, setBuildingCategories] = useState<BuildingCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null)
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBuildingData() {
      try {
        setLoading(true)
        const data = await fetchAllBuildings()
        setBuildingCategories(data)

        if (data.length > 0) {
          setSelectedCategory(data[0].id)
          if (data[0].buildings.length > 0) {
            setSelectedBuilding(data[0].buildings[0])
          }
        }
      } catch (error) {
        console.error("Error loading building data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBuildingData()
  }, [])

  const handleBuildingSelect = (building: BuildingType) => {
    setSelectedBuilding(building)
    setActiveTab("info")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Virtual Campus Tour</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
        </div>
      </div>
    )
  }

  if (buildingCategories.length === 0 || !selectedBuilding) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Virtual Campus Tour</h1>
        <p className="text-gray-700">No building data available. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Virtual Campus Tour</h1>
      <p className="text-gray-700 mb-8">
        Explore our campus buildings and facilities. Click on any building to learn more about its history, location,
        and available services.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4">Building Categories</h2>
            <div className="flex flex-col space-y-2">
              {buildingCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`justify-start ${
                    selectedCategory === category.id
                      ? "bg-emerald-700 hover:bg-emerald-800"
                      : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    if (category.buildings.length > 0) {
                      setSelectedBuilding(category.buildings[0])
                    }
                  }}
                >
                  {category.id === "academic" && <BookOpen className="mr-2 h-4 w-4" />}
                  {category.id === "residential" && <Home className="mr-2 h-4 w-4" />}
                  {category.id === "facilities" && <Building className="mr-2 h-4 w-4" />}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4">Buildings</h2>
            <div className="flex flex-col space-y-2">
              {buildingCategories
                .find((category) => category.id === selectedCategory)
                ?.buildings.map((building) => (
                  <Button
                    key={building.id}
                    variant="ghost"
                    className={`justify-start ${
                      selectedBuilding.id === building.id
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-700 hover:bg-emerald-50"
                    }`}
                    onClick={() => handleBuildingSelect(building)}
                  >
                    {building.name}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-emerald-50 border-b">
              <CardTitle>{selectedBuilding.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {selectedBuilding.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src={selectedBuilding.image || "/placeholder.svg"}
                alt={selectedBuilding.name}
                className="w-full h-64 object-cover"
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="info" className="flex items-center">
                    <Info className="h-4 w-4 mr-2" /> Information
                  </TabsTrigger>
                  <TabsTrigger value="facilities" className="flex items-center">
                    <Building className="h-4 w-4 mr-2" /> Facilities
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" /> History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-0">
                  <p className="text-gray-700">{selectedBuilding.description}</p>
                </TabsContent>

                <TabsContent value="facilities" className="mt-0">
                  <ul className="list-disc pl-5 text-gray-700">
                    {selectedBuilding.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <p className="text-gray-700">{selectedBuilding.history}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between">
              <Button variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                <MapPin className="mr-2 h-4 w-4" /> View on Map
              </Button>
              <Button className="bg-emerald-700 hover:bg-emerald-800">
                <Users className="mr-2 h-4 w-4" /> Virtual Tour
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

