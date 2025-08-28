"use client"

import { useState, useEffect } from "react"
import { Settings, Volume2, VolumeX } from "lucide-react"
import { audioSystem } from "@/lib/audio"
import { cn } from "@/lib/utils"

interface AudioControlProps {
  optionsGlitchActive?: boolean
}

export function AudioControl({ optionsGlitchActive = false }: AudioControlProps) {
  const [isEnabled, setIsEnabled] = useState(true)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    setIsEnabled(audioSystem.getEnabled())
    // Set default low volume
    audioSystem.setVolume(0.15)
  }, [])


  const toggleAudio = () => {
    const newEnabled = !isEnabled
    setIsEnabled(newEnabled)
    audioSystem.setEnabled(newEnabled)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`p-2 rounded bg-black/90 border border-gray-800 text-gray-400 hover:text-cyan-400 hover:animate-hover-glitch transition-colors duration-200 ${optionsGlitchActive ? 'animate-idle-glitch' : ''}`}
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      {showPanel && (
        <div className="absolute top-12 right-0 bg-black/95 border border-gray-700 rounded p-3 min-w-[160px]">
          <div className="text-xs font-mono text-gray-300 mb-2">SYSTEM_AUDIO</div>
          <button
            onClick={toggleAudio}
            className={cn(
              "w-full flex items-center gap-2 p-2 rounded text-sm font-mono transition-colors duration-200 hover:animate-hover-glitch",
              isEnabled 
                ? "text-cyan-400 bg-cyan-950/30 hover:bg-cyan-950/50" 
                : "text-gray-500 hover:bg-gray-800/50"
            )}
          >
            {isEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {isEnabled ? "AUDIO_ENABLED" : "AUDIO_DISABLED"}
          </button>
        </div>
      )}
    </div>
  )
}