import type { MDXComponents } from "mdx/types"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"

export function getMDXComponents(): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ComponentSource,
  }
}
