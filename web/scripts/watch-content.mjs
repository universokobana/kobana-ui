import { FSWatcher } from "chokidar"
import { execSync } from "child_process"

const watcher = new FSWatcher({
  ignoreInitial: true,
  persistent: true,
  ignored: [".source"],
})

watcher.add("content/docs")
watcher.add("source.config.ts")

let debounceTimer

watcher.on("ready", () => {
  console.log("[watch-content] watching content/docs for changes...")
})

watcher.on("all", (event, file) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    console.log(`[watch-content] ${event}: ${file} — regenerating .source...`)
    try {
      execSync("npx fumadocs-mdx", { stdio: "inherit" })
    } catch {
      console.error("[watch-content] failed to regenerate .source")
    }
  }, 300)
})

process.on("SIGINT", () => {
  watcher.close()
  process.exit(0)
})
