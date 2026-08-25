'use client';

import React from 'react';
import { Box, Text, Group } from '@mantine/core';
import type { KpiData } from '@/types/dashboard';
import { deltaColor } from '@/lib/utils';

interface KpiCardProps extends KpiData {
  accentColor?: string;
}

export function KpiCard({
  label,
  value,
  delta,
  deltaPositive,
  icon,
  subtext,
  accentColor = '#C9A84C',
}: KpiCardProps) {
  return (
    <Box
      className="kpi-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E0D6',
        borderRadius: 8,
        padding: '14px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 3,
          height: '100%',
          background: accentColor,
          opacity: 0.5,
        }}
      />

      {/* Header */}
      <Group justify="space-between" align="flex-start" gap={6}>
        <Text
          className="kpi-label"
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: '#9A8E7C',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {label}
        </Text>
        <Box
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `${accentColor}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 15, color: accentColor, fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </Box>
      </Group>

      {/* Value */}
      <Box>
        <Text
          className="kpi-value"
          style={{
            fontFamily: 'var(--font-bodoni), Bodoni Moda, serif',
            fontSize: 26,
            fontWeight: 400,
            color: '#1A1A1A',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </Text>

        {/* Delta + subtext */}
        <Group gap={6} mt={5} align="center">
          {delta && (
            <Group gap={2} align="center">
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 12,
                  color: deltaColor(deltaPositive),
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {deltaPositive ? 'arrow_upward' : 'arrow_downward'}
              </span>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: deltaColor(deltaPositive),
                  fontFamily: 'monospace',
                }}
              >
                {delta}%
              </Text>
            </Group>
          )}
          {subtext && (
            <Text style={{ fontSize: 10, color: '#9A8E7C' }}>
              {subtext}
            </Text>
          )}
        </Group>
      </Box>
    </Box>
  );
}
