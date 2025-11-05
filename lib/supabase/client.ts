import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

function getEnvVar(name: string): string {
  // Try Vite env vars first (import.meta.env)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const viteVar = import.meta.env[`VITE_${name}`] || import.meta.env[`VITE_PUBLIC_${name}`]
    if (viteVar) return viteVar
  }

  // Try Next.js env vars (process.env)
  if (typeof process !== "undefined" && process.env) {
    const nextVar = process.env[`NEXT_PUBLIC_${name}`]
    if (nextVar) return nextVar
  }

  // Try window._env_ for runtime injection
  if (typeof window !== "undefined" && (window as any)._env_) {
    const windowVar = (window as any)._env_[name]
    if (windowVar) return windowVar
  }

  return ""
}

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = getEnvVar("SUPABASE_URL")
  const supabaseAnonKey = getEnvVar("SUPABASE_ANON_KEY")

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase configuration missing!")
    console.error("Required environment variables:")
    console.error("- NEXT_PUBLIC_SUPABASE_URL or VITE_SUPABASE_URL")
    console.error("- NEXT_PUBLIC_SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY")
    console.error("Current values:", { supabaseUrl, supabaseAnonKey })

    // Return a mock client to prevent crashes
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: { message: "Supabase not configured" },
        }),
        signUp: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)

  return supabaseClient
}
