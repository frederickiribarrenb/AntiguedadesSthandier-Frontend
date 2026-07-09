import Header from "../components/Header";
import Banner from "../components/Banner";
import QuienesSomos from "../components/Quienes_somos";
import Productos from "./Productos";
import Footer from "../components/Footer";
import Formulario from "../components/Formulario";
import Preguntas_F from "../components/Preguntas_F";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();

    const productosSeleccionados = location.state?.productosSeleccionados || [];
    const allProductos = location.state?.allProductos || [];

    useEffect(() => {
        if (location.state?.scrollTo) {
            // Pequeño delay para asegurar que el DOM esté listo tras navegación
            const timer = setTimeout(() => {
                const el = document.getElementById(location.state.scrollTo);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 80);
            return () => clearTimeout(timer);
        } else if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [location]);

    return (
        <div className="container">
            {/* Header fijo con glassmorphism al scroll */}
            <Header />

            <main style={{ flex: 1 }}>
                {/* Hero / Banner */}
                <div>
                    <Banner />
                </div>

                {/* Quiénes Somos */}
                <div id="quienes-somos-inicio">
                    <QuienesSomos />
                </div>

                {/* Carrusel + Productos */}
                <div id="productos-inicio">
                    <Productos />
                </div>

                {/* Formulario de Contacto */}
                <div id="contacto-inicio">
                    <Formulario
                        productosSeleccionados={productosSeleccionados}
                        allProductos={allProductos}
                    />
                </div>

                {/* Preguntas Frecuentes */}
                <div id="preguntas-inicio">
                    <Preguntas_F />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;