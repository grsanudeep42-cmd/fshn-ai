import { createTheme, rem } from '@mantine/core';

export const dashboardTheme = createTheme({
  primaryColor: 'gold',
  primaryShade: 4,

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
    sidebar: [
      '#2A2A2A',
      '#222222',
      '#1A1A1A',
      '#141414',
      '#0F0F0F',
      '#0A0A0A',
      '#080808',
      '#060606',
      '#040404',
      '#020202',
    ],
  },

  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'ui-monospace, "Cascadia Code", monospace',

  headings: {
    fontFamily: 'var(--font-bodoni), Bodoni Moda, Georgia, serif',
    fontWeight: '400',
    sizes: {
      h1: { fontSize: rem(30), lineHeight: '1.2' },
      h2: { fontSize: rem(24), lineHeight: '1.3' },
      h3: { fontSize: rem(19), lineHeight: '1.4' },
      h4: { fontSize: rem(15), lineHeight: '1.5' },
    },
  },

  defaultRadius: 'sm',
  radius: {
    xs: rem(2),
    sm: rem(6),
    md: rem(10),
    lg: rem(14),
    xl: rem(20),
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
      defaultProps: { radius: 'sm' },
      styles: {
        root: {
          fontWeight: '600',
          letterSpacing: '0.04em',
          fontSize: rem(12),
        },
      },
    },
    Card: {
      defaultProps: { radius: 'sm', withBorder: true },
      styles: {
        root: {
          borderColor: '#E8E0D6',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    Table: {
      styles: {
        thead: {
          backgroundColor: '#FAF8F5',
        },
        th: {
          fontSize: rem(11),
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: '#6B6560',
          borderColor: '#E8E0D6',
        },
        td: {
          borderColor: '#E8E0D6',
          fontSize: rem(13),
        },
      },
    },
    Badge: {
      defaultProps: { radius: 'xs' },
    },
    TextInput: { defaultProps: { radius: 'sm' } },
    Select: { defaultProps: { radius: 'sm' } },
    Textarea: { defaultProps: { radius: 'sm' } },
  },

  other: {
    // Sidebar
    sidebarBg: '#0F0F0F',
    sidebarBorder: '#1F1F1F',
    sidebarActiveGold: '#C9A84C',
    sidebarText: '#9A8E7C',
    sidebarTextActive: '#FFFFFF',
    // Content
    pageBg: '#F5F2ED',
    cardBg: '#FFFFFF',
    borderColor: '#E8E0D6',
    // Text
    textPrimary: '#1A1A1A',
    textSecondary: '#6B6560',
    textMuted: '#9A8E7C',
    // Brand
    gold: '#C9A84C',
    goldLight: 'rgba(201, 168, 76, 0.12)',
    goldBorder: 'rgba(201, 168, 76, 0.30)',
    // Status colors
    statusActive: '#2E7D32',
    statusTrial: '#1565C0',
    statusPaused: '#E65100',
    statusPending: '#6B6560',
    // Chart palette
    chartGold: '#C9A84C',
    chartDark: '#1A1A1A',
    chartMuted: '#9A8E7C',
    chartAccent: '#4A90A4',
  },
});
