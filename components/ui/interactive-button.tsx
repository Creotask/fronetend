"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface InteractiveButtonProps extends ButtonProps {
  glowColor?: string
  hoverScale?: number
  rippleEffect?: boolean
  glowOnHover?: boolean
  children: React.ReactNode
}

export function InteractiveButton({
  className,
  variant = "default",
  size = "default",
  glowColor = "rgba(167, 139, 250, 0.5)",
  hoverScale = 1.03,
  rippleEffect = true,
  glowOnHover = true,
  children,
  ...props
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true)

    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        x,
        y,
        id: Date.now(),
      }

      setRipples((prevRipples) => [...prevRipples, newRipple])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <motion.div
      whileHover={glowOnHover ? { boxShadow: `0 0 20px ${glowColor}` } : {}}
      whileTap={{ scale: 0.98 }}
      initial={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
      className="relative rounded-md overflow-hidden"
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={cn("relative overflow-hidden touch-effect", className)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        {...props}
      >
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: isPressed ? 0.97 : 1 }}
          transition={{ duration: 0.1 }}
          className="relative z-10 flex items-center justify-center"
        >
          {children}
        </motion.span>

        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: ripple.y,
              left: ripple.x,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
      </Button>
    </motion.div>
  )
}

export function GradientButton({ className, variant = "default", size = "default", children, ...props }: ButtonProps) {
  return (
    <InteractiveButton
      variant={variant}
      size={size}
      className={cn(
        "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none",
        className,
      )}
      glowColor="rgba(167, 139, 250, 0.5)"
      {...props}
    >
      {children}
    </InteractiveButton>
  )
}
