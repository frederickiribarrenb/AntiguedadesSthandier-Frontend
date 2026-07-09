import React, { useState, useEffect, useRef } from "react";
import {
  Box, TextField, Button, Typography, Paper, IconButton, Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";

const Formulario = ({
  mensaje,
  productosSeleccionados: propsProductosSeleccionados,
  allProductos: propsAllProductos,
}) => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const ref       = useRef(null);
  const [visible, setVisible] = useState(false);

  const [productosSeleccionados, setProductosSeleccionados] = useState(
    propsProductosSeleccionados || location.state?.productosSeleccionados || []
  );
  const [form,    setForm]    = useState({ nombre: "", email: "", mensaje: mensaje || "" });
  const [errors,  setErrors]  = useState({});
  const [enviado, setEnviado] = useState(false);
  const [todosAgregados, setTodosAgregados] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (propsProductosSeleccionados) setProductosSeleccionados(propsProductosSeleccionados);
    else if (location.state?.productosSeleccionados) setProductosSeleccionados(location.state.productosSeleccionados);
  }, [propsProductosSeleccionados, location.state?.productosSeleccionados]);

  useEffect(() => {
    const allProductos = propsAllProductos || location.state?.allProductos || [];
    if (!allProductos.length) { setTodosAgregados(false); return; }
    const allKeys  = new Set();
    const selKeys  = new Set();
    allProductos.forEach((p) => {
      if (p.precios?.length > 0) p.precios.forEach((pr) => allKeys.add(`${p.nombre}__${pr.Nombre}`));
      else allKeys.add(`${p.nombre}`);
    });
    productosSeleccionados.forEach((p) => {
      if (p.nombreSeleccionado) selKeys.add(`${p.titulo}__${p.nombreSeleccionado}`);
      else selKeys.add(`${p.titulo}`);
    });
    setTodosAgregados(allKeys.size > 0 && allKeys.size === selKeys.size);
  }, [productosSeleccionados, propsAllProductos, location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setEnviado(false);
  };

  const validate = () => {
    const t = {};
    if (!form.nombre.trim()) t.nombre = "El nombre es obligatorio";
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) t.nombre = "Solo letras y espacios";
    if (!form.email.trim()) t.email = "El email es obligatorio";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) t.email = "Email inválido";
    if (!form.mensaje.trim()) t.mensaje = "El mensaje es obligatorio";
    setErrors(t);
    return Object.keys(t).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setEnviado(true);
      setForm({ nombre: "", email: "", mensaje: "" });
      setErrors({});
      setProductosSeleccionados([]);
    }
  };

  const handleAgregarOtroProducto = () => {
    navigate("/", { state: { irAProductos: true, productosSeleccionados, scrollTo: "productos-typo" } });
  };

  const handleLimpiar = () => {
    setForm({ nombre: "", email: "", mensaje: "" });
    setErrors({});
    setEnviado(false);
    setProductosSeleccionados([]);
    navigate(location.pathname, { replace: true, state: { ...location.state, productosSeleccionados: [] } });
  };

  const handleEliminarProducto = (idxEliminar) => {
    const nuevos = productosSeleccionados.filter((_, i) => i !== idxEliminar);
    setProductosSeleccionados(nuevos);
    setEnviado(false);
    navigate(location.pathname, { replace: true, state: { ...location.state, productosSeleccionados: nuevos } });
  };

  return (
    <Box
      ref={ref}
      sx={{
        background: "linear-gradient(160deg, #F0EAE0 0%, #FAF7F2 100%)",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 5, md: 7 },
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s ease",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5, py: 0.75, mb: 2,
            background: "rgba(212,168,83,0.12)",
            border: "1px solid rgba(212,168,83,0.3)",
            borderRadius: 50,
          }}
        >
          <DiamondOutlinedIcon sx={{ color: "#D4A853", fontSize: 13 }} />
          <Typography
            sx={{
              color: "#A67C1F",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            Escríbenos
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1C1714", mb: 1.5,
          }}
        >
          ¿Te interesa alguna{" "}
          <Box
            component="span"
            sx={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4A853, #A67C1F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            pieza?
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: "#7D5A35",
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: 480, mx: "auto", lineHeight: 1.75,
          }}
        >
          Cuéntanos qué te interesa y te responderemos con toda la información
          que necesites.
        </Typography>
      </Box>

      {/* ── Layout con dos columnas ── */}
      <Box
        sx={{
          maxWidth: 1000, mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: { xs: "stretch", md: "flex-start" },
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
        }}
      >
        {/* ── Panel izquierdo — Información ── */}
        <Box
          sx={{
            flex: "0 0 auto",
            width: { xs: "100%", md: 300 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              background: "linear-gradient(145deg, #2A1608, #3E2510)",
              borderRadius: "20px",
              p: 3.5,
              border: "1px solid rgba(212,168,83,0.20)",
              boxShadow: "0 16px 48px rgba(28,23,20,0.25)",
              height: "100%",
              minHeight: { xs: "auto", md: 420 },
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "#FAF7F2",
                  mb: 0.5,
                }}
              >
                Contáctanos
              </Typography>
              <Box
                sx={{
                  width: 40, height: 2,
                  background: "linear-gradient(90deg, #D4A853, #A67C1F)",
                  borderRadius: 1,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(250,247,242,0.65)",
                fontSize: "0.88rem",
                lineHeight: 1.75,
              }}
            >
              Estamos disponibles para responder todas tus consultas sobre
              nuestra colección de antigüedades.
            </Typography>

            {/* Info de contacto */}
            {[
              { icon: "📍", label: "Ubicación", value: "Santiago, Chile" },
              { icon: "📧", label: "Email", value: "contacto@sthandier.cl" },
              { icon: "📱", label: "WhatsApp", value: "+56 9 XXXX XXXX" },
            ].map((item) => (
              <Box key={item.label} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 36, height: 36, borderRadius: "10px",
                    background: "rgba(212,168,83,0.15)",
                    border: "1px solid rgba(212,168,83,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: "#D4A853",
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      mb: 0.1,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(250,247,242,0.80)",
                      fontSize: "0.88rem",
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* ── Panel derecho — Formulario ── */}
        <Box sx={{ flex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              background: "#FFFFFF",
              borderRadius: "20px",
              p: { xs: 3, md: 4 },
              border: "1px solid #E8D5C0",
              boxShadow: "0 8px 32px rgba(28,23,20,0.08)",
            }}
          >
            {/* Productos seleccionados */}
            {productosSeleccionados.length > 0 && (
              <Box
                sx={{
                  mb: 3,
                  background: "rgba(212,168,83,0.06)",
                  border: "1px solid rgba(212,168,83,0.25)",
                  borderRadius: "14px",
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#A67C1F",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 1.25,
                  }}
                >
                  Productos seleccionados ({productosSeleccionados.length})
                </Typography>
                {productosSeleccionados.map((prod, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 0.75,
                      px: 1,
                      mb: 0.5,
                      background: "#FAF7F2",
                      borderRadius: "10px",
                      border: "1px solid #E8D5C0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "linear-gradient(135deg,#D4A853,#A67C1F)",
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "#3E2510",
                          fontWeight: 500,
                        }}
                      >
                        {prod.titulo}
                        {prod.nombreSeleccionado ? (
                          <Box
                            component="span"
                            sx={{ color: "#A67B52", fontWeight: 400, ml: 0.5 }}
                          >
                            ({prod.nombreSeleccionado})
                          </Box>
                        ) : null}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEliminarProducto(idx)}
                      sx={{
                        p: 0.25, color: "#A67B52",
                        "&:hover": { color: "#D4A853", background: "rgba(212,168,83,0.12)" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}

                {/* Botones de productos */}
                <Box sx={{ mt: 1.5, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  {!todosAgregados ? (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={handleAgregarOtroProducto}
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#A67C1F",
                        borderColor: "rgba(212,168,83,0.45)",
                        borderRadius: 50,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#D4A853",
                          background: "rgba(212,168,83,0.08)",
                        },
                      }}
                    >
                      Agregar otro producto
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: "#A67B52",
                        fontStyle: "italic",
                        py: 0.5,
                      }}
                    >
                      ✓ Todos los productos agregados
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Nombre */}
                <TextField
                  label="Nombre completo"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  InputLabelProps={{ style: { fontFamily: "'Inter',sans-serif", color: "#7D5A35" } }}
                  inputProps={{ style: { fontFamily: "'Inter',sans-serif" } }}
                />

                {/* Email */}
                <TextField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  InputLabelProps={{ style: { fontFamily: "'Inter',sans-serif", color: "#7D5A35" } }}
                  inputProps={{ style: { fontFamily: "'Inter',sans-serif" } }}
                />

                {/* Mensaje */}
                <TextField
                  label="Tu mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={5}
                  error={!!errors.mensaje}
                  helperText={errors.mensaje}
                  InputLabelProps={{ style: { fontFamily: "'Inter',sans-serif", color: "#7D5A35" } }}
                  inputProps={{ style: { fontFamily: "'Inter',sans-serif" } }}
                />
              </Box>

              {/* Mensaje de éxito */}
              {enviado && (
                <Alert
                  severity="success"
                  sx={{
                    mt: 2.5,
                    borderRadius: "12px",
                    fontFamily: "'Inter', sans-serif",
                    background: "rgba(56,142,60,0.08)",
                    border: "1px solid rgba(56,142,60,0.25)",
                    color: "#1B5E20",
                    "& .MuiAlert-icon": { color: "#388E3C" },
                  }}
                >
                  ¡Mensaje enviado con éxito! Te contactaremos pronto.
                </Alert>
              )}

              {/* Botones */}
              <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    flex: 1,
                    minWidth: 160,
                    background: "linear-gradient(135deg, #D4A853, #A67C1F)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: 50,
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(212,168,83,0.35)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E8C98A, #D4A853)",
                      boxShadow: "0 10px 32px rgba(212,168,83,0.50)",
                    },
                  }}
                >
                  Enviar mensaje
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CleaningServicesIcon />}
                  onClick={handleLimpiar}
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "#7D5A35",
                    borderColor: "#E8D5C0",
                    borderRadius: 50,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#D4A853",
                      background: "rgba(212,168,83,0.06)",
                      color: "#A67C1F",
                    },
                  }}
                >
                  Limpiar
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Formulario;
