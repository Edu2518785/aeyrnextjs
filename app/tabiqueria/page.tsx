'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Estilos de Swiper (Next.js los maneja bien así)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../../style/pagesStyle/Tabiqueria.css";

// Mantenemos tu estructura de datos EXACTA, pero con rutas de texto
const proyectos = [
  { id: 1, titulo: "DORUE", cliente: "BESCO", descripcion: "Instalación de tabiquería armada con bloques de concreto king block y placa silico calcareo.", imgs: ["/assets/tabiqueria/1.dorueSurquillo.jpeg", "/assets/tabiqueria/2.lomasRimacMiranda.jpeg"] },
  { id: 2, titulo: "LOMAS DE RIMAC", cliente: "MIRANDA", descripcion: "Suministro y colocación de materiales certificados.", imgs: ["/assets/tabiqueria/2.lomasRimacMiranda.jpeg"] },
  { id: 3, titulo: "STRIP MALL", cliente: "MIRANDA", descripcion: "Ejecución de muros portantes y tabiquería.", imgs: ["/assets/tabiqueria/3.stripMallMiranda.jpeg"] },
  { id: 4, titulo: "DUETTO ETAPA 1 Y 2", cliente: "BESCO", descripcion: "Instalación técnica especializada.", imgs: ["/assets/tabiqueria/4.duettoEtapa1y2.jpeg"] },
  { id: 5, titulo: "ALAMEDA CENTRAL", cliente: "BESCO", descripcion: "Avance de obra con bloques P14.", imgs: ["/assets/tabiqueria/5.alamedaCentral.jpeg"] },
  { id: 6, titulo: "PALMAS 2", cliente: "BESCO", descripcion: "Tabiquería en edificios residenciales.", imgs: ["/assets/tabiqueria/6.palmas2Chorrillos.jpg"] },
  { id: 7, titulo: "MAGNOLIA", cliente: "BESCO", descripcion: "Suministro masivo de unidades de concreto.", imgs: ["/assets/tabiqueria/7.magnolia.jpeg"] },
  { id: 8, titulo: "FELICITI", cliente: "BESCO", descripcion: "Instalación de muros sílico-calcáreos.", imgs: ["/assets/tabiqueria/8.feliciti.jpeg"] },
  { id: 9, titulo: "VIBE", cliente: "AYA EDIFICACIONES", descripcion: "Servicio de mano de obra calificada.", imgs: ["/assets/tabiqueria/9.vibeAyaEdificaciones.jpeg"] },
  { id: 10, titulo: "TORREMAR", cliente: "GRUPO AE&R", descripcion: "Tabiquería estructural en zona costera.", imgs: ["/assets/tabiqueria/10. TORREMAR.jpeg"] },
  { id: 11, titulo: "OCEAN BERTOLOTO", cliente: "GRUPO AE&R", descripcion: "Edificación de alta resistencia frente al mar.", imgs: ["/assets/tabiqueria/11.oceanBertoloto.webp"] },
  { id: 12, titulo: "MAYOLO", cliente: "INMOBILIARIA", descripcion: "Instalación de muros divisorios internos.", imgs: ["/assets/tabiqueria/12.mayolo.jpeg"] },
  { id: 13, titulo: "SAN BARTOLO", cliente: "PROYECTO PLAYA", descripcion: "Cercos perimétricos y muros de concreto.", imgs: ["/assets/tabiqueria/13.sanBartolo.jpg"] },
  { id: 14, titulo: "RESERVA 748", cliente: "GRUPO AE&R", descripcion: "Edificación residencial multifamiliar.", imgs: ["/assets/tabiqueria/14.reserva748.jpeg"] },
  { id: 15, titulo: "VIVERDI", cliente: "BESCO", descripcion: "Instalación de bloques sílico-calcáreos.", imgs: ["/assets/tabiqueria/15.viverdi.jpeg"] },
  { id: 16, titulo: "RESIDENCIAL GARZÓN", cliente: "CONSTRUCTORA", descripcion: "Sistemas de tabiquería armada.", imgs: ["/assets/tabiqueria/16.residencialGarzon.jpeg"] },
  { id: 17, titulo: "DOÑA ROSAURA", cliente: "MIRANDA", descripcion: "Colocación de King Block estructural.", imgs: ["/assets/tabiqueria/17.donaRosaura.jpeg"] },
  { id: 18, titulo: "ALAMEDA RÍMAC TORRES", cliente: "BESCO", descripcion: "Gran escala en muros divisorios.", imgs: ["/assets/tabiqueria/18.alamedaRimacTorres.jpeg"] },
  { id: 19, titulo: "PALMAS EDIFICIO 3 Y 4", cliente: "BESCO", descripcion: "Continuidad de proyecto residencial.", imgs: ["/assets/tabiqueria/19.palmasEdificio3y4.jpg"] },
  { id: 20, titulo: "ALTALUZ ETAPA 3", cliente: "BESCO", descripcion: "Eficiencia en tiempos de ejecución.", imgs: ["/assets/tabiqueria/20.altaluzEtapa3.jpeg"] },
  { id: 21, titulo: "VILLA DULANTO", cliente: "MIRANDA", descripcion: "Tabiquería fina en departamentos.", imgs: ["/assets/tabiqueria/21.villaDulanto.jpeg"] },
  { id: 22, titulo: "INVENT SAN ISIDRO", cliente: "INVENT", descripcion: "Proyecto de oficinas y departamentos.", imgs: ["/assets/tabiqueria/22.inventSanIsidro.png"] },
  { id: 23, titulo: "GRAND CENTRAL", cliente: "GRUPO AE&R", descripcion: "Infraestructura de concreto armado.", imgs: ["/assets/tabiqueria/23.grandCentral.jpeg"] },
  { id: 24, titulo: "LAS PALMAS CHORRILLOS", cliente: "BESCO", descripcion: "Muros perimétricos y tabiquería.", imgs: ["/assets/tabiqueria/24.lasPalmasChorrillos.jpg"] },
  { id: 25, titulo: "RESIDENCIAL LIBERTAD", cliente: "AYA EDIFICACIONES", descripcion: "Mano de obra especializada.", imgs: ["/assets/tabiqueria/25.residencialLibertad.jpeg"] },
  { id: 26, titulo: "EDIFICIO NOVA", cliente: "CONSTRUCTORA", descripcion: "Instalación de placas certificadas.", imgs: ["/assets/tabiqueria/26.edificioNova.jpg"] },
  { id: 27, titulo: "EDIFICIO LEURO", cliente: "GRUPO AE&R", descripcion: "Icono corporativo en zona céntrica.", imgs: ["/assets/tabiqueria/27.edificioLeuro.png"] },
  { id: 28, titulo: "NUEVO ALCÁZAR", cliente: "BESCO", descripcion: "Instalación masiva de tabiquería.", imgs: ["/assets/tabiqueria/28.condiminioNuevoAlcazar.jpeg"] },
  { id: 29, titulo: "PRADOS DE CHACLACAYO", cliente: "GRUPO AE&R", descripcion: "Construcción en zona este de Lima.", imgs: ["/assets/tabiqueria/29.pradosChaclacayo.jpg"] },
  { id: 30, titulo: "EMILIO FERNÁNDEZ", cliente: "RESIDENCIAL", descripcion: "Edificio multifamiliar moderno.", imgs: ["/assets/tabiqueria/30.emilioFernandez.jpg"] },
  { id: 31, titulo: "CNOIS GYM", cliente: "RETAIL", descripcion: "Divisiones internas para centro deportivo.", imgs: ["/assets/tabiqueria/31.cnoisGym.jpg"] }
];

