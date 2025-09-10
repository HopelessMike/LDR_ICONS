"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { withAssetPath } from "@/lib/basePath"

// Animazioni particelle
const particleVariants = {
  animate: (i: number) => ({
    y: [0, -80, 0],
    x: [0, 40 * (i % 2 === 0 ? 1 : -1), -40 * (i % 2 === 0 ? 1 : -1), 0],
    opacity: [0, 0.8, 0.8, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 8 + i * 0.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut" as const,
      delay: (i * 0.1) % 1.5, // Deterministic delay based on index
    },
  }),
};

interface LoadingScreenProps {
  progress?: number // Made optional with default handling
  isVisible: boolean
  onLoadingComplete?: () => void
}

export default function LoadingScreen({
  progress: externalProgress, // Renamed to avoid confusion
  isVisible,
  onLoadingComplete = () => {},
}: LoadingScreenProps) {
  const [showScreen, setShowScreen] = useState(isVisible)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false) // Prevent double completion

  const loadingTexts = [
    "Inizializzando sistema FRAGMENT.OS...",
    "Scansionando pattern narrativi...",
    "Estraendo simboli universali...",
    "Compilando output distopico...",
    "Codifica simbolica completata!"
  ]

  // Rileva touch per UX mobile
  useEffect(() => {
    const touch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    setIsTouch(!!touch)
  }, [])

  // Effetto mouse (solo desktop)
  useEffect(() => {
    if (isTouch) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isTouch])

  useEffect(() => {
    if (isVisible && !hasCompleted) {
      setShowScreen(true)
      setDisplayProgress(0)
      setCurrentTextIndex(0)

      const duration = 3500 // Fixed 3.5 seconds duration
      const interval = 50
      const increment = 100 / (duration / interval)

      const progressTimer = setInterval(() => {
        setDisplayProgress((prev) => {
          const next = Math.min(prev + increment, 100)
          if (next >= 100) {
            clearInterval(progressTimer)
            setHasCompleted(true) // Mark as completed
            setTimeout(() => {
              setShowScreen(false)
              onLoadingComplete()
            }, 300)
          }
          return next
        })
      }, interval)

      const textInterval = duration / loadingTexts.length
      const textTimer = setInterval(() => {
        setCurrentTextIndex((prev) => {
          if (prev >= loadingTexts.length - 1) {
            clearInterval(textTimer)
            return prev
          }
          return prev + 1
        })
      }, textInterval)

      return () => {
        clearInterval(progressTimer)
        clearInterval(textTimer)
      }
    }
  }, [isVisible, onLoadingComplete, loadingTexts.length, hasCompleted])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" as const } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  const memoizedParticles = useMemo(() => {
    // Use deterministic values based on index to avoid hydration mismatch
    const generateParticleValue = (index: number, seed: number) => {
      return ((index * seed) % 100) / 100;
    };

    const cyberpunkSymbols = ["█", "▓", "▒", "░", "◆", "◇", "◾", "◽", "▲", "▼", "►", "◄", "⦿", "⦾", "⬡", "⬢", "⬣", "◈", "⟐", "⟡"];
    const techNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "|", "/", "\\", "[", "]", "{", "}", "<", ">", "~"];

    return Array.from({ length: 25 }).map((_, i) => {
      const fontSizeSeed = generateParticleValue(i, 23);
      const colorSeed = generateParticleValue(i, 51);
      const leftSeed = generateParticleValue(i, 73);
      const topSeed = generateParticleValue(i, 89);
      const symbolSeed = generateParticleValue(i, 103);
      
      const allSymbols = [...cyberpunkSymbols, ...techNumbers];
      const symbol = allSymbols[Math.floor(symbolSeed * allSymbols.length)];

      // Use CSS variables for colors that match the theme
      const color = colorSeed > 0.5 
        ? 'oklch(0.60 0.26 25)'     // --destructive (infrared)
        : 'oklch(0.66 0.24 205)';   // --primary (cyan tech)

      const shadowColor = colorSeed > 0.5 
        ? 'oklch(0.60 0.26 25)'
        : 'oklch(0.66 0.24 205)';

      return (
        <motion.div
          key={i}
          className="absolute font-mono font-bold flex items-center justify-center"
          style={{
            fontSize: fontSizeSeed * 18 + 14 + "px",
            color: color,
            left: `${leftSeed * 100}%`,
            top: `${topSeed * 100}%`,
            filter: "blur(0.3px) brightness(1.2)",
            textShadow: `0 0 15px ${shadowColor}60, 0 0 30px ${shadowColor}40`,
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
          custom={i}
          variants={particleVariants}
          animate="animate"
        >
          {symbol}
        </motion.div>
      );
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showScreen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: "oklch(0.08 0.02 240)" // --background dark mode
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Mouse glow effect – solo desktop */}
          {!isTouch && (
            <div
              className="fixed pointer-events-none z-50"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: 200,
                height: 200,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, oklch(0.60 0.26 25 / 0.3) 0%, transparent 50%)`, // --destructive with alpha
                  filter: "blur(20px)",
                }}
              />
            </div>
          )}

          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, oklch(0.60 0.26 25 / 0.06) 0%, transparent 50%)",      // --destructive
                "radial-gradient(circle at 80% 50%, oklch(0.66 0.24 205 / 0.06) 0%, transparent 50%)",     // --primary
                "radial-gradient(circle at 50% 50%, oklch(0.62 0.24 330 / 0.06) 0%, transparent 50%)",     // --accent
                "radial-gradient(circle at 20% 50%, oklch(0.60 0.26 25 / 0.06) 0%, transparent 50%)",      // --destructive
              ],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut" as const,
            }}
          />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">{memoizedParticles}</div>

          <div className="flex flex-col items-center justify-center z-10 relative px-4 md:px-8 w-full max-w-2xl mx-auto min-h-screen">
            {/* Logo Container */}
            <motion.div className="mb-8 md:mb-12 relative flex-shrink-0" variants={itemVariants}>
              <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-black">
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={withAssetPath("/fragment-avatar.png")}
                    alt="FRAGMENT.OS"
                    width={176}
                    height={176}
                    className="w-full h-full object-cover"
                    priority
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.style.display = "none"
                      const fallback = document.getElementById("loading-fallback-icon")
                      if (fallback) {
                        fallback.style.display = "flex"
                      }
                    }}
                  />
                  <div id="loading-fallback-icon" className="absolute inset-0 items-center justify-center hidden">
                    <svg className="w-24 h-24" fill="oklch(0.60 0.26 25)" viewBox="0 0 20 20">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Title - Simple gradient without glitch effect */}
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-center flex-shrink-0" variants={itemVariants}>
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(45deg, oklch(0.60 0.26 25), oklch(0.66 0.24 205), oklch(0.62 0.24 330))"
                }}
              >
                FRAGMENT.OS
              </span>
            </motion.h1>

            {/* Progress bar and loading text container */}
            <motion.div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4 md:space-y-6 mb-8 md:mb-12 flex-shrink-0" variants={itemVariants}>
              <div className="h-2 md:h-3 bg-gray-800/50 backdrop-blur rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(to right, oklch(0.60 0.26 25), oklch(0.66 0.24 205), oklch(0.62 0.24 330))", // theme colors
                    boxShadow: "0 0 20px oklch(0.60 0.26 25 / 0.5)"
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeInOut" as const }}
                />
              </div>

              <motion.div
                className="text-lg md:text-xl text-gray-300 text-center font-medium"
                key={currentTextIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {loadingTexts[currentTextIndex]}
              </motion.div>
            </motion.div>

            {/* Tips */}
            <motion.div
              className="text-sm md:text-base text-gray-400 text-center px-4 md:px-8 mt-6 md:mt-8 flex-shrink-0"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.5,
                times: [0, 0.2, 0.7, 1],
              }}
            >
              {isTouch
                ? "🔮 Sistema: Tocca per esplorare universi narrativi alternativi"
                : "⚡ Sistema: Naviga per accedere al modulo di estrazione simbolica"}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}