import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { source } from "@/lib/source"
import { SiteHeader } from "@/components/site-header"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </>
  )
}
