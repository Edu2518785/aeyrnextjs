'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
// Ruta relativa directa para evitar líos con el @
import '../style/componentsStyle/Whatsapp.css';

const Whatsapp = () => {
  const whatsappNumber = "51900000000"; 
  const whatsappMessage = encodeURIComponent("Hola, me gustaría solicitar una cotización para un proyecto de tabiquería.");

  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      className="whatsapp-float-left"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <div className="whatsapp-label">
        <span>¿Necesitas ayuda?</span>
        <strong>Escríbenos ahora</strong>
      </div>
    </a>
  );
};

export default Whatsapp;