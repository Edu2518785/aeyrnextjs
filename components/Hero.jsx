'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import "@/style/componentsStyle/Hero.css"; // Ruta ajustada con alias @
import CotizacionModal from "./CotizacionModal";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listaPedido, setListaPedido] = useState([]);
  const [cliente, setCliente] = useState({ ruc: "", proyecto: "", direccion: "" });
  const [tempItem, setTempItem] = useState({ producto: "", tipo: "Unidades", cantidad: "" });

  const productosAEyR = [
    "Ladrillo Unicon B9", "Ladrillo Unicon B12", "Ladrillo Unicon B14",
    "Ladrillo Unicon B19", "Mortero Especial", "Concreto Pre-mezclado", "Tarrajeo Fino"
  ];

  return (
    <>
      <section className="hero-container">
        {/* VIDEO DE FONDO - Ruta corregida para la carpeta public */}
        <video autoPlay muted loop playsInline className="hero-video-bg">
          <source src="/assets/hero/videoHero.mp4" type="video/mp4" />
        </video>

        {/* EL DIFUMINADO NEGRO (Overlay) */}
        <div className="hero-video-overlay"></div>

        {/* LUCES DE AMBIENTE */}
        <div className="light light1"></div>
        <div className="light light2"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-title-wrapper">
            <h1 className="hero-title-static">SOLUCIONES PROFESIONALES</h1>
            <div className="typewriter-line">
              <Typewriter
                options={{
                  strings: [
                    'en <span class="accent">AE&R</span>',
                    'con <span class="accent">Ladrillo Unicon</span>',
                    'en <span class="accent">Tabiquería Profesional</span>',
                    'Somos <span class="accent">tu mejor opción</span>'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 30,
                  cursor: "|"
                }}
              />
            </div>
          </div>

          <p className="hero-subtitle">
            Ingeniería y distribución de materiales Unicon para obras de alto impacto.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn secondary" onClick={() => setShowModal(true)}>
              SOLICITAR COTIZACIÓN
            </button>
          </div>
        </motion.div>
      </section>

      <CotizacionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        listaPedido={listaPedido}
        setListaPedido={setListaPedido}
        cliente={cliente}
        setCliente={setCliente}
        tempItem={tempItem}
        setTempItem={setTempItem}
        loading={loading}
        setLoading={setLoading}
        productosAEyR={productosAEyR}
      />
    </>
  );
}