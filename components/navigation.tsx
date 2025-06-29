"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/components/notification-context"

type Notification = {
  id: number;
  message: string;
  type: string;
  read: boolean;
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { notifications, addNotification, closeNotification, showNotifications, setShowNotifications } = useNotification()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setIsAuthenticated(true)
          setUserName(data.user.name)
          // Add login notification if not already present
          addNotification(`Welcome, ${data.user.name}! You have logged in.`, "success")
        }
      } catch (error) {
        setIsAuthenticated(false)
        setUserName("")
      }
    }
    checkAuth()
  }, [])

  // Example: call addNotification when a game is played or activity occurs
  // addNotification("You played Eco Quiz and scored 80 points!", "game")

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setIsAuthenticated(false)
      setUserName("")
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Topics", href: "/#topics" },
    { name: "Quiz", href: "/quiz" },
    { name: "Tools", href: "/tools" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "About", href: "/about" },
  ]

  const authenticatedNavItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Games", href: "/games" },
    { name: "Leaderboard", href: "/leaderboard" },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 shadow-2xl"
          : "bg-white/90 backdrop-blur-xl border-b border-gray-200/30 shadow-lg"
      }`}
    >
      <div className="w-full max-w-[100vw] px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4 group flex-shrink-0">
            <div className="relative">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 rounded-xl sm:rounded-2xl group-hover:scale-125 transition-all duration-500 shadow-xl group-hover:shadow-2xl animate-pulse-slow">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce-gentle">
                <div className="w-2 h-2 sm:w-3 sm:h-3 text-white m-1">✨</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Learn for Sustainability
              </span>
              <div className="text-xs text-gray-500 -mt-1 font-semibold">Empowering Green Future</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 xl:px-6 py-2 xl:py-3 text-sm xl:text-base text-gray-700 hover:text-green-600 font-semibold transition-all duration-500 rounded-xl hover:bg-green-50 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-green-600 to-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </Link>
            ))}

            {isAuthenticated &&
              authenticatedNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 xl:px-6 py-2 xl:py-3 text-sm xl:text-base text-gray-700 hover:text-green-600 font-semibold transition-all duration-500 rounded-xl hover:bg-green-50 group overflow-hidden"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-green-600 to-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                </Link>
              ))}
          </div>

          {/* Search & Notifications */}
          <div className="hidden xl:flex items-center space-x-2 flex-shrink-0 relative">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
                onClick={() => setShowSearch((s) => !s)}
              >
                <div className="h-4 w-4 text-gray-600">🔍</div>
              </Button>
              {showSearch && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 flex items-center px-3 py-2"
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 outline-none bg-transparent text-gray-800 text-sm px-2"
                  />
                  <button type="submit" className="ml-2 text-green-600 font-bold">Go</button>
                </form>
              )}
            </div>

            {isAuthenticated && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <div className="h-4 w-4 text-gray-600">🔔</div>
                  {notifications.some((n) => !n.read) && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow"></div>
                  )}
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 font-bold border-b text-gray-700 bg-gray-50">Notifications</div>
                    {notifications.length === 0 && (
                      <div className="p-4 text-gray-500 text-sm">No notifications yet.</div>
                    )}
                    <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map((n) => (
                        <li key={n.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                          <span className="text-sm text-gray-800 flex-1 pr-2">{n.message}</span>
                          <button
                            className="ml-2 p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
                            onClick={() => closeNotification(n.id)}
                            aria-label="Close notification"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0 min-w-0">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 xl:space-x-4">
                {/* User Profile */}
                <Link
                  href="/dashboard"
                  className="flex items-center min-w-0 space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-xl transition-all duration-500 group border border-green-200/50 hover:border-green-300/70 hover:scale-105"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-slow">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <span className="hidden md:block max-w-[60px] lg:max-w-[100px] xl:max-w-[140px] truncate text-xs md:text-sm font-bold text-gray-700 group-hover:text-green-700" title={userName}>{userName}</span>
                  <div className="h-4 w-4 md:h-5 md:w-5 text-gray-500 group-hover:text-green-600 group-hover:rotate-180 transition-all duration-300">▼</div>
                </Link>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-500 rounded-xl px-2 md:px-3 py-1 md:py-2 bg-white/80 backdrop-blur-sm hover:scale-105 whitespace-nowrap min-w-0 text-xs md:text-sm"
                >
                  <LogOut className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  <span className="font-semibold">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 xl:space-x-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-500 rounded-xl xl:rounded-2xl px-4 xl:px-8 py-2 xl:py-3 bg-white/80 backdrop-blur-sm font-bold hover:scale-105"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl xl:rounded-2xl px-4 xl:px-8 py-2 xl:py-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 btn-glow font-bold"
                >
                  <Link href="/signup">
                    <span className="flex items-center">
                      Sign Up
                      <div className="ml-1 xl:ml-2 h-4 w-4 xl:h-5 xl:w-5 animate-spin-slow">✨</div>
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-green-50 rounded-xl transition-all duration-500 hover:scale-110"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 animate-spin" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 animate-pulse-slow" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 glass backdrop-blur-2xl animate-slide-in-down">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 font-semibold transition-all duration-500 rounded-xl mx-2 hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated &&
                authenticatedNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 font-semibold transition-all duration-500 rounded-xl mx-2 hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

              <div className="px-2 pt-4 border-t border-gray-200/50 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    {/* Mobile Profile */}
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl transition-all duration-500 hover:from-green-100 hover:to-blue-100 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse-slow">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{userName}</div>
                        <div className="text-sm text-gray-500">View Dashboard</div>
                      </div>
                    </Link>

                    {/* Mobile Logout */}
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-500 rounded-xl py-3 bg-white/80 backdrop-blur-sm font-bold"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-500 rounded-xl py-3 bg-white/80 backdrop-blur-sm font-bold"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 py-3 font-bold"
                    >
                      <Link href="/signup">
                        <span className="flex items-center justify-center">
                          Sign Up
                          <div className="ml-2 h-4 w-4 animate-spin-slow">✨</div>
                        </span>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
