import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'services', label: 'Services' },
  { id: 'online-store', label: 'Online Store' },
  { id: 'invoicing', label: 'Invoicing' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'donations', label: 'Donations' },
  { id: 'memberships', label: 'Memberships' },
  { id: 'blog', label: 'Blog' },
  { id: 'portfolio', label: 'Portfolio' },
];

const projects = [
  {
    id: 1,
    title: 'Invoice clients',
    description: 'Legitimize your business and get paid with professional proposals, contracts, and invoices.',
    image: '/images/hero/hero-1.jpg',
    category: 'invoicing',
    link: '#invoice-clients',
  },
  {
    id: 2,
    title: 'Sell products online',
    description: 'Build a beautiful online store with inventory management and secure checkout.',
    image: '/images/hero/hero-3.jpg',
    category: 'online-store',
    link: '#online-store',
  },
  {
    id: 3,
    title: 'Book appointments',
    description: 'Let clients schedule appointments online with automated reminders.',
    image: '/images/hero/hero-7.jpg',
    category: 'scheduling',
    link: '#scheduling',
  },
  {
    id: 4,
    title: 'Accept donations',
    description: 'Collect donations seamlessly with customizable donation forms.',
    image: '/images/hero/hero-4.jpg',
    category: 'donations',
    link: '#donations',
  },
  {
    id: 5,
    title: 'Offer memberships',
    description: 'Create membership tiers with exclusive content and benefits.',
    image: '/images/hero/hero-8.jpg',
    category: 'memberships',
    link: '#memberships',
  },
  {
    id: 6,
    title: 'Share your stories',
    description: 'Publish blog posts with rich media and SEO optimization.',
    image: '/images/hero/hero-5.jpg',
    category: 'blog',
    link: '#blog',
  },
  {
    id: 7,
    title: 'Showcase your work',
    description: 'Create stunning portfolios to display your creative projects.',
    image: '/images/hero/hero-9.jpg',
    category: 'portfolio',
    link: '#portfolio',
  },
  {
    id: 8,
    title: 'Promote services',
    description: 'Highlight your services with detailed descriptions and booking.',
    image: '/images/hero/hero-6.jpg',
    category: 'services',
    link: '#services',
  },
];

export default function GrowBusiness() {
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50" ref={sectionRef}>
      <div className="sq-container">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-normal tracking-tight mb-3">
            Grow your business
          </h2>
          <p className="text-gray-600 text-sm lg:text-base max-w-lg mx-auto">
            You deserve a website that can do it all.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex gap-2 overflow-x-auto sq-scrollbar-hide pb-2 justify-start lg:justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`sq-filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Scrolling Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto sq-scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-[400px] snap-start"
                >
                  <a href={project.link} className="block group">
                    {/* Image */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 sq-img-zoom">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-medium mb-2 group-hover:text-gray-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium sq-link-underline">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
