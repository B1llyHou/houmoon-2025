export const theme = {
  colors: {
    // Primary Colors
    primary: '#5A7D7C', // Sage Green
    secondary: '#2D3047', // Deep Indigo
    accent1: '#FFAD05', // Warm Amber
    accent2: '#FF8C61', // Soft Coral
    
    // Emotional State Colors
    joy: '#FFD166',
    calm: '#83C5BE',
    focus: '#4059AD',
    reflection: '#6B4E71',
    growth: '#6A994E',
    balance: '#A7A284',
    
    // Neutrals
    text: '#2A2D34', // Deep Charcoal
    textSecondary: '#6C757D', // Medium Gray
    border: '#E9ECEF', // Light Gray
    background: '#F8F9FA', // Off-White
    cardBackground: '#FFFFFF', // White
    
    // Utility Colors
    white: '#FFFFFF',
    black: '#000000',
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8',
  },
  
  typography: {
    h1: {
      fontFamily: 'Spectral-Regular',
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Spectral-Regular',
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
    },
    h3: {
      fontFamily: 'Spectral-Regular',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
    },
    subtitle1: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    subtitle2: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 22,
    },
    body1: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 22,
    },
    button: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: 'NotoSans-Regular',
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
    },
    overline: {
      fontFamily: 'WorkSans-Medium',
      fontSize: 10,
      fontWeight: '500',
      lineHeight: 16,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  shadows: {
    1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    3: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    4: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 4,
    },
    5: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 5,
    },
  },
  
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    pill: 24,
    circle: 999,
  },
};

export type Theme = typeof theme;
