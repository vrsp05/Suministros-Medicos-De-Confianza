import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ContactForm from './ContactForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PASTE YOUR WEB APP URL HERE
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz791U8VEGgS8Cs05YZT5FdGvdASVCKBgmPRXbLNaVe87ZEjE9BuBYL7K4DZrkxYdpgMA/exec";

    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />

      {/* --- Section 1: Home / About --- */}
      <section id="inicio" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Suministros Médicos</h1>
        <p className="text-xl text-gray-600 italic font-light">Calidad y confianza para el sector salud en México.</p>
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Sobre Nosotros</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            [Tu suegro puede escribir aquí su trayectoria y visión para el negocio.]
          </p>
        </div>
      </section>

      {/* --- Section 2: Products --- */}
      <section id="productos" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h2>
            <p className="text-gray-500 mt-2">Inventario actualizado en tiempo real</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium">Cargando catálogo...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item, index) => (
                <div key={index} className="group border border-gray-200 p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className={`text-xs font-bold ${item.stock === 'Disponible' ? 'text-green-500' : 'text-red-500'}`}>
                      ● {item.stock}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm leading-snug">
                    Para cotizaciones y detalles técnicos, favor de contactarnos.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Section 3: Contact --- */}
      <section id="contacto" className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-t-8 border-blue-900">
            <h2 className="text-3xl font-bold text-center mb-2">Realizar un Pedido</h2>
            <p className="text-center text-gray-500 mb-8 font-medium">Envíenos un mensaje y nos pondremos en contacto a la brevedad.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100">
        <p className="font-semibold text-gray-500 mb-1">Distribuidora de Suministros Médicos</p>
        <p>&copy; {new Date().getFullYear()} | México</p>
      </footer>
    </div>
  );
}

export default App;