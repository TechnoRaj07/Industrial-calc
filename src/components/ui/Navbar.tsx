'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calculator, Newspaper, Menu, X, Cpu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/40 dark:bg-[#050505]/60 border-b border-white/20 dark:border-emerald-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-[#00FF99] p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#051810] rounded-[14px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-[#00FF99]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Industrial<span className="text-[#00FF99]">Calc</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
              Process & Tech Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 glass-panel rounded-full px-4 py-1.5 border-white/40 dark:border-emerald-900/30">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00FF99] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/calculators"
            className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00FF99] transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-[#00FF99]" />
            Calculators (50)
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00FF99] transition-colors flex items-center gap-1.5"
          >
            <Newspaper className="w-4 h-4 text-emerald-400" />
            Industry News
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00FF99] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00FF99] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Theme Action Control */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-emerald-400 glass-panel"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200/50 dark:border-emerald-900/40 px-6 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#00FF99]"
          >
            Home
          </Link>
          <Link
            href="/calculators"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#00FF99]"
          >
            Calculators (50)
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#00FF99]"
          >
            Industry News
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#00FF99]"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#00FF99]"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
