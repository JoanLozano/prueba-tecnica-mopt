"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [systemDark, setSystemDark] = useState(false)

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detectar modo del sistema y aplicar tema guardado
  useEffect(() => {
    const preferredColor = window.matchMedia("(prefers-color-scheme: dark)")
    const updateSystem = () => setSystemDark(preferredColor.matches)
    updateSystem()

    preferredColor.addEventListener("change", updateSystem)
    return () => preferredColor.removeEventListener("change", updateSystem)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMobileMenuOpen(false)
    }
  }

  // Determinar color final del navbar combinando tema y sistema
  const isNavbarDark = systemDark

  const navBg = isScrolled
    ? isNavbarDark
      ? "bg-gray-900/95 shadow-lg"
      : "bg-white/95 shadow-lg"
    : isNavbarDark
    ? "bg-gray-900/80 border-b border-gray-800/60"
    : "bg-white/90 border-b border-gray-200/60"

  const navLinks = [
    { id: "hero", label: "Inicio" },
    { id: "people", label: "Talento" },
    { id: "testimonials", label: "Testimonios" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-2 group"
            >
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span
                className={`font-bold text-lg hidden sm:block transition-colors ${
                  isNavbarDark ? "text-white" : "text-gray-900"
                }`}
              >
                MOPT
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isScrolled
                    ? isNavbarDark
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                    : isNavbarDark
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-800 hover:text-gray-900"
                }`}
              >
                {link.label}
              </button>
            ))}

          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isNavbarDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 shadow-lg ${
            isNavbarDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isNavbarDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
