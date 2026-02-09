import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { Stack, Card } from '@sanity/ui'

/** 当视频文件已上传时，在下方显示可播放预览 */
export function VideoFilePreview(props: {
  value?: { asset?: { _ref?: string } }
  renderDefault: (props: unknown) => React.ReactNode
}) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [url, setUrl] = useState<string | null>(null)
  const ref = props.value?.asset?._ref

  useEffect(() => {
    if (!ref) {
      setUrl(null)
      return
    }
    let cancelled = false
    client
      .fetch<{ url?: string } | null>(`*[_id == $ref][0]{ url }`, { ref })
      .then((doc) => {
        if (!cancelled && doc?.url) setUrl(doc.url)
      })
      .catch(() => {
        if (!cancelled) setUrl(null)
      })
    return () => {
      cancelled = true
    }
  }, [client, ref])

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {url && (
        <Card padding={2} radius={2} shadow={1} tone="transparent">
          <p style={{ margin: '0 0 8px 0', fontSize: 12, color: 'var(--card-muted-fg-color)' }}>
            预览（上传后可在此播放）
          </p>
          <video
            src={url}
            controls
            playsInline
            style={{ width: '100%', maxHeight: 320, background: '#000' }}
          />
        </Card>
      )}
    </Stack>
  )
}
