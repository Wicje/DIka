import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Squarespace helped me turn my passion into a thriving business. The website builder is incredibly intuitive.",
    author: "Sarah Chen",
    role: "Founder, Bloom Botanicals",
    avatar: "SC",
  },
  {
    id: 2,
    quote: "I went from idea to launch in just one weekend. The templates are beautiful and easy to customize.",
    author: "Marcus Johnson",
    role: "Owner, FitLife Studio",
    avatar: "MJ",
  },
  {
    id: 3,
    quote: "The AI features saved me countless hours. It's like having a design team in your pocket.",
    author: "Emily Rodriguez",
    role: "Creative Director, Artisan Co",
    avatar: "ER",
  },
];

const avatarStack = [
  { initials: 'SC', color: 'bg-blue-500' },
  { initials: 'MJ', color: 'bg-green-500' },
  { initials: 'ER', color: 'bg-purple-500' },
  { initials: 'DK', color: 'bg-orange-500' },
  { initials: 'AL', color: 'bg-pink-500' },
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-16 lg:py-24 bg-gray-50" ref={sectionRef}>
      <div className="sq-container">
        {/* Avatar Stack */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex -space-x-3">
            {avatarStack.map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`w-10 h-10 ${avatar.color} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white`}
              >
                {avatar.initials}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-normal tracking-tight">
            Trusted by 14 million
            <br />
            entrepreneurs worldwide
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {testimonial.avatar}
                </div>
                
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
