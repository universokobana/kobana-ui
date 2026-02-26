import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { RootProvider } from "fumadocs-ui/provider/next"
import "@/styles/globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Kobana UI",
    template: "%s — Kobana UI",
  },
  description:
    "Design System para produtos Kobana. Componentes compostos, reutilizáveis e acessíveis construídos com shadcn/ui.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
