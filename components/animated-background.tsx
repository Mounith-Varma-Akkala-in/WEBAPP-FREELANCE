"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class with enhanced animation
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalSize: number
      angle: number
      angleSpeed: number
      pulseSpeed: number
      pulseDirection: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalSize = Math.random() * 4 + 1
        this.size = this.originalSize
        this.speedX = Math.random() * 0.7 - 0.35
        this.speedY = Math.random() * 0.7 - 0.35
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 50 + 100,
        )}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.2})`
        this.angle = Math.random() * 360
        this.angleSpeed = Math.random() * 0.5 - 0.25
        this.pulseSpeed = Math.random() * 0.1
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.angleSpeed

        // Pulsing effect
        this.size += this.pulseSpeed * this.pulseDirection
        if (this.size > this.originalSize * 1.5 || this.size < this.originalSize * 0.5) {
          this.pulseDirection *= -1
        }

        // Boundary check with smooth transition
        if (this.x > canvas.width + 50) this.x = -50
        else if (this.x < -50) this.x = canvas.width + 50
        if (this.y > canvas.height + 50) this.y = -50
        else if (this.y < -50) this.y = canvas.height + 50
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.angle * Math.PI) / 180)

        // Gradient fill
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(128, 90, 213, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop with mouse interaction
    let mouseX = 0
    let mouseY = 0
    let mouseRadius = 150
    let mouseActive = false

    canvas.addEventListener("mousemove", (e) => {
      mouseX = e.x
      mouseY = e.y
      mouseActive = true
      // Temporarily increase the mouse radius for a "burst" effect
      mouseRadius = 200
      setTimeout(() => {
        mouseRadius = 150
      }, 100)
    })

    canvas.addEventListener("mouseleave", () => {
      mouseActive = false
    })

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a subtle gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, "rgba(91, 33, 182, 0.03)")
      bgGradient.addColorStop(0.5, "rgba(109, 40, 217, 0.02)")
      bgGradient.addColorStop(1, "rgba(124, 58, 237, 0.03)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 180
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance

            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y,
            )
            gradient.addColorStop(0, `rgba(180, 130, 230, ${opacity * 0.6})`)
            gradient.addColorStop(1, `rgba(140, 90, 213, ${opacity * 0.6})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = opacity * 1.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }

        // Mouse interaction
        if (mouseActive) {
          const dx = particlesArray[a].x - mouseX
          const dy = particlesArray[a].y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius) {
            const opacity = 1 - distance / mouseRadius

            // Create gradient line to mouse
            const gradient = ctx.createLinearGradient(particlesArray[a].x, particlesArray[a].y, mouseX, mouseY)
            gradient.addColorStop(0, `rgba(200, 150, 250, ${opacity * 0.8})`)
            gradient.addColorStop(1, `rgba(160, 110, 233, ${opacity * 0.8})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = opacity * 2
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(mouseX, mouseY)
            ctx.stroke()

            // Push particles away from mouse slightly
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouseRadius - distance) / mouseRadius

            particlesArray[a].x += forceDirectionX * force * 2
            particlesArray[a].y += forceDirectionY * force * 2
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
}
