import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography, IconButton } from "@mui/material";
import imagen1 from "../img/nuevo1.jpg";
import imagen2 from "../img/nuevo2.jpg";
import imagen3 from "../img/nuevo3.jpg";
import imagen4 from "../img/nuevo4.jpg";
import imagen5 from "../img/nuevo5.jpg";            

const images = [
  { imgPath: imagen1 },
  { imgPath: imagen2 },
  { imgPath: imagen3 },
  { imgPath: imagen4 },
  { imgPath: imagen5 },
];

export default function Carrousel() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === maxSteps - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleNext = () =>
    setActiveStep((prev) => (prev === maxSteps - 1 ? 0 : prev + 1));
  const handleBack = () =>
    setActiveStep((prev) => (prev === 0 ? maxSteps - 1 : prev - 1));

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: "80vh",
          maxWidth: 1200,
          flexGrow: 1,
          margin: "0 auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: { xs: "80px", md: "100px" },
          boxSizing: "border-box",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
            overflow: "hidden",
            width: "100%",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(121,85,72,0.85)",
              color: "#fff",
              border: "2px solid #bcaaa4",
              "&:hover": {
                background: "rgba(93,64,55,0.95)",
                color: "#fffde7",
                border: "2px solid #6d4c41",
                boxShadow: "0 4px 16px 0 rgba(121,85,72,0.25)",
                scale: "1.1",
              },
              boxShadow: "0 2px 8px rgba(121,85,72,0.15)",
              transition: "all 0.2s",
            }}
            aria-label="Anterior"
          >
            <KeyboardArrowLeft fontSize="large" />
          </IconButton>
          <img
            src={images[activeStep].imgPath}
            alt={`slide-${activeStep}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              transition: "opacity 0.5s",
            }}
          />
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(121,85,72,0.85)",
              color: "#fff",
              border: "2px solid #bcaaa4",
              "&:hover": {
                background: "rgba(93,64,55,0.95)",
                color: "#fffde7",
                border: "2px solid #6d4c41",
                boxShadow: "0 4px 16px 0 rgba(121,85,72,0.25)",
                scale: "1.1",
              },
              boxShadow: "0 2px 8px rgba(121,85,72,0.15)",
              transition: "all 0.2s",
            }}
            aria-label="Siguiente"
          >
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              zIndex: 3,
            }}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor:
                    idx === activeStep
                      ? "#795548" // café oscuro activo
                      : "#d7ccc8", // café claro inactivo
                  border:
                    idx === activeStep
                      ? "2px solid #6d4c41"
                      : "2px solid #bcaaa4",
                  boxShadow:
                    idx === activeStep
                      ? "0 2px 8px rgba(121,85,72,0.18)"
                      : "none",
                  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#bcaaa4",
                    border: "2px solid #6d4c41",
                  },
                }}
                onClick={() => setActiveStep(idx)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
