'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaCheckCircle } from "react-icons/fa";
import "../../style/pagesStyle/Nosotros.css";

export default function Nosotros() {
  
  // Definimos las rutas de las imágenes asumiendo que las moviste a:
  // public/assets/nosotros/...
  const images = {
    nos1: "/assets/nosotros/nosotros1.jpg",
    nos2: "/assets/nosotros/Nosotros2.jpg",
    nos3: "/assets/nosotros/Nosotros3.jpg",
    nos4: "/assets/nosotros/Nosotros4.jpg",
    nos5: "/assets/nosotros/Nosotros5.jpg",
  };

  return (
    <div className="nosotros-page">
      
      {/* SECTION 1: HERO */}
      <header className="nos-hero" style={{ backgroundImage: `url(${images.nos2})` }}>
        <motion.div 
          className="nos-hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="subtitle-gold">CONSTRUYENDO CONFIANZA</span>
          <h1 className="title-modern">SOMOS ESPECIALISTAS DE TABIQUERÍA Y DISTRIBUIDOR DE PRODUCTOS UNICON</h1>
          <div className="title-underline-center"></div>
        </motion.div>
      </header>   

      {/* SECTION 2: NUESTRA HISTORIA */}
      <section className="nos-history">
        <div className="container-custom">
          <div className="history-grid">
            
            <motion.div 
              className="history-image-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="nos-carousel">
                <div className="carousel-track">
                  <img src={images.nos1} alt="Historia 1" className="img-history-main" />
                  <img src={images.nos2} alt="Historia 2" className="img-history-main" />
                  <img src={images.nos3} alt="Historia 3" className="img-history-main" />
                </div>
              </div>

              <div className="experience-badge">
                <span className="number">10+</span>
                <span className="text">Años de <br/>Experiencia</span>
              </div>
            </motion.div>

            <motion.div 
              className="history-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Trayectoria</span>
              <h2 className="section-title-modern">NUESTRA HISTORIA</h2>
              <div className="divider-left"></div>
              
              <div className="history-description">
                <p>
                  Nuestra empresa nace de la experiencia y esfuerzo de su fundador, <strong>Anselmo Espinoza</strong>, quien inició su trayectoria en el sector construcción como obrero y posteriormente se desempeñó como capataz durante más de 10 años.
                </p>
                <p>
                  En 2014 se independizó definitivamente, enfocándose en la ejecución de proyectos de <strong>instalación de tabiquería</strong>, especialidad en la que contaba con amplia experiencia.
                </p>
                <p>
                  En 2021, incorporamos la <strong>distribución de UNICON</strong> y transporte propio, consolidándonos en 2025 como un socio estratégico integral en materiales y servicios.
                </p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: MISIÓN Y VISIÓN */}
      <section 
        className="nos-mv-parallax" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${images.nos4})` 
        }}
      >
        <div className="mv-cards-wrapper">
          <motion.div className="mv-card" whileHover={{ y: -10 }}>
            <div className="mv-icon-circle"><FaBullseye /></div>
            <h3>MISIÓN</h3>
            <p>Brindar soluciones integrales en instalación de tabiquería y distribución de materiales de construcción, ofreciendo calidad, cumplimiento y eficiencia en cada proyecto, respaldados por nuestra experiencia técnica, compromiso con el cliente y capacidad operativa.</p>
          </motion.div>

          <motion.div className="mv-card" whileHover={{ y: -10 }}>
            <div className="mv-icon-circle"><FaEye /></div>
            <h3>VISIÓN</h3>
            <p>Ser una empresa reconocida y confiable en el sector construcción, destacada por su calidad, cumplimiento y crecimiento sostenido, consolidándonos como un proveedor integral de servicios y materiales para proyectos de diversa envergadura.</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: VALORES */}
      <section className="nos-valores">
        <div className="container-custom">
          <div className="text-center-header">
            <span className="section-tag">Cultura AE&R</span>
            <h2 className="section-title-modern">NUESTROS VALORES</h2>
          </div>
          
          <div className="valores-grid-modern">
            {[
              { t: 'Compromiso con la instalación y distribucion', d: 'asumimos cada proyecto con responsabilidad total, desde el inicio hasta su culminación.' },
              { t: 'Lealtad al cliente', d: 'no abandonamos la obra ante dificultades; acompañamos y apoyamos en escenarios imprevistos.' },
              { t: 'Soluciones técnicas', d: 'aportamos criterio técnico, experiencia y personal calificado para resolver problemas en campo.' },
              { t: 'Adaptabilidad', d: 'Cajustamos nuestros procesos a los requerimientos técnicos, operativos y normativos de cada cliente.' },
              { t: 'Seguridad y cumplimiento', d: 'trabajamos alineados a los estándares de seguridad exigidos en cada proyecto.' }
            ].map((val, index) => (
              <motion.div 
                key={index} 
                className="valor-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FaCheckCircle className="check-icon" />
                <div className="valor-info">
                  <h4>{val.t}</h4>
                  <p>{val.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGEN DE CIERRE */}
      <div 
        className="nos-bottom-banner" 
        style={{ 
          backgroundImage: `url(${images.nos5})`,
          filter: 'brightness(1)',
          backgroundBlendMode: 'normal'
        }}
      >
         <div className="banner-overlay">
           <h3>RESPALDADOS POR LAS MEJORES MARCAS DEL PERÚ</h3>
         </div>
      </div>
    </div>
  );
}