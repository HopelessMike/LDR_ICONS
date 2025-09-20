"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { IconReveal } from "@/components/icon-reveal"
import { TerminalText } from "@/components/terminal-text"
import { audioSystem } from "@/lib/audio"
import { AudioControl } from "@/components/audio-control"
import LoadingScreen from "@/components/LoadingScreen"
import LetterGlitch from "@/components/letter-glitch-background"

interface AnalysisResult {
  title: string
  logline: string
  symbols: Array<{
    icon: string
    reason: string
  }>
}

export default function StoryIconizer() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isErrorState, setIsErrorState] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLogline, setShowLogline] = useState(false);
  const [buttonGlitchActive, setButtonGlitchActive] = useState(false);
  const [optionsGlitchActive, setOptionsGlitchActive] = useState(false);
  
  // Simplified loading screen state - only one state needed
  const [isLoading, setIsLoading] = useState(true);

  // Effect for initial mount animation (after loading completes)
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsMounted(true);
      }, 100);
    }
  }, [isLoading]);

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

  // Independent glitch system for Extract Symbols button
  useEffect(() => {
    if (!isAnalyzing && !isLoading) {
      const scheduleButtonGlitch = () => {
        // Random delay between 10-20 seconds for button (more frequent but controlled)
        const delay = 10000 + Math.random() * 10000;
        
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
  }, [isAnalyzing, isLoading])

  // Independent glitch system for Options button (settings)
  useEffect(() => {
    if (!isLoading) {
      const scheduleOptionsGlitch = () => {
        // Random delay between 12-25 seconds for options (more frequent but still independent)
        const delay = 12000 + Math.random() * 13000;
        
        const timeoutId = setTimeout(() => {
          setOptionsGlitchActive(true);
          
          // Options glitch lasts 250ms
          setTimeout(() => {
            setOptionsGlitchActive(false);
          }, 250);
          
          // Schedule next glitch
          scheduleOptionsGlitch();
        }, delay);
        
        return () => clearTimeout(timeoutId);
      };
      
      const cleanup = scheduleOptionsGlitch();
      return cleanup;
    }
  }, [isLoading])

  // Handle loading screen completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Scroll to top after loading
    window.scrollTo(0, 0);
  }, []);

  // Restituisce sempre il path API corretto per ldr-icons:
  // - su michelemiranda.com -> "/ldr-icons/api/analyze-story"
  // - su ldr-icons.vercel.app -> "/api/analyze-story"
  function getAnalyzeApiPath() {
    if (typeof window === 'undefined') return '/api/analyze-story';
    const here = window.location;
    const onPortfolio = here.pathname === '/ldr-icons' || here.pathname.startsWith('/ldr-icons/');
    const base = onPortfolio ? '/ldr-icons/' : '/';
    // "./api/..." forza la risoluzione relativa alla "directory" corrente
    return new URL('./api/analyze-story', `${here.origin}${base}`).toString();
  }

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
      const response = await fetch(getAnalyzeApiPath(), {
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
    const title = "Fragment.OS"
    return (
      <span className="glitch-title select-none" data-text={title}>
        {title}
        <span aria-hidden="true">{title}</span>
        <span aria-hidden="true">{title}</span>
      </span>
    )
  }
  
  const handleTitleComplete = useCallback(() => {
    setTimeout(() => setShowLogline(true), 500)
  }, []);

  // Show loading screen during initial load
  if (isLoading) {
    return (
      <LoadingScreen
        progress={0} // LoadingScreen gestisce internamente il progress
        isVisible={true}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div 
      className="h-dvh bg-black text-white relative flex flex-col overflow-hidden main-container"
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      {/* Letter Glitch Background with configured parameters */}
      <LetterGlitch
        glitchSpeed={10}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />
      
      {/* Background vignette across entire screen */}
      <div className="background-vignette-overlay" />

      {/* Additional subtle overlay for depth */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>
      
      <AudioControl optionsGlitchActive={optionsGlitchActive} />
      
      <div className={`relative z-10 flex flex-col h-full container mx-auto px-4 py-6 md:py-8 transition-transform duration-500 ${isShaking ? 'animate-shake' : ''}`}>
        <div className={`text-center flex-shrink-0 mb-8 transition-all duration-700 px-4 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {/* Title with local vignette for readability */}
          <div className="title-vignette-wrapper">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 relative break-words">{renderTitle()}</h1>
            <div className="text-xs md:text-sm font-mono text-gray-400 tracking-widest opacity-75 break-words px-2 subtle-glow">
              &gt; symbolic_extraction_unit.exe
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full overflow-hidden">
          <div className={`space-y-6 mb-6 md:mb-8 transition-all duration-700 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {/* Textarea with enhanced vignette */}
            <div className="relative component-vignette-wrapper">
              <Textarea
                placeholder="> input_narrative_data..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[120px] md:min-h-[150px] lg:min-h-[180px] w-full bg-black/95 border border-gray-800 text-red-400 font-mono text-base md:text-lg placeholder:text-gray-600 focus:border-red-500 focus:ring-red-500/20 resize-none transition-all duration-300 relative z-1"
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-3 right-3 text-xs font-mono text-gray-600 z-2">{inputText.length}/∞</div>
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                className={`btn-neon-frame ${buttonGlitchActive ? 'animate-idle-glitch' : ''}`}
                aria-busy={isAnalyzing}
              >
                <span>{isAnalyzing ? "PROCESSING..." : "EXTRACT_SYMBOLS"}</span>
                <div className="top" />
                <div className="bottom" />
                <div className="left" />
                <div className="right" />
              </button>
            </div>

            {/* Error message with vignette */}
            {error && (
              <div className="text-center">
                <div className="component-vignette-wrapper inline-block">
                  <div className="text-yellow-400 font-mono text-sm border border-yellow-700/50 bg-yellow-900/20 p-3 rounded">
                    &gt; SYSTEM_ALERT: {error}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results section */}
          <div className={`space-y-8 min-h-[300px] md:min-h-[350px] flex flex-col justify-center transition-all duration-700 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {/* Icons */}
            <div className="icons-vignette mx-auto flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap">
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

            {/* LLM generated text with vignette */}
            <div className="text-center space-y-4 min-h-[100px] flex flex-col justify-center mt-6 md:mt-8 px-4 overflow-hidden">
              {result && showResult && (
                <div className="space-y-4 llm-content-vignette">
                  {showTitle && (
                    <div className="flex justify-center px-2">
                      <TerminalText
                        text={result.title}
                        className={`font-mono tracking-wider mb-3 break-words max-w-full mobile-adaptive-title ${isErrorState ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]' : 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]'}`}
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
                        className="text-xs md:text-sm font-mono text-gray-400 max-w-2xl mx-auto opacity-80 px-4 break-words word-wrap"
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