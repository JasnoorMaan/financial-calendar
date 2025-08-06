// ✅ MAIN ANIMATIONS EXPORT - Import everything from here

// Components (ready-to-use JSX components)
export { CountUp, TypeWriter, PulseButton } from "./components";

// Hooks (for custom animation logic)
export {
  useCountUp,
  useTypewriter,
  useScrollAnimation,
  useHover,
} from "./hooks";

// Variants (for motion components)
export {
  fadeInVariants,
  slideInVariants,
  scaleVariants,
  staggerContainer,
  staggerItem,
  buttonVariants,
  cardVariants,
} from "./variants";

// Utilities (helpers and configurations)
export {
  easings,
  durations,
  delays,
  springs,
  createStagger,
  createFadeInUp,
  createSlideIn,
  createScale,
} from "./utilities";
