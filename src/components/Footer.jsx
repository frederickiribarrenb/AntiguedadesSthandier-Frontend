import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Componente funcional que representa el pie de página de la aplicación
const Footer = () => (
    // Contenedor principal del footer con estilos responsivos
    <Box
        sx={{
            background: "linear-gradient(90deg, #bcaaa4 0%, #8d6e63 100%)",
            color: '#fff',
            px: 4,
            py: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: { xs: 1, md: 0 },
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            boxShadow: "0 -2px 16px 0 rgba(121,85,72,0.10)",
        }}
    >
        {/* Texto de derechos reservados y nombre de la tienda */}
        <Typography
            variant="subtitle1"
            sx={{
                width: "100%",
                textAlign: "center",
                mb: { xs: 1, md: 0 },
                fontWeight: 600,
                letterSpacing: 1,
                textShadow: "0 2px 8px rgba(121,85,72,0.10)"
            }}
        >
            &copy; {new Date().getFullYear()} Derechos reservados. Antigüedades Sthandier
        </Typography>
        {/* Contenedor de los iconos de redes sociales */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                width: { xs: '100%', md: 'auto' },
                mt: { xs: 1, md: 0 },
                gap: 2,
            }}
        >
            {/* Icono y enlace a Facebook */}
            <IconButton
                component="a"
                href="https://www.facebook.com/people/Antiguedades-Sthandier/100065257010074/"
                target="_blank"
                rel="noopener"
                sx={{
                    color: "#fff",
                    background: "#6d4c41",
                    mx: 0.5,
                    "&:hover": {
                        background: "#bcaaa4",
                        color: "#5d4037",
                        transform: "scale(1.15)",
                        boxShadow: "0 2px 8px rgba(121,85,72,0.18)"
                    },
                    transition: "all 0.2s"
                }}
                aria-label="Facebook"
            >
                <FacebookIcon />
            </IconButton>
            {/* Icono y enlace a Instagram */}
            <IconButton
                component="a"
                href="https://www.instagram.com/antiguedades.sthandier/"
                target="_blank"
                rel="noopener"
                sx={{
                    color: "#fff",
                    background: "#6d4c41",
                    mx: 0.5,
                    "&:hover": {
                        background: "#bcaaa4",
                        color: "#5d4037",
                        transform: "scale(1.15)",
                        boxShadow: "0 2px 8px rgba(121,85,72,0.18)"
                    },
                    transition: "all 0.2s"
                }}
                aria-label="Instagram"
            >
                <InstagramIcon />
            </IconButton>
            {/* Icono y enlace a WhatsApp */}
            <IconButton
                component="a"
                href="https://wa.me/XXXXXXXXXXX"
                target="_blank"
                rel="noopener"
                sx={{
                    color: "#fff",
                    background: "#6d4c41",
                    mx: 0.5,
                    "&:hover": {
                        background: "#bcaaa4",
                        color: "#5d4037",
                        transform: "scale(1.15)",
                        boxShadow: "0 2px 8px rgba(121,85,72,0.18)"
                    },
                    transition: "all 0.2s"
                }}
                aria-label="WhatsApp"
            >
                <WhatsAppIcon />
            </IconButton>
        </Box>
    </Box>
);

// Exporta el componente Footer para su uso en otras partes de la aplicación
export default Footer;