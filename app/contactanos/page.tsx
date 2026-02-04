'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import "../../style/pagesStyle/Contactanos.css";

// IMPORT CORREGIDO SEGÚN TU FOTO (C mayúscula y .jsx)
import CotizacionModal from "../../components/CotizacionModal.jsx";

export default function Contactanos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="contact-full-wrapper">
      <div className="contact-bg-overlay"></div>
      
      <motion.main 
        className="contact-main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-info-glass">
          <span className="contact-badge">AE&R CG SAC</span>
          <h1 className="contact-hero-title">
            Transformamos <span>Proyectos</span> en Realidad
          </h1>
          <div className="contact-cta-container">
            <button 
              className="btn-premium-quote"
              onClick={() => setShowModal(true)}
            >
              <span>SOLICITAR PRESUPUESTO</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="contact-legal-link">
          <Link href="/libroReclamaciones" className="btn-minimal-legal">
            <span>Libro de Reclamaciones</span>
          </Link>
        </div>
      </motion.main>

      <CotizacionModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}