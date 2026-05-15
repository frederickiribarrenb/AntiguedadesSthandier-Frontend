
// Importa el componente Footer para mostrar el pie de página
import Footer from "../components/Footer";
// Importa el componente Preguntas_F que contiene las preguntas frecuentes
import Preguntas_F from "../components/Preguntas_F"

// Componente funcional que representa la página de preguntas frecuentes
function Preguntas() {
    return (
        // Contenedor principal con altura mínima de pantalla completa y disposición en columna
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            <main style={{ flex: 1 }}>
                {/* Muestra las preguntas frecuentes */}
                <Preguntas_F />
            </main>
            {/* Muestra el pie de página */}
            <Footer />
        </div>
    );
}

// Exporta el componente para su uso en el enrutador u otros lugares
export default Preguntas;