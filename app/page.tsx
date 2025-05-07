"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Award, Briefcase, ChevronDown, Sparkles, Star, Users } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGamification } from "@/components/gamification/gamification-provider"
import { AnimatedText, GradientText, AnimatedTag } from "@/components/animated-text"
import { HighlightBadge } from "@/components/ui/highlight-badge"
import { InteractiveButton, GradientButton } from "@/components/ui/interactive-button"
import { Card3D } from "@/components/ui/card-3d"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Home() {
  const { addPoints } = useGamification()
  const [activeFeature, setActiveFeature] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 })

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Rotate through features every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Add points when user visits homepage (demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      addPoints(5, "Exploring the platform")
    }, 3000)

    return () => clearTimeout(timer)
  }, [addPoints])

  // Detect scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  // Calculate parallax positions based on mouse movement
  const calculateParallaxPosition = (depth = 20) => {
    const x = (mousePosition.x - 0.5) * depth
    const y = (mousePosition.y - 0.5) * depth
    return { x, y }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/40 to-gray-950"></div>

          {/* Animated background elements */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              x: calculateParallaxPosition(40).x,
              y: calculateParallaxPosition(40).y,
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            style={{
              x: calculateParallaxPosition(-30).x,
              y: calculateParallaxPosition(-30).y,
            }}
          />
        </motion.div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              x: calculateParallaxPosition(20).x,
              y: calculateParallaxPosition(20).y,
            }}
          />

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <AnimatedTag
                text="Freelancing Reimagined"
                icon={<Sparkles className="h-3.5 w-3.5 mr-1.5" />}
                className="bg-purple-900/30 text-purple-300 mb-2 w-fit"
                glowColor="purple"
              />

              <div className="space-y-4">
                <div className="overflow-hidden">
                  <motion.h1
                    className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none font-poppins"
                    initial={{ y: 100 }}
                    animate={heroInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <GradientText animate={true} gradient="from-purple-400 via-indigo-400 to-purple-400">
                      Where Creativity Meets Opportunity
                    </GradientText>
                  </motion.h1>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={heroInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <AnimatedText
                      text="Connect with top clients, showcase your skills, and win exciting contests on the ultimate freelancing platform."
                      className="max-w-[600px] text-gray-300 md:text-xl leading-relaxed"
                      animation="slide"
                      staggerChildren={0.01}
                      highlightWords={["top", "skills", "win", "ultimate"]}
                      highlightClassName="text-purple-400 font-medium"
                    />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="flex flex-col gap-3 min-[400px]:flex-row pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GradientButton size="lg" asChild>
                  <Link href="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GradientButton>
                <InteractiveButton
                  variant="outline"
                  size="lg"
                  className="border-purple-700 hover:bg-purple-900/20 transition-all text-purple-300 hover:text-purple-200 font-medium"
                  asChild
                >
                  <Link href="/contests">Browse Contests</Link>
                </InteractiveButton>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium text-white border-2 border-gray-900"
                      initial={{ opacity: 0, scale: 0, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ y: -3, scale: 1.1 }}
                    >
                      {String.fromCharCode(65 + i)}
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-purple-400 font-medium">2,500+</span> freelancers joined this month
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="mx-auto lg:mx-0 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-20 blur-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  style={{
                    x: calculateParallaxPosition(15).x,
                    y: calculateParallaxPosition(15).y,
                  }}
                />
                <Card3D className="relative z-10 w-full h-full shadow-xl gradient-border-modern">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 z-10"></div>
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="CreoTask Platform"
                    className="object-cover w-full h-full"
                  />
                </Card3D>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full opacity-70 blur-xl"></div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -left-10 top-1/4 glass-modern p-3 rounded-xl shadow-lg z-20 flex items-center gap-2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={heroInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="animate-float-slow"
                  style={{
                    x: calculateParallaxPosition(-25).x,
                    y: calculateParallaxPosition(-25).y,
                  }}
                >
                  <AnimatedIcon
                    icon={<Award className="h-4 w-4 text-white" />}
                    animation="pulse"
                    className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center"
                  />
                  <div>
                    <p className="text-xs font-medium text-white">Top Rated</p>
                    <p className="text-xs text-gray-400">Freelancer</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-10 bottom-1/4 glass-modern p-3 rounded-xl shadow-lg z-20"
                  initial={{ x: 50, opacity: 0 }}
                  animate={heroInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="animate-float-slow"
                  style={{
                    x: calculateParallaxPosition(25).x,
                    y: calculateParallaxPosition(25).y,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AnimatedIcon
                      icon={<Briefcase className="h-4 w-4 text-white" />}
                      animation="bounce"
                      className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center"
                    />
                    <div>
                      <p className="text-xs font-medium text-white">$2,500</p>
                      <p className="text-xs text-gray-400">Avg. Contest</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p className="text-sm text-gray-400 mb-2">Discover how it works</p>
            <AnimatedIcon
              icon={<ChevronDown className="h-6 w-6 text-purple-400" />}
              animation="bounce"
              className="animate-bounce"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950/30 to-gray-950 -z-10"></div>

        {/* Background decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -z-10"
          style={{
            x: calculateParallaxPosition(-20).x,
            y: calculateParallaxPosition(-20).y,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -z-10"
          style={{
            x: calculateParallaxPosition(20).x,
            y: calculateParallaxPosition(20).y,
          }}
        />

        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7 }}
            >
              <HighlightBadge variant="pulse" className="mb-2" icon={<Sparkles className="h-3.5 w-3.5" />}>
                Simple & Effective
              </HighlightBadge>

              <div className="space-y-2">
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-poppins"
                    initial={{ y: 100 }}
                    animate={featuresInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <GradientText animate={true} gradient="from-purple-400 via-indigo-400 to-purple-400">
                      How CreoTask Works
                    </GradientText>
                  </motion.h2>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={featuresInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <AnimatedText
                      text="A seamless journey from contest creation to reward"
                      className="max-w-[900px] text-gray-300 md:text-xl/relaxed"
                      animation="slide"
                      staggerChildren={0.02}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="up" threshold={0.2} staggerChildren={0.1}>
            <div className="mx-auto max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: (
                    <Briefcase className="h-8 w-8 text-purple-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  ),
                  title: "Create Contests",
                  description:
                    "Clients post contests with clear requirements, deadlines, and prizes to attract the best talent.",
                },
                {
                  icon: (
                    <Users className="h-8 w-8 text-purple-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  ),
                  title: "Submit Work",
                  description:
                    "Freelancers showcase their skills by submitting high-quality work that meets client requirements.",
                },
                {
                  icon: (
                    <Award className="h-8 w-8 text-purple-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  ),
                  title: "Win & Earn",
                  description:
                    "Clients select winners, who receive payment and recognition for their outstanding contributions.",
                },
              ].map((feature, index) => (
                <Card3D
                  key={index}
                  className={`relative border border-gray-800 transition-all duration-300 overflow-hidden group h-full backdrop-blur-sm glass-modern touch-effect ${
                    index === activeFeature ? "ring-2 ring-purple-500 scale-105" : ""
                  }`}
                  tiltAmount={5}
                  glowOnHover={true}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div
                    className={`absolute -right-20 -top-20 w-40 h-40 bg-purple-800/10 rounded-full group-hover:scale-150 transition-transform duration-700 ${
                      index === activeFeature ? "scale-150" : ""
                    }`}
                  ></div>

                  <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-700"></div>

                  <CardHeader className="pb-2 relative">
                    <AnimatedIcon
                      icon={feature.icon}
                      animation="pulse"
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md"
                    />
                    <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 font-poppins">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center text-sm text-purple-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/0 via-indigo-600/50 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </Card3D>
              ))}
            </div>
          </ScrollReveal>

          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeFeature ? "bg-purple-500 w-6" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View feature ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-purple-950/30 to-gray-950 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/0 via-indigo-600/50 to-purple-600/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/0 via-indigo-600/50 to-purple-600/0"></div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10"
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            x: calculateParallaxPosition(15).x,
            y: calculateParallaxPosition(15).y,
          }}
        />

        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7 }}
            >
              <HighlightBadge variant="glow" className="mb-2" icon={<Sparkles className="h-3.5 w-3.5" />}>
                Join Our Community
              </HighlightBadge>

              <div className="space-y-2">
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-poppins"
                    initial={{ y: 100 }}
                    animate={ctaInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <GradientText animate={true} gradient="from-purple-400 via-indigo-400 to-purple-400">
                      Ready to Get Started?
                    </GradientText>
                  </motion.h2>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={ctaInView ? { y: 0 } : { y: 100 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <AnimatedText
                      text="Join thousands of freelancers and clients already using CreoTask to connect, create, and collaborate"
                      className="max-w-[600px] text-gray-300 md:text-xl/relaxed"
                      animation="slide"
                      staggerChildren={0.02}
                      highlightWords={["connect", "create", "collaborate"]}
                      highlightClassName="text-purple-400 font-medium"
                    />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="flex flex-col gap-3 min-[400px]:flex-row mt-4 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GradientButton size="lg" asChild className="flex-1 touch-effect">
                  <Link href="/signup">Sign Up as Freelancer</Link>
                </GradientButton>
                <InteractiveButton
                  variant="outline"
                  size="lg"
                  className="border-purple-700 hover:bg-purple-900/20 transition-all flex-1 text-purple-300 hover:text-purple-200 font-medium touch-effect"
                  asChild
                >
                  <Link href="/signup?type=client">Sign Up as Client</Link>
                </InteractiveButton>
              </motion.div>

              <Card3D className="mt-12 pt-8 border-t border-purple-900/30 w-full max-w-md glass-modern">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-4xl text-purple-600/30 font-serif">"</div>
                  <p className="text-sm text-gray-400 italic">
                    CreoTask has transformed how I find design work and connect with clients. The platform is intuitive
                    and the contest format brings out my best work.
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-4xl text-purple-600/30 font-serif">"</div>
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex -space-x-2 mr-2">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-sm font-medium text-white border-2 border-gray-900"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      AJ
                    </motion.div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    Alex Johnson, <span className="text-purple-400">UI Designer</span>
                  </span>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <HighlightBadge variant="outline" className="touch-effect">
                    <AnimatedIcon icon={<Star className="h-3.5 w-3.5 mr-1" />} animation="pulse" />
                    Trusted by 10,000+ freelancers
                  </HighlightBadge>
                  <HighlightBadge variant="outline" className="touch-effect">
                    <AnimatedIcon icon={<Award className="h-3.5 w-3.5 mr-1" />} animation="pulse" />
                    4.9/5 average rating
                  </HighlightBadge>
                </div>
              </Card3D>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
