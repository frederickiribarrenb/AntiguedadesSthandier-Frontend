// Importa el componente Box de Material UI para crear contenedores flexibles
import Box from "@mui/material/Box";
// Importa el componente Typography de Material UI para los textos
import Typography from "@mui/material/Typography";
// Importa la imagen que se mostrará en la sección "Quiénes somos"
import imagenNosotros from "../img/quienes_somos.jpg";
// Importa los hooks useEffect y useState de React para manejar el estado y los efectos secundarios
import { useEffect, useState } from "react";

// Componente funcional que muestra la sección "Quiénes Somos"
const QuienesSomos = () => {
  const [descripcion, setDescripcion] = useState("");

  // Efecto que se ejecuta al montar el componente para obtener la descripción desde una API
  useEffect(() => {
    fetch("https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/about-us/", {
      headers: { Authorization: "Bearer ipss.get" }
    })
      .then(res => res.json())
      .then(data => setDescripcion(data.data || ""))
      .catch(() => setDescripcion(""));
  }, []);

  return (
    // Contenedor principal con diseño flexible y responsivo
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        gap: 4,
        background: "linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)",
        borderRadius: "24px",
        boxShadow: "0 8px 32px 0 rgba(121,85,72,0.10)",
      }}
    >
      {/* Muestra la imagen del equipo o tienda */}
      <Box
        component="img"
        src={imagenNosotros}
        alt="Nuestro equipo"
        sx={{
          width: { xs: "100%", md: 600 },
          height: { xs: 300, md: 400 },
          borderRadius: "24px",
          objectFit: "cover",
          mb: { xs: 2, md: 0 },
          boxShadow: "0 4px 24px 0 rgba(121,85,72,0.15)",
          border: "4px solid #bcaaa4",
        }}
      />
      {/* Contenedor del texto descriptivo */}
      <Box
        sx={{
          maxWidth: 600,
          background: "rgba(255,250,245,0.95)",
          borderRadius: "16px",
          boxShadow: "0 2px 8px 0 rgba(121,85,72,0.08)",
          border: "2px solid #d7ccc8",
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Título de la sección */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
            mt: { xs: "2rem", md: 0 },
            color: "#6d4c41",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(121,85,72,0.10)"
          }}
        >
          ¿Quiénes Somos?
        </Typography>
        {/* Descripción obtenida de la API */}
        <Typography
          variant="body1"
          sx={{
            textAlign: { xs: "center", md: "left" },
            color: "#5d4037",
            fontWeight: 500,
            fontSize: "1.15rem",
            lineHeight: 1.7,
          }}
        >
          {descripcion || "Cargando descripción..."}
        </Typography>
      </Box>
    </Box>
  );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default QuienesSomos;