import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { useScroll } from '@/hooks/use-scroll'
import { isAvailableForHire } from '@/helpers/constants/social-data'
import { Email } from '@/components/molecules/email'
import { HeroSocialList } from '@/components/molecules/hero-social-list'

export interface IHomeHero {
  children?: React.ReactNode
}

export const HomeHero: React.FC<IHomeHero> = ({
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useScroll(({ y }) => {
    const hasScrolledDown = y < 100

    const shouldBeVisible = hasScrolledDown
    setIsVisible(shouldBeVisible)
  })

  return (
    <section {...props} className="flex items-center h-screen relative pt-20">
      <div className="z-[1] flex flex-grow h-full items-start px-4 sm:px-10">
        {children}
      </div>
      <div className="z-[1] absolute overflow-hidden w-full flex items-end bottom-0 px-4 sm:px-10 pb-6 sm:pb-10">
        <motion.div
          animate={{
            x: isVisible ? '0px' : '-200px',
            opacity: isVisible ? 1 : 0,
          }}
          className="flex flex-col gap-y-1.5 mr-auto mt-auto"
          initial={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3, type: 'tween' }}
        >
          <p className="text-subtitle uppercase text-white-500">{isAvailableForHire ? 'Available for hire' : 'My Email'}</p>
          <div className="flex">
            <Email type="small" />
          </div>
        </motion.div>
        <HeroSocialList isVisible={isVisible} />
      </div>
      <div className="absolute -top-1/4 -left-[10%] rounded-full bg-[#05222F] w-6/12 aspect-square blur-[750px]" />
    </section>
  )
}