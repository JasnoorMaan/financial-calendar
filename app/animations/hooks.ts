"use client"
import { animate, useMotionValue, useTransform } from "motion/react"
import { useEffect, useState } from "react"

// ✅ ANIMATION HOOKS - For when you need the animation values/logic

export const useCountUp = (target: number, duration: number = 1) => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (value) => Math.round(value))

    useEffect(() => {
        const controls = animate(count, target, { duration })
        return () => controls.stop()
    }, [target, duration])

    return rounded
}

export const useTypewriter = (text: string, speed: number = 100) => {
    const [displayText, setDisplayText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex])
                setCurrentIndex(currentIndex + 1)
            }, speed)

            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text, speed])

    const reset = () => {
        setDisplayText('')
        setCurrentIndex(0)
    }

    return { displayText, isComplete: currentIndex === text.length, reset }
}

export const useScrollAnimation = () => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollY
}

export const useHover = () => {
    const [isHovered, setIsHovered] = useState(false)

    const hoverProps = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
    }

    return { isHovered, hoverProps }
}