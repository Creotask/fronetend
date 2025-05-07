"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface Card3DProps extends CardProps {
  tiltAmount?: number
  glareEnabled?: boolean
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
  glowColor?: string
}

export function Card3D({
  tiltAmount = 10,
  glareEnabled = true,
  glowOnHover = true,
  glowColor = "rgba(167, 139, 250, 0.3)",
  className,
  children,
  ...props
}: Card3DProps) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 })
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount
    const rotateX = -((mouseY / (rect.height / 2)) * tiltAmount)

    setRotation({ x: rotateX, y: rotateY })

    // Calculate glare position
    const x = (mouseX / rect.width) * 100
    const y = (mouseY / rect.height) * 100
    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("card-3d relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
        boxShadow: isHovered && glowOnHover ? `0 0 30px ${glowColor}` : "none",
      }}
      {...props}
    >
      <Card className={cn("relative overflow-hidden", className)} {...props}>
        {children}

        {glareEnabled && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`,
            }}
          />
        )}
      </Card>
    </motion.div>
  )
}
