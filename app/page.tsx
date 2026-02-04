'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import NuestrosProyectos from "@/components/NuestrosProyectos"; 
import CountUp from 'react-countup';
import "@/style/pagesStyle/Inicio.css";

export default function Inicio() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(2);

  const carruselImages = [
    "/assets/inicio/Carrusel.jpg",
    "/assets/inicio/carrusel1.jpg",
    "/assets/inicio/carrusel2.jpg",
    "/assets/inicio/carrusel3.jpg",
    "/assets/inicio/carrusel4.jpg"
  ];

  const logos = [
    "/assets/Logos/AyALOGO.png", "/assets/Logos/CONSOLIDALOGO.png", "/assets/Logos/CYJLOGO.png",
    "/assets/Logos/GRUPOCONSERVI LOGO.png", "/assets/Logos/GYMLOGO.jpg", "/assets/Logos/HPCLOGO.jpg",
    "/assets/Logos/LAVENTUROSA.jpg", "/assets/Logos/MADRIRLOGO.jpg", "/assets/Logos/MAHPSALOGO.png",
    "/assets/Logos/MIRANDALOGO.JPG", "/assets/Logos/MIRANDALOGO2.png", "/assets/Logos/OCEANBERTOLOTOLOGO.jpg",
    "/assets/Logos/oriongrouplogo.png", "/assets/Logos/TRIADALOGO.jpg", "/assets/Logos/VIVAGYMLOGO.jpg"
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % carruselImages.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + carruselImages.length) % carruselImages.length);

  return (
    <div className="page-container">
      <Hero />
      
      <section id="quienes-somos" className="info-section">
        <div className="container">
          <div className="info-content">
            <div className="info-text">
              <span className="section-subtitle">Sobre AE&R</span>
              <h2 className="title-blue">¿Quiénes Somos?</h2>
              <p>AE&R es una empresa con más de 10 años de experiencia especializada en instalación de tabiquería armada...</p>
            </div>
            <div className="info-image-carrusel">
              <div className="carrusel-container-3d">
                <button className="nav-btn prev" onClick={prevSlide}>❮</button>
                <div className="slides-wrapper">
                  {carruselImages.map((img, idx) => (
                    <div key={idx} className={`slide-3d ${idx === activeIndex ? "active" : idx === (activeIndex - 1 + 5) % 5 ? "left" : idx === (activeIndex + 1) % 5 ? "right" : "side-hidden"}`}>
                      <img src={img} alt={`Obra ${idx}`} />
                    </div>
                  ))}
                </div>
                <button className="nav-btn next" onClick={nextSlide}>❯</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ayuda-section">
        <div className="container ayuda-grid-layout">
          <div className="ayuda-text-block">
            <h2 className="title-ayuda-red">¿Cómo te ayudamos?</h2>
          </div>
          <div className="ayuda-photos-group">
            {/* AQUÍ ESTABA EL ERROR: Se cambió /contacto por /contactanos */}
            <div className="acceso-card-premium" onClick={() => router.push('/contactanos')}> 
              <img src="/assets/inicio/construccion01.png" alt="Distribuidor" className="acceso-bg-img" />
              <div className="acceso-overlay-reveal">
                <div className="overlay-content"><h3>DISTRIBUIDOR</h3></div>
              </div>
            </div>
            
            <div className="acceso-card-premium" onClick={() => router.push('/tabiqueria')}> 
              <img src="/assets/inicio/construccion.jpg" alt="Instalación" className="acceso-bg-img" />
              <div className="acceso-overlay-reveal">
                <div className="overlay-content"><h3>INSTALACION</h3></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="metrics-floating-wrapper">
        <section className="metrics-bar">
          <div className="metrics-content-grid">
            <div className="metric-item"><p className="metric-value">+<CountUp end={400000} separator="." /></p><span>M² DE TABIQUERÍA</span></div>
            <div className="metric-item"><p className="metric-value">+<CountUp end={10} /></p><span>AÑOS DE EXPERIENCIA</span></div>
            <div className="metric-item"><p className="metric-value">+<CountUp end={60} /></p><span>OBRAS ATENDIDAS</span></div>
          </div>
        </section>
      </div>

      <NuestrosProyectos />

      <section id="contactanos" className="contacto-footer">
        <div className="container">
          {/* AQUÍ TAMBIÉN: Se cambió /contacto por /contactanos */}
          <button className="btn-main-contact" onClick={() => router.push('/contactanos')}>SOLICITA TU COTIZACION</button>
        </div>
      </section>
    </div>
  );
}