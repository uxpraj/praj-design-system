// RN style objects — spread directly into style props
const shadowStyles = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 12,
  },
};

// CSS strings for Tailwind/NativeWind class generation → shadow-subtle, shadow-medium, shadow-strong
const shadowTokens = {
  subtle: '0 1px 4px rgba(0,0,0,0.08)',
  medium: '0 4px 12px rgba(0,0,0,0.10)',
  strong: '0 8px 24px rgba(0,0,0,0.14)',
};

module.exports = { shadowTokens, shadowStyles };
