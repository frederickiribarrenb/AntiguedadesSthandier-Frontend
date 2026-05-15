// Importa el componente Formulario para mostrar el formulario de contacto
import Formulario from "../components/Formulario";

// Componente funcional que representa la página de contacto
function Contacto() {
    return (
        // Contenedor principal con altura mínima de pantalla completa y disposición en columna
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Formulario />
        </div>
    );
}

// Exporta el componente para su uso en el enrutador u otros lugares
export default Contacto;