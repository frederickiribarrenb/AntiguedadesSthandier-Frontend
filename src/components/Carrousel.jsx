import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import imagen1 from "../img/nuevo1.jpg";
import imagen2 from "../img/nuevo2.jpg";
import imagen3 from "../img/nuevo3.jpg";
import imagen4 from "../img/nuevo4.jpg";
import imagen5 from "../img/nuevo5.jpg";

const images = [
  { imgPath: imagen1, caption: "Piezas seleccionadas con historia" },
  { imgPath: imagen2, caption: "Objetos únicos de colección" },
  { imgPath: imagen3, caption: "Antigüedades auténticas" },
  { imgPath: imagen4, caption: "Tesoros del pasado" },
  { imgPath: imagen5, caption: "Arte y tradición" },
];

export default function Carrousel() {
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef(null);
  const maxSteps = images.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev === maxSteps - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const goTo = (fn) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveStep(typeof fn === "function" ? fn : () => fn);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleNext = () => goTo((prev) => (prev === maxSteps - 1 ? 0 : prev + 1));
  const handleBack = () => goTo((prev) => (prev === 0 ? maxSteps - 1 : prev - 1));

  return (
    <Box
      ref={ref}
      sx={{
        background: "#F0EAE0",
        py: { xs: 8, md: 10 },
        px: { xs: 2, md: 6 },
        overflow: "hidden",
      }}
    >
      {/* ── Encabezado de sección ── */}
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
            Galería de Piezas
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.75rem" },
            color: "#1C1714",
          }}
        >
          Nuestra{" "}
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
            Colección
          </Box>
        </Typography>
      </Box>

      {/* ── Slider principal ── */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.96)",
          transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(28,23,20,0.20), 0 4px 16px rgba(28,23,20,0.10)",
            aspectRatio: { xs: "4/3", md: "16/7" },
            background: "#1C1714",
          }}
        >
          {/* Imagen actual */}
          <Box
            component="img"
            src={images[activeStep].imgPath}
            alt={images[activeStep].caption}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              display: "block",
            }}
          />

          {/* Gradiente inferior */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(180deg, transparent 0%, rgba(28,23,20,0.75) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Caption inferior */}
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 28,
              zIndex: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                color: "rgba(250,247,242,0.9)",
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: 500,
              }}
            >
              {images[activeStep].caption}
            </Typography>
            {/* Indicadores de punto */}
            <Box sx={{ display: "flex", gap: 0.75, mt: 1.25 }}>
              {images.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => goTo(idx)}
                  sx={{
                    height: 3,
                    width: idx === activeStep ? 28 : 10,
                    borderRadius: 2,
                    backgroundColor:
                      idx === activeStep ? "#D4A853" : "rgba(250,247,242,0.45)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        idx === activeStep ? "#E8C98A" : "rgba(250,247,242,0.70)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Botón anterior */}
          <IconButton
            onClick={handleBack}
            aria-label="Imagen anterior"
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 4,
              background: "rgba(250,247,242,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(250,247,242,0.25)",
              color: "#fff",
              width: 48,
              height: 48,
              transition: "all 0.25s ease",
              "&:hover": {
                background: "rgba(212,168,83,0.85)",
                border: "1px solid #D4A853",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>

          {/* Botón siguiente */}
          <IconButton
            onClick={handleNext}
            aria-label="Imagen siguiente"
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 4,
              background: "rgba(250,247,242,0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(250,247,242,0.25)",
              color: "#fff",
              width: 48,
              height: 48,
              transition: "all 0.25s ease",
              "&:hover": {
                background: "rgba(212,168,83,0.85)",
                border: "1px solid #D4A853",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            <KeyboardArrowRight />
          </IconButton>

          {/* Contador */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(28,23,20,0.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(250,247,242,0.15)",
              borderRadius: 50,
              px: 1.75,
              py: 0.5,
              zIndex: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(250,247,242,0.85)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              {String(activeStep + 1).padStart(2, "0")} / {String(maxSteps).padStart(2, "0")}
            </Typography>
          </Box>
        </Box>

        {/* ── Thumbnails ── */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mt: 2,
            justifyContent: "center",
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              onClick={() => goTo(idx)}
              sx={{
                width: { xs: 52, md: 72 },
                height: { xs: 36, md: 50 },
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                border: "2px solid",
                borderColor: idx === activeStep ? "#D4A853" : "transparent",
                boxShadow:
                  idx === activeStep
                    ? "0 4px 16px rgba(212,168,83,0.35)"
                    : "0 2px 8px rgba(28,23,20,0.12)",
                transform: idx === activeStep ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                "&:hover": {
                  borderColor: idx === activeStep ? "#D4A853" : "#E8C98A",
                  transform: "scale(1.06)",
                },
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={img.imgPath}
                alt={`Thumbnail ${idx + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: idx !== activeStep ? "brightness(0.65)" : "brightness(1)",
                  transition: "filter 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
