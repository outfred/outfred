"use client"

import React, { useState } from "react"
import { LanguageProvider } from "./contexts/LanguageContext"
import { AuthProvider } from "./contexts/AuthContext"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Merchants } from "./pages/Merchants"
import { Account } from "./pages/Account"
import { JoinMerchant } from "./pages/JoinMerchant"
import { Auth } from "./pages/Auth"
import { Admin } from "./pages/Admin"
import { AdminSiteSettings } from "./pages/AdminSiteSettings"
import { AdminAISettings } from "./pages/AdminAISettings"
import { AdminSubscriptions } from "./pages/AdminSubscriptions"
import { AdminCMS } from "./pages/AdminCMS"
import { AdminPaymentSettings } from "./pages/AdminPaymentSettings"
import { AdminAnalytics } from "./pages/AdminAnalytics"
import { AdminEmailTemplates } from "./pages/AdminEmailTemplates"
import { AccountSettings } from "./pages/AccountSettings"
import { StaticPages } from "./pages/StaticPages"
import { Debug } from "./pages/Debug"
import { MerchantImport } from "./pages/MerchantImport"
import { MerchantDashboardNew } from "./pages/MerchantDashboardNew"
import { MyStore } from "./pages/MyStore"
import { TestScraper } from "./pages/TestScraper"
import { ProductDetails } from "./pages/ProductDetails"
import { Statistics } from "./pages/Statistics"
import { MerchantStorePage } from "./pages/MerchantStorePage"
import { OutfitGenerator } from "./pages/OutfitGenerator"
import { Pricing } from "./pages/Pricing"
import { ForgotPassword } from "./pages/ForgotPassword"
import { Notifications } from "./pages/Notifications"
import { Toaster } from "./components/ui/sonner"

