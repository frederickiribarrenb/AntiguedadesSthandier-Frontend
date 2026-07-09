import Carrousel from "../components/Carrousel";
import ListaTarjetas from "../components/Tarjeta_Servicio";

// Sección de productos: carrusel de galería + grid de tarjetas de producto
function Productos() {
    return (
        <>
            {/* Galería / Carrusel de imágenes */}
            <div data-productos-titulo>
                <Carrousel />
            </div>

            {/* Grid de tarjetas de productos */}
            <ListaTarjetas />
        </>
    );
}

export default Productos;