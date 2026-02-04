'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import "../../style/pagesStyle/LibroReclamaciones.css";

export default function LibroReclamaciones() {
  const router = useRouter();

  // Mantenemos tus nombres de campos exactos para que la API de Spring Boot no falle
  const [form, setForm] = useState({
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

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Tipamos los parámetros para que TypeScript no dé error en el IDE
  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: null });
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
      // Usamos tu URL de Railway original
      const response = await fetch(
        "https://apicontrucciones-production.up.railway.app/api/public/libro-reclamaciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, captchaToken })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
      } else {
        alert(`✔ Reclamo registrado correctamente\nN° ${data.numeroReclamo}`);
        // Reset del form
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
      {/* Usamos router.push('/') para el botón de volver */}
      <button onClick={() => router.push('/')} className="btn-back-home" style={{cursor: 'pointer', background: 'none', border: 'none'}}>
        VOLVER AL INICIO
      </button>

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

          {/* ... El resto de tus campos se mantienen idénticos al original ... */}
          
          <h2 className="table-header">3. DETALLE DEL RECLAMO</h2>
          <div className="area-container">
            <label>Detalle</label>
            <textarea value={form.detalle} onChange={(e) => handleChange("detalle", e.target.value)} />
          </div>

          <div className="captcha-container">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "TU_SITE_KEY_AQUI"}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          <button type="submit" className="btn-enviar-oficial" disabled={loading}>
            {loading ? "ENVIANDO..." : "ENVIAR RECLAMO"}
          </button>
        </form>
      </div>
    </div>
  );
}