import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Check, X, Loader2 } from 'lucide-react';

const mockDomainSuggestions = [
  { domain: 'yourbusiness.com', available: true, price: '$12/year' },
  { domain: 'yourbusiness.net', available: true, price: '$10/year' },
  { domain: 'yourbusiness.co', available: true, price: '$15/year' },
  { domain: 'yourbusiness.io', available: false, price: '$35/year' },
  { domain: 'yourbusiness.org', available: true, price: '$12/year' },
];

export default function DomainSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockDomainSuggestions>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(false);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults = mockDomainSuggestions.map(s => ({
      ...s,
      domain: `${searchQuery.toLowerCase().replace(/\s+/g, '')}${s.domain.substring(s.domain.indexOf('.'))}`,
    }));
    
    setSuggestions(mockResults);
    setIsSearching(false);
    setHasSearched(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" ref={sectionRef}>
      <div className="sq-container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-normal tracking-tight">
              Find the perfect domain
              <br />
              for your website
            </h2>
          </motion.div>

          {/* Search Form */}
          <motion.form
            onSubmit={handleSearch}
            className="relative mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Start your search here"
                className="w-full pl-12 pr-14 py-4 text-base border border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 w-10 h-10 flex items-center justify-center bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.form>

          {/* Transfer Domain Link */}
          <motion.p 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm text-gray-500">
              Already have a domain?{' '}
              <a href="#transfer" className="text-black underline underline-offset-4 hover:no-underline">
                Transfer your domain
              </a>
            </span>
          </motion.p>

          {/* Domain Suggestions */}
          <AnimatePresence>
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-gray-500 mb-4 px-2">
                    Search results for &quot;{searchQuery}&quot;
                  </p>
                  
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.domain}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 bg-white rounded-lg ${
                        suggestion.available ? 'hover:shadow-md' : 'opacity-60'
                      } transition-shadow`}
                    >
                      <div className="flex items-center gap-3">
                        {suggestion.available ? (
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-red-600" />
                          </div>
                        )}
                        <span className="font-medium">{suggestion.domain}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{suggestion.price}</span>
                        {suggestion.available ? (
                          <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                            Add
                          </button>
                        ) : (
                          <span className="text-sm text-red-500">Taken</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
