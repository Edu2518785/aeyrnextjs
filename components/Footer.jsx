'use client';

import Link from "next/link";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "@/style/componentsStyle/Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-container">
          
          {/* SECCIÓN 1: IDENTIDAD Y CONTACTO */}
          <div className="footer-brand">
            <h3 className="brand-logo">AE&R <span>CG SAC</span></h3>
            <p className="brand-desc">Especialistas en tabiquería armada y suministros estratégicos. Calidad que sostiene tus grandes ideas.</p>
            
            <div className="footer-contact-info">
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+51999999999">+51 999 999 999</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:contacto@aercgsac.com">contacto@aercgsac.com</a>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: EXPLORAR */}
          <div className="footer-nav">
            <h4>Explorar</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/tabiqueria">Tabiquería</Link></li>
              <li><Link href="/distribuidor">Distribuidor</Link></li>
              <li><Link href="/contacto">Contáctanos</Link></li>
            </ul>
          </div>

          {/* SECCIÓN 3: ATENCIÓN AL CLIENTE */}
          <div className="footer-legal">
            <h4>Atención al Cliente</h4>
            <p className="legal-desc">Comprometidos con la transparencia y excelencia en cada proyecto.</p>
            
            <div className="libro-box-oficial">
              {/* Ruta corregida a public para el Libro de Reclamaciones */}
              <Link href="/libro-reclamaciones" className="libro-flex">
                <img src="/assets/libroReclamaciones.jpg" alt="Libro de Reclamaciones Oficial" className="img-libro-final" />
                <div className="libro-separator"></div>
                <div className="libro-txt">
                  <span className="txt-bold">LIBRO DE</span>
                  <span className="txt-light">RECLAMACIONES</span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-container">
          <p>&copy; 2026 AE&R CG SAC - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}