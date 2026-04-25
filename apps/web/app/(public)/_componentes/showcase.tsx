"use client";

import { useRef } from "react";

const showcases = [
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/357/357-720.mp4",
    title: "Cortes",
    category: "Portfolio",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/43240/43240-720.mp4",
    title: "Barba",
    category: "Design",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/49339/49339-720.mp4",
    title: "Estilo",
    category: "Transformação",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1536520002442-39764a41e987?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Ambiente",
    category: "Salão",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFyYmVyfGVufDB8fDB8fHww",
    title: "Equipametos",
    category: "Studio",
  },
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/43227/43227-720.mp4",
    title: "Acabamento",
    category: "Detalhes",
  },
];

export function Showcase() {
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({});

  const handleMouseEnter = (index: number) => {
    if (showcases[index].type === "video" && videoRefs.current[index]) {
      videoRefs.current[index].play().catch(() => {});
    }
  };

  const handleMouseLeave = (index: number) => {
    if (showcases[index].type === "video" && videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section
      id="showcase"
      className="relative py-24 md:py-32 lg:py-48 bg-black"
    >
      <div className="max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24">
          <div>
            <p className="text-white/60 font-mono text-xs uppercase tracking-[2px] mb-4">
              Gallery
            </p>
            <h2 className="text-white font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[1.1]">
              See It In
              <br />
              <span className="text-white/60">Action</span>
            </h2>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="text-white/80 font-sans text-lg max-w-md">
              Cada detalhe do seu trabalho merece ser mostrado. Nossagaleria
              profesional destaca cada corte, barba e estilo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcases.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden aspect-[4/5] ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={item.src}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white/60 font-mono text-xs uppercase tracking-[1.4px] mb-2">
                  {item.category}
                </p>
                <h3 className="text-white font-display text-2xl md:text-3xl uppercase">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
