import type { Transition, Variants } from "framer-motion";

/**
 * Editorial Luxury Motion Guidelines:
 * 1. Physical easing boundaries: cubic-bezier(0.16, 1, 0.3, 1) for entrances
 * 2. Spring configurations for magnetic/hover elements: stiffness: 150, damping: 15
 * 3. Curtain entrance easing: [0.45, 0, 0.15, 1]
 */

export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const CURTAIN_EASE: [number, number, number, number] = [0.45, 0, 0.15, 1];

export const MAGNETIC_SPRING: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.8,
};

export const SMOOTH_ENTRANCE: Transition = {
  duration: 1.1,
  ease: LUXURY_EASE,
};

// Masked Reveal Line Variant
export const lineRevealVariant: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
    filter: "blur(6px)",
  },
  visible: (custom: number = 0) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      delay: custom * 0.12,
      ease: LUXURY_EASE,
    },
  }),
};

// Fade up with luxury depth
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      delay: custom * 0.1,
      ease: LUXURY_EASE,
    },
  }),
};

// Image zoom-in reveal container
export const imageRevealVariant: Variants = {
  hidden: {
    scale: 1.15,
    opacity: 0.85,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: LUXURY_EASE,
    },
  },
};

// Stagger parent container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};
