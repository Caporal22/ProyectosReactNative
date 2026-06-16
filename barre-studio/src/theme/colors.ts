export const colors = {
  // Marca
  primary: '#C8794A',      // Terracota — botones principales, acentos
  primaryLight: '#EDAC75', // Blush — fondos suaves, badges
  primaryDark: '#A8623A',  // Hover/pressed states

  secondary: '#513534',    // Marrón oscuro — texto importante, headers

  accent: '#E1B166',       // Dorado — iconos destacados, ratings

  // Fondos
  background: '#FBF6F2',   // Fondo general
  surface: '#FFFFFF',      // Cards, modales
  surfaceAlt: '#F5E6DD',   // Inputs, secciones alternas

  // Texto
  textPrimary: '#2B1F1D',
  textSecondary: '#7A6A66',
  textOnPrimary: '#FFFFFF',

  // Estados 
  success: '#4CAF50',
  error: '#E53935',
  warning: '#F2A93B',

  // Bordes / divisores
  border: '#E5D9D2',

  // Transparencias para overlays/modales
  overlay: 'rgba(43, 31, 29, 0.5)',
} as const;

export type ColorKey = keyof typeof colors;