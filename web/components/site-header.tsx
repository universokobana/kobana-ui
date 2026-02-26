import Link from "next/link"
import { Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold">
          Kobana UI
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/docs"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/status-badge"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/kobana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
