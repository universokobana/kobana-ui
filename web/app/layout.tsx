import type { Metadata } from "next"
import { Work_Sans, Syne } from "next/font/google"
import { RootProvider } from "fumadocs-ui/provider/next"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Kobana UI",
    template: "%s — Kobana UI",
  },
  description:
    "Design System para produtos Kobana. Componentes compostos, reutilizáveis e acessíveis construídos com shadcn/ui.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#D3FD54",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Kobana UI",
    description:
      "Design System para produtos Kobana. Componentes compostos, reutilizáveis e acessíveis construídos com shadcn/ui.",
    type: "website",
    siteName: "Kobana UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobana UI",
    description:
      "Design System para produtos Kobana. Componentes compostos, reutilizáveis e acessíveis construídos com shadcn/ui.",
  },
  other: {
    "msapplication-TileColor": "#D3FD54",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${workSans.variable} ${syne.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RootProvider>
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
