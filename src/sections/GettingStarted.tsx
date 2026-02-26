import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const aiFeatures = [
  {
    id: 1,
    title: 'Build with AI',
    description: 'Answer a few questions and let our AI website builder do the rest. Get a custom site in minutes.',
    image: '/images/ai/build-with-ai.jpg',
    link: '#build-with-ai',
    badge: 'New',
  },
  {
    id: 2,
    title: 'Browse website templates',
    description: 'Crafted by our designers, customized by AI. Choose from hundreds of professional templates.',
    image: '/images/ai/browse-templates.jpg',
    link: '#templates',
  },
];

export default function GettingStarted() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-16 lg:py-24 bg-gray-50" ref={sectionRef}>
      <div className="sq-container">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-normal tracking-tight mb-3">
            Getting started has never
            <br />
            been easier with AI
          </h2>
          <p className="text-gray-600">
            No experience required.
          </p>
        </motion.div>

        {/* AI Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aiFeatures.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-gray-900"
            >
              <a href={feature.link} className="block">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  {feature.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                      {feature.badge}
                    </span>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white sq-link-underline">
                      Get started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-gray-500">
            Blueprint AI, one of TIME&apos;s Best Inventions of 2024
          </p>
        </motion.div>
      </div>
    </section>
  );
}
