"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  feature: {
    title: string
    description: string
    icon: LucideIcon
    color: string
  }
  index: number
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full border-2 hover:border-red-500 transition-colors duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center mb-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", feature.color)}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
            <CardTitle>{feature.title}</CardTitle>
          </div>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("h-1 w-16 rounded-full", feature.color)} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