type Page =
  | "home"
  | "merchants"
  | "account"
  | "account-settings"
  | "join"
  | "login"
  | "register"
  | "forgot-password"
  | "notifications"
  | "admin"
  | "admin-site-settings"
  | "admin-ai-settings"
  | "admin-subscriptions"
  | "admin-cms"
  | "admin-payment-settings"
  | "admin-email-templates"
  | "admin-analytics"
  | "about"
  | "privacy"
  | "contact"
  | "debug"
  | "import"
  | "merchant-dashboard"
  | "my-store"
  | "test-scraper"
  | "product"
  | "statistics"
  | "merchant-store"
  | "outfit-generator"
  | "pricing"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [currentProductId, setCurrentProductId] = useState<string | null>(null)
  const [currentMerchantId, setCurrentMerchantId] = useState<string | null>(null)

  // Handle hash routing
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove #
      if (hash) {
        const [route, queryString] = hash.split("?")

        // Parse query params
        const params: any = {}
        if (queryString) {
          queryString.split("&").forEach((param) => {
            const [key, value] = param.split("=")
            params[key] = decodeURIComponent(value)
          })
        }

        handleNavigate(route, params)
      }
    }

    // Handle initial hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Apply SEO settings from Site Settings
  React.useEffect(() => {
    try {
      const settings = localStorage.getItem("admin_site_settings")
      if (settings) {
        const parsed = JSON.parse(settings)
        if (parsed.seo) {
          const currentLang = localStorage.getItem("language") || "ar"

          const title = currentLang === "ar" ? parsed.seo.title_ar : parsed.seo.title_en
          const description = currentLang === "ar" ? parsed.seo.description_ar : parsed.seo.description_en
          const keywords = parsed.seo.keywords

          if (title) {
            document.title = title
          }

          if (description) {
            let metaDesc = document.querySelector('meta[name="description"]')
            if (!metaDesc) {
              metaDesc = document.createElement("meta")
              metaDesc.setAttribute("name", "description")
              document.head.appendChild(metaDesc)
            }
            metaDesc.setAttribute("content", description)
          }

          if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]')
            if (!metaKeywords) {
              metaKeywords = document.createElement("meta")
              metaKeywords.setAttribute("name", "keywords")
              document.head.appendChild(metaKeywords)
            }
            metaKeywords.setAttribute("content", keywords)
          }

          if (parsed.seo.favicon_url) {
            let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
            if (!favicon) {
              favicon = document.createElement("link")
              favicon.setAttribute("rel", "icon")
              document.head.appendChild(favicon)
            }
            favicon.href = parsed.seo.favicon_url
          }
        }
      }
    } catch (error) {
      console.error("Failed to apply SEO settings:", error)
    }
  }, [currentPage])

  // Show helpful console message on first load
  React.useEffect(() => {
    console.log("%c🎯 Welcome to Outfred!", "color: #6366f1; font-size: 20px; font-weight: bold;")
    console.log("%c📧 Demo Admin Login:", "color: #ec4899; font-size: 14px; font-weight: bold;")
    console.log("Email: admin@outfred.com")
    console.log("Password: admin123")
    console.log("%c🔧 Having issues? Open Debug Panel:", "color: #a855f7; font-size: 14px; font-weight: bold;")
    console.log('Click "🔧 Debug" in the top menu or visit /#debug')
    console.log("%c📚 Documentation:", "color: #10b981; font-size: 14px; font-weight: bold;")
    console.log("- Authentication: See AUTHENTICATION_NOTES.md")
    console.log("- Troubleshooting: See TROUBLESHOOTING.md")
    console.log("- User Guide: See README_OUTFRED.md")
  }, [])

  const handleNavigate = (page: string, params?: any) => {
    if (page === "product" && params) {
      setCurrentProductId(typeof params === "string" ? params : params.productId)
    }
    if (page === "merchant-store" && params?.merchantId) {
      setCurrentMerchantId(params.merchantId)
    }
    setCurrentPage(page as Page)

    // Update hash in URL
    let hash = `#${page}`
    if (params && typeof params === "object") {
      const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join("&")
      if (queryParams) {
        hash += `?${queryParams}`
      }
    }
    window.location.hash = hash

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />
      case "merchants":
        return <Merchants onNavigate={handleNavigate} />
      case "merchant-store":
        return currentMerchantId ? (
          <MerchantStorePage merchantId={currentMerchantId} onNavigate={handleNavigate} />
        ) : (
          <Merchants onNavigate={handleNavigate} />
        )
      case "account":
        return <Account onNavigate={handleNavigate} />
      case "join":
        return <JoinMerchant />
      case "login":
        return <Auth mode="login" onSuccess={() => handleNavigate("home")} />
      case "register":
        return <Auth mode="register" onSuccess={() => handleNavigate("home")} />
      case "forgot-password":
        return <ForgotPassword onNavigate={handleNavigate} />
      case "notifications":
        return <Notifications />
      case "account-settings":
        return <AccountSettings />
      case "admin":
        return <Admin />
      case "admin-site-settings":
        return <AdminSiteSettings />
      case "admin-ai-settings":
        return <AdminAISettings onNavigate={handleNavigate} />
      case "admin-subscriptions":
        return <AdminSubscriptions />
      case "admin-cms":
        return <AdminCMS />
      case "admin-payment-settings":
        return <AdminPaymentSettings />
      case "admin-email-templates":
        return <AdminEmailTemplates />
      case "admin-analytics":
        return <AdminAnalytics />
      case "import":
        return <MerchantImport />
      case "merchant-dashboard":
        return <MerchantDashboardNew onNavigate={handleNavigate} />
      case "my-store":
        return <MyStore onNavigate={handleNavigate} />
      case "product":
        return currentProductId ? (
          <ProductDetails productId={currentProductId} onNavigate={handleNavigate} />
        ) : (
          <Home onNavigate={handleNavigate} />
        )
      case "statistics":
        return <Statistics />
      case "outfit-generator":
        return <OutfitGenerator onNavigate={handleNavigate} />
      case "pricing":
        return <Pricing />
      case "about":
        return <StaticPages page="about" />
      case "privacy":
        return <StaticPages page="privacy" />
      case "contact":
        return <StaticPages page="contact" />
      case "debug":
        return <Debug />
      case "test-scraper":
        return <TestScraper />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <main className="min-h-screen">{renderPage()}</main>
          <Footer onNavigate={handleNavigate} />
          <Toaster position="top-right" richColors closeButton />
        </div>
      </AuthProvider>
    </LanguageProvider>
  )
}
