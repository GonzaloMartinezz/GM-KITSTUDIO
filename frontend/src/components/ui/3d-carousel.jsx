"use client"

import React, { memo, useEffect, useLayoutEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query,
  { defaultValue = false, initializeWithValue = true } = {}
) {
  const getMatches = (query) => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({ handleClick, controls, products, isCarouselActive }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    // Increase cylinder width significantly so cards are wide like the reference
    const cylinderWidth = isScreenSizeSm ? 2000 : 3200
    const faceCount = products.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            z: -radius, // Pushes the cylinder back so the front face is exactly at Z=0 (no zoom cut-off)
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {products.map((product, i) => (
            <motion.div
              key={`key-${product._id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-4 md:p-8"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)
                  }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(product, i)}
            >
              <motion.div className="relative w-full h-full rounded-2xl overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  layoutId={`img-${product._id}`}
                  className="pointer-events-none w-full h-full object-cover mix-blend-multiply bg-[#EBEAE5]"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />

                {/* Overlay Text in the Cylinder */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white text-left z-10 flex flex-col gap-1 pointer-events-none">
                  <h3 className="text-xl md:text-2xl font-bebas tracking-wide leading-tight">{product.name}</h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export function ThreeDPhotoCarousel({ products = [] }) {
  const [activeProduct, setActiveProduct] = useState(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (product) => {
    setActiveProduct(product)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveProduct(null)
    setIsCarouselActive(true)
  }

  if (!products || products.length === 0) return null;

  return (
    <motion.div layout className="relative w-full">
      <AnimatePresence mode="sync">
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeProduct._id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-[#0C1517]/80 backdrop-blur-md flex items-center justify-center z-100 p-4 md:p-12 lg:p-24"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div className="bg-[#EBEAE5] rounded-4xl shadow-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden relative cursor-auto" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-black/20 text-black rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              {/* Image Side */}
              <motion.div className="w-full md:w-1/2 aspect-square relative bg-[#EBEAE5]">
                <motion.img
                  layoutId={`img-${activeProduct._id}`}
                  src={activeProduct.image}
                  className="w-full h-full object-contain mix-blend-multiply p-8"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ willChange: "transform" }}
                />
              </motion.div>

              {/* Info Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white"
              >
                <span className="text-xs font-semibold text-brand-3 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-3 inline-block"></span>
                  Incluido en el Kit
                </span>
                <h2 className="text-4xl font-bebas text-brand-5 mb-4">{activeProduct.name}</h2>
                <p className="text-[#1E293B]/70 font-light text-lg mb-8 leading-relaxed">
                  {activeProduct.description}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={handleClose}
                    className="w-full bg-brand-5 text-brand-1 py-4 rounded-xl font-medium hover:bg-brand-4 transition-colors"
                  >
                    Cerrar Vista
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-150 w-full overflow-hidden flex items-center">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          products={products}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}
