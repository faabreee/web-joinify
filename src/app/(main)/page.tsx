"use client";

import HeroCarousel from "@/components/custom/hero-carousel";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const highlightsEvent = [
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    },
    {
        title: 'Sonic Music Festival',
        description: '',
        place: 'Estadio Nacional',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '15 OCT'
    }
]

export default function Index() {
    return (
      <main className="min-h-screen bg-white">
        <HeroCarousel />

        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                {/* 1. BUSCADOR RÁPIDO */}
                <div className="relative -mt-24 z-30 bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-wrap gap-4 items-center">
                    <input type="text" placeholder="¿Qué buscas?" className="flex-1 p-3 outline-none" />
                        <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />
                    <input type="text" placeholder="Ubicación" className="flex-1 p-3 outline-none" />
                    <button className="bg-black text-white px-8 py-3 rounded-xl font-medium">Buscar</button>
                </div>
            </div>
        </section>
  
        <section className="container mx-auto px-6 py-20">
            <div className="flex flex-col items-start gap-4 mb-12">
                <span className="px-4 py-1 rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2">
                    📦 Product
                </span>
                <h2 className="text-4xl font-bold text-gray-900">Eventos destacados</h2>
            </div>
            
            <div className="w-full">
                <Carousel
                    opts={{
                    align: "start",
                    loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {highlightsEvent.map((item, index) => (
                            <CarouselItem 
                                key={index} 
                                // basis-1/1 (móvil) y md:basis-1/3 (escritorio) para ver 3 a la vez
                                className="pl-4 basis-full md:basis-1/3"
                            >
                            <div className="group cursor-pointer p-1">
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition duration-300" 
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                                        {item.date}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {item.place} • <span className="text-black font-semibold">Desde {item.price}</span>
                                </p>
                            </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-12" />
                        <CarouselNext className="-right-12" />
                    </div>
                </Carousel>
            </div>
        </section>
      </main>
    );
  }