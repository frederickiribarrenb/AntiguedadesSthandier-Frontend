import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(160deg, #1C1714 0%, #2A1608 100%)',
        color: '#FAF7F2',
        pt: { xs: 6, md: 8 },
        pb: { xs: 3, md: 4 },
        px: { xs: 3, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Línea dorada superior */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #D4A853 25%, #A67C1F 75%, transparent 100%)',
        }}
      />

      {/* Textura sutil */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(212,168,83,0.06) 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, rgba(166,124,31,0.04) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenido ── */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top: Logo + Navegación + Social */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            gap: { xs: 5, md: 8 },
            mb: { xs: 5, md: 6 },
          }}
        >
          {/* Marca */}
          <Box sx={{ maxWidth: 280, textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <DiamondOutlinedIcon sx={{ color: '#D4A853', fontSize: 22 }} />
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  color: '#FAF7F2',
                  lineHeight: 1.1,
                }}
              >
                Antigüedades Sthandier
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.88rem',
                color: 'rgba(250,247,242,0.55)',
                lineHeight: 1.75,
              }}
            >
              Donde la historia cobra vida. Objetos únicos con alma,
              seleccionados para perdurar en el tiempo.
            </Typography>
          </Box>

          {/* Navegación */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#D4A853',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Navegación
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              {[
                ['Inicio', '/'],
                ['Quiénes Somos', '/quienes-somos'],
                ['Productos', '/products'],
                ['Contacto', '/contacto'],
                ['Preguntas Frecuentes', '/preguntas'],
              ].map(([label]) => (
                <Typography
                  key={label}
                  component="a"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.88rem',
                    color: 'rgba(250,247,242,0.65)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#D4A853',
                      paddingLeft: '6px',
                    },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Redes + Scroll top */}
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#D4A853',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Síguenos
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1.25,
                justifyContent: { xs: 'center', md: 'flex-end' },
                mb: 3,
              }}
            >
              {[
                {
                  Icon: FacebookIcon,
                  href: 'https://www.facebook.com/people/Antiguedades-Sthandier/100065257010074/',
                  label: 'Facebook',
                },
                {
                  Icon: InstagramIcon,
                  href: 'https://www.instagram.com/antiguedades.sthandier/',
                  label: 'Instagram',
                },
                {
                  Icon: WhatsAppIcon,
                  href: 'https://wa.me/XXXXXXXXXXX',
                  label: 'WhatsApp',
                },
              ].map(({ Icon, href, label }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    width: 42,
                    height: 42,
                    background: 'rgba(212,168,83,0.10)',
                    border: '1px solid rgba(212,168,83,0.25)',
                    color: 'rgba(250,247,242,0.70)',
                    borderRadius: '12px',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg,#D4A853,#A67C1F)',
                      border: '1px solid transparent',
                      color: '#fff',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(212,168,83,0.40)',
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>

            {/* Botón volver arriba */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Box
                onClick={scrollToTop}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  px: 2,
                  py: 0.75,
                  border: '1px solid rgba(212,168,83,0.25)',
                  borderRadius: 50,
                  background: 'rgba(212,168,83,0.06)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    background: 'rgba(212,168,83,0.14)',
                    borderColor: 'rgba(212,168,83,0.55)',
                  },
                }}
              >
                <ArrowUpwardIcon sx={{ color: '#D4A853', fontSize: 15 }} />
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#D4A853',
                    letterSpacing: '0.08em',
                  }}
                >
                  Volver arriba
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Separador ornamental */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3))',
            }}
          />
          <DiamondOutlinedIcon sx={{ color: 'rgba(212,168,83,0.45)', fontSize: 14 }} />
          <Box
            sx={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(212,168,83,0.3), transparent)',
            }}
          />
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(250,247,242,0.40)',
            }}
          >
            © {new Date().getFullYear()} Antigüedades Sthandier. Todos los derechos reservados.
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(250,247,242,0.30)',
            }}
          >
            Hecho con ♥ en Chile
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;