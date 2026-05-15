import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Avatar,
  Link,
  Typography,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoHeader from "../img/logo.jpeg";

const opciones = [
  { id: 1, nombre: "Home", link: "/" },
  { id: 2, nombre: "Quiénes Somos", link: "/quienes-somos" },
  { id: 3, nombre: "Productos", link: "/products" },
  { id: 4, nombre: "Contacto", link: "/contacto" },
  { id: 5, nombre: "Preguntas Frecuentes", link: "/preguntas" }
];

// Componente Header que representa la barra de navegación superior
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceStatic, setForceStatic] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // El header siempre debe ser visible y con color en productos
    setForceStatic(location.pathname !== "/" || location.pathname === "/products");
  }, [location.pathname]);

  useEffect(() => {
    if (!forceStatic) {
      const handleScroll = () => setScrolled(window.scrollY > 0);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [forceStatic]);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleNavClick = (link) => (e) => {
    e.preventDefault();
    if (link === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setDrawerOpen(false);
      return;
    }
    if (link === "/products") {
      navigate("/", { state: { irAProductos: true, scrollTo: "productos-inicio" } });
      setDrawerOpen(false);
      return;
    }
    if (link === "/quienes-somos") {
      if (location.pathname === "/") {
        const el = document.getElementById("quienes-somos-inicio");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      } else {
        navigate("/", { state: { irAQuienesSomos: true, scrollTo: "quienes-somos-inicio" } });
        setDrawerOpen(false);
        return;
      }
    }
    if (link === "/contacto") {
      if (location.pathname === "/") {
        const el = document.getElementById("contacto-inicio");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      } else {
        // Mantén productos seleccionados y allProductos si existen en el estado
        navigate("/", {
          state: {
            irAContacto: true,
            scrollTo: "contacto-inicio",
            productosSeleccionados: location.state?.productosSeleccionados || [],
            allProductos: location.state?.allProductos || [],
          }
        });
        setDrawerOpen(false);
        return;
      }
    }
    // Enlace especial para sección "Preguntas Frecuentes" en Home
    if (link === "/preguntas") {
      if (location.pathname === "/") {
        const el = document.getElementById("preguntas-inicio");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      } else {
        navigate("/", { state: { irAPreguntas: true, scrollTo: "preguntas-inicio" } });
        setDrawerOpen(false);
        return;
      }
    }
    navigate(link);
    setForceStatic(link !== "/" || link === "/products");
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Barra de navegación superior */}
      <AppBar
        position={forceStatic ? "static" : "fixed"}
        sx={{
          backgroundColor: forceStatic
            ? "#d7ccc8"
            : scrolled
            ? "#d7ccc8"
            : "transparent",
          boxShadow: forceStatic || scrolled ? 2 : 0,
          transition: "background-color 0.3s, box-shadow 0.3s",
          borderBottom: "2px solid #bcaaa4",
        }}
      >
        <Toolbar>
          {/* Logo y nombre de la aplicación */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* Logo de la aplicación */}
            <Avatar
              alt="Logo"
              src={logoHeader}
              sx={{
                marginRight: 1,
                border: "2px solid #bcaaa4",
                boxShadow: "0 2px 8px rgba(121,85,72,0.10)",
                width: 48,
                height: 48,
                background: "#efebe9"
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#6d4c41",
                fontWeight: 700,
                letterSpacing: 1,
                textShadow: "0 2px 8px rgba(121,85,72,0.08)",
                display: { xs: "none", md: "block" }
              }}
            >
              Antigüedades Sthandier
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#6d4c41",
                fontWeight: 700,
                letterSpacing: 1,
                textShadow: "0 2px 8px rgba(121,85,72,0.08)",
                display: { xs: "block", md: "none" }
              }}
            >
              Sthandier
            </Typography>
          </Box>
          {/* Menú de navegación para pantallas grandes */}
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
            {opciones.map((opcion) => (
              <Link
                key={opcion.id}
                href={opcion.link}
                color="#6d4c41"
                underline="none"
                sx={{
                  margin: 2,
                  position: "relative",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "#bcaaa4",
                    color: "#fff",
                  },
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    left: 8,
                    right: 8,
                    bottom: 4,
                    height: "3px",
                    backgroundColor: "#795548",
                    borderRadius: "2px",
                  }
                }}
                onClick={handleNavClick(opcion.link)}
              >
                {opcion.nombre}
              </Link>
            ))}
          </Box>
          {/* Icono de menú para dispositivos móviles */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "block", md: "none" },
              background: "#bcaaa4",
              color: "#6d4c41",
              borderRadius: 2,
              "&:hover": {
                background: "#795548",
                color: "#fff"
              },
              transition: "background 0.2s, color 0.2s"
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (menú desplegable) para dispositivos móviles */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)} >
        <List sx={{ background: "#efebe9", minHeight: "100vh" }}>
          {opciones.map((opcion) => (
            <ListItem
              button
              component="a"
              href={opcion.link}
              key={opcion.id}
              onClick={handleNavClick(opcion.link)}
              sx={{
                "&:hover": {
                  background: "#bcaaa4",
                  color: "#fff"
                },
                color: "#6d4c41",
                fontWeight: 600,
                fontSize: "1.1rem",
                px: 3,
                py: 2,
                borderRadius: 2,
                transition: "background 0.2s, color 0.2s"
              }}
            >
              <ListItemText primary={opcion.nombre} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

// Exporta el componente Header para su uso en otras partes de la aplicación
export default Header;
