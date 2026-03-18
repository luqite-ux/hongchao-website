export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-foreground font-semibold">未找到资源</p>
      <p className="text-sm text-muted-foreground mt-2">请确认该资源已在 Sanity 中创建并发布。</p>
    </div>
  )
}

