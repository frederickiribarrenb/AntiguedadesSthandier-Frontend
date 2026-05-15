// Importa React y los componentes necesarios de Material UI para el acordeón
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Componente funcional que muestra la lista de preguntas frecuentes en formato acordeón
export default function PreguntasF() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/faq/', {
      headers: { Authorization: 'Bearer ipss.get' }
    })
      .then(res => res.json())
      .then(data => {
        setFaqs(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Contenedor principal responsivo para título y preguntas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          minHeight: { xs: "auto", md: "70vh" },
          gap: { xs: 2, md: 6 },
          mt: 0, // Sin margen superior
          mb: { xs: 1, md: 0 },
        }}
      >
        {/* Título principal de la sección de preguntas frecuentes */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontWeight: 800,
            color: "#6d4c41",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(121,85,72,0.10)",
            minWidth: { md: 320 },
            maxWidth: { md: 400 },
            mb: { xs: 2, md: 0 },
            mt: { xs: 0, md: 4 },
            flexShrink: 0,
          }}
        >
          <strong>Preguntas Frecuentes</strong>
        </Typography>
        {/* Contenedor de los acordeones, centrado y con ancho fijo */}
        <Box
          sx={{
            maxWidth: 600,
            background: "linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)",
            borderRadius: "24px",
            boxShadow: "0 4px 24px 0 rgba(121,85,72,0.10)",
            padding: "2rem 1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 100 }}>
              <CircularProgress sx={{ color: "#795548" }} />
            </Box>
          ) : (
            faqs.map((item, idx) => (
              <Accordion
                key={item.id}
                sx={{
                  mt: idx === 0 ? 0 : 2,
                  borderRadius: 2,
                  background: "#fff",
                  boxShadow: "0 2px 8px 0 rgba(121,85,72,0.08)",
                  border: "1px solid #bcaaa4",
                  "&:before": { display: "none" },
                  width: "100%",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#795548" }} />}
                  aria-controls={`panel${item.id}-content`}
                  id={`panel${item.id}-header`}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 700,
                      color: "#6d4c41"
                    }
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      wordBreak: "break-word"
                    }}
                  >
                    {item.titulo}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "#f5f5f5",
                    borderRadius: 2,
                    color: "#5d4037"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                      wordBreak: "break-word"
                    }}
                  >
                    {item.respuesta}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}