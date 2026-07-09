import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Avatar,
  Typography,
  ListItemText,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoHeader from "../img/logo.jpeg";

const opciones = [
  { id: 1, nombre: "Inicio", link: "/" },
  { id: 2, nombre: "Quiénes Somos", link: "/quienes-somos" },
  { id: 3, nombre: "Productos", link: "/products" },
  { id: 5, nombre: "Preguntas Frecuentes", link: "/preguntas" },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceStatic, setForceStatic] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setForceStatic(location.pathname !== "/");
  }, [location.pathname]);

  useEffect(() => {
    if (!forceStatic) {
      const handleScroll = () => setScrolled(window.scrollY > 60);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
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
        document.getElementById("quienes-somos-inicio")?.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      }
      navigate("/", { state: { irAQuienesSomos: true, scrollTo: "quienes-somos-inicio" } });
      setDrawerOpen(false);
      return;
    }
    if (link === "/contacto") {
      if (location.pathname === "/") {
        document.getElementById("contacto-inicio")?.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      }
      navigate("/", {
        state: {
          irAContacto: true,
          scrollTo: "contacto-inicio",
          productosSeleccionados: location.state?.productosSeleccionados || [],
          allProductos: location.state?.allProductos || [],
        },
      });
      setDrawerOpen(false);
      return;
    }
    if (link === "/preguntas") {
      if (location.pathname === "/") {
        document.getElementById("preguntas-inicio")?.scrollIntoView({ behavior: "smooth" });
        setDrawerOpen(false);
        return;
      }
      navigate("/", { state: { irAPreguntas: true, scrollTo: "preguntas-inicio" } });
      setDrawerOpen(false);
      return;
    }
    navigate(link);
    setDrawerOpen(false);
  };

  const isScrolledOrForced = scrolled || forceStatic;

  return (
    <>
      {/* ── AppBar principal ── */}
      <AppBar
        position={forceStatic ? "static" : "fixed"}
        elevation={0}
        sx={{
          backgroundColor: isScrolledOrForced
            ? "rgba(250, 247, 242, 0.96)"
            : "transparent",
          backdropFilter: isScrolledOrForced ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolledOrForced ? "blur(20px)" : "none",
          borderBottom: isScrolledOrForced
            ? "1px solid rgba(232, 213, 192, 0.8)"
            : "1px solid rgba(255,255,255,0.15)",
          boxShadow: isScrolledOrForced
            ? "0 4px 24px rgba(28,23,20,0.08)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 4 },
            py: 1,
            minHeight: { xs: 64, md: 72 },
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* ── Logo + Marca ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1,
              cursor: "pointer",
              textDecoration: "none",
            }}
            component="a"
            href="/"
            onClick={handleNavClick("/")}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt="Antigüedades Sthandier"
                src={logoHeader}
                sx={{
                  width: 48,
                  height: 48,
                  border: "2.5px solid",
                  borderColor: isScrolledOrForced ? "#D4A853" : "rgba(255,255,255,0.8)",
                  boxShadow: isScrolledOrForced
                    ? "0 4px 16px rgba(212,168,83,0.30)"
                    : "0 4px 20px rgba(0,0,0,0.25)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "scale(1.06)",
                    boxShadow: "0 6px 24px rgba(212,168,83,0.45)",
                  },
                }}
              />
              {/* Punto dorado decorativo */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D4A853, #A67C1F)",
                  border: "1.5px solid white",
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  color: isScrolledOrForced ? "#1C1714" : "#FAF7F2",
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                  transition: "color 0.35s ease",
                }}
              >
                Antigüedades
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isScrolledOrForced ? "#A67B52" : "rgba(250,247,242,0.75)",
                  display: "block",
                  lineHeight: 1,
                  mt: 0.25,
                  transition: "color 0.35s ease",
                }}
              >
                Sthandier
              </Typography>
            </Box>
          </Box>

          {/* ── Navegación Desktop ── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {opciones.map((opcion) => (
              <Box
                key={opcion.id}
                component="a"
                href={opcion.link}
                onClick={handleNavClick(opcion.link)}
                sx={{
                  position: "relative",
                  px: 1.5,
                  py: 0.75,
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  color: isScrolledOrForced ? "#5C3D1E" : "rgba(250,247,242,0.9)",
                  borderRadius: 2,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#D4A853",
                    backgroundColor: isScrolledOrForced
                      ? "rgba(212,168,83,0.08)"
                      : "rgba(255,255,255,0.12)",
                  },
                  // Línea dorada inferior en hover
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: "2px",
                    background: "linear-gradient(90deg,#D4A853,#A67C1F)",
                    borderRadius: 1,
                    transition: "width 0.25s ease",
                  },
                  "&:hover::after": {
                    width: "60%",
                  },
                }}
              >
                {opcion.nombre}
              </Box>
            ))}

            {/* CTA Contacto */}
            <Box
              component="a"
              href="/contacto"
              onClick={handleNavClick("/contacto")}
              sx={{
                ml: 1,
                px: 2.5,
                py: 1,
                background: "linear-gradient(135deg, #D4A853 0%, #A67C1F 100%)",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                borderRadius: 50,
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(212,168,83,0.35)",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 28px rgba(212,168,83,0.50)",
                },
              }}
            >
              Consultar
            </Box>
          </Box>

          {/* ── Botón Hamburguesa Mobile ── */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: isScrolledOrForced ? "#5C3D1E" : "#FAF7F2",
              border: "1.5px solid",
              borderColor: isScrolledOrForced
                ? "rgba(212,168,83,0.35)"
                : "rgba(255,255,255,0.3)",
              borderRadius: 2,
              p: 0.75,
              transition: "all 0.25s ease",
              "&:hover": {
                background: "rgba(212,168,83,0.12)",
                borderColor: "#D4A853",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ── Drawer Mobile ── */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            background: "rgba(250,247,242,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid #E8D5C0",
            borderRadius: "0 0 28px 28px",
            boxShadow: "0 16px 40px rgba(28,23,20,0.14)",
            pt: 1,
            pb: 3,
          },
        }}
        sx={{
          "& .MuiDrawer-paper": {
            overflowX: "hidden",
          },
        }}
      >
        {/* Encabezado del drawer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 1.5,
            borderBottom: "1px solid rgba(232,213,192,0.6)",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={logoHeader}
              alt="Sthandier"
              sx={{ width: 36, height: 36, border: "2px solid #D4A853" }}
            />
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "#1C1714",
                fontSize: "1rem",
              }}
            >
              Antigüedades Sthandier
            </Typography>
          </Box>
          <IconButton
            onClick={toggleDrawer(false)}
            size="small"
            sx={{
              color: "#5C3D1E",
              border: "1.5px solid #E8D5C0",
              borderRadius: 1.5,
              p: 0.5,
              "&:hover": { background: "rgba(212,168,83,0.10)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Links del menú mobile */}
        <List disablePadding sx={{ px: 2 }}>
          {opciones.map((opcion) => (
            <ListItem
              key={opcion.id}
              component="a"
              href={opcion.link}
              onClick={handleNavClick(opcion.link)}
              disablePadding
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                mb: 0.5,
                px: 2,
                py: 1.25,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(212,168,83,0.10)",
                  "& .nav-label": { color: "#A67C1F" },
                },
              }}
            >
              <ListItemText
                primary={opcion.nombre}
                className="nav-label"
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: "#1C1714",
                    fontSize: "0.97rem",
                    transition: "color 0.2s",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* CTA mobile */}
        <Box sx={{ px: 3, mt: 1.5 }}>
          <Box
            component="a"
            onClick={handleNavClick("/contacto")}
            sx={{
              display: "block",
              textAlign: "center",
              py: 1.5,
              px: 3,
              background: "linear-gradient(135deg, #D4A853, #A67C1F)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: 50,
              boxShadow: "0 6px 20px rgba(212,168,83,0.35)",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                boxShadow: "0 8px 28px rgba(212,168,83,0.50)",
              },
            }}
          >
            Consultar ahora →
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
