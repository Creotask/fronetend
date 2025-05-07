"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  distance?: number
  staggerChildren?: number
  staggerDirection?: "forward" | "reverse"
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  distance = 50,
  staggerChildren = 0.1,
  staggerDirection = "forward",
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "none":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimatePosition = () => {
    return { opacity: 1, x: 0, y: 0 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
        staggerDirection: staggerDirection === "reverse" ? -1 : 1,
      },
    },
  }

  const itemVariants = {
    hidden: getInitialPosition(),
    visible: {
      ...getAnimatePosition(),
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for a nice easing
      },
    },
  }

  // If there's only one child, don't use staggering
  const isSingleChild = React.Children.count(children) === 1

  if (isSingleChild) {
    return (
      <motion.div
        className={className}
        initial={getInitialPosition()}
        whileInView={getAnimatePosition()}
        viewport={{ once, amount: threshold }}
        transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn("flex flex-col", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
