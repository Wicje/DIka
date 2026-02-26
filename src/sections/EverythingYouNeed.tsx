import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Globe, Search, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Business Email',
    description: 'Professional email addresses that match your domain. Build trust with every message you send.',
    icon: Mail,
    image: '/images/features/business-email.jpg',
    link: '#business-email',
  },
  {
    id: 2,
    title: 'Domains',
    description: 'Find and register the perfect domain name for your brand. Free WHOIS privacy included.',
    icon: Globe,
    image: '/images/features/domains.jpg',
    link: '#domains',
  },
  {
    id: 3,
    title: 'Search & AI Optimization',
    description: 'Get found on Google with built-in SEO tools and AI-powered content suggestions.',
    icon: Search,
    image: '/images/features/seo.jpg',
    link: '#seo',
  },
  {
    id: 4,
    title: 'Contacts',
    description: 'Manage your audience with powerful CRM tools. Segment, tag, and nurture your leads.',
    icon: Users,
    image: '/images/features/contacts.jpg',
    link: '#contacts',
  },
];

export default function EverythingYouNeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-16 lg:py-24 bg-white" ref={sectionRef}>
      <div className="sq-container">
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-normal tracking-tight max-w-sm">
            Everything you need on one platform
          </h2>
          <p className="text-gray-600 text-sm lg:text-base max-w-md">
            Power your day-to-day with all the tools and AI guidance you need to manage your business, seamlessly integrated in one place.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <a href={feature.link} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 sq-img-zoom bg-gray-100">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Icon & Title */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-gray-700" />
                  </div>
                  <h3 className="text-base font-medium pt-1">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {feature.description}
                </p>
                
                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm font-medium sq-link-underline">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
