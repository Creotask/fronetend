"use client"

import { useGamification } from "@/components/gamification/gamification-provider"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export function LevelUpAnimation() {
  const { level } = useGamification()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Hide animation after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 rounded-lg shadow-lg text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
              <div className="flex items-center justify-center mb-2">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-20 mb-2`}>
                  {level.icon}
                </div>
              </div>
              <p className="text-xl">You are now a</p>
              <p className="text-3xl font-bold mb-2">{level.title}</p>
              <p className="text-sm opacity-80">Keep up the great work!</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
