// Importa React y los componentes de Material UI necesarios para las tarjetas
import React, { useEffect, useState } from "react";
import {
  Card, CardContent, CardMedia, Typography, Button,
  CardActionArea, CardActions, MenuItem, Select, Box
} from "@mui/material";
// Importa el hook useNavigate para la navegación programática
import { useNavigate, useLocation } from "react-router-dom";

// Componente que representa una tarjeta individual de producto o servicio
function TarjetaServicio({ img, titulo, descripcion, precios, precio, imgs, productosSeleccionados = [], allProductos = [] }) {
  const navigate = useNavigate();
  const [precioSeleccionado, setPrecioSeleccionado] = useState(precios?.[0]?.precio ?? precio);
  const [nombreSeleccionado, setNombreSeleccionado] = useState(precios?.[0]?.Nombre ?? "");
  const [imgIndex, setImgIndex] = useState(0);
  const [yaAgregado, setYaAgregado] = useState(false);

  // Verifica si el producto ya fue agregado (considerando tamaño si aplica)
  useEffect(() => {
    if (productosSeleccionados.length === 0) {
      setYaAgregado(false);
      return;
    }
    const repetido = productosSeleccionados.some(
      (p) =>
        p.titulo === titulo &&
        (precios?.length > 0
          ? p.nombreSeleccionado === nombreSeleccionado
          : true)
    );
    setYaAgregado(repetido);
  }, [productosSeleccionados, titulo, nombreSeleccionado, precios]);

  // Función que navega a la sección de contacto en Home y pasa los productos seleccionados
  const handleContactar = () => {
    const productoActual = {
      titulo,
      descripcion,
      precio,
      nombreSeleccionado,
      precioSeleccionado,
    };
    // Navega a Home y baja a la sección de contacto con los productos seleccionados
    navigate("/", {
      replace: false,
      state: {
        irAContacto: true,
        productosSeleccionados: [...productosSeleccionados, productoActual],
        allProductos,
        scrollTo: "contacto-inicio",
      },
    });
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    if (!imgs?.length) return;
    setImgIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    if (!imgs?.length) return;
    setImgIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        borderRadius: 3,
        boxShadow: "0 4px 24px 0 rgba(121,85,72,0.10)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow: "0 8px 32px 0 rgba(121,85,72,0.18)",
        },
        background: "linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)",
        position: "relative",
      }}
    >
      <CardActionArea disableTouchRipple disableRipple>
        <Box sx={{ position: "relative" }}>
          {/* Muestra la imagen del producto */}
          <CardMedia
            component="img"
            height="180"
            image={imgs?.length > 0 ? imgs[imgIndex] : img}
            alt={titulo}
            sx={{
              objectFit: "cover",
              backgroundColor: "#fff",
              margin: 0,
              display: "block",
              width: "100%",
              height: "180px",
              maxHeight: "180px",
              maxWidth: "100%",
              pointerEvents: "none",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              boxShadow: "0 2px 8px rgba(121,85,72,0.08)",
              transition: "opacity 0.5s",
            }}
          />
          {/* Controles de imagen anterior/siguiente si hay varias imágenes */}
          {imgs?.length > 1 && (
            <>
              <Button
                size="small"
                sx={{
                  position: "absolute", top: "50%", left: 8, minWidth: 0,
                  color: "#fff", background: "rgba(121,85,72,0.7)",
                  transform: "translateY(-50%)", zIndex: 2, borderRadius: "50%", px: 1,
                  "&:hover": { background: "rgba(93,64,55,0.9)" },
                  boxShadow: "0 2px 8px rgba(121,85,72,0.15)",
                }}
                onClick={handlePrevImg}
                tabIndex={0}
                aria-label="Imagen anterior"
              >{"<"}</Button>
              <Button
                size="small"
                sx={{
                  position: "absolute", top: "50%", right: 8, minWidth: 0,
                  color: "#fff", background: "rgba(121,85,72,0.7)",
                  transform: "translateY(-50%)", zIndex: 2, borderRadius: "50%", px: 1,
                  "&:hover": { background: "rgba(93,64,55,0.9)" },
                  boxShadow: "0 2px 8px rgba(121,85,72,0.15)",
                }}
                onClick={handleNextImg}
                tabIndex={0}
                aria-label="Imagen siguiente"
              >{">"}</Button>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  zIndex: 3,
                }}
              >
                {imgs.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: imgIndex === idx ? 14 : 10,
                      height: imgIndex === idx ? 14 : 10,
                      borderRadius: "50%",
                      backgroundColor: imgIndex === idx ? "#795548" : "#fff",
                      border: imgIndex === idx ? "2px solid #fff" : "1px solid #795548",
                      transition: "all 0.2s",
                      boxShadow: imgIndex === idx ? "0 2px 8px rgba(121,85,72,0.15)" : "none",
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
        <CardContent>
          {/* Muestra el título del producto */}
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700, color: "#6d4c41" }}>
            {titulo}
          </Typography>
          {/* Muestra la descripción del producto */}
          <Typography variant="body2" sx={{ color: "#5d4037", minHeight: 48 }}>
            {descripcion}
          </Typography>
          {/* Selector de precios si hay varias opciones */}
          {precios?.length > 0 && (
            <Select
              fullWidth
              value={precioSeleccionado}
              onChange={(e) => {
                const idx = precios.findIndex(p => p.precio === e.target.value);
                setPrecioSeleccionado(e.target.value);
                setNombreSeleccionado(precios[idx].Nombre);
              }}
              sx={{
                mt: 2,
                borderRadius: 2,
                background: "#efebe9",
                "& .MuiSelect-select": { fontWeight: 500, color: "#6d4c41" }
              }}
            >
              {precios.map((p, idx) => (
                <MenuItem key={idx} value={p.precio}>
                  {p.Nombre} - ${p.precio}
                </MenuItem>
              ))}
            </Select>
          )}
          {/* Muestra el precio si solo hay uno */}
          {!precios && precio && (
            <Typography sx={{ mt: 2, fontWeight: "bold", color: "#6d4c41" }}>
              Precio: ${precio}
            </Typography>
          )}
          {/* Etiqueta si el producto ya fue agregado */}
          {yaAgregado && (
            <Typography sx={{ color: "#bcaaa4", mt: 2, fontWeight: "bold" }}>
              Producto ya agregado para consultar
              {precios?.length > 0 && nombreSeleccionado ? ` (${nombreSeleccionado})` : ""}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 2,
        }}
      >
        {/* Botón para contactar, llama a handleContactar al hacer clic */}
        <Button
          size="medium"
          variant="contained"
          onClick={handleContactar}
          disabled={yaAgregado}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            boxShadow: "0 2px 8px rgba(121,85,72,0.10)",
            textTransform: "none",
            background: "#795548",
            color: "#fff",
            "&:hover": {
              background: "#5d4037"
            }
          }}
        >
          Consultar Producto
        </Button>
      </CardActions>
    </Card>
  );
}

