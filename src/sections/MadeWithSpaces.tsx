import { useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const websites = [
  {
    id: 1,
    title: 'Alexander Blackwood',
    category: 'Photography',
    image: '/images/made-with/grid-1.jpg',
    url: 'https://example.com/alexander',
    size: 'tall',
  },
  {
    id: 2,
    title: 'Aurum Atelier',
    category: 'Fashion',
    image: '/images/made-with/grid-2.jpg',
    url: 'https://example.com/aurum',
    size: 'wide',
  },
  {
    id: 3,
    title: 'Architectura',
    category: 'Architecture',
    image: '/images/made-with/grid-3.jpg',
    url: 'https://example.com/architectura',
    size: 'tall',
  },
  {
    id: 4,
    title: 'Studio Aura',
    category: 'Design Agency',
    image: '/images/made-with/grid-4.jpg',
    url: 'https://example.com/studio-aura',
    size: 'wide',
  },
  {
    id: 5,
    title: 'The Roasted Bean',
    category: 'Coffee Shop',
    image: '/images/made-with/grid-5.jpg',
    url: 'https://example.com/roasted-bean',
    size: 'tall',
  },
  {
    id: 6,
    title: 'Neon Strength',
    category: 'Fitness',
    image: '/images/made-with/grid-6.jpg',
    url: 'https://example.com/neon-strength',
    size: 'wide',
  },
];

// WebGL Particle Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.05 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  };

  useRef(animate);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function MadeWithSpaces() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const gridX = useSpring(mouseX, springConfig);
  const gridY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const offsetX = ((e.clientX - rect.left) - centerX) / centerX;
    const offsetY = ((e.clientY - rect.top) - centerY) / centerY;
    
    mouseX.set(offsetX * -15);
    mouseY.set(offsetY * -15);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section 
      className="py-16 lg:py-24 bg-white relative overflow-hidden" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleBackground />
      
      <div className="sq-container relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-normal tracking-tight">
            Made with Squarespace
          </h2>
        </motion.div>

        {/* Masonry Grid with Cursor Following */}
        <motion.div
          ref={gridRef}
          style={{ x: gridX, y: gridY }}
          className="will-change-transform"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {websites.map((website, index) => (
              <motion.a
                key={website.id}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-xl overflow-hidden ${
                  website.size === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={website.image}
                  alt={website.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/70 uppercase tracking-wider">
                      {website.category}
                    </span>
                    <h3 className="text-white font-medium text-lg mt-1 flex items-center gap-2">
                      {website.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* View More Link */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a 
            href="#examples" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            View all examples
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
