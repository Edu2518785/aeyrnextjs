'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import "../../style/pagesStyle/LibroReclamaciones.css";

// 1. Definimos la interfaz completa para eliminar el error 'any' [cite: 2026-01-27]
interface ReclamoForm {
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  representante: string;
  bienContratado: "PRODUCTO" | "SERVICIO";
  tipoMoneda: "SOLES" | "DOLARES";
  montoReclamado: string;
  descripcionBien: string;
  tipo: "RECLAMO" | "QUEJA";
  detalle: string;
  pedido: string;
}

export default function LibroReclamaciones() {
  const router = useRouter();

  const [form, setForm] = useState<ReclamoForm>({
    nombre: "",
    documento: "",
    domicilio: "",
    telefono: "",
    email: "",
    representante: "",
    bienContratado: "PRODUCTO",
    tipoMoneda: "SOLES",
    montoReclamado: "",
    descripcionBien: "",
    tipo: "RECLAMO",
    detalle: "",
    pedido: ""
  });

  // Tipado correcto para el estado de errores [cite: 2026-01-27]
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (key: keyof ReclamoForm, value: string) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const handleSalir = () => {
    router.back(); // Reemplaza navigate(-1) de React Router
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!captchaToken) {
      setErrors({ captcha: "Debe completar el captcha" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://apicontrucciones-production.up.railway.app/api/public/libro-reclamaciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            ...form, 
            captchaToken,
            fechaEnvio: new Date().toLocaleDateString(), // Requerimiento anterior [cite: 2026-01-19]
            horaEnvio: new Date().toLocaleTimeString() 
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
      } else {
        alert(`✔ Reclamo registrado correctamente\nN° ${data.numeroReclamo}`);
        setForm({
          nombre: "", documento: "", domicilio: "", telefono: "", email: "",
          representante: "", bienContratado: "PRODUCTO", tipoMoneda: "SOLES",
          montoReclamado: "", descripcionBien: "", tipo: "RECLAMO",
          detalle: "", pedido: ""
        });
        setCaptchaToken(null);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reclamaciones-page">
      <div className="form-container-documento">
        <header className="header-indecopi">
          <div className="box-left">
            <h1>LIBRO DE RECLAMACIONES</h1>
            <p>FECHA: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="box-right">
            <h1>HOJA DE RECLAMACIÓN</h1>
            <p>N° Virtual Autogenerado</p>
          </div>
        </header>

        <section className="info-empresa">
          <p><strong>PROVEEDOR:</strong> AE&R CG SAC</p>
          <p><strong>RUC:</strong> 20601234567</p>
          <p><strong>DOMICILIO:</strong> Lima, Perú</p>
        </section>

        <form onSubmit={handleSubmit}>
          <h2 className="table-header">1. IDENTIFICACIÓN DEL CONSUMIDOR</h2>

          <div className="row-oficial">
            <label>Nombre completo</label>
            <input
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className={errors.nombre ? "input-error" : ""}
            />
          </div>

          <div className="row-oficial">
            <label>DNI / RUC</label>
            <input
              value={form.documento}
              onChange={(e) => handleChange("documento", e.target.value.replace(/\D/g, ""))}
              className={errors.documento ? "input-error" : ""}
            />
          </div>

          <div className="row-oficial">
            <label>Domicilio</label>
            <input value={form.domicilio} onChange={(e) => handleChange("domicilio", e.target.value)} />
          </div>

          <div className="row-split">
            <div className="half-cell">
              <label>Teléfono</label>
              <input value={form.telefono} onChange={(e) => handleChange("telefono", e.target.value)} />
            </div>
            <div className="half-cell">
              <label>Email</label>
              <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
          </div>

          <div className="row-oficial">
            <label>Representante</label>
            <input value={form.representante} onChange={(e) => handleChange("representante", e.target.value)} />
          </div>

          <h2 className="table-header">2. BIEN CONTRATADO</h2>

          <div className="radios-box">
            <label>
              <input
                type="radio"
                checked={form.bienContratado === "PRODUCTO"}
                onChange={() => handleChange("bienContratado", "PRODUCTO")}
              /> Producto
            </label>
            <label>
              <input
                type="radio"
                checked={form.bienContratado === "SERVICIO"}
                onChange={() => handleChange("bienContratado", "SERVICIO")}
              /> Servicio
            </label>
          </div>

          <div className="row-split">
            <div className="half-cell">
              <label>Moneda</label>
              <select
                value={form.tipoMoneda}
                onChange={(e) => handleChange("tipoMoneda", e.target.value as "SOLES" | "DOLARES")}
                className="select-moneda"
              >
                <option value="SOLES">S/</option>
                <option value="DOLARES">USD</option>
              </select>
            </div>
            <div className="half-cell">
              <label>Monto</label>
              <input
                type="number"
                step="0.01"
                value={form.montoReclamado}
                onChange={(e) => handleChange("montoReclamado", e.target.value)}
              />
            </div>
          </div>

          <div className="area-container">
            <label>Descripción del bien</label>
            <textarea value={form.descripcionBien} onChange={(e) => handleChange("descripcionBien", e.target.value)} />
          </div>

          <h2 className="table-header">3. DETALLE DEL RECLAMO</h2>

          <div className="row-type-select">
            <label>
              <input
                type="radio"
                checked={form.tipo === "RECLAMO"}
                onChange={() => handleChange("tipo", "RECLAMO")}
              /> RECLAMO
            </label>
            <label>
              <input
                type="radio"
                checked={form.tipo === "QUEJA"}
                onChange={() => handleChange("tipo", "QUEJA")}
              /> QUEJA
            </label>
          </div>

          <div className="area-container">
            <label>Detalle</label>
            <textarea value={form.detalle} onChange={(e) => handleChange("detalle", e.target.value)} />
          </div>

          <div className="area-container">
            <label>Pedido</label>
            <textarea value={form.pedido} onChange={(e) => handleChange("pedido", e.target.value)} />
          </div>

          <div className="captcha-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={(token) => setCaptchaToken(token)}
            />
            {errors.captcha && <span className="error-msg" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.captcha}</span>}
          </div>

          <div className="button-group" style={{ display: 'flex' }}>
            <button type="button" className="btn-enviar-oficial" style={{ background: '#555' }} onClick={handleSalir}>
              SALIR
            </button>
            <button type="submit" className="btn-enviar-oficial" disabled={loading}>
              {loading ? "ENVIANDO..." : "ENVIAR RECLAMO"}
            </button>
          </div>

          <footer className="legales-pie">
            * La empresa responderá en un plazo máximo de 15 días hábiles.
          </footer>
        </form>
      </div>
    </div>
  );
}