import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="w-full">
        <CardHeader className="bg-emerald-50 border-b">
          <CardTitle className="text-emerald-800">Chat with RUNGTAI</CardTitle>
          <CardDescription>
            Ask me anything about campus buildings, history, facilities, or student life.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700 mb-4"></div>
            <p className="text-gray-500">Loading chat interface...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

