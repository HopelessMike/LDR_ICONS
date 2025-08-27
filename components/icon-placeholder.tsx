"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface IconPlaceholderProps {
  isAnimating: boolean
  delay?: number
}

export function IconPlaceholder({ isAnimating, delay = 0 }: IconPlaceholderProps) {
  return (
    <Card className="p-8 bg-card/20 border-border/30 h-48 flex items-center justify-center relative overflow-hidden">
      <div className="text-center space-y-4">
        <div
          className={cn(
            "w-16 h-16 mx-auto rounded-lg bg-muted/30 flex items-center justify-center transition-all duration-300",
            isAnimating && "animate-pulse",
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          <div className="w-8 h-8 bg-muted-foreground/20 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted/20 rounded animate-pulse" />
          <div className="h-2 bg-muted/10 rounded animate-pulse w-3/4 mx-auto" />
        </div>
      </div>

      {/* Animated scanning effect */}
      {isAnimating && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-scan"
          style={{ animationDelay: `${delay}ms` }}
        />
      )}
    </Card>
  )
}
