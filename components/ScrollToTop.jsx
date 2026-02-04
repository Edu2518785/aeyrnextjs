'use client'; // Necesario en Next.js porque usamos hooks como useLayoutEffect

import { useLayoutEffect } from "react";
// Cambiamos useLocation por usePathname de Next.js para detectar el cambio de ruta
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  // --- SECCIÓN 1: DETECCIÓN DE RUTA ---
  // pathname obtendrá la ruta actual (ej: /nosotros, /tabiqueria)
  const pathname = usePathname();

  useLayoutEffect(() => {
    // --- SECCIÓN 2: LÓGICA DE SCROLL ---
    
    // 1. Forzamos el scroll al inicio inmediatamente al cambiar de ruta
    window.scrollTo(0, 0);

    // 2. Truco para la pantalla blanca (Hack de 10ms):
    // Tal como en tu código original, esto obliga al navegador a recalcular el diseño (reflow)
    // asegurando que la página no se quede "pegada" en una posición previa.
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    // Limpieza del timeout para evitar fugas de memoria
    return () => clearTimeout(timeout);
    
  }, [pathname]); // Se ejecuta cada vez que el pathname cambia

  // Este componente no renderiza nada visualmente
  return null;
};

export default ScrollToTop;