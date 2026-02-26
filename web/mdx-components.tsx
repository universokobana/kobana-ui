import type { MDXComponents } from "mdx/types"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { ComponentsList, TemplatesList } from "@/components/components-list"

export function getMDXComponents(): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ComponentSource,
    ComponentsList,
    TemplatesList,
  }
}
