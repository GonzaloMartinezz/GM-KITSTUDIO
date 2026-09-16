import React from 'react';
import { ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Link } from "react-router-dom"

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-24 sm:pt-32 pb-32 sm:pb-48 px-4 sm:px-6 md:px-8 text-center 
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

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 -bottom-37.5 md:-bottom-62.5 lg:-bottom-87.5 
        h-75 w-[150%] md:h-125 md:w-[120%] lg:h-175 lg:w-[110%] 
        -translate-x-1/2 rounded-[100%] bg-brand-1 dark:bg-brand-5 
        bg-[radial-gradient(closest-side,#ffffff_40%,#F1E8D9_100%)] 
        dark:bg-[radial-gradient(closest-side,#54728C_40%,#3E5C76_100%)] 
        animate-fade-up shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group">
          <span
            className="text-xs text-brand-5 dark:text-brand-1/70 font-bebas mx-auto px-6 py-2.5 
            bg-linear-to-tr from-brand-5/5 via-brand-5/5 to-transparent  
            border-2 border-brand-5/20 dark:border-white/5 
            rounded-3xl w-fit tracking-[0.2em] uppercase flex items-center justify-center mb-8"
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
          bg-clip-text py-4 sm:py-6 text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bebas leading-[0.88] tracking-tight 
          text-transparent opacity-0 break-words
          dark:from-brand-1 dark:to-brand-1/40"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      {/* Subtitle */}
      <p
        className="animate-fade-in mt-4 mb-12 -translate-y-4 text-balance 
        text-lg md:text-xl font-bebas tracking-widest text-brand-5/60 dark:text-brand-1/60 
        opacity-0"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center relative z-20">
          <Button
            asChild
            className="-mt-5 w-fit md:w-52 font-bebas tracking-widest text-center text-xl rounded-full h-14 bg-brand-5 text-brand-1 hover:bg-brand-4 hover:scale-105 transition-transform shadow-lg"
          >
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 perspective-[2000px] 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,#F1E8D9_10%,transparent)]"
      />
    </section>
  )
}
