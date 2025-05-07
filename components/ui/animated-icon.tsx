"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedIconProps {
  icon: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  animation?: "pulse" | "bounce" | "spin" | "shake" | "none"
  color?: string
  hoverEffect?: boolean
  onClick?: () => void
}

export function AnimatedIcon({
  icon,
  className,
  size = "md",
  animation = "none",
  color = "text-purple-500",
  hoverEffect = true,
  onClick,
}: AnimatedIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const getAnimationVariants = () => {
    switch (animation) {
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "bounce":
        return {
          animate: {
            y: [0, -5, 0],
          },
          transition: {
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      case "spin":
        return {
          animate: {
            rotate: 360,
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }
      case "shake":
        return {
          animate: {
            x: [0, -3, 3, -3, 0],
          },
          transition: {
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          },
        }
      default:
        return {}
    }
  }

  const animationProps = getAnimationVariants()

  return (
    <motion.div
      className={cn(sizeClasses[size], color, "inline-flex items-center justify-center", className)}
      whileHover={
        hoverEffect
          ? {
              scale: 1.2,
              rotate: animation === "spin" ? 360 : 0,
              transition: { duration: 0.3 },
            }
          : {}
      }
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      {...animationProps}
    >
      {icon}
    </motion.div>
  )
}
