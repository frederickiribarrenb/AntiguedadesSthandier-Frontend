import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import imagenNosotros from "../img/quienes_somos.jpg";
import { useEffect, useState, useRef } from "react";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ApiService } from "../services/apiService";

const stats = [
  { value: "20+", label: "Años de\nExperiencia" },
  { value: "500+", label: "Piezas en\nColección" },
  { value: "100%", label: "Autenticidad\nGarantizada" },
];

const QuienesSomos = () => {
  const [descripcion, setDescripcion] = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    ApiService.getAboutUs().then((data) => setDescripcion(data));
  }, []);

  // Intersection Observer para animación al scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        background: "linear-gradient(160deg, #FAF7F2 0%, #F0EAE0 100%)",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        overflow: "hidden",
      }}
    >
      {/* ── Encabezado de sección ── */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 6, md: 8 },
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
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
          >
            Nuestra Historia
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1C1714",
            lineHeight: 1.2,
          }}
        >
          ¿Quiénes{" "}
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
            Somos?
          </Box>
        </Typography>
      </Box>

      {/* ── Contenido principal ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 5, md: 8 },
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* ── Imagen con marco decorativo ── */}
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-48px)",
            transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
          }}
        >
          {/* Marco dorado decorativo */}
          <Box
            sx={{
              position: "absolute",
              top: -16,
              left: -16,
              width: { xs: "90%", md: 420 },
              height: { xs: "90%", md: 380 },
              border: "2px solid",
              borderColor: "rgba(212,168,83,0.35)",
              borderRadius: "28px",
              zIndex: 0,
            }}
          />

          <Box
            component="img"
            src={imagenNosotros}
            alt="Nuestro equipo - Antigüedades Sthandier"
            sx={{
              position: "relative",
              zIndex: 1,
              width: { xs: "100%", md: 440 },
              height: { xs: 280, md: 400 },
              objectFit: "cover",
              borderRadius: "24px",
              boxShadow: "0 24px 64px rgba(28,23,20,0.20)",
              display: "block",
            }}
          />

          {/* Chip estadística flotante */}
          <Box
            sx={{
              position: "absolute",
              bottom: -24,
              right: { xs: 16, md: -24 },
              zIndex: 2,
              background: "linear-gradient(135deg, #D4A853, #A67C1F)",
              borderRadius: "20px",
              px: 3,
              py: 1.5,
              boxShadow: "0 12px 32px rgba(212,168,83,0.40)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              20+
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                mt: 0.25,
              }}
            >
              Años de experiencia
            </Typography>
          </Box>
        </Box>

        {/* ── Texto ── */}
        <Box
          sx={{
            flex: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(48px)",
            transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.35s",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: "#5C3D1E",
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.85,
              mb: 4,
            }}
          >
            {descripcion || (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #E8D5C0 25%, #FAF7F2 50%, #E8D5C0 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                  "@keyframes shimmer": {
                    "0%":   { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                  },
                  borderRadius: 1,
                  width: "100%",
                  height: "120px",
                }}
              />
            )}
          </Typography>

          {/* Features / puntos clave */}
          {[
            "Piezas autenticadas con historia verificable",
            "Atención personalizada para cada cliente",
            "Más de 500 objetos únicos disponibles",
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(24px)",
                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${0.5 + i * 0.12}s`,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{ color: "#D4A853", fontSize: 20, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#3E2510",
                  fontSize: "0.93rem",
                  fontWeight: 500,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QuienesSomos;