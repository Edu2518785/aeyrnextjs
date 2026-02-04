'use client';
import { useEffect, useState } from "react";
import { FaTimes, FaTrash, FaPlus, FaCloudUploadAlt } from "react-icons/fa";
import "@/style/componentsStyle/CotizacionModal.css";

// APIs
import { getDistritos } from "@/services/DistritoApi";
import { getProductos } from "@/services/ProductoApi";
import { crearCotizacion } from "@/services/CotizacionApi";

export default function CotizacionModal({ show, onClose }) {
  const [distritos, setDistritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [listaPedido, setListaPedido] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [cliente, setCliente] = useState({
    ruc: "",
    email: "",
    tipo: "SUMINISTRO",
    proyecto: "",
    direccion: "",
    distritoId: ""
  });

  const [tempItem, setTempItem] = useState({
    productoId: "",
    cantidad: "",
    unidad: "Unidades"
  });

  // Evitar error de hidratación en Next.js
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = show ? "hidden" : "auto";
    }
    
    if (!show) {
      setErrors({});
      setListaPedido([]);
      setCliente({
        ruc: "",
        email: "",
        tipo: "SUMINISTRO",
        proyecto: "",
        direccion: "",
        distritoId: ""
      });
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const cargarData = async () => {
      try {
        const [distritosData, productosData] = await Promise.all([
          getDistritos(),
          getProductos()
        ]);
        setDistritos(distritosData);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };

    cargarData();
  }, [show]);

  const validateForm = () => {
    let newErrors = {};
    if (!/^\d{8,11}$/.test(cliente.ruc))
      newErrors.rucDni = "El RUC/DNI debe tener entre 8 y 11 dígitos";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email))
      newErrors.email = "Formato de email inválido";
    if (cliente.proyecto.trim().length < 3)
      newErrors.nombreProyecto = "Mínimo 3 caracteres";
    if (cliente.direccion.trim().length < 5)
      newErrors.direccion = "Mínimo 5 caracteres";
    if (!cliente.distritoId)
      newErrors.distritoId = "Seleccione un distrito";
    if (listaPedido.length === 0)
      newErrors.items = "Agregue al menos un producto";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setCliente({ ...cliente, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const agregarALista = () => {
    const cantidadNum = Number(tempItem.cantidad);
    if (!tempItem.productoId) return alert("Selecciona un producto");
    if (cantidadNum <= 0) return alert("Cantidad inválida");

    const producto = productos.find(p => p.id === Number(tempItem.productoId));
    if (!producto) return alert("Producto no encontrado");

    setListaPedido(prev => [
      ...prev,
      {
        id: Date.now(),
        productoId: producto.id,
        productoNombre: producto.nombre,
        cantidad: cantidadNum,
        unidad: tempItem.unidad
      }
    ]);

    setTempItem({ ...tempItem, productoId: "", cantidad: "" });
    if (errors.items) setErrors({ ...errors, items: null });
  };

  const eliminarDeLista = (id) => {
    setListaPedido(prev => prev.filter(item => item.id !== id));
  };

  const enviarCotizacion = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload = {
        rucDni: cliente.ruc,
        email: cliente.email,
        tipo: cliente.tipo,
        nombreProyecto: cliente.proyecto,
        direccion: cliente.direccion,
        distritoId: Number(cliente.distritoId),
        items: listaPedido.map(item => ({
          productoId: Number(item.productoId),
          cantidad: Number(item.cantidad),
          unidad: item.unidad
        }))
      };
      await crearCotizacion(payload);
      alert("Cotización enviada correctamente");
      onClose();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      } else {
        alert("Error al enviar: " + (error.message || "Error desconocido"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div 
      className={`modal-overlay-custom ${show ? "is-open" : ""}`}
      style={{ display: show ? "flex" : "none" }} 
    >
      <div className="modal-container-xl">
        <button className="btn-close-modal" onClick={onClose} disabled={loading}>
          <FaTimes />
        </button>

        {show && (
          <div className="modal-layout">
            <aside className="modal-sidebar">
              <div className="sidebar-header">
                <h2>Tu Pedido</h2>
                <div className="header-underline"></div>
              </div>
              {errors.items && <span className="error-msg-sidebar">{errors.items}</span>}

              <div className="order-items-container">
                {listaPedido.length === 0 ? (
                  <p className="empty-state">Aún no hay productos</p>
                ) : (
                  listaPedido.map(item => (
                    <div key={item.id} className="item-order-card">
                      <div className="item-info">
                        <strong>{item.productoNombre}</strong>
                        <span>{item.cantidad} {item.unidad}</span>
                      </div>
                      <button className="btn-del" onClick={() => eliminarDeLista(item.id)}><FaTrash /></button>
                    </div>
                  ))
                )}
              </div>

              <button className="btn-send-portal" onClick={enviarCotizacion} disabled={loading}>
                {loading ? "Enviando..." : <><FaCloudUploadAlt /> Enviar Cotización</>}
              </button>
            </aside>

            <section className="modal-content-form">
              <div className="form-section">
                <h3>Datos del Proyecto</h3>
                <div className="input-grid">
                  <div className="input-group">
                    <input
                      placeholder="RUC / DNI"
                      maxLength={11}
                      className={errors.rucDni ? "input-error" : ""}
                      value={cliente.ruc}
                      onChange={e => handleChange("ruc", e.target.value.replace(/\D/g, ""))}
                    />
                    {errors.rucDni && <span className="error-msg">{errors.rucDni}</span>}
                  </div>

                  <div className="input-group">
                    <input
                      placeholder="Email"
                      className={errors.email ? "input-error" : ""}
                      value={cliente.email}
                      onChange={e => handleChange("email", e.target.value)}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="input-group">
                  <input
                    placeholder="Nombre del Proyecto"
                    className={errors.nombreProyecto ? "input-error" : ""}
                    value={cliente.proyecto}
                    onChange={e => handleChange("proyecto", e.target.value)}
                  />
                  {errors.nombreProyecto && <span className="error-msg">{errors.nombreProyecto}</span>}
                </div>

                <div className="input-group">
                  <input
                    placeholder="Dirección de la Obra"
                    className={errors.direccion ? "input-error" : ""}
                    value={cliente.direccion}
                    onChange={e => handleChange("direccion", e.target.value)}
                  />
                  {errors.direccion && <span className="error-msg">{errors.direccion}</span>}
                </div>

                <div className="input-grid">
                  <div className="input-group">
                    <select
                      className={errors.distritoId ? "input-error" : ""}
                      value={cliente.distritoId}
                      onChange={e => handleChange("distritoId", e.target.value)}
                    >
                      <option value="">Seleccionar distrito</option>
                      {distritos.map(d => <option key={d.id} value={String(d.id)}>{d.nombre}</option>)}
                    </select>
                    {errors.distritoId && <span className="error-msg">{errors.distritoId}</span>}
                  </div>

                  <select value={cliente.tipo} onChange={e => handleChange("tipo", e.target.value)}>
                    <option value="SUMINISTRO">SUMINISTRO</option>
                    <option value="INSTALACION">INSTALACIÓN</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Añadir Producto</h3>
                <select
                  value={tempItem.productoId}
                  onChange={e => setTempItem({ ...tempItem, productoId: e.target.value })}
                  className="select-full"
                >
                  <option value="">Seleccionar producto</option>
                  {productos.map(p => <option key={p.id} value={String(p.id)}>{p.nombre}</option>)}
                </select>

                <div className="input-grid">
                  <select
                    value={tempItem.unidad}
                    onChange={e => setTempItem({ ...tempItem, unidad: e.target.value })}
                  >
                    <option value="Unidades">Unidades</option>
                    <option value="Parihuelas">Parihuelas</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Cant."
                    value={tempItem.cantidad}
                    onChange={e => setTempItem({ ...tempItem, cantidad: e.target.value })}
                  />
                </div>

                <button className="btn-add-material" onClick={agregarALista}>
                  <FaPlus /> Añadir
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}