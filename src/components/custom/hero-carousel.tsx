"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const backgroundImages = [
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1628336707631-68131ca720c3?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2940&auto=format&fit=crop"
]

export default function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="h-[85vh] ml-0">
            {backgroundImages.map((src, index) => (
              <CarouselItem key={index} className="relative h-full w-full pl-0">
                <img
                  className="h-full w-full object-cover"
                  src={src}
                  alt={`Background ${index}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl space-y-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Joinify
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
            Crea, administra y comparte tu evento
          </p>
          <div className="flex gap-4 items-center">
            <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Buy now <span>→</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}