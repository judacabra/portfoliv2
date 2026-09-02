import "./styles/Contact.css";

import { useState } from "react";

import { motion, } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Github, Linkedin } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";
interface Field {
  value: string;
  error: string;
}

const INITIAL: Record<string, Field> = {
  nombre: { value: "", error: "" },
  email: { value: "", error: "" },
  asunto: { value: "", error: "" },
  mensaje: { value: "", error: "" },
};

const CONTACT_INFO: any[] = [
  { icon: Mail,     labelKey: "Emal",     value: "jd_caicedo@hotmail.es",          href: "mailto:jd_caicedo@hotmail.es" },
  { icon: Github,   labelKey: "Github",   value: "github.com/judacabra",           href: "https://github.com/judacabra" },
  { icon: Linkedin, labelKey: "Linkedin", value: "linkedin.com/in/juliancaicedoo", href: "https://www.linkedin.com/in/juliancaicedoo" },
];

const Contact = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [fields, setFields] = useState<any>(INITIAL);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: string, value: string) =>
    setFields((f: any) => ({ ...f, [key]: { value, error: "" } }));

  const validate = (f: typeof INITIAL) => {
    const e: Record<string, string> = {};

    if (!f.nombre.value.trim()) e.nombre = "El nombre es requerido.";
    if (!f.email.value.trim()) e.email = "El email es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value))
      e.email = "Ingresa un email válido.";
    if (!f.asunto.value.trim()) e.asunto = "El asunto es requerido.";
    if (!f.mensaje.value.trim()) e.mensaje = "El mensaje es requerido.";
    else if (f.mensaje.value.trim().length < 20) e.mensaje = "El mensaje debe tener al menos 20 caracteres.";

    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsDark(true);
    setErrorMsg("");

    const errors = validate(fields);
    
    if (Object.keys(errors).length) {
      setFields((f: any) => {
        const u = { ...f };
        for (const k in errors) u[k] = { ...f[k], error: errors[k] };
        return u;
      });
      return;
    }

    setStatus("loading");
    
    await new Promise((r) => setTimeout(r, 1600));
    
    setStatus("success");
  };

  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.currentTarget.style.borderColor = "#6366f1";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
  };
  
  const onBlurFn =
    (key: string) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = fields[key].error
        ? "#f87171"
        : isDark
          ? "rgba(255,255,255,0.14)"
          : "rgba(0,0,0,0.12)";
      e.currentTarget.style.boxShadow = "none";
    };

  return (
    <section
      id="contact"
      className="contact"
      style={{
        position: "relative",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        margin: "80px auto",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3

            style={{
              width: "100%",
              fontSize: 40,
              color: "white",
              textAlign: "center",
              margin: "0 0 10px",
            }}
          >
            ¿Tienes un proyecto en mente?
          </h3>
          <p
            className="contact-subtitle"
            style={{
              color: "gray",
              textAlign: "center",
              margin: "0 auto 50px",
            }}
          >
            Estoy disponible para proyectos freelance, posiciones full-time o
            simplemente para conversar sobre tecnología y diseño. Escríbeme y te
            respondo en menos de 48 horas.
          </p>
        </motion.div>

        {/* Principal */}
        <div 
          className="principal-container"
          style={{ 
            display: "flex",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* Contact info */}
          <div className="contact-info-wrapper">
            <motion.div
              className="contact-grid"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {CONTACT_INFO.map(({ icon: Icon, labelKey, value, href }) => (
                <a
                  key={labelKey}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem", 
                    padding: "1rem", 
                    borderRadius: "0.75rem", 
                    border: "1px solid",
                    background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                    marginBottom: "25px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(99,102,241,0.4)";
                    el.style.boxShadow = "0 4px 16px rgba(99,102,241,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      padding: "0.5rem", 
                      borderRadius: "0.5rem", 
                      flexShrink: 0,
                      background: "rgba(99,102,241,0.12)",
                    }}
                  >
                    <Icon
                      style={{
                        width: "1rem", 
                        height: "1rem",
                        color: "#6366f1",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af",
                        margin: 0,
                      }}
                    >
                      {labelKey}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem", 
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: isDark ? "#f1f5f9" : "#111827",
                        margin: 0,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Formulario */}
          <div 
            className="form-wrapper"
            style={{ 
              paddingLeft: 15 
            }}
          >
            <div
              className="form-inner"
              style={{
                width: "100%",
                borderRadius: "1rem", 
                padding: "1.5rem", 
                border: "1px solid",
                background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                borderColor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)",
                boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem 0 1.5rem',
                    textAlign: 'center',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle 
                      style={{
                        width: '4rem',
                        height: '4rem',
                        marginBottom: '1rem',
                        color: '#22c55e'
                      }} 
                    />
                  </motion.div>
                  
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: isDark ? '#f1f5f9' : '#111827'
                    }}
                  >
                    ¡Mensaje enviado!
                  </h3>
                  
                  <p
                    style={{
                      fontSize: '0.875rem',
                      maxWidth: '24rem',
                      color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280'
                    }}
                  >
                    Gracias por escribirme. Te respondo en menos de 48 horas.
                  </p>
                  
                  <motion.button
                    onClick={() => {
                      setStatus("idle");
                      setFields(INITIAL);
                    }}
                    type="submit"
                    style={{
                      width: '60%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 0',
                      borderRadius: '0.75rem',
                      fontWeight: 600,
                      color: 'white',
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxSizing: 'border-box',
                      marginTop: 20,
                    }}
                  >
                    <Send 
                      style={{
                        width: '1rem',
                        height: '1rem'
                      }} 
                      aria-hidden="true" 
                    />
                    Enviar otro mensaje
                  </motion.button>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  noValidate 
                  aria-label="Formulario de contacto"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Fila de nombre y email */}
                  <div className="form-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    {/* Nombre */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <label 
                        htmlFor="cf-nombre" 
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          marginBottom: '0.25rem',
                          color: isDark ? '#e2e8f0' : '#374151'
                        }}
                      >
                        Nombre *
                      </label>
                      <input
                        id="cf-nombre"
                        type="text"
                        autoComplete="name"
                        placeholder="Nombre"
                        value={fields.nombre.value}
                        onChange={(e) => set("nombre", e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                          color: isDark ? '#f1f5f9' : '#111827',
                          border: `1.5px solid ${fields.nombre.error ? '#f87171' : isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`,
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
                          boxSizing: 'border-box'
                        }}
                        aria-describedby={fields.nombre.error ? "err-nombre" : undefined}
                        aria-invalid={!!fields.nombre.error}
                        onFocus={onFocus}
                        onBlur={onBlurFn("nombre")}
                      />
                      {fields.nombre.error && (
                        <motion.p
                          id="err-nombre"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            fontSize: '0.75rem',
                            margin: 0,
                            marginTop: '0.25rem',
                            color: '#f87171'
                          }}
                          role="alert"
                        >
                          {fields.nombre.error}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <label 
                        htmlFor="cf-email" 
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          marginBottom: '0.25rem',
                          color: isDark ? '#e2e8f0' : '#374151'
                        }}
                      >
                        Email *
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={fields.email.value}
                        onChange={(e) => set("email", e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          fontSize: '0.875rem',
                          fontFamily: 'inherit',
                          background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                          color: isDark ? '#f1f5f9' : '#111827',
                          border: `1.5px solid ${fields.email.error ? '#f87171' : isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`,
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
                          boxSizing: 'border-box'
                        }}
                        aria-describedby={fields.email.error ? "err-email" : undefined}
                        aria-invalid={!!fields.email.error}
                        onFocus={onFocus}
                        onBlur={onBlurFn("email")}
                      />
                      {fields.email.error && (
                        <motion.p
                          id="err-email"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            fontSize: '0.75rem',
                            margin: 0,
                            marginTop: '0.25rem',
                            color: '#f87171'
                          }}
                          role="alert"
                        >
                          {fields.email.error}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Asunto */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <label 
                      htmlFor="cf-asunto" 
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        marginBottom: '0.25rem',
                        color: isDark ? '#e2e8f0' : '#374151'
                      }}
                    >
                      Asunto *
                    </label>
                    <input
                      id="cf-asunto"
                      type="text"
                      placeholder="Asunto"
                      value={fields.asunto.value}
                      onChange={(e) => set("asunto", e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit',
                        background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                        color: isDark ? '#f1f5f9' : '#111827',
                        border: `1.5px solid ${fields.asunto.error ? '#f87171' : isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`,
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
                        boxSizing: 'border-box'
                      }}
                      aria-describedby={fields.asunto.error ? "err-asunto" : undefined}
                      aria-invalid={!!fields.asunto.error}
                      onFocus={onFocus}
                      onBlur={onBlurFn("asunto")}
                    />
                    {fields.asunto.error && (
                      <motion.p
                        id="err-asunto"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontSize: '0.75rem',
                          margin: 0,
                          marginTop: '0.25rem',
                          color: '#f87171'
                        }}
                        role="alert"
                      >
                        {fields.asunto.error}
                      </motion.p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <label 
                      htmlFor="cf-mensaje" 
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        marginBottom: '0.25rem',
                        color: isDark ? '#e2e8f0' : '#374151'
                      }}
                    >
                      Mensaje * <span style={{
                        color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af',
                        fontWeight: 400
                      }}>(mínimo 20 caracteres)</span>
                    </label>
                    <textarea
                      id="cf-mensaje"
                      rows={5}
                      placeholder="Mensaje"
                      value={fields.mensaje.value}
                      onChange={(e) => set("mensaje", e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit',
                        background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                        color: isDark ? '#f1f5f9' : '#111827',
                        border: `1.5px solid ${fields.mensaje.error ? '#f87171' : isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'}`,
                        borderRadius: '0.5rem',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '120px',
                        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s',
                        boxSizing: 'border-box'
                      }}
                      aria-describedby={fields.mensaje.error ? "err-mensaje" : undefined}
                      aria-invalid={!!fields.mensaje.error}
                      onFocus={onFocus}
                      onBlur={onBlurFn("mensaje")}
                    />
                    {fields.mensaje.error && (
                      <motion.p
                        id="err-mensaje"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontSize: '0.75rem',
                          margin: 0,
                          marginTop: '0.25rem',
                          color: '#f87171'
                        }}
                        role="alert"
                      >
                        {fields.mensaje.error}
                      </motion.p>
                    )}
                  </div>

                  {/* Error general */}
                  {status === "error" && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(248, 113, 113, 0.1)',
                      border: '1px solid rgba(248, 113, 113, 0.3)',
                      boxSizing: 'border-box'
                    }} role="alert">
                      <AlertCircle style={{
                        width: '1rem',
                        height: '1rem',
                        color: '#f87171',
                        flexShrink: 0
                      }} aria-hidden="true" />
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#f87171',
                        margin: 0
                      }}> {errorMsg} </p>
                    </div>
                  )}

                  {/* Botón submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 0',
                      borderRadius: '0.75rem',
                      fontWeight: 600,
                      color: 'white',
                      background: status === "loading" 
                        ? 'rgba(99, 102, 241, 0.7)' 
                        : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      cursor: status === "loading" ? 'not-allowed' : 'pointer',
                      border: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      boxSizing: 'border-box'
                    }}
                    whileHover={
                      status !== "loading"
                        ? {
                            scale: 1.02,
                            boxShadow: "0 4px 20px rgba(99,102,241,0.4)"
                          }
                        : {}
                    }
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 style={{
                          width: '1rem',
                          height: '1rem',
                          animation: 'spin 1s linear infinite'
                        }} aria-hidden="true" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send style={{
                          width: '1rem',
                          height: '1rem'
                        }} aria-hidden="true" />
                        Enviar
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
