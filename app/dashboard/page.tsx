"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, School, Book, Coffee, Users } from "lucide-react"
import { fetchAllEvents, fetchAllAcademicInfo, fetchAllServices } from "@/lib/api-utils"
import type { CampusEvent, AcademicInfo, CampusService } from "@/lib/campus-data"

export default function DashboardPage() {
  const [events, setEvents] = useState<CampusEvent[]>([])
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo[]>([])
  const [services, setServices] = useState<CampusService[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        const [eventsData, academicData, servicesData] = await Promise.all([
          fetchAllEvents(),
          fetchAllAcademicInfo(),
          fetchAllServices(),
        ])

        setEvents(eventsData)
        setAcademicInfo(academicData)
        setServices(servicesData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Campus Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Campus Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <School className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Events
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center">
            <Book className="h-4 w-4 mr-2" /> Academic
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center">
            <Coffee className="h-4 w-4 mr-2" /> Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-emerald-50 pb-2">
                <CardTitle className="text-lg text-emerald-800">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {events.slice(0, 3).map((event, index) => (
                  <div key={index} className={`mb-4 ${index < events.slice(0, 3).length - 1 ? "border-b pb-4" : ""}`}>
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" /> {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> {event.location}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-emerald-50 pb-2">
                <CardTitle className="text-lg text-emerald-800">Academic Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {academicInfo
                  .filter((info) => info.deadline)
                  .slice(0, 3)
                  .map((info, index) => (
                    <div key={index} className={`mb-4 ${index < 2 ? "border-b pb-4" : ""}`}>
                      <h3 className="font-medium">{info.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" /> Deadline: {info.deadline}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-emerald-50 pb-2">
                <CardTitle className="text-lg text-emerald-800">Campus Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {services.slice(0, 3).map((service, index) => (
                  <div key={index} className={`mb-4 ${index < services.slice(0, 3).length - 1 ? "border-b pb-4" : ""}`}>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" /> {service.hours}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
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
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users className="h-4 w-4 mr-1" /> {event.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicInfo.map((info, index) => (
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
                  <p className="text-gray-700 mb-3">{info.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Book className="h-4 w-4 mr-1" /> {info.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
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
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Coffee className="h-4 w-4 mr-1" /> {service.category}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Users className="h-4 w-4 mr-1" /> Contact: {service.contactInfo}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

