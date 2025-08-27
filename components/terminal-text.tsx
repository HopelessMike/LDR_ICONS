"use client"

import { useState, useEffect } from "react"
import { audioSystem } from "@/lib/audio"

interface TerminalTextProps {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
  enableBackspace?: boolean // Abilita effetto cancellazione casuale
  enableSound?: boolean // Abilita suoni typewriter
}

export function TerminalText({ text, className = "", delay = 0, onComplete, enableBackspace = false, enableSound = false }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Reset when text changes
  useEffect(() => {
    setDisplayText("")
    setShowCursor(false)
    setIsComplete(false)
  }, [text])
  
  useEffect(() => {
    if (!text) return

    let timeoutId: NodeJS.Timeout
    let currentIndex = 0

    const startTyping = () => {
      setShowCursor(true)
      
      // Only typewriter sounds for tagline, no boot sound
      
      const typeChar = () => {
        if (currentIndex < text.length) {
          // Check for backspace effect (1% chance, if enabled)
          const shouldBackspace = enableBackspace && 
                                  Math.random() < 0.01 && 
                                  currentIndex > 2 && 
                                  currentIndex < text.length - 3
          
          if (shouldBackspace) {
            // Backspace effect: delete 2-3 characters then resume
            const backspaceCount = 2 + Math.floor(Math.random() * 2) // 2-3 chars
            const backspaceSpeed = 60 // backspace speed
            
            const performBackspace = (remaining: number) => {
              if (remaining > 0 && currentIndex > 0) {
                currentIndex--
                setDisplayText(text.slice(0, currentIndex))
                timeoutId = setTimeout(() => performBackspace(remaining - 1), backspaceSpeed)
              } else {
                // Pause after backspace, then resume
                timeoutId = setTimeout(typeChar, 150)
              }
            }
            
            performBackspace(backspaceCount)
            return
          }
          
          setDisplayText(text.slice(0, currentIndex + 1))
          const char = text[currentIndex] // Current character being added
          currentIndex++
          
          // Play typewriter sound for visible characters (not spaces)
          if (enableSound && char && char !== ' ') {
            audioSystem.playTypewriter()
          }
          
          // Variable speed: faster for spaces, slower for special chars
          let nextDelay = 30 // base speed
          
          if (char === ' ') {
            nextDelay = 15 // fast spaces
          } else if (['.', '!', '?', ':', ';'].includes(char)) {
            nextDelay = 120 // long pauses after punctuation
          } else if (['>', '<', '|', '/', '\\', '-', '_'].includes(char)) {
            nextDelay = 80 // slower technical characters
          } else if (Math.random() > 0.85) {
            nextDelay = 120 + Math.random() * 100 // occasional random pauses
          } else {
            nextDelay = 25 + Math.random() * 40 // normal random variation
          }
          
          timeoutId = setTimeout(typeChar, nextDelay)
        } else {
          // Finished - keep cursor for a bit, then hide
          setTimeout(() => {
            setShowCursor(false)
            setIsComplete(true)
            onComplete?.()
          }, 800)
        }
      }
      
      typeChar()
    }

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay)
    } else {
      startTyping()
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [text, delay, onComplete, enableBackspace, enableSound])


  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-current terminal-cursor">
        </span>
      )}
    </span>
  )
}