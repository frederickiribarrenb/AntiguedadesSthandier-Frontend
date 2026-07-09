import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import logoBanner from '../img/home.png';

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    document.getElementById('quienes-somos-inicio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Imagen de fondo con zoom lento ── */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${logoBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          transform: loaded ? 'scale(1.06)' : 'scale(1.12)',
          transition: 'transform 8s cubic-bezier(0.4,0,0.2,1)',
          filter: 'brightness(0.62)',
        }}
      />

      {/* ── Gradiente multicapa ── */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(28,23,20,0.35) 0%, rgba(28,23,20,0.10) 40%, rgba(28,23,20,0.75) 100%)',
        }}
      />

      {/* ── Textura sutil tipo grano ── */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenido central ── */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          px: { xs: 3, sm: 4, md: 6 },
          maxWidth: 820,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Badge decorativo */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2.5,
            py: 0.75,
            mb: 3,
            background: 'rgba(212,168,83,0.18)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,168,83,0.45)',
            borderRadius: 50,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}
        >
          <DiamondOutlinedIcon sx={{ color: '#D4A853', fontSize: 14 }} />
          <Typography
            sx={{
              color: '#E8C98A',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Tienda de Antigüedades
          </Typography>
          <DiamondOutlinedIcon sx={{ color: '#D4A853', fontSize: 14 }} />
        </Box>

        {/* Título principal */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.75rem' },
            lineHeight: 1.08,
            color: '#FAF7F2',
            letterSpacing: '-0.02em',
            mb: 1,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}
        >
          Donde la Historia
        </Typography>

        {/* Línea en itálica dorada */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.75rem' },
            lineHeight: 1.08,
            background: 'linear-gradient(135deg, #E8C98A 0%, #D4A853 50%, #A67C1F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 3,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.35s',
          }}
        >
          Cobra Vida
        </Typography>

        {/* Línea divisora ornamental */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            width: '100%',
            maxWidth: 320,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.7))' }} />
          <DiamondOutlinedIcon sx={{ color: '#D4A853', fontSize: 18 }} />
          <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,168,83,0.7), transparent)' }} />
        </Box>

        {/* Descripción */}
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '1rem', md: '1.15rem' },
            color: 'rgba(250,247,242,0.82)',
            fontWeight: 400,
            lineHeight: 1.8,
            maxWidth: 560,
            mb: 4,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s',
          }}
        >
          Descubre objetos únicos y fascinantes que guardan la esencia de épocas
          pasadas. Cada pieza cuenta una historia que espera ser continuada.
        </Typography>

        {/* Botones CTA */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.65s',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() =>
              document.getElementById('productos-inicio')?.scrollIntoView({ behavior: 'smooth' })
            }
            sx={{
              background: 'linear-gradient(135deg, #D4A853, #A67C1F)',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              px: 4,
              py: 1.5,
              borderRadius: 50,
              boxShadow: '0 8px 32px rgba(212,168,83,0.45)',
              textTransform: 'none',
              letterSpacing: '0.02em',
              '&:hover': {
                background: 'linear-gradient(135deg, #E8C98A, #D4A853)',
                boxShadow: '0 12px 40px rgba(212,168,83,0.60)',
                transform: 'translateY(-3px)',
              },
            }}
          >
            Explorar Colección
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() =>
              document.getElementById('contacto-inicio')?.scrollIntoView({ behavior: 'smooth' })
            }
            sx={{
              color: '#FAF7F2',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              px: 4,
              py: 1.5,
              borderRadius: 50,
              border: '1.5px solid rgba(250,247,242,0.50)',
              textTransform: 'none',
              backdropFilter: 'blur(8px)',
              background: 'rgba(250,247,242,0.08)',
              '&:hover': {
                background: 'rgba(250,247,242,0.16)',
                borderColor: 'rgba(250,247,242,0.80)',
                transform: 'translateY(-3px)',
              },
            }}
          >
            Contáctanos
          </Button>
        </Box>
      </Box>

      {/* ── Indicador de scroll animado ── */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.75,
          cursor: 'pointer',
          opacity: loaded ? 0.75 : 0,
          transition: 'opacity 1s ease 1s',
          '&:hover': { opacity: 1 },
          zIndex: 2,
        }}
        onClick={handleScrollDown}
      >
        <Typography
          sx={{
            color: 'rgba(250,247,242,0.7)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Descubrir
        </Typography>
        <Box
          sx={{
            width: 28,
            height: 44,
            border: '1.5px solid rgba(250,247,242,0.45)',
            borderRadius: 14,
            display: 'flex',
            justifyContent: 'center',
            pt: 0.75,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 8,
              background: 'rgba(250,247,242,0.8)',
              borderRadius: 2,
              animation: 'bannerScroll 2s ease-in-out infinite',
              '@keyframes bannerScroll': {
                '0%':   { transform: 'translateY(0)', opacity: 1 },
                '100%': { transform: 'translateY(14px)', opacity: 0 },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
