// ✅ ANIMATION UTILITIES - Helper functions and configurations

export const easings = {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275]
}

export const durations = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2
}

export const delays = {
    none: 0,
    short: 0.1,
    medium: 0.3,
    long: 0.5
}

// Spring configurations
export const springs = {
    gentle: { type: "spring", stiffness: 120, damping: 14 },
    wobbly: { type: "spring", stiffness: 180, damping: 12 },
    stiff: { type: "spring", stiffness: 400, damping: 30 },
    slow: { type: "spring", stiffness: 60, damping: 15 }
}

// Helper functions
export const createStagger = (delay: number = 0.1) => ({
    staggerChildren: delay,
    delayChildren: delay / 2
})

export const createFadeInUp = (delay: number = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay,
            ease: easings.easeOut
        }
    }
})

export const createSlideIn = (
    direction: 'left' | 'right' | 'up' | 'down' = 'left',
    distance: number = 50,
    delay: number = 0
) => {
    const directions = {
        left: { x: -distance },
        right: { x: distance },
        up: { y: -distance },
        down: { y: distance }
    }

    return {
        hidden: { 
            opacity: 0, 
            ...directions[direction]
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: easings.easeOut
            }
        }
    }
}

export const createScale = (
    from: number = 0.8,
    to: number = 1,
    delay: number = 0
) => ({
    hidden: { 
        opacity: 0, 
        scale: from 
    },
    visible: {
        opacity: 1,
        scale: to,
        transition: {
            duration: 0.5,
            delay,
            ease: easings.easeOut
        }
    }
})