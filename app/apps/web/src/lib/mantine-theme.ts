import { createTheme, rem } from '@mantine/core';

export const myfashionTheme = createTheme({
  primaryColor: 'dark',
  primaryShade: 9,

  colors: {
    gold: [
      '#FDF8EE',
      '#F7EDCF',
      '#EDD896',
      '#E4C55D',
      '#C9A84C',
      '#B8962F',
      '#9E7E1E',
      '#7E6315',
      '#5C480D',
      '#3D2F07',
    ],
    surface: [
      '#FFFFFF',
      '#FAF8F5',
      '#F5F2ED',
      '#EDE8E0',
      '#E8E0D6',
      '#D4C9B8',
      '#C0B09A',
      '#9A8E7C',
      '#6B6560',
      '#1A1A1A',
    ],
  },

  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',

  headings: {
    fontFamily: 'var(--font-bodoni), Bodoni Moda, Georgia, serif',
    fontWeight: '400',
    sizes: {
      h1: { fontSize: rem(28), lineHeight: '1.3' },
      h2: { fontSize: rem(22), lineHeight: '1.4' },
      h3: { fontSize: rem(18), lineHeight: '1.4' },
      h4: { fontSize: rem(15), lineHeight: '1.5' },
    },
  },

  defaultRadius: 'xs',
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  components: {
    Button: {
      defaultProps: { radius: 'xs' },
      styles: {
        root: {
          fontWeight: '600',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontSize: rem(11),
          minHeight: rem(44),
        },
      },
    },
    TextInput: { defaultProps: { radius: 'xs' } },
    Card: { defaultProps: { radius: 'xs', withBorder: true } },
    Badge: { defaultProps: { radius: 'xs' } },
  },

  other: {
    surface: '#FAF8F5',
    surfaceCard: '#FFFFFF',
    borderColor: '#E8E0D6',
    textPrimary: '#1A1A1A',
    textSecondary: '#6B6560',
    gold: '#C9A84C',
  },
});
