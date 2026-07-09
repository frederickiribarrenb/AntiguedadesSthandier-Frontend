import Formulario from "../components/Formulario";
import Footer from "../components/Footer";

// Página de contacto independiente (para accesos directos por URL)
function Contacto({ productosSeleccionados, allProductos }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAF7F2" }}>
            <main style={{ flex: 1 }}>
                <Formulario
                    productosSeleccionados={productosSeleccionados}
                    allProductos={allProductos}
                />
            </main>
            <Footer />
        </div>
    );
}

export default Contacto;