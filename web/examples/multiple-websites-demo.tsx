"use client"

import { useState } from "react"

// ─── Inline Icons ─────────────────────────────────────────────────────────────

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface WebsiteEntry {
  label: string
  url: string
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export default function MultipleWebsitesDemo() {
  const [websites, setWebsites] = useState<WebsiteEntry[]>([
    { label: "Site", url: "https://empresa.com.br" },
    { label: "Blog", url: "https://blog.empresa.com.br" },
  ])

  function addWebsite() {
    setWebsites([...websites, { label: "", url: "" }])
  }

  function removeWebsite(index: number) {
    setWebsites(websites.filter((_, i) => i !== index))
  }

  function updateWebsite(index: number, field: keyof WebsiteEntry, value: string) {
    const updated = [...websites]
    updated[index] = { ...updated[index], [field]: value }
    setWebsites(updated)
  }

  return (
    <div className="space-y-4">
      {websites.map((website, index) => (
        <div key={index} className="flex items-end gap-4">
          <div className="w-32 space-y-1">
            <label className="text-sm font-medium">Label</label>
            <input
              value={website.label}
              onChange={(e) => updateWebsite(index, "label", e.target.value)}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium">URL</label>
            <input
              type="url"
              value={website.url}
              onChange={(e) => updateWebsite(index, "url", e.target.value)}
              placeholder="https://"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => removeWebsite(index)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addWebsite}
        className="inline-flex h-8 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <PlusIcon className="h-4 w-4" />
        Adicionar website
      </button>
      <div className="rounded-md bg-muted p-3">
        <p className="text-xs font-medium text-muted-foreground">Estado atual:</p>
        <pre className="mt-1 text-xs">{JSON.stringify(websites, null, 2)}</pre>
      </div>
    </div>
  )
}
