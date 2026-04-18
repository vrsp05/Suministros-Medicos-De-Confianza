import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ContactForm from './ContactForm';
import ProductTable from './ProductTable';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const fetchProducts = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setProducts(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on initial load
    fetchProducts();

    // Set up interval to refresh every 2 hours (7200000 milliseconds)
    const interval = setInterval(fetchProducts, 7200000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* --- Section 1: Inicio / Sobre Nosotros --- */}
      <section id="inicio" className="w-full relative min-h-[80vh] flex flex-col justify-center py-24 px-6">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <img src="/Medical Global Preparacion Log no-BG.png" alt="Medica Global Preparacion Logo" className="h-40 md:h-56 mx-auto mb-8" />
          <h1 className="text-5xl md:text-6xl font-black text-blue-900 mb-6 tracking-tight">
            Suministros Médicos <span className="text-blue-600 font-light">de Confianza</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Suministrando a las instituciones de salud en América Latina materiales de capacitación y demostración de calidad para el entrenamiento de profesionales médicos.
          </p>
          
          <div className="mt-16 p-10 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white relative">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4 text-center w-full">Sobre Nosotros</h2>
            <p className="text-xl leading-relaxed text-gray-700 font-medium italic mb-6">
              "Con una sólida trayectoria en el sector salud, nos hemos distinguido por ser un puente confiable entre la innovación médica y las instituciones de salud en América Latina. Nuestro compromiso es asegurar que cada producto entregado cumpla con los más altos estándares de calidad."
            </p>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-lg text-gray-700 font-semibold mb-3">Estamos orgullosos de ofrecer:</p>
              <ul className="space-y-3 text-base text-gray-700 font-medium mb-8">
                <li>✓ <span className="font-bold text-blue-900">Suministros educativos y de demostración</span> de alta calidad para instituciones médicas</li>
                <li>✓ Productos <span className="font-bold text-blue-900">esterilizados y sellados</span> en condición nueva</li>
                <li>✓ Soluciones perfectas para <span className="font-bold text-blue-900">capacitación, entrenamiento y fines didácticos</span></li>
              </ul>
              <div className="text-center">
                <p className="text-gray-600 font-medium mb-4">¿Quieres conocer nuestro catálogo completo?</p>
                <a 
                  href="#productos" 
                  className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg !text-white"
                >
                  Ver Nuestros Productos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Empresa (Negocio) --- */}
      <section id="negocio" className="w-full min-h-[80vh] flex flex-col justify-center py-24 bg-blue-900 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Nuestra Empresa</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Somos especialistas en la gestión y distribución estratégica de suministros médicos críticos. 
              Nacimos para resolver los retos de abastecimiento en el mercado latinoamericano, ofreciendo un catálogo dinámico y logística personalizada.
            </p>
            <div className="space-y-4">
              {['Logística Estratégica', 'Calidad Certificada', 'Atención Personalizada'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <span className="font-semibold tracking-wide uppercase text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-800/50 border border-blue-700 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 italic text-blue-200">Visión Estratégica</h3>
            <p className="text-blue-50 leading-relaxed">
              Nuestro enfoque no es solo vender productos, sino convertirnos en aliados de los hospitales para optimizar sus recursos y asegurar la disponibilidad inmediata de insumos básicos y especializados.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 3: Productos (Catálogo) --- */}
      <section id="productos" className="w-full py-24 bg-white px-4 md:px-12">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Catálogo de Productos</h2>
              <p className="text-blue-600 font-medium mt-2 uppercase tracking-widest text-xs">Inventario actualizado en tiempo real</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
              <p className="text-gray-400 text-sm font-medium italic">Mostrando {products.length} artículos disponibles</p>
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="px-4 py-2 !bg-blue-600 !text-white rounded-lg font-semibold text-sm hover:!bg-blue-700 transition-colors disabled:!bg-slate-700 disabled:!text-white disabled:cursor-not-allowed"
                style={{ colorScheme: 'light' }}
              >
                🔄 Actualizar
              </button>
            </div>
          </div>

          {lastUpdated && (
            <div className="mb-4 text-center text-xs text-gray-500 font-medium">
              Última actualización: {lastUpdated.toLocaleString('es-ES')}
            </div>
          )}

          {/* DISCLAIMER BOX - Para Productos */}
          <div className="mb-8 p-6 bg-red-50 rounded-2xl border-2 border-red-200 shadow-md">
            <div className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">🔴</div>
              <div>
                <h3 className="text-base font-black text-red-900 mb-2 uppercase tracking-tight">Importante - Productos para Uso Educativo</h3>
                <p className="text-sm text-red-800 font-medium leading-relaxed">
                  Estos suministros médicos son <span className="font-bold">esterilizados y sellados (nuevos)</span> pero tienen <span className="font-bold">fecha de vencimiento expirada</span>. Están diseñados exclusivamente para <span className="font-bold">fines educativos, de capacitación y demostración</span> en instituciones médicas. <span className="font-bold">NO</span> están autorizados para uso clínico o pacientes.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium tracking-wide">Sincronizando catálogo...</p>
            </div>
          ) : (
            <div className="w-full overflow-hidden">
               <ProductTable data={products} />
            </div>
          )}
        </div>
      </section>

      {/* --- Section 4: Contacto (Formulario) --- */}
      <section id="contacto" className="w-full min-h-screen py-24 bg-gray-100 px-6 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border-t-[12px] border-blue-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">Realizar un Pedido</h2>
              <p className="text-center text-gray-500 mb-4 max-w-md mx-auto leading-relaxed font-medium">
                Envíenos los detalles de su requerimiento y nos pondremos en contacto con usted.
              </p>
              <p className="text-center text-blue-600 mb-12 max-w-md mx-auto leading-relaxed font-bold">
                ⏱️ Respuesta en 1 a 3 días hábiles.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 md:py-16 text-center bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-black text-blue-900 uppercase tracking-[0.3em] text-xs mb-2">Suministros Médicos <span className="font-light text-blue-600">de Confianza</span></p>
          <p className="text-gray-400 text-sm font-medium italic mb-8">Distribuidor especializado en América Latina</p>
          
          <div className="h-px w-20 bg-gray-100 mx-auto my-6"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6">
            <p className="text-gray-600 text-sm font-medium">Hecho por <span className="font-bold text-gray-900">Victor Santana</span></p>
            <span className="hidden md:inline text-gray-300">•</span>
            <a href="https://github.com/vrsp05" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
              GitHub
            </a>
          </div>
          
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Suministros Médicos de Confianza. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;