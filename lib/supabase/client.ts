import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  console.log("[v0] Supabase config check:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "missing",
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Supabase configuration missing!")
    console.error("Required environment variables:")
    console.error("- SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL (in Vercel)")
    console.error("- SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY (in Vercel)")
    console.error("These are automatically mapped to VITE_* variables in vite.config.ts")

    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: { message: "Supabase not configured. Please add environment variables." },
        }),
        signUp: async () => ({
          data: { user: null, session: null },
          error: { message: "Supabase not configured. Please add environment variables." },
        }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any
  }

  console.log("✅ Creating Supabase client with valid credentials")
  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)

  return supabaseClient
}
