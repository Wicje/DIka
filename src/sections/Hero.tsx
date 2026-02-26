import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  { 
    src: '/images/hero/hero-1.jpg', 
    alt: 'Overture Haus Website',
  },
  { 
    src: '/images/hero/hero-2.jpg', 
    alt: 'Basketball Summer Website',
  },
  { 
    src: '/images/hero/hero-3.jpg', 
    alt: 'Plants & Co Website',
  },
  { 
    src: '/images/hero/hero-4.jpg', 
    alt: 'Aurum Fashion Website',
  },
  { 
    src: '/images/hero/hero-5.jpg', 
    alt: 'The Daily Grind Website',
  },
  { 
    src: '/images/hero/hero-6.jpg', 
    alt: 'SYNC Dashboard',
  },
  { 
    src: '/images/hero/hero-7.jpg', 
    alt: 'Eternal Vows Photography',
  },
  { 
    src: '/images/hero/hero-8.jpg', 
    alt: 'Iron Pump Fitness',
  },
  { 
    src: '/images/hero/hero-9.jpg', 
    alt: 'Architectura Firm',
  },
  { 
    src: '/images/hero/hero-10.jpg', 
    alt: 'Sugar & Dough Bakery',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const getSlideStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + heroImages.length + Math.floor(heroImages.length / 2)) % heroImages.length) - Math.floor(heroImages.length / 2);
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1.1) translateZ(0px)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (normalizedDiff === -1 || normalizedDiff === heroImages.length - 1) {
      return {
        transform: 'translateX(-100%) scale(0.8) rotateY(20deg) translateZ(-120px)',
        zIndex: 20,
        opacity: 0.6,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -(heroImages.length - 1)) {
      return {
        transform: 'translateX(100%) scale(0.8) rotateY(-20deg) translateZ(-120px)',
        zIndex: 20,
        opacity: 0.6,
      };
    } else {
      return {
        transform: `translateX(${normalizedDiff * 100}%) scale(0.7)`,
        zIndex: 10,
        opacity: 0,
      };
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
    <video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />
      
      {/* Content */}
      <div className="relative z-10 sq-container pt-28 pb-16 lg:pt-32 lg:pb-24">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="sq-font-serif text-7xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight tracking-tight mb-6">
            An Architecture
            <br />
            <span className="bold text-gray-300 ">Makes It Real</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <a href="#get-started" className="sq-btn-primary font-bold py-6 mt-6 text-black border-none ">
              Get Started
            </a>
            <p className="text-sm text-white-400">
              Start for free. No credit card required.
            </p>
          </motion.div>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative h-[300px] sm:h-[350px] lg:h-[400px] pt-28"
          style={{ perspective: '1500px' }}
          onMouseEnter={() => setIsAutoPlaying(true)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative w-full h-full flex items-center justify-center mt-6"
          style={{ transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d'
          }}
          >
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute w-[380px] sm:w-[450px] lg:w-[580px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{ backfaceVisibility: 'hidden' }}
                initial={false}
                animate={getSlideStyle(index)}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover "
                />
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {image.category}
                  </p>
                  <h3 className="text-white font-medium">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors z-40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors z-40"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
