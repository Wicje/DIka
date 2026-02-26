import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqCategories = [
  {
    id: 'build',
    title: 'How to build a website',
    items: [
      {
        question: 'How do I get started with Squarespace?',
        answer: 'Getting started is easy! Simply sign up for a free account, choose a template or use our AI builder, and start customizing. No coding or design experience required.',
      },
      {
        question: 'Can I use my own domain name?',
        answer: 'Yes! You can connect an existing domain or purchase a new one directly through Squarespace. We offer competitive pricing and free WHOIS privacy protection.',
      },
      {
        question: 'How long does it take to build a website?',
        answer: 'With our AI builder, you can have a professional website in minutes. If you prefer more control, using our templates typically takes a few hours to customize.',
      },
    ],
  },
  {
    id: 'faq',
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Is there a free trial?',
        answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely. You can cancel your subscription at any time with no penalties. Your website will remain active until the end of your billing period.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.',
      },
    ],
  },
  {
    id: 'support',
    title: '24/7 support',
    items: [
      {
        question: 'How can I contact support?',
        answer: 'Our support team is available 24/7 via live chat, email, and phone. Premium plans also get access to priority support with faster response times.',
      },
      {
        question: 'Do you have a knowledge base?',
        answer: 'Yes! Our comprehensive help center includes step-by-step guides, video tutorials, and answers to common questions.',
      },
    ],
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-normal pr-8">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-gray-400" />
          ) : (
            <Plus className="w-5 h-5 text-gray-400" />
          )}
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-12">
              <p className="text-gray-600 text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CategorySectionProps {
  category: typeof faqCategories[0];
  openItems: string[];
  onToggle: (id: string) => void;
  isInView: boolean;
  delay: number;
}

function CategorySection({ category, openItems, onToggle, isInView, delay }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="border-b border-gray-200 last:border-b-0"
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <h3 className="text-xl lg:text-2xl font-normal">{category.title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </button>
      
      {/* Category Items */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {category.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems.includes(`${category.id}-${index}`)}
                  onToggle={() => onToggle(`${category.id}-${index}`)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white" ref={sectionRef}>
      <div className="sq-container">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              openItems={openItems}
              onToggle={toggleItem}
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
