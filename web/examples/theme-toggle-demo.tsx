export default function ThemeToggleDemo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {["☀️ Claro", "🌙 Escuro", "💻 Sistema"].map((label) => (
          <button
            key={label}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
