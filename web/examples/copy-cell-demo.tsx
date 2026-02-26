"use client"

import { useState } from "react"

function CopyCellExample({ value, truncate }: { value: string; truncate?: number }) {
  const [copied, setCopied] = useState(false)
  const display = truncate && value.length > truncate
    ? value.slice(0, truncate) + "..."
    : value

  return (
    <div className="group flex items-center gap-1">
      <span className="font-mono text-xs text-muted-foreground" title={value}>
        {display}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-foreground transition-opacity"
      >
        {copied ? "✓" : "⎘"}
      </button>
    </div>
  )
}

export default function CopyCellDemo() {
  const ids = [
    "txn_1234567890abcdef",
    "pay_9876543210fedcba",
    "inv_abcdef1234567890",
  ]

  return (
    <div className="space-y-3">
      {ids.map((id) => (
        <CopyCellExample key={id} value={id} truncate={12} />
      ))}
    </div>
  )
}
