import React, { useEffect, useState, useRef } from "react";
import {
  Card, CardContent, CardMedia, Typography, Button,
  CardActionArea, CardActions, MenuItem, Select, Box,
  Chip, Skeleton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiService } from "../services/apiService";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CheckIcon from "@mui/icons-material/Check";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

// ── Tarjeta individual ──────────────────────────────────────────────────────
function TarjetaServicio({ img, titulo, descripcion, precios, precio, imgs, productosSeleccionados = [], allProductos = [], index = 0, visible = true }) {
  const navigate = useNavigate();
  const [precioSeleccionado, setPrecioSeleccionado] = useState(precios?.[0]?.precio ?? precio);
  const [nombreSeleccionado, setNombreSeleccionado] = useState(precios?.[0]?.Nombre ?? "");
  const [imgIndex, setImgIndex] = useState(0);
  const [yaAgregado, setYaAgregado] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (productosSeleccionados.length === 0) { setYaAgregado(false); return; }
    const repetido = productosSeleccionados.some(
      (p) =>
        p.titulo === titulo &&
        (precios?.length > 0 ? p.nombreSeleccionado === nombreSeleccionado : true)
    );
    setYaAgregado(repetido);
  }, [productosSeleccionados, titulo, nombreSeleccionado, precios]);

  const handleContactar = () => {
    const productoActual = { titulo, descripcion, precio, nombreSeleccionado, precioSeleccionado };
    navigate("/", {
      replace: false,
      state: {
        irAContacto: true,
        productosSeleccionados: [...productosSeleccionados, productoActual],
        allProductos,
        scrollTo: "contacto-inicio",
      },
    });
  };

  const handlePrevImg = (e) => { e.stopPropagation(); if (!imgs?.length) return; setImgIndex((p) => (p === 0 ? imgs.length - 1 : p - 1)); };
  const handleNextImg = (e) => { e.stopPropagation(); if (!imgs?.length) return; setImgIndex((p) => (p === imgs.length - 1 ? 0 : p + 1)); };

  return (
    <Box
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
        width: { xs: "100%", sm: "calc(50% - 1rem)", lg: "calc(33.33% - 1.34rem)" },
        maxWidth: 360,
      }}
    >
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#FFFFFF",
          border: "1px solid",
          borderColor: isHovered ? "rgba(212,168,83,0.45)" : "rgba(232,213,192,0.6)",
          boxShadow: isHovered
            ? "0 24px 56px rgba(28,23,20,0.16), 0 4px 16px rgba(212,168,83,0.20)"
            : "0 4px 20px rgba(28,23,20,0.08)",
          transform: isHovered ? "translateY(-10px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* ── Imagen ── */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={imgs?.length > 0 ? imgs[imgIndex] : img}
            alt={titulo}
            sx={{
              height: 200,
              objectFit: "cover",
              objectPosition: "center",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              display: "block",
            }}
          />
          {/* Gradiente sobre imagen */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 50%, rgba(28,23,20,0.35) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Botones navegación imágenes */}
          {imgs?.length > 1 && (
            <>
              <Box
                onClick={handlePrevImg}
                sx={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(250,247,242,0.88)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#5C3D1E",
                  fontWeight: 700,
                  zIndex: 2,
                  transition: "all 0.2s",
                  "&:hover": { background: "#D4A853", color: "#fff" },
                }}
              >
                ‹
              </Box>
              <Box
                onClick={handleNextImg}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(250,247,242,0.88)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#5C3D1E",
                  fontWeight: 700,
                  zIndex: 2,
                  transition: "all 0.2s",
                  "&:hover": { background: "#D4A853", color: "#fff" },
                }}
              >
                ›
              </Box>
              {/* Dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 0.6,
                  zIndex: 2,
                }}
              >
                {imgs.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: imgIndex === idx ? 18 : 6,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor:
                        imgIndex === idx ? "#D4A853" : "rgba(250,247,242,0.65)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {/* Badge "Ya agregado" */}
          {yaAgregado && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "linear-gradient(135deg, #D4A853, #A67C1F)",
                borderRadius: 50,
                px: 1.5,
                py: 0.4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                boxShadow: "0 4px 12px rgba(212,168,83,0.40)",
                zIndex: 3,
              }}
            >
              <CheckIcon sx={{ color: "#fff", fontSize: 13 }} />
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Agregado
              </Typography>
            </Box>
          )}
        </Box>

        {/* ── Contenido ── */}
        <CardContent sx={{ flex: 1, p: 2.5, pb: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#1C1714",
              mb: 0.75,
              lineHeight: 1.3,
            }}
          >
            {titulo}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#7D5A35",
              fontSize: "0.85rem",
              lineHeight: 1.65,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {descripcion}
          </Typography>

          {/* Selector de variantes */}
          {precios?.length > 0 && (
            <Box sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#A67B52",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  mb: 0.75,
                }}
              >
                Variante
              </Typography>
              <Select
                fullWidth
                value={precioSeleccionado}
                onChange={(e) => {
                  const idx = precios.findIndex((p) => p.precio === e.target.value);
                  setPrecioSeleccionado(e.target.value);
                  setNombreSeleccionado(precios[idx].Nombre);
                }}
                size="small"
                sx={{
                  borderRadius: 2,
                  background: "#FAF7F2",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#1C1714",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E8D5C0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4A853",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D4A853",
                  },
                }}
              >
                {precios.map((p, idx) => (
                  <MenuItem
                    key={idx}
                    value={p.precio}
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    {p.Nombre} - CLP {p.precio.toLocaleString("es-CL")}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* Precio único */}
          {!precios && precio && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                background: "rgba(212,168,83,0.10)",
                border: "1px solid rgba(212,168,83,0.3)",
                borderRadius: 50,
                px: 1.5,
                py: 0.5,
              }}
            >
              <LocalOfferOutlinedIcon sx={{ color: "#D4A853", fontSize: 15 }} />
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  color: "#5C3D1E",
                  fontSize: "0.9rem",
                }}
              >
                ${precio.toLocaleString()}
              </Typography>
            </Box>
          )}
        </CardContent>

        {/* ── Acción ── */}
        <CardActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleContactar}
            disabled={yaAgregado}
            sx={{
              background: yaAgregado
                ? "#E8D5C0"
                : "linear-gradient(135deg, #D4A853, #A67C1F)",
              color: yaAgregado ? "#A67B52" : "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.88rem",
              borderRadius: 50,
              py: 1.25,
              textTransform: "none",
              boxShadow: yaAgregado ? "none" : "0 4px 16px rgba(212,168,83,0.30)",
              "&:hover": {
                background: yaAgregado
                  ? "#E8D5C0"
                  : "linear-gradient(135deg, #E8C98A, #D4A853)",
                boxShadow: yaAgregado ? "none" : "0 8px 24px rgba(212,168,83,0.45)",
              },
              "&.Mui-disabled": {
                color: "#A67B52",
                background: "#F0EAE0",
              },
            }}
          >
            {yaAgregado ? "✓ Producto agregado" : "Consultar Producto"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

// ── Lista de Tarjetas ───────────────────────────────────────────────────────
export default function ListaTarjetas() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const productosSeleccionados = location.state?.productosSeleccionados || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ApiService.getProducts().then((data) => {
      setProductos(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (location.state?.irAProductos && location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        background: "linear-gradient(160deg, #FAF7F2 0%, #F5EEE6 100%)",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
      }}
    >
      {/* ── Encabezado ── */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 6, md: 8 },
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s ease",
        }}
        ref={ref}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 0.75,
            mb: 2,
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
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
            id="productos-typo"
          >
            Catálogo Exclusivo
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1C1714",
            mb: 1.5,
          }}
        >
          Nuestros{" "}
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
            Productos
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: "#7D5A35",
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.75,
          }}
        >
          Cada pieza de nuestra colección ha sido cuidadosamente seleccionada
          por su valor histórico y belleza única.
        </Typography>
      </Box>

      {/* ── Grid de tarjetas ── */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          maxWidth: 1200,
          mx: "auto",
        }}
        id="tarjetas-servicio"
      >
        {loading
          ? // Skeletons de carga
          Array.from({ length: 3 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 1rem)", lg: "calc(33.33% - 1.34rem)" },
                maxWidth: 360,
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #E8D5C0",
                background: "#fff",
              }}
            >
              <Skeleton variant="rectangular" height={200} sx={{ bgcolor: "#F0EAE0" }} />
              <Box sx={{ p: 2.5 }}>
                <Skeleton variant="text" height={28} width="65%" sx={{ bgcolor: "#F0EAE0", mb: 1 }} />
                <Skeleton variant="text" height={16} sx={{ bgcolor: "#F0EAE0" }} />
                <Skeleton variant="text" height={16} sx={{ bgcolor: "#F0EAE0" }} />
                <Skeleton variant="text" height={16} width="75%" sx={{ bgcolor: "#F0EAE0", mb: 2 }} />
                <Skeleton variant="rounded" height={44} sx={{ bgcolor: "#F0EAE0", borderRadius: 50 }} />
              </Box>
            </Box>
          ))
          : productos.map((item, i) => (
            <TarjetaServicio
              key={item.id}
              img={item.imgs?.[0] || ""}
              imgs={item.imgs}
              titulo={item.nombre}
              descripcion={item.descripcion}
              precios={item.precios}
              precio={item.precio}
              productosSeleccionados={productosSeleccionados}
              allProductos={productos}
              index={i}
              visible={visible}
            />
          ))}
      </Box>
    </Box>
  );
}
