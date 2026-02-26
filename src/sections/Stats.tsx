import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { 
    value: 14, 
    suffix: 'M+', 
    label: 'Entrepreneurs Served',
    sublabel: 'Worldwide'
  },
  { 
    value: 36, 
    prefix: '$', 
    suffix: 'B+', 
    label: 'Earned by Entrepreneurs',
    sublabel: 'In transactions'
  },
  { 
    value: 200, 
    suffix: '+', 
    label: 'Countries & Territories',
    sublabel: 'Global reach'
  },
];

function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  return (
    <section className="py-16 lg:py-20 bg-white" ref={sectionRef}>
      <div className="sq-container">
        <motion.p 
          className="text-center text-xs uppercase tracking-widest text-gray-500 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Join millions of entrepreneurs who run their business on Squarespace
        </motion.p>
        
        <div className="grid grid-cols-3 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-900 font-medium">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
