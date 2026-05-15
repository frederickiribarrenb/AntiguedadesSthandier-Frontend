import React from 'react';
import { Box, Typography } from '@mui/material';
import logoBanner from '../img/home.png'; // Asegúrate de que la ruta sea correcta

// Componente funcional que representa el banner principal de la página de inicio
const Banner = () => (
  <Box
    sx={{
      height: '100vh',
      position: 'relative',
      left: 0,
      width: '100%',
      backgroundImage: `url(${logoBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    }}
  >
    {/* Capa de transparencia oscura sobre la imagen para mejorar la legibilidad del texto */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1,
        transition: 'background-color 0.3s',
      }}
    />
    {/* Contenido del banner: título, descripción y botón */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        padding: 2,
        maxWidth: 700,
        mx: "auto",

      }}
    >
      {/* Título principal del banner */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          color: "#e0d4c8",
          textShadow: "0 2px 8px rgba(121,85,72,0.10)"
        }}
      >
        Bienvenido a nuestra tienda de antigüedades
      </Typography>
      {/* Descripción breve de la tienda */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 6,
          color: "#e0d4c8",
          fontWeight: 500,
          letterSpacing: 0.5,
        }}
      >
        Tienda de antigüedades Sthandier, donde la historia cobra vida a través de objetos únicos y fascinantes.
        Descubre la belleza de lo antiguo y encuentra tesoros que cuentan historias.
      </Typography>
    </Box>
  </Box>
);

// Exporta el componente para su uso en otras partes de la aplicación
export default Banner;
