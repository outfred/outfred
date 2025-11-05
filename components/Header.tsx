"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "./ui/button"
import { Globe, Menu, X, User, LogOut, ShieldCheck, Bell } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import defaultLogo from "../assets/dc93d49ca6f110dfea003149eea06295a54cf5b2.png"

interface HeaderProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { language, toggleLanguage, t } = useLanguage()
  const { user, logout, isAdmin } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState(defaultLogo)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const loadUnreadCount = () => {
      try {
        const notifications = JSON.parse(localStorage.getItem("user_notifications") || "[]")
        const unread = notifications.filter((n: any) => !n.read).length
        setUnreadCount(unread)
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }

    loadUnreadCount()

    const handleStorageChange = () => {
      loadUnreadCount()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    const updateLogo = () => {
      try {
        const settings = localStorage.getItem("admin_site_settings")
        if (settings) {
          const parsed = JSON.parse(settings)
          if (parsed.seo?.logo_url) {
            setLogo(parsed.seo.logo_url)
          } else {
            setLogo(defaultLogo)
          }
        }
      } catch (error) {
        console.error("Error loading logo:", error)
        setLogo(defaultLogo)
      }
    }

    const handleLogoChange = (e: any) => {
      if (e.detail?.logo) {
        setLogo(e.detail.logo)
      } else {
        updateLogo()
      }
    }

    updateLogo()

    window.addEventListener("logoChanged", handleLogoChange as EventListener)
    window.addEventListener("storage", updateLogo)

    return () => {
      window.removeEventListener("logoChanged", handleLogoChange as EventListener)
      window.removeEventListener("storage", updateLogo)
    }
  }, [])

  const navItems = [
    { key: "home", label: t("home") },
    { key: "merchants", label: t("merchants") },
    { key: "pricing", label: language === "ar" ? "💎 الباقات" : "💎 Pricing" },
    ...(user ? [{ key: "account", label: t("account") }] : []),
    ...(user && user.role === "merchant"
      ? [{ key: "my-store", label: language === "ar" ? "🏪 متجري" : "🏪 My Store" }]
      : []),
    ...(user?.role !== "merchant" ? [{ key: "join", label: t("joinAsMerchant") }] : []),
    ...(user && (isAdmin || user.role === "merchant")
      ? [{ key: "import", label: language === "ar" ? "🔌 استيراد" : "🔌 Import" }]
      : []),
    ...(process.env.NODE_ENV === "development" || isAdmin ? [{ key: "debug", label: "🔧 Debug" }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate("home")}
            >
              <img src={logo || "/placeholder.svg"} alt="Outfred Logo" className="h-8 w-auto" />
            </motion.div>

            {/* Right side - Avatar + Notifications */}
            <div className="flex items-center gap-2">
              {user && (
                <>
                  {/* Notifications Button */}
                  <button
                    onClick={() => onNavigate("notifications")}
                    className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-all"
                    title={language === "ar" ? "الإشعارات" : "Notifications"}
                  >
                    <Bell className="w-5 h-5 text-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Avatar */}
                  <button
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center hover:ring-2 hover:ring-primary/50 transition-all"
                    onClick={() => onNavigate("account")}
                    title={t("account")}
                  >
                    <User className="w-5 h-5 text-primary-foreground" />
                  </button>
                </>
              )}

              {/* Language Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 w-10 h-10 p-0">
                <Globe className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Menu Button Row */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 justify-start gap-2 bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{language === "ar" ? "القائمة" : "Menu"}</span>
            </Button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img src={logo || "/placeholder.svg"} alt="Outfred Logo" className="h-8 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.key ? "bg-primary/10 text-primary" : "hover:bg-primary/5 text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
              <Globe className="w-4 h-4" />
              {language === "ar" ? "EN" : "ع"}
            </Button>

            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button variant="ghost" size="sm" onClick={() => onNavigate("admin")} className="gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {t("adminPanel")}
                  </Button>
                )}
                <button
                  onClick={() => onNavigate("notifications")}
                  className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-all"
                  title={language === "ar" ? "الإشعارات" : "Notifications"}
                >
                  <Bell className="w-5 h-5 text-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  {t("logout")}
                </Button>
                <button
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center hover:ring-2 hover:ring-primary/50 transition-all"
                  onClick={() => onNavigate("account")}
                  title={t("account")}
                >
                  <User className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onNavigate("login")}>
                  {t("login")}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate("register")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("register")}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    currentPage === item.key ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        onNavigate("admin")
                        setMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 rounded-lg text-left hover:bg-primary/5 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {t("adminPanel")}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left hover:bg-primary/5 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate("login")
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left hover:bg-primary/5"
                  >
                    {t("login")}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("register")
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground"
                  >
                    {t("register")}
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