export default function Experiencia() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const handleOpen = (img: string) => setModalImg(img);
  const handleClose = () => setModalImg(null);

  return (
    <motion.main className="experiencia-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      
      {/* BANNER DE PRESENTACIÓN */}
      <section className="full-width-banner">
        <div className="banner-overlay">
          <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Instalamos Tabiquería Armada
          </motion.h1>
          <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            Con bloques de concreto King Block y placas silíco calcáreas
          </motion.p>
        </div>
      </section>

      {/* SECCIÓN DE GALERÍA */}
      <section className="proyectos-gallery">
        <div className="container-custom">
          
          <div className="text-center-header">
            <span className="section-tag">Portafolio</span>
            <motion.h2 
              className="gallery-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              PROYECTOS DESTACADOS
            </motion.h2>
            <div className="title-underline-center"></div>
          </div>
          
          <div className="gallery-grid">
            {proyectos.map((p, index) => (
              <motion.div
                key={p.id}
                className="proyecto-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
              >
                <div className="image-box">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={p.imgs.length > 1}
                    pagination={p.imgs.length > 1 ? { clickable: true } : false}
                    allowTouchMove={p.imgs.length > 1}
                    loop={p.imgs.length > 1}
                    autoplay={p.imgs.length > 1 ? { delay: 3000, disableOnInteraction: false } : false}
                    className="project-inner-swiper"
                  >
                    {p.imgs.map((foto, idx) => (
                      <SwiperSlide key={idx} onClick={() => handleOpen(foto)}>
                        <img 
                          src={foto} 
                          alt={`${p.titulo} - ${idx + 1}`} 
                          loading="lazy" 
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  <div className="card-overlay" onClick={() => handleOpen(p.imgs[0])}>
                    <span className="project-number">#{String(p.id).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="info-box">
                  <div className="client-tag">{p.cliente}</div>
                  <h3>{p.titulo}</h3>
                  <p className="desc-text">{p.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MODAL FULL SCREEN */}
        <AnimatePresence>
          {modalImg && (
            <motion.div 
              className="modal-ae-full" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleClose}
            >
              <button className="modal-close-btn" onClick={handleClose}>&times;</button>
              <motion.img 
                src={modalImg} 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.8, opacity: 0 }} 
                className="modal-img-grande" 
                onClick={(e) => e.stopPropagation()} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.main>
  );
}