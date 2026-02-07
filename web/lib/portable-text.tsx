import type { ReactNode } from "react"

/** Portable Text 块的结构（简化） */
type Block = {
  _type?: string
  _key?: string
  children?: { _type?: string; text?: string }[]
}

/**
 * 从 Sanity Portable Text 中提取所有 block 的 children 文本。
 * 用于未安装 @portabletext/react 时的最简 fallback，不抛错。
 */
export function getPortableTextBlockTexts(value: unknown): string[] {
  if (!value || !Array.isArray(value)) return []
  const texts: string[] = []
  for (const block of value as Block[]) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue
    const line = (block.children as { text?: string }[])
      .map((c) => (c && typeof c.text === "string" ? c.text : ""))
      .join("")
    texts.push(line)
  }
  return texts
}

/**
 * 仅渲染 block 的 children 文本的 fallback，不依赖 @portabletext/react。
 * 若 value 为空或非数组则返回 null。
 */
export function PortableTextFallback({ value }: { value: unknown }): ReactNode {
  const texts = getPortableTextBlockTexts(value)
  if (texts.length === 0) return null
  return (
    <div className="prose prose-sm text-foreground max-w-none">
      {texts.map((text, i) => (
        <p key={i} className="mb-4 last:mb-0">
          {text}
        </p>
      ))}
    </div>
  )
}
