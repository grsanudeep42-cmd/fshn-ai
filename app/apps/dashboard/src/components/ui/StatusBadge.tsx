import React from 'react';
import { Box, Text } from '@mantine/core';
import type { ShopStatus } from '@/types/dashboard';
import { STATUS_COLORS, STATUS_BG, STATUS_LABELS } from '@/lib/utils';

interface StatusBadgeProps {
  status: ShopStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  const bg = STATUS_BG[status];
  const label = STATUS_LABELS[status];

  return (
    <Box
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? 4 : 5,
        padding: size === 'sm' ? '2px 7px' : '3px 9px',
        borderRadius: 4,
        background: bg,
        border: `1px solid ${color}33`,
      }}
    >
      <Box
        className={status === 'active' ? 'status-dot-active' : undefined}
        style={{
          width: size === 'sm' ? 5 : 6,
          height: size === 'sm' ? 5 : 6,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }}
      />
      <Text
        style={{
          fontSize: size === 'sm' ? 10 : 11,
          fontWeight: 600,
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </Text>
    </Box>
  );
}
