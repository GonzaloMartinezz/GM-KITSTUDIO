import React from 'react';
import { ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Link } from "react-router-dom"

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  items,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-20 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 md:px-8 text-center 
      overflow-hidden flex flex-col items-center justify-center
      bg-[linear-gradient(to_bottom,#F1E8D9,#F1E8D9_50%,#E3D4C1_100%)]  
      dark:bg-[linear-gradient(to_bottom,#3E5C76,#3E5C76_40%,#54728C_100%)]"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-60 w-full 
        bg-[linear-gradient(to_right,#3E5C7610_1px,transparent_1px),linear-gradient(to_bottom,#3E5C7610_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]
        bg-size-[6rem_5rem] 
        mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_110%)]"
      />

      {/* Radial Accent (Curved dome) */}
      <div
        className="absolute left-1/2 -bottom-24 sm:-bottom-36 md:-bottom-44 
        h-60 w-[160%] sm:h-96 sm:w-[130%] md:h-120 md:w-[115%] 
        -translate-x-1/2 rounded-[100%] bg-brand-1 dark:bg-brand-5 
        bg-[radial-gradient(closest-side,#ffffff_40%,#F1E8D9_100%)] 
        dark:bg-[radial-gradient(closest-side,#54728C_40%,#3E5C76_100%)] 
        animate-fade-up shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group">
          <span
            className="text-xs text-brand-5 dark:text-brand-1/90 font-bebas mx-auto px-6 py-2.5 
            bg-linear-to-tr from-brand-5/5 via-brand-5/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent
            border-2 border-brand-5/20 dark:border-white/20 
            rounded-3xl w-fit tracking-[0.2em] uppercase flex items-center justify-center mb-8 md:mb-12 shadow-xs backdrop-blur-xs"
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title */}
      <div className="flex justify-center max-w-5xl mx-auto px-2">
        <h1
          className="animate-fade-in -translate-y-4 text-balance 
          bg-linear-to-br from-brand-5 from-30% to-brand-4/60 
          bg-clip-text py-2 sm:py-4 text-[3.25rem] xs:text-[3.8rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bebas leading-[0.92] tracking-wide 
          text-transparent opacity-0 wrap-break-word
          dark:from-brand-1 dark:to-brand-1/40"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* Items list */}
      {items && Array.isArray(items) && items.length > 0 ? (
        <div className="animate-fade-in mt-6 md:mt-8 mb-12 md:mb-16 -translate-y-4 max-w-3xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 opacity-0">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full 
              bg-brand-5/10 border border-brand-5/20 text-brand-5 
              dark:bg-white/10 dark:border-white/25 dark:text-brand-1 dark:hover:bg-white/20 dark:hover:border-white/40
              hover:border-brand-3/50 hover:bg-brand-5/15 
              font-bebas text-xs sm:text-sm md:text-base tracking-widest uppercase shadow-xs transition-all backdrop-blur-xs"
            >
              <span className="text-brand-3 dark:text-brand-2 text-xs">✦</span>
              {item}
            </span>
          ))}
        </div>
      ) : subtitle ? (
        <p
          className="animate-fade-in mt-6 md:mt-8 mb-12 md:mb-16 -translate-y-4 text-balance 
          text-base sm:text-lg md:text-xl font-bebas tracking-widest text-brand-5/60 dark:text-brand-1/70 
          opacity-0"
        >
          {subtitle}
        </p>
      ) : null}

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center relative z-20">
          <Button
            asChild
            className="w-fit md:w-52 font-bebas tracking-widest text-center text-lg md:text-xl rounded-full h-12 md:h-14 px-8 
            bg-brand-5 text-brand-1 hover:bg-brand-4 hover:scale-105 transition-all shadow-lg
            dark:bg-brand-1 dark:text-brand-5 dark:hover:bg-white"
          >
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 
        bg-linear-to-t from-brand-1/40 to-transparent dark:from-brand-5/40"
      />
    </section>
  )
}
