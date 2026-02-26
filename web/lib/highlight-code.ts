import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Highlighter | null = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["tsx", "typescript", "bash", "json", "css"],
    })
  }
  return highlighter
}

export async function highlightCode(
  code: string,
  lang: string = "tsx",
): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
  })
}
