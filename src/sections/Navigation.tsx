import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { 
    label: 'Products', 
    href: '#products',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Website Builder', href: '#website-builder' },
      { label: 'Online Store', href: '#online-store' },
      { label: 'Domains', href: '#domains' },
      { label: 'Email', href: '#email' },
    ]
  },
  { 
    label: 'Templates', 
    href: '#templates',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Business', href: '#business' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Blog', href: '#blog' },
      { label: 'Online Store', href: '#store-templates' },
    ]
  },
  { label: 'Resources', href: '#resources' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="sq-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <svg 
                viewBox="0 0 32 32" 
                className="w-7 h-7"
                fill="currentColor"
              >
                <path d="M16 0L0 8v16l16 8 16-8V8L16 0zm0 4l12 6-12 6-12-6 12-6z"/>
              </svg>
              <span className="font-semibold text-sm tracking-wider uppercase">SQUARESPACES</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a 
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors"
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </a>
                  
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 overflow-hidden"
                      >
                        {link.dropdownItems?.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="#login" 
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Log In
              </a>
              <a 
                href="#get-started" 
                className="sq-btn-primary text-xs"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-xl"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        {link.label}
                      </a>
                      {link.hasDropdown && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.dropdownItems?.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-sm text-gray-600 hover:text-black transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <a 
                    href="#login" 
                    className="block w-full text-center py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    Log In
                  </a>
                  <a 
                    href="#get-started" 
                    className="sq-btn-primary w-full text-xs"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
