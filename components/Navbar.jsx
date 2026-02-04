'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/style/componentsStyle/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Hook para saber en qué página estamos

  // Función para cerrar el menú al hacer click en un link
  const closeMenu = () => setOpen(false);

  // Helper para verificar si la ruta está activa
  const isActive = (path) => pathname === path ? "active" : "";

  return (
    <nav className="navbar-floating">
      <div className="navbar-logo">
        <span className="logo-text">AE&R</span>
      </div>

      <ul className={`navbar-links ${open ? "open" : ""}`}>
        <li>
          <Link href="/" className={isActive("/")} onClick={closeMenu}>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/nosotros" className={isActive("/nosotros")} onClick={closeMenu}>
            Nosotros
          </Link>
        </li>
        <li>
          <Link href="/tabiqueria" className={isActive("/tabiqueria")} onClick={closeMenu}>
            Tabiqueria
          </Link>
        </li>
        <li>
          <Link href="/distribuidor" className={isActive("/distribuidor")} onClick={closeMenu}>
            Distribuidor
          </Link>
        </li>        
        <li>
          <Link href="/contactanos" className={isActive("/contactanos")} onClick={closeMenu}>
            Contáctanos
          </Link>
        </li>
      </ul>

      <div className={`hamburger ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}