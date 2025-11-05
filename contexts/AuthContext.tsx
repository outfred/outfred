"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "../lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "merchant" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const convertSupabaseUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
      role: supabaseUser.user_metadata?.role || "user",
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("[v0] Checking authentication status...")
        const {
          data: { session },
        } = await supabase.auth.getSession()

        console.log("[v0] Session check result:", session ? "User logged in" : "No session")

        if (session?.user) {
          setUser(convertSupabaseUser(session.user))
        }
      } catch (error) {
        console.error("[v0] Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[v0] Auth state changed:", _event)
      if (session?.user) {
        setUser(convertSupabaseUser(session.user))
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log("[v0] Attempting Supabase login for:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("[v0] Supabase login error:", error)
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error("No user data received")
      }

      console.log("[v0] User logged in via Supabase:", data.user.email)
      setUser(convertSupabaseUser(data.user))
    } catch (error: any) {
      console.error("[v0] Login failed:", error)
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Invalid email or password. Please check your credentials and try again.")
      } else if (error.message.includes("Email not confirmed")) {
        throw new Error("Please verify your email address before logging in.")
      } else {
        throw new Error(error.message || "Login failed. Please try again later.")
      }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      console.log("📝 Attempting Supabase registration for:", email)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: "user",
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (error) {
        console.error("❌ Supabase registration error:", error)
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error("No user data received")
      }

      console.log("✅ User registered via Supabase:", data.user.email)

      const { generateVerificationCode, sendEmail, emailTemplates } = await import("../utils/emailTemplates")
      const { notificationService } = await import("../utils/notificationService")
      const verificationCode = generateVerificationCode()

      localStorage.setItem(
        `verification_code_${email}`,
        JSON.stringify({
          code: verificationCode,
          timestamp: Date.now(),
          expires: Date.now() + 10 * 60 * 1000,
          userId: data.user.id,
        }),
      )

      const currentLang = (localStorage.getItem("language") || "ar") as "ar" | "en"
      const welcomeTemplate = emailTemplates.welcome(name, currentLang)

      await sendEmail(email, welcomeTemplate.subject, welcomeTemplate.body)

      console.log("📧 Welcome email sent")

      if (data.user.id) {
        notificationService.sendWelcomeNotification(data.user.id, name, currentLang)
      }

      // Set user after successful registration
      setUser(convertSupabaseUser(data.user))
    } catch (error: any) {
      console.error("❌ Registration failed:", error)
      if (error.message.includes("already registered")) {
        throw new Error("This email is already registered. Please login instead.")
      }
      throw error
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
