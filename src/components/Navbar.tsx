"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Calendar } from "lucide-react";
import Logo from "./Logo";

const navigation = [
  { name: "Quiénes Somos", href: "/" },
  { name: "Proyectos", href: "/" },
  { name: "Proceso de Compra", href: "/" },
  { name: "Compramos tu Campo", href: "/" },
  { name: "Tour Virtual", href: "/" },
  { name: "Contacto", href: "/" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <Logo white={!scrolled} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all ${
                    scrolled
                      ? 'text-text-dark hover:text-primary'
                      : 'text-white hover:text-primary-light'
                  }`}
                  style={!scrolled ? { textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 3px 10px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' } : {}}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-text-dark hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contacto"
              className={`group relative inline-flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 overflow-hidden ${
                scrolled
                  ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg hover:shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105'
                  : 'bg-white text-primary-dark hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white border-2 border-white shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/50 hover:scale-105'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={16} strokeWidth={2.5} />
                Agendar visita
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${scrolled ? 'text-text-dark' : 'text-white'}`}
            >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-text-dark hover:bg-primary/5 rounded-lg"
                    onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-xs text-text-light hover:text-primary rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
