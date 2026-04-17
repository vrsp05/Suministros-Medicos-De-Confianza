import React, { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "El nombre completo es requerido";
    if (!formData.company.trim()) errors.company = "Hospital/Empresa es requerido";
    if (!formData.email.trim()) errors.email = "El correo electrónico es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Por favor ingresa un correo válido";
    if (!formData.message.trim()) errors.message = "El mensaje/pedido es requerido";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    if (!agreedToTerms) {
      setValidationErrors(prev => ({ ...prev, checkbox: "Debes aceptar los términos para continuar" }));
      return;
    }

    setResult("Enviando...");
    const submitFormData = new FormData();
    submitFormData.append("access_key", import.meta.env.VITE_ACCESS_KEY);
    submitFormData.append("name", formData.name);
    submitFormData.append("subject", "NEW ORDER: Suministros Médicos de Confianza");
    submitFormData.append("from_name", "Suministros Médicos LATAM");
    submitFormData.append("company", formData.company);
    submitFormData.append("email", formData.email);
    submitFormData.append("message", formData.message);

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_SCRIPT_URL, {
        method: "POST",
        body: submitFormData
      });

      const data = await response.json();

      if (data.success) {
        setResult("¡Mensaje enviado con éxito! Nos pondremos en contacto dentro de 1 a 3 días hábiles.");
        setFormData({ name: "", company: "", email: "", message: "" });
        setAgreedToTerms(false);
        setShowModal(false);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error al enviar el mensaje");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitClick} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 bg-white ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hospital / Empresa</label>
          <input 
            type="text" 
            name="company" 
            value={formData.company}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 bg-white ${validationErrors.company ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.company && <p className="text-red-500 text-sm mt-1">{validationErrors.company}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input 
            type="text" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 bg-white ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mensaje / Pedido</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleInputChange}
            rows="4" 
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-gray-900 bg-white ${validationErrors.message ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {validationErrors.message && <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>}
        </div>
        <button type="submit" className="w-full !bg-blue-600 !text-white py-3 px-4 rounded-md hover:!bg-blue-700 transition-colors font-bold" style={{ colorScheme: 'light' }}>
          Enviar Mensaje
        </button>
        {result && (
          <div className={`mt-4 p-4 rounded-lg text-center font-semibold text-base ${result.includes('éxito') ? 'bg-green-50 text-green-800 border-2 border-green-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
            {result}
          </div>
        )}
      </form>

      {/* Disclaimer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black text-red-900 mb-6 uppercase tracking-tight">Confirmación Importante</h2>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-red-900 font-semibold leading-relaxed mb-4">
                Confirma que entiendes la siguiente información sobre nuestros productos:
              </p>
              <ul className="space-y-3 text-sm text-red-800 font-medium">
                <li>✓ Los productos tienen <span className="font-bold">fecha de vencimiento expirada</span></li>
                <li>✓ Solo se utilizarán con <span className="font-bold">propósitos educativos y de demostración</span></li>
                <li>✓ <span className="font-bold">NO</span> serán utilizados en pacientes o clínicamente</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (e.target.checked) {
                    setValidationErrors(prev => ({ ...prev, checkbox: "" }));
                  }
                }}
                className="mt-1 w-5 h-5 cursor-pointer accent-blue-600"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 font-medium cursor-pointer">
                Confirmo que he leído y acepto que los productos son solo para uso educativo y de demostración.
              </label>
            </div>
            {validationErrors.checkbox && <p className="text-red-600 text-sm mb-6 font-semibold bg-red-50 p-3 rounded-lg">{validationErrors.checkbox}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setAgreedToTerms(false);
                  setValidationErrors(prev => ({ ...prev, checkbox: "" }));
                }}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}