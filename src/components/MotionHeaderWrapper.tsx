'use client'

import { Header } from '@/components/Header'
import { motion } from 'motion/react'

export function MotionHeaderWrapper() {
  return (
    <motion.div className="tab_content" layoutId="header">
      <Header />
    </motion.div>
  )
}