// Componente que renderiza todas las tarjetas automáticamente usando los datos de la API
export default function ListaTarjetas() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const productosSeleccionados = location.state?.productosSeleccionados || [];

  useEffect(() => {
    fetch(
      "https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/products-services/",
      {
        headers: {
          Authorization: "Bearer ipss.get",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.data.productos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Scroll a la sección de tarjetas de servicio si el estado lo indica
  useEffect(() => {
    if (location.state?.irAProductos && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: "5rem",
          marginBottom: "3rem",
          fontWeight: 800,
          color: "#6d4c41",
          letterSpacing: 1,
          textShadow: "0 2px 8px rgba(121,85,72,0.10)"
        }}
        data-productos-titulo
        id="productos-typo"
      >
        Productos
      </Typography>
      <div
        id="tarjetas-servicio"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          minHeight: "40vh",
          background: "linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)",
          borderRadius: "24px",
          padding: "2rem 0"
        }}
      >
        {/* Muestra un mensaje de carga mientras se obtienen los datos */}
        {loading ? (
          <Typography sx={{ color: "#795548", fontWeight: 500 }}>Cargando...</Typography>
        ) : (
          /* Mapea cada elemento del JSON a una tarjeta */
          productos.map((item) => (
            <TarjetaServicio
              key={item.id}
              img={item.imgs?.[0] || ""}
              imgs={item.imgs}
              titulo={item.nombre}
              descripcion={item.descripcion}
              precios={item.precios}
              precio={item.precio}
              productosSeleccionados={productosSeleccionados}
              allProductos={productos}
            />
          ))
        )}
      </div>
    </>
  );
}
