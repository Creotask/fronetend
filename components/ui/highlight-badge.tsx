"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HighlightBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "glow" | "pulse" | "gradient"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
}

export function HighlightBadge({ children, className, variant = "default", size = "md", icon }: HighlightBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  }

  const variantClasses = {
    default: "bg-purple-900/30 text-purple-300",
    outline: "border border-purple-500/50 text-purple-300 bg-transparent",
    glow: "bg-purple-900/30 text-purple-300 shadow-lg shadow-purple-500/20",
    pulse: "bg-purple-900/30 text-purple-300",
    gradient: "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300",
  }

  const animations = {
    default: {},
    outline: {},
    glow: {
      animate: {
        boxShadow: [
          "0 0 5px rgba(167, 139, 250, 0.3)",
          "0 0 15px rgba(167, 139, 250, 0.5)",
          "0 0 5px rgba(167, 139, 250, 0.3)",
        ],
      },
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
      },
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    gradient: {
      animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      },
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
      style: {
        backgroundSize: "200% auto",
      },
    },
  }

  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      {...animations[variant]}
    >
      {icon && <span className="text-purple-400">{icon}</span>}
      {children}
    </motion.span>
  )
}
