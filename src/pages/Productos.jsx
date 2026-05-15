
// Importa el componente Carrousel para mostrar un carrusel de imágenes o productos
import Carrousel from "../components/Carrousel";
import ListaTarjetas from "../components/Tarjeta_Servicio";

// Componente funcional que representa la página de productos o servicios
function Productos() {
    return (
        <>
            {/* Título principal de la sección de productos con data-productos-titulo */}
            <div data-productos-titulo>
                <Carrousel />
            </div>
            <ListaTarjetas />
        </>
    );
}

// Exporta el componente para su uso en el enrutador u otros lugares
export default Productos;