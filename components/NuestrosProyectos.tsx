'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Estilos
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/style/componentsStyle/NuestrosProyectos.css';

// Interfaz para evitar el error de TS
interface Proyecto {
  id: number;
  imgs: string[];
  cliente: string;
  titulo: string;
  descripcion: string;
}

const proyectos: Proyecto[] = [
  { id: 1, imgs: ["/assets/inicio/dorue1.0.jpeg", "/assets/inicio/dorue1.1.jpeg", "/assets/inicio/dorue1.2.jpeg"], cliente: "BESCO", titulo: "Edificio Dorue", descripcion: "Instalación de tabiquería armada con bloques de concreto king block y placa sílico calcárea." },
  { id: 2, imgs: ["/assets/inicio/magnolia2.0.jpeg", "/assets/inicio/magnolia2.1.jpeg"], cliente: "MIRANDA", titulo: "Residencial Magnolia", descripcion: "Suministro y colocación de materiales certificados." },
  { id: 3, imgs: ["/assets/inicio/cantabrico3.jpeg"], cliente: "MIRANDA", titulo: "Obra Cantábrico", descripcion: "Ejecución de muros portantes y tabiquería." },
  { id: 4, imgs: ["/assets/inicio/astoria4.jpeg"], cliente: "BESCO", titulo: "Condominio Astoria", descripcion: "Instalación técnica especializada." },
  { id: 5, imgs: ["/assets/inicio/lurin5.jpeg"], cliente: "BESCO", titulo: "Planta Lurín", descripcion: "Avance de obra con bloques P14." },
  { id: 6, imgs: ["/assets/inicio/saycusca6.jpeg"], cliente: "AE&R", titulo: "Proyecto Saycusca", descripcion: "Soluciones estructurales modernas." },
  { id: 7, imgs: ["/assets/inicio/huarochiri7.jpeg"], cliente: "AE&R", titulo: "Sede Huarochirí", descripcion: "Acabados de alta resistencia." },
  { id: 8, imgs: ["/assets/inicio/parqueCallao8.0.jpeg", "/assets/inicio/parqueCallao8.1.jpeg", "/assets/inicio/parqueCallao8.2.jpeg", "/assets/inicio/parqueCallao8.3.jpeg"], cliente: "PARQUE", titulo: "Parque Callao", descripcion: "Edificación multifamiliar." },
  { id: 9, imgs: ["/assets/inicio/cori9.0.jpeg", "/assets/inicio/cori9.1.jpeg"], cliente: "CORI", titulo: "Proyecto Cori", descripcion: "Tabiquería de precisión." },
  { id: 10, imgs: ["/assets/inicio/anturio10.0.jpeg", "/assets/inicio/anturio10.1.jpeg"], cliente: "ANTURIO", titulo: "Proyecto Anturio", descripcion: "Calidad garantizada." },
  { id: 11, imgs: ["/assets/inicio/lookyfeel11.0.jpeg", "/assets/inicio/lookyfeel11.1.jpeg", "/assets/inicio/lookyfeel11.2.jpeg", "/assets/inicio/lookyfeel11.3.jpeg", "/assets/inicio/lookyfeel11.4.jpeg"], cliente: "PROYECTO", titulo: "Look & Feel", descripcion: "Diseño y estructura." },
  { id: 12, imgs: ["/assets/inicio/senoritas12.0.jpeg", "/assets/inicio/senoritas12.1.jpeg", "/assets/inicio/senoritas12.2.jpeg", "/assets/inicio/senoritas12.3.jpeg"], cliente: "COSTA", titulo: "Las Señoritas", descripcion: "Construcción en zona costera." },
  { id: 13, imgs: ["/assets/inicio/serenity13.0.jpeg", "/assets/inicio/serenity13.1.jpeg"], cliente: "EDIFICIO", titulo: "Edificio Serenity", descripcion: "Aislamiento acústico avanzado." },
  { id: 14, imgs: ["/assets/inicio/aster14.0.jpeg", "/assets/inicio/aster14.1.jpeg"], cliente: "ASTER", titulo: "Edificio Aster", descripcion: "Montaje estructural rápido." },
  { id: 15, imgs: ["/assets/inicio/bambues15.0.jpeg", "/assets/inicio/bambues15.1.jpeg"], cliente: "BAMBÚES", titulo: "Residencial Bambúes", descripcion: "Sostenibilidad y diseño." },
  { id: 16, imgs: ["/assets/inicio/comas19.0.jpeg", "/assets/inicio/comas19.1.jpeg", "/assets/inicio/parqueComas16.jpeg"], cliente: "COMAS", titulo: "Parque Comas", descripcion: "Urbanización moderna." },
  { id: 17, imgs: ["/assets/inicio/parqueBrena17.0.jpeg", "/assets/inicio/parqueBrena17.1.jpeg"], cliente: "BREÑA", titulo: "Parque Breña", descripcion: "Renovación estructural." },
  { id: 18, imgs: ["/assets/inicio/planta18.0.jpeg", "/assets/inicio/planta18.1.jpeg", "/assets/inicio/planta18.2.jpeg"], cliente: "PLANTA", titulo: "Planta 18", descripcion: "Infraestructura industrial." }
];

export default function NuestrosProyectos() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const handleOpen = (img: string) => setModalImg(img);
  const handleClose = () => setModalImg(null);

  return (
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
            NUESTROS PROYECTOS
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
                  loop={p.imgs.length > 1}
                  autoplay={{ delay: 3000 }}
                  className="project-inner-swiper"
                >
                  {p.imgs.map((foto, idx) => (
                    <SwiperSlide key={idx} onClick={() => handleOpen(foto)}>
                      <img src={foto} alt={p.titulo} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="card-overlay" onClick={() => handleOpen(p.imgs[0])}>
                  <span className="project-number">#{p.id}</span>
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
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="modal-img-grande"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}