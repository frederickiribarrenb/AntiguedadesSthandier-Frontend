import React, { useEffect, useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { Skeleton } from '@mui/material';
import { ApiService } from '../services/apiService';

export default function PreguntasF() {
  const [faqs,    setFaqs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ApiService.getFaqs().then((data) => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      ref={ref}
      sx={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F0EAE0 100%)',
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        overflow: 'hidden',
      }}
    >
      {/* ── Encabezado ── */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 6, md: 8 },
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'all 0.7s ease',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2.5, py: 0.75, mb: 2,
            background: 'rgba(212,168,83,0.12)',
            border: '1px solid rgba(212,168,83,0.3)',
            borderRadius: 50,
          }}
        >
          <DiamondOutlinedIcon sx={{ color: '#D4A853', fontSize: 13 }} />
          <Typography
            sx={{
              color: '#A67C1F',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}
          >
            FAQ
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: '#1C1714',
            mb: 1.5,
          }}
        >
          Preguntas{' '}
          <Box
            component="span"
            sx={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4A853, #A67C1F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Frecuentes
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: '#7D5A35',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            maxWidth: 480, mx: 'auto', lineHeight: 1.75,
          }}
        >
          Todo lo que necesitas saber sobre nuestra colección, procesos y servicios.
        </Typography>
      </Box>

      {/* ── Acordeones ── */}
      <Box sx={{ maxWidth: 820, mx: 'auto' }}>
        {loading ? (
          // Skeletons de carga
          Array.from({ length: 4 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                mb: 1.5,
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #E8D5C0',
                background: '#fff',
              }}
            >
              <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Skeleton
                  variant="circular"
                  width={28}
                  height={28}
                  sx={{ bgcolor: '#F0EAE0', flexShrink: 0 }}
                />
                <Skeleton variant="text" height={24} sx={{ bgcolor: '#F0EAE0', flex: 1 }} />
              </Box>
            </Box>
          ))
        ) : (
          faqs.map((item, idx) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: '16px !important',
                border: '1px solid',
                borderColor: expanded === item.id ? 'rgba(212,168,83,0.45)' : '#E8D5C0',
                background: '#FFFFFF',
                boxShadow: expanded === item.id
                  ? '0 8px 32px rgba(212,168,83,0.15)'
                  : '0 2px 8px rgba(28,23,20,0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${0.1 + idx * 0.07}s`,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      width: 28, height: 28,
                      borderRadius: '50%',
                      background: expanded === item.id
                        ? 'linear-gradient(135deg,#D4A853,#A67C1F)'
                        : 'rgba(212,168,83,0.12)',
                      border: '1px solid',
                      borderColor: expanded === item.id ? 'transparent' : 'rgba(212,168,83,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        color: expanded === item.id ? '#fff' : '#D4A853',
                        fontSize: 18,
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Box>
                }
                sx={{
                  px: { xs: 2.5, md: 3 },
                  py: 1.75,
                  '& .MuiAccordionSummary-content': { mr: 2 },
                }}
                aria-controls={`faq-${item.id}-content`}
                id={`faq-${item.id}-header`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Número de pregunta */}
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: '0.78rem',
                      color: expanded === item.id ? '#D4A853' : '#C9A882',
                      fontWeight: 600,
                      minWidth: 24,
                      transition: 'color 0.25s',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}.
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: { xs: '0.93rem', md: '1rem' },
                      fontWeight: 600,
                      color: expanded === item.id ? '#1C1714' : '#3E2510',
                      lineHeight: 1.45,
                      transition: 'color 0.25s',
                    }}
                  >
                    {item.titulo}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: { xs: 2.5, md: 3 },
                  pb: 2.5,
                  pt: 0,
                }}
              >
                {/* Divisor */}
                <Box
                  sx={{
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(212,168,83,0.4), transparent)',
                    mb: 2,
                    ml: 5,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: { xs: '0.88rem', md: '0.95rem' },
                    color: '#5C3D1E',
                    lineHeight: 1.8,
                    ml: 5,
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
  );
}