'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf } from "react-icons/fa";

// Estilos Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../../style/pagesStyle/Distribuidor.css";

const listaProductos = [
  { id: 1, nombre: "Ladrillo Unicon B9", imagen: "/assets/productos/b9.jpg", categoria: "Ladrillos", descripcion: "Bloque de concreto de alta resistencia ideal para muros portantes.", ficha: "/Documents/B9.pdf" },
  { id: 2, nombre: "Ladrillo Unicon B12", imagen: "/assets/productos/b12.jpg", categoria: "Ladrillos", descripcion: "Solución versátil para edificaciones seguras y duraderas.", ficha: "/Documents/B12.pdf" },
  { id: 3, nombre: "Ladrillo Unicon B14", imagen: "/assets/productos/b14.jpg", categoria: "Ladrillos", descripcion: "Dimensiones optimizadas para una construcción más rápida.", ficha: "/Documents/B14.pdf" },
  { id: 4, nombre: "Ladrillo Unicon B19", imagen: "/assets/productos/b19.jpg", categoria: "Ladrillos", descripcion: "Máxima capacidad de carga para proyectos de gran envergadura.", ficha: "/Documents/B19.pdf" },
  { id: 5, nombre: "Mortero Especial", imagen: "/assets/productos/mortero.jpg", categoria: "Embolsados", descripcion: "Mezcla lista para usar que garantiza adherencia superior.", ficha: "/Documents/Mortero.pdf" },
  { id: 6, nombre: "Concreto Pre-mezclado", imagen: "/assets/productos/concreto.jpg", categoria: "Embolsados", descripcion: "Dosificación exacta y calidad controlada en planta.", ficha: "/Documents/Concreto.pdf" },
  { id: 7, nombre: "Tarrajeo Fino", imagen: "/assets/productos/tarrajeo.jpg", categoria: "Embolsados", descripcion: "Acabado suave y resistente para interiores y exteriores.", ficha: "/Documents/Tarrajeo.pdf" },
];

const proyectosDistribucion = [
  { id: 1, imgs: ["/assets/inicio/dorue1.0.jpeg"], cliente: "BESCO", titulo: "EDIFICIO DORUE", descripcion: "Suministro estratégico de bloques Unicon." },
  { id: 2, imgs: ["/assets/inicio/cantabrico3.jpeg"], cliente: "MIRANDA", titulo: "OBRA CANTÁBRICO", descripcion: "Logística de ladrillos de alta resistencia." },
  { id: 3, imgs: ["/assets/inicio/astoria4.jpeg"], cliente: "BESCO", titulo: "CONDOMINIO ASTORIA", descripcion: "Solución integral en tabiquería armada." },
  { id: 4, imgs: ["/assets/inicio/construccion.jpg"], cliente: "BESCO", titulo: "PROYECTO LURÍN", descripcion: "Distribución masiva de embolsados." },
  { id: 5, imgs: ["/assets/inicio/carrusel1.jpg"], cliente: "MIRANDA", titulo: "RESIDENCIAL LAS PALMAS", descripcion: "Abastecimiento de materiales certificados." },
  { id: 6, imgs: ["/assets/inicio/carrusel2.jpg"], cliente: "AE&R", titulo: "LOGÍSTICA CENTRAL", descripcion: "Control de calidad en obra." },
];

export default function Distribuidor() {
  const [filtro, setFiltro] = useState("Todos");
  const [modalImg, setModalImg] = useState<string | null>(null);

  const productosFiltrados = filtro === "Todos" 
    ? listaProductos 
    : listaProductos.filter((p) => p.categoria === filtro);

  return (
    <motion.main className="distribuidor-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      
      <header className="dist-header">
        <h1>Distribución de Materiales</h1>
        <p>Suministros certificados UNICON para construcción profesional</p>
      </header>

      <div className="catalogo-wrapper">
        <aside className="categorias-box">
          <h3>Filtrar por:</h3>
          {["Todos", "Ladrillos", "Embolsados"].map((cat) => (
            <button key={cat} className={`cat-btn ${filtro === cat ? "active" : ""}`} onClick={() => setFiltro(cat)}>
              {cat}
            </button>
          ))}
        </aside>

        <section className="productos-grid">
          {productosFiltrados.map((prod) => (
            <article key={prod.id} className="card-producto">
              <div className="img-wrapper"><img src={prod.image} alt={prod.nombre} /></div>
              <div className="card-content">
                <span className="categoria-label">{prod.categoria}</span>
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <a href={prod.ficha} download className="btn-ficha">
                  <FaFilePdf /> Ficha técnica
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>

      <section className="experiencia-section">
        <div className="experiencia-intro">
          <span className="brand-badge">Trayectoria AE&R</span>
          <h2>Proyectos con <span>Suministro Estratégico</span></h2>
          <div className="divider"></div>
        </div>

        <div className="gallery-grid-5col">
          {proyectosDistribucion.map((p, index) => (
            <motion.div 
              key={p.id} 
              className="proyecto-card-b"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
            >
              <div className="image-box-b">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={p.imgs.length > 1}
                  pagination={p.imgs.length > 1 ? { clickable: true } : false}
                  className="project-inner-swiper-b"
                >
                  {p.imgs.map((foto, idx) => (
                    <SwiperSlide key={idx} onClick={() => setModalImg(foto)}>
                      <img src={foto} alt={p.titulo} loading="lazy" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="card-overlay-b" onClick={() => setModalImg(p.imgs[0])}>
                  <span className="project-number-b">#{p.id}</span>
                </div>
              </div>
              <div className="info-box-b">
                <div className="client-tag-b">{p.cliente}</div>
                <h3>{p.titulo}</h3>
                <p className="desc-text-b">{p.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {modalImg && (
          <motion.div className="modal-ae-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalImg(null)}>
            <button className="modal-close-btn" onClick={() => setModalImg(null)}>&times;</button>
            <motion.img 
              src={modalImg} 
              initial={{ scale: 0.5 }} animate={{ scale: 1 }}
              className="modal-img-grande"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}