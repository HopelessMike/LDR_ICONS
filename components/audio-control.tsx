"use client"

import { useState, useEffect } from "react"
import { Settings, Volume2, VolumeX } from "lucide-react"
import { audioSystem } from "@/lib/audio"
import { cn } from "@/lib/utils"

export function AudioControl() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [showPanel, setShowPanel] = useState(false)
  const [audioGlitchActive, setAudioGlitchActive] = useState(false)

  useEffect(() => {
    setIsEnabled(audioSystem.getEnabled())
    // Set default low volume
    audioSystem.setVolume(0.15)
  }, [])

  // Independent glitch system for audio control
  useEffect(() => {
    const scheduleAudioGlitch = () => {
      // Random delay between 40-80 seconds for audio control
      const delay = 40000 + Math.random() * 40000;
      
      const timeoutId = setTimeout(() => {
        setAudioGlitchActive(true);
        
        // Audio control glitch lasts 250ms
        setTimeout(() => {
          setAudioGlitchActive(false);
        }, 250);
        
        // Schedule next glitch
        scheduleAudioGlitch();
      }, delay);
      
      return () => clearTimeout(timeoutId);
    };
    
    const cleanup = scheduleAudioGlitch();
    return cleanup;
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
        className={`p-2 rounded bg-black/90 border border-gray-800 text-gray-400 hover:text-cyan-400 transition-colors duration-200 ${audioGlitchActive ? 'animate-idle-glitch' : ''}`}
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
              "w-full flex items-center gap-2 p-2 rounded text-sm font-mono transition-colors duration-200",
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