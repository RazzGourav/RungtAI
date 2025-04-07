import Link from "next/link"
import { Building, MessageSquare, Search, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="bg-emerald-700 text-white py-6 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 mr-2"
            >
              <path d="M22 9L12 5L2 9l10 4l10-4v6"></path>
              <path d="M6 10.6V16c0 1 1.5 2 3 2s3-1 3-2v-5.4"></path>
              <path d="M18 10.6V16c0 1-1.5 2-3 2s-3-1-3-2v-5.4"></path>
            </svg>
            <Link href="/" className="text-2xl font-bold">
              RUNGTAI
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <NavLink
              href="/"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              }
            >
              Home
            </NavLink>
            <NavLink href="/tour" icon={<Building className="h-4 w-4 mr-1" />}>
              Campus Tour
            </NavLink>
            <NavLink href="/chat" icon={<MessageSquare className="h-4 w-4 mr-1" />}>
              Ask RUNGTAI
            </NavLink>
            <NavLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4 mr-1" />}>
              Dashboard
            </NavLink>
            <NavLink href="/search" icon={<Search className="h-4 w-4 mr-1" />}>
              Search
            </NavLink>
            <NavLink href="/about" icon={null}>
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children, icon }) {
  return (
    <Link href={href} className="hover:underline">
      <Button variant="ghost" className="text-white hover:bg-emerald-600 hover:text-white">
        {icon}
        {children}
      </Button>
    </Link>
  )
}

