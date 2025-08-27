"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { IconReveal } from "@/components/icon-reveal"
import { TerminalText } from "@/components/terminal-text"
import { audioSystem } from "@/lib/audio"
import { AudioControl } from "@/components/audio-control"

interface AnalysisResult {
  title: string
  logline: string
  symbols: Array<{
    icon: string
    reason: string
  }>
}

interface GlitchEffect {
  type: "cinematic-1" | "cinematic-2" | "position-shift"
  intensity: number
}

export default function StoryIconizer() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [glitchedLetters, setGlitchedLetters] = useState<Map<number, GlitchEffect>>(new Map())
  const [error, setError] = useState<string | null>(null)
  const [isErrorState, setIsErrorState] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLogline, setShowLogline] = useState(false);
  const [buttonGlitchActive, setButtonGlitchActive] = useState(false);

  // Effect for initial mount animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect for mouse position tracking (spotlight effect)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  // Effect for title glitching
  useEffect(() => {
    const createGlitchEffect = () => {
      const title = "FRAGMENT.OS" // UPDATED TITLE
      const titleLength = title.length
      const randomIndex = Math.floor(Math.random() * titleLength)
      
      if (title[randomIndex] === ' ' || title[randomIndex] === '.') return;

      const effects: GlitchEffect["type"][] = ["cinematic-1", "cinematic-2", "position-shift"]
      const randomEffect = effects[Math.floor(Math.random() * effects.length)]
      const intensity = Math.random() * 0.9 + 0.3

      setGlitchedLetters((prev) =>
        new Map(prev).set(randomIndex, {
          type: randomEffect,
          intensity,
        }),
      )

      const effectDuration = Math.random() * 1000 + 500

      setTimeout(
        () => {
          setGlitchedLetters((prev) => {
            const newMap = new Map(prev)
            newMap.delete(randomIndex)
            return newMap
          })
        },
        effectDuration,
      )
    }

    const scheduleNextGlitch = () => {
      const interval = Math.random() * 8000 + 10000; // Much less frequent: 10-18 seconds

      const timeoutId = setTimeout(() => {
        createGlitchEffect()
        scheduleNextGlitch()
      }, interval)

      return () => clearTimeout(timeoutId);
    }

    const clear = scheduleNextGlitch()
    return clear;
  }, [])

  // Independent glitch system for Extract Symbols button
  useEffect(() => {
    if (!isAnalyzing) {
      const scheduleButtonGlitch = () => {
        // Random delay between 25-60 seconds for button
        const delay = 25000 + Math.random() * 35000;
        
        const timeoutId = setTimeout(() => {
          setButtonGlitchActive(true);
          
          // Button glitch lasts 300ms
          setTimeout(() => {
            setButtonGlitchActive(false);
          }, 300);
          
          // Schedule next glitch
          scheduleButtonGlitch();
        }, delay);
        
        return () => clearTimeout(timeoutId);
      };
      
      const cleanup = scheduleButtonGlitch();
      return cleanup;
    }
  }, [isAnalyzing])

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    // Play scanning sound immediately on button press
    audioSystem.playScanning()

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    setIsAnalyzing(true)
    setShowResult(false)
    setResult(null)
    setError(null)
    setIsErrorState(false)
    setShowTitle(false)
    setShowLogline(false)

    try {
      const response = await fetch("/api/analyze-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
        signal: AbortSignal.timeout(15000),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Analysis failed")
      }

      const data = await response.json()
      
      setResult(data)
      setShowResult(true)
      setIsAnalyzing(false)
      
      setTimeout(() => {
        setShowTitle(true)
      }, 2600)
      
    } catch (error: any) {
      console.error("Analysis error:", error)
      setError(error.message || "An unexpected error occurred")
      setIsErrorState(true)
      
      const errorResult = {
        title: "SYSTEM_FAILURE",
        logline: "neural_network_corruption → connection_terminated",
        symbols: [
          { icon: "satellite", reason: "signal_lost" },
          { icon: "memory", reason: "data_corruption" },
          { icon: "ghost", reason: "phantom_process" },
        ],
      }
      
      setResult(errorResult)
      setShowResult(true)
      setIsAnalyzing(false)
      
      setTimeout(() => {
        setShowTitle(true)
        setTimeout(() => { setShowLogline(true) }, 1500)
      }, 2600)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAnalyze()
    }
  }

  const renderTitle = () => {
    const title = "FRAGMENT.OS" // UPDATED TITLE
    return title.split("").map((char, index) => {
      const glitch = glitchedLetters.get(index)
      const isFragment = index < 8; // UPDATED LOGIC FOR COLOR SPLIT
      const baseColor = isFragment ? "text-red-500" : "text-cyan-400"
      const baseShadow = isFragment
        ? "drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] drop-shadow-[0_0_40px_rgba(239,68,68,0.4)]"
        : "drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]"

      let glitchClasses = ""
      let glitchStyle: React.CSSProperties = {}

      if (glitch) {
        switch (glitch.type) {
          case "cinematic-1":
            glitchClasses = 'animate-glitch-cinematic-1';
            break;
          case "cinematic-2":
            glitchClasses = 'animate-glitch-cinematic-2';
            break;
          case "position-shift":
            glitchStyle = {
              transform: `translate(${(Math.random() - 0.5) * glitch.intensity * 8}px, ${(Math.random() - 0.5) * glitch.intensity * 4}px)`,
              filter: `blur(${glitch.intensity * 1.5}px)`,
            }
            glitchClasses = baseColor
            break;
        }
      } else {
        glitchClasses = `${baseColor} ${baseShadow}`
      }

      return (
        <span 
          key={index} 
          className={`relative transition-all duration-100 font-mono ${glitchClasses}`} 
          style={glitchStyle}
          data-text={char}
        >
          {char}
        </span>
      )
    })
  }
  
  const handleTitleComplete = useCallback(() => {
    setTimeout(() => setShowLogline(true), 500)
  }, []);


  return (
    <div 
      className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden main-container"
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      <AudioControl />
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-cyan-950/20" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(220,38,38,0.03)_25%,rgba(220,38,38,0.03)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.03)_75%,rgba(6,182,212,0.03)_76%,transparent_77%)] bg-[length:100%_8px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 static-overlay" />
      </div>
      
      <div className={`relative z-10 flex flex-col h-full container mx-auto px-4 py-8 transition-transform duration-500 ${isShaking ? 'animate-shake' : ''}`}>
        <div className={`text-center flex-shrink-0 mb-8 transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4 tracking-wider relative">{renderTitle()}</h1>
          <div className="text-xs md:text-sm font-mono text-gray-500 tracking-widest opacity-60">
            &gt; symbolic_extraction_unit.exe
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
          <div className={`space-y-6 mb-8 transition-all duration-700 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="relative">
              <Textarea
                placeholder="> input_narrative_data..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[120px] md:min-h-[150px] lg:min-h-[180px] w-full bg-black/90 border border-gray-800 text-red-400 font-mono text-base md:text-lg placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500/20 resize-none transition-all duration-300"
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-3 right-3 text-xs font-mono text-gray-600">{inputText.length}/∞</div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                className={`px-6 md:px-8 py-3 bg-red-900/30 hover:bg-red-800/40 border border-red-700/50 text-red-400 font-mono tracking-wider transition-all duration-300 disabled:opacity-30 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] text-sm md:text-base ${buttonGlitchActive ? 'animate-idle-glitch' : ''}`}
              >
                {isAnalyzing ? "PROCESSING..." : "EXTRACT_SYMBOLS"}
              </Button>
            </div>

            {error && (
              <div className="text-center">
                <div className="text-yellow-400 font-mono text-sm border border-yellow-700/50 bg-yellow-900/20 p-3 rounded">
                  &gt; SYSTEM_ALERT: {error}
                </div>
              </div>
            )}
          </div>

          <div className={`space-y-8 min-h-[300px] md:min-h-[350px] flex flex-col justify-center transition-all duration-700 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex justify-center items-center gap-6 md:gap-8 lg:gap-12 flex-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <IconReveal
                  key={index}
                  icon={result?.symbols[index]?.icon || ""}
                  reason={result?.symbols[index]?.reason || ""}
                  show={showResult}
                  isAnalyzing={isAnalyzing}
                  isError={isErrorState}
                  slotIndex={index}
                />
              ))}
            </div>

            <div className="text-center space-y-4 min-h-[120px] md:min-h-[100px] flex flex-col justify-center mt-8">
              {result && showResult && (
                <div className="space-y-4">
                  {showTitle && (
                    <div className="flex justify-center">
                      <TerminalText
                        text={result.title}
                        className={`text-xl md:text-2xl font-mono tracking-wider mb-3 ${isErrorState ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]' : 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]'}`}
                        delay={100}
                        onComplete={handleTitleComplete}
                        enableSound={true}
                      />
                    </div>
                  )}
                  
                  {showLogline && (
                    <div className="flex justify-center">
                      <TerminalText
                        text={result.logline}
                        className="text-xs md:text-sm font-mono text-gray-400 max-w-2xl mx-auto opacity-80 px-4"
                        delay={0}
                        enableBackspace={true}
                        enableSound={true}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}