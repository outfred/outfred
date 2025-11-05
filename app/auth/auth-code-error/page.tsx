export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-4">There was an error authenticating your account.</p>
        <a href="/login" className="text-primary hover:underline">
          Return to login
        </a>
      </div>
    </div>
  )
}
