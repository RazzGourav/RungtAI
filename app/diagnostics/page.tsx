"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { testChatAPI, testCampusAPI, testSearchAPI } from "@/lib/test-utils"
import { CheckCircle, XCircle } from "lucide-react"

export default function DiagnosticsPage() {
  const [chatTest, setChatTest] = useState({ status: null, message: "", loading: false })
  const [campusTest, setCampusTest] = useState({ status: null, message: "", loading: false })
  const [searchTest, setSearchTest] = useState({ status: null, message: "", loading: false })
  const [testQuery, setTestQuery] = useState("library")

  const runChatTest = async () => {
    setChatTest({ status: null, message: "", loading: true })
    try {
      const result = await testChatAPI("Tell me about the main library")
      if (result.success) {
        setChatTest({
          status: "success",
          message: "Chat API is working correctly",
          loading: false,
        })
      } else {
        setChatTest({
          status: "error",
          message: `Chat API test failed: ${result.error}`,
          loading: false,
        })
      }
    } catch (error) {
      setChatTest({
        status: "error",
        message: `Error testing chat API: ${error.message}`,
        loading: false,
      })
    }
  }

  const runCampusTest = async () => {
    setCampusTest({ status: null, message: "", loading: true })
    try {
      const result = await testCampusAPI()
      if (result.success) {
        setCampusTest({
          status: "success",
          message: "Campus API is working correctly",
          loading: false,
        })
      } else {
        setCampusTest({
          status: "error",
          message: `Campus API test failed: ${result.error}`,
          loading: false,
        })
      }
    } catch (error) {
      setCampusTest({
        status: "error",
        message: `Error testing campus API: ${error.message}`,
        loading: false,
      })
    }
  }

  const runSearchTest = async () => {
    setSearchTest({ status: null, message: "", loading: true })
    try {
      const result = await testSearchAPI(testQuery)
      if (result.success) {
        setSearchTest({
          status: "success",
          message: "Search API is working correctly",
          loading: false,
        })
      } else {
        setSearchTest({
          status: "error",
          message: `Search API test failed: ${result.error}`,
          loading: false,
        })
      }
    } catch (error) {
      setSearchTest({
        status: "error",
        message: `Error testing search API: ${error.message}`,
        loading: false,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">RUNGTAI Diagnostics</h1>
      <p className="text-gray-700 mb-8">
        Use this page to test and troubleshoot the RUNGTAI virtual campus tour application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chat API Test</CardTitle>
            <CardDescription>Test the Gemini API integration for the chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This test will send a sample question to the chat API and verify that it responds correctly.
            </p>
            {chatTest.status && (
              <div
                className={`p-3 rounded-md ${
                  chatTest.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  {chatTest.status === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <p className="text-sm">{chatTest.message}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={runChatTest}
              disabled={chatTest.loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800"
            >
              {chatTest.loading ? "Testing..." : "Run Chat Test"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campus Data API Test</CardTitle>
            <CardDescription>Test the campus data API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This test will fetch data from the campus API and verify that it returns the expected data structure.
            </p>
            {campusTest.status && (
              <div
                className={`p-3 rounded-md ${
                  campusTest.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  {campusTest.status === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <p className="text-sm">{campusTest.message}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={runCampusTest}
              disabled={campusTest.loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800"
            >
              {campusTest.loading ? "Testing..." : "Run Campus API Test"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search API Test</CardTitle>
            <CardDescription>Test the search functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This test will search for campus data using the provided query and verify that it returns results.
            </p>
            <div className="mb-4">
              <Input
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Enter search query"
                className="mb-2"
              />
            </div>
            {searchTest.status && (
              <div
                className={`p-3 rounded-md ${
                  searchTest.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  {searchTest.status === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <p className="text-sm">{searchTest.message}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={runSearchTest}
              disabled={searchTest.loading || !testQuery.trim()}
              className="w-full bg-emerald-700 hover:bg-emerald-800"
            >
              {searchTest.loading ? "Testing..." : "Run Search Test"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

