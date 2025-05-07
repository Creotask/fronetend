"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 50, className = "", onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, delay, text, onComplete])

  return <span className={className}>{displayText}</span>
}

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  highlightWords?: string[]
  highlightClassName?: string
  staggerChildren?: number
  animation?: "fade" | "slide" | "bounce" | "scale" | "typewriter"
  delay?: number
}

export function AnimatedText({
  text,
  className = "",
  once = false,
  highlightWords = [],
  highlightClassName = "text-purple-400",
  staggerChildren = 0.03,
  animation = "fade",
  delay = 0,
}: AnimatedTextProps) {
  if (animation === "typewriter") {
    return <Typewriter text={text} className={className} />
  }

  // Split text into words
  const words = text.split(" ")

  // Prepare variants based on animation type
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const getWordVariants = () => {
    switch (animation) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
        }
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 10 } },
        }
      case "scale":
        return {
          hidden: { scale: 0.5, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
        }
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
        }
    }
  }

  const wordVariants = getWordVariants()

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightWords.includes(word)
        return (
          <React.Fragment key={i}>
            <motion.span className={`inline-block ${isHighlighted ? highlightClassName : ""}`} variants={wordVariants}>
              {word}
            </motion.span>
            {i !== words.length - 1 && " "}
          </React.Fragment>
        )
      })}
    </motion.span>
  )
}

interface GradientTextProps {
  text: string
  className?: string
  gradient?: string
  animate?: boolean
  children?: React.ReactNode
}

export function GradientText({
  text,
  className = "",
  gradient = "from-purple-400 to-indigo-400",
  animate = false,
  children,
}: GradientTextProps) {
  if (animate) {
    return (
      <motion.span
        className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}
        initial={{ backgroundPosition: "-100%" }}
        animate={{ backgroundPosition: "200%" }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        style={{ backgroundSize: "200% auto" }}
      >
        {text || children}
      </motion.span>
    )
  }

  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}>
      {text || children}
    </span>
  )
}

interface AnimatedTagProps {
  text: string
  icon?: React.ReactNode
  className?: string
  glowColor?: string
}

export function AnimatedTag({ text, icon, className = "", glowColor = "purple" }: AnimatedTagProps) {
  const glowClasses = {
    purple: "shadow-purple-500/30",
    indigo: "shadow-indigo-500/30",
    blue: "shadow-blue-500/30",
    green: "shadow-green-500/30",
    amber: "shadow-amber-500/30",
  }

  return (
    <motion.div
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(167, 139, 250, 0.5)" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex items-center"
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
        {text}
      </motion.span>
    </motion.div>
  )
}

export function LogoText({ className = "" }: { className?: string }) {
  const letters = "CreoTask".split("")

  return (
    <div className={`flex items-center ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="text-xl font-bold inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.2,
            color: "#a78bfa",
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}
