"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage } from "lucide-react"

export type Certification = {
  title: string
  issuer: string
  standard: string
  scope: string
  validUntil: string
  image: string
}

export function CertificationCard({ cert }: { cert: Certification }) {
  const [imgError, setImgError] = useState(false)
  return (
    <Card className="group/card border-border flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {!imgError ? (
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover/card:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground p-4">
            <FileImage className="h-12 w-12" />
            <span className="text-sm text-center">认证图片</span>
          </div>
        )}
        {/* 桌面端 hover 时在图片上显示详情 */}
        <div className="absolute inset-0 bg-foreground/92 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 flex flex-col justify-end p-4 hidden md:flex">
          <div className="text-background text-sm space-y-1.5">
            <p><span className="font-semibold">Issuer:</span> {cert.issuer}</p>
            <p><span className="font-semibold">Standard:</span> {cert.standard}</p>
            <p><span className="font-semibold">Scope:</span> {cert.scope}</p>
            <p><span className="font-semibold">Valid until:</span> {cert.validUntil}</p>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-base leading-snug">{cert.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4 flex-1 space-y-2 text-sm text-muted-foreground">
        <p><span className="font-medium text-foreground">Issuer:</span> {cert.issuer}</p>
        <p><span className="font-medium text-foreground">Standard:</span> {cert.standard}</p>
        {cert.scope && <p><span className="font-medium text-foreground">Scope:</span> {cert.scope}</p>}
        <p><span className="font-medium text-foreground">Valid until:</span> {cert.validUntil}</p>
      </CardContent>
    </Card>
  )
}
