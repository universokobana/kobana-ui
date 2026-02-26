export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 md:h-14 md:flex-row md:px-8">
        <p className="text-sm text-muted-foreground">
          Kobana UI Design System.
        </p>
        <p className="text-sm text-muted-foreground">
          Inspirado no{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            shadcn/ui
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
