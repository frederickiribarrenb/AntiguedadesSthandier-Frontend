import imagen1 from "../img/nuevo1.jpg";
import imagen2 from "../img/nuevo2.jpg";
import imagen3 from "../img/nuevo3.jpg";
import imagen4 from "../img/nuevo4.jpg";
import imagen5 from "../img/nuevo5.jpg";

// Cabeceras comunes para la API
const HEADERS = {
  Authorization: "Bearer ipss.get",
  "Content-Type": "application/json",
};

// ── DATOS LOCALES DE RESPALDO (FALLBACK) ───────────────────────────────────
const FALLBACK_ABOUT =
  "Fundada con la pasión de preservar la historia, Antigüedades Sthandier selecciona minuciosamente piezas exclusivas de los siglos XVIII, XIX y XX. Nos especializamos en relojería antigua, mobiliario clásico, arte sacro y objetos mecánicos singulares que representan la cúspide de la artesanía de épocas pasadas. Cada objeto en nuestra colección es una pieza auténtica de historia viva, seleccionada a mano por expertos para aportar elegancia, carácter y valor cultural a tus espacios.";

const FALLBACK_FAQS = [
  {
    id: 1,
    titulo: "¿Cómo garantizan la autenticidad de las piezas?",
    respuesta: "Todas nuestras piezas pasan por un riguroso proceso de tasación, catalogación y verificación histórica por parte de expertos antes de ingresar a nuestra colección. Ofrecemos certificados de procedencia y autenticidad para cada objeto adquirido.",
  },
  {
    id: 2,
    titulo: "¿Realizan envíos a todo el país y al extranjero?",
    respuesta: "Sí, realizamos envíos a todo Chile y envíos internacionales. Empleamos embalajes especiales de alta seguridad con amortiguación a medida para garantizar que las piezas frágiles y de alto valor lleguen en perfectas condiciones.",
  },
  {
    id: 3,
    titulo: "¿Puedo ver las piezas de forma presencial?",
    respuesta: "Por supuesto. Puedes coordinar una visita exclusiva a nuestro showroom privado en Santiago a través del formulario de contacto para apreciar las piezas en detalle.",
  },
  {
    id: 4,
    titulo: "¿Compran o consignan piezas antiguas de particulares?",
    respuesta: "Sí, evaluamos la adquisición de antigüedades de alta calidad. Puedes enviarnos fotografías claras, detalles de conservación e historia conocida a nuestro correo o formulario de contacto para una pre-evaluación.",
  },
];

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    nombre: "Reloj de Péndulo Imperial",
    descripcion: "Espectacular reloj de péndulo en madera de caoba noble tallada a mano, finales del siglo XIX. Mecanismo original restaurado en perfecto funcionamiento con sonería de horas y medias.",
    precio: 25000,
    imgs: [imagen1, imagen2, imagen3],
  },
  {
    id: 2,
    nombre: "Cámara Clásica de Fuelle",
    descripcion: "Cámara fotográfica de fuelle de principios del siglo XX con detalles de latón pulido y cuerpo de madera noble. Una joya de ingeniería óptica vintage ideal para coleccionistas exigentes.",
    precio: 15000,
    imgs: [imagen2, imagen4],
  },
  {
    id: 3,
    nombre: "Fonógrafo de Bocina de Latón",
    descripcion: "Fonógrafo antiguo con bocina de latón grabada en relieve. Excelente estado de conservación del mecanismo de cuerda manual. Incluye tres cilindros de cera con grabaciones originales de la época.",
    precio: 20000,
    imgs: [imagen3, imagen1, imagen5],
  },
  {
    id: 4,
    nombre: "Teléfono de Baquelita Vintage",
    descripcion: "Teléfono clásico de disco original de los años 1940. Cuerpo robusto de baquelita negra brillante, campana metálica interna de timbre nítido. Adaptado para decoración y coleccionismo.",
    precio: 35000,
    imgs: [imagen4, imagen5],
  },
  {
    id: 5,
    nombre: "Elegante Vajilla de Porcelana Pintada",
    descripcion: "Juego de té y café en fina porcelana europea, decorado con exquisitas escenas florales y bordes en oro de 24 quilates. Consta de tetera, cremera, azucarera y tazas con sus platos.",
    precio: 15000,
    imgs: [imagen5, imagen2],
  },
];

// ── SERVICIO DE CONSULTAS CON MANEJO DE ERRORES (CORS / NETWORK) ───────────
export const ApiService = {
  /**
   * Obtiene la descripción de Quiénes Somos.
   */
  async getAboutUs() {
    try {
      const response = await fetch("https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/about-us/", {
        headers: HEADERS,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.data || FALLBACK_ABOUT;
    } catch (error) {
      console.warn("CORS o error de red en getAboutUs. Cargando fallback local:", error.message);
      return FALLBACK_ABOUT;
    }
  },

  /**
   * Obtiene la lista de preguntas frecuentes.
   */
  async getFaqs() {
    try {
      const response = await fetch("https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/faq/", {
        headers: HEADERS,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.data && data.data.length > 0 ? data.data : FALLBACK_FAQS;
    } catch (error) {
      console.warn("CORS o error de red en getFaqs. Cargando fallback local:", error.message);
      return FALLBACK_FAQS;
    }
  },

  /**
   * Obtiene la lista de productos y servicios.
   */
  async getProducts() {
    try {
      const response = await fetch(
        "https://www.clinicatecnologica.cl/ipss/antiguedadesSthandier/api/v1/products-services/",
        { headers: HEADERS }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Validamos la estructura esperada
      if (data.data?.productos && data.data.productos.length > 0) {
        return data.data.productos;
      }
      return FALLBACK_PRODUCTS;
    } catch (error) {
      console.warn("CORS o error de red en getProducts. Cargando fallback local:", error.message);
      return FALLBACK_PRODUCTS;
    }
  },
};
