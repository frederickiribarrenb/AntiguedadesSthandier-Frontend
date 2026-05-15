// Importa el componente Header para mostrar el encabezado de la página
import Header from "../components/header";
// Importa el componente Footer para mostrar el pie de página

// Importa el componente Banner para mostrar el contenido principal de la página de inicio
import Banner from "../components/banner";
// Importa el componente QuienesSmos para mostrar información sobre la empresa
import QuienesSomos from "../components/quienes_somos"; // Cambia a "../components/quienes_somos" si el archivo es quienes_somos.jsx
import Productos from "./Productos"; // <-- Corrige la ruta aquí
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Contacto from "./Contacto";
import Preguntas from "./Preguntas";

// Componente funcional que representa la página de inicio
function Home() {
    const location = useLocation();

    // Mantener productos seleccionados y allProductos en el estado de navegación
    const productosSeleccionados = location.state?.productosSeleccionados || [];
    const allProductos = location.state?.allProductos || [];

    useEffect(() => {
        if (location.state?.irAProductos && location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (location.state?.irAQuienesSomos && location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (location.state?.irAContacto && location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (location.state?.irAPreguntas && location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [location]);

    return (
        // Contenedor principal con margen superior para compensar el AppBar fijo
        <div className="container">
            {/* Muestra el encabezado */}
            <Header />
            {/* Contenido principal que ocupa el espacio restante */}
            <main style={{ flex: 1 }}>
                <div >
                    {/* Muestra el banner principal */}
                    <Banner />
                </div>
                {/* Muestra información sobre la empresa */}
                <div id="quienes-somos-inicio">
                    <QuienesSomos />
                </div>
                {/* Sección de productos con ref */}
                <div id="productos-inicio">
                    <Productos />
                </div>
                {/* Sección de contacto con props para productos seleccionados */}
                <div id="contacto-inicio">
                    <Contacto
                        productosSeleccionados={productosSeleccionados}
                        allProductos={allProductos}
                    />
                </div>
                {/* Sección de preguntas frecuentes con id para scroll */}
                <div id="preguntas-inicio">
                    <Preguntas />   
                </div>
            </main>
            {/* Muestra el pie de página */}
            
        </div>
    );
}

// Exporta el componente para su uso en el enrutador u otros lugares
export default Home;