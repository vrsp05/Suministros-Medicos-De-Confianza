import React, { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const options = {
      root: null,
      threshold: 0.5,
      rootMargin: '-80px 0px -20% 0px'
    };

    observerRef.current = new IntersectionObserver(callback, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = ['inicio', 'negocio', 'productos', 'contacto'];
  const activeSection = useIntersectionObserver(sectionIds);

  const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Empresa', id: 'negocio' },
    { label: 'Productos', id: 'productos' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Name */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src="/Medical Global Preparacion Log no-BG.png" alt="Logo" className="h-12 md:h-16" />
            <div className="text-lg md:text-xl font-bold text-blue-900 tracking-tight">
              Suministros Médicos <span className="text-blue-600 font-light">de Confianza</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex space-x-8 text-sm font-semibold text-blue-900">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className={`transition-all duration-300 relative group 
                      ${activeSection === link.id ? 'text-blue-600' : 'text-blue-950/80 hover:text-blue-600'}`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300
                      ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
                </li>
              ))}
            </ul>
            <a 
              href="#contacto" 
              className={`border-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-500
                ${activeSection === 'contacto' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50'}`}
            >
              Cotizar
            </a>
          </div>

          {/* --- UPDATED Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-blue-900 text-white border border-blue-900 outline-none"
            >
              {/* Explicitly defined Hamburger/X Icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

        {/* --- UPDATED Mobile Menu Dropdown --- */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100`}>
          <div className="px-4 pt-2 pb-8 space-y-1 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-4 text-base font-bold rounded-xl ${activeSection === link.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 px-2">
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-900 text-white !text-white px-5 py-4 rounded-2xl font-black shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs"
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        </div>
    </nav>
  );
}