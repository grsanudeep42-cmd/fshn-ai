import React from 'react';
import { Box, Text, Group } from '@mantine/core';
import { creditBarPercent } from '@/lib/utils';

interface CreditMeterProps {
  normalCredits: number;
  premiumCredits: number;
  normalIncluded?: number;
  premiumIncluded?: number;
}

export function CreditMeter({
  normalCredits,
  premiumCredits,
  normalIncluded = 90,
  premiumIncluded = 10,
}: CreditMeterProps) {
  const normalPct = creditBarPercent(normalCredits, normalIncluded);
  const premiumPct = creditBarPercent(premiumCredits, premiumIncluded);

  const normalLow = normalPct < 25;
  const premiumLow = premiumPct < 25;

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Normal credits */}
      <Box>
        <Group justify="space-between" mb={6}>
          <Group gap={6}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#4A90A4' }}>bolt</span>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>Normal Credits</Text>
            {normalLow && (
              <Box style={{ padding: '1px 6px', background: 'rgba(230,81,0,0.1)', border: '1px solid rgba(230,81,0,0.3)', borderRadius: 3 }}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: '#E65100', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Low</Text>
              </Box>
            )}
          </Group>
          <Text style={{ fontSize: 12, fontFamily: 'monospace', color: normalLow ? '#E65100' : '#1A1A1A', fontWeight: 600 }}>
            {normalCredits} / {normalIncluded}
          </Text>
        </Group>
        <Box style={{ height: 6, background: '#EDE8E0', borderRadius: 3, overflow: 'hidden' }}>
          <Box
            style={{
              height: '100%',
              width: `${normalPct}%`,
              background: normalLow ? '#E65100' : '#4A90A4',
              borderRadius: 3,
              transition: 'width 600ms ease',
            }}
          />
        </Box>
        <Text style={{ fontSize: 10, color: '#9A8E7C', marginTop: 3 }}>
          Dresses, tops, bottoms, children — 1 Normal credit each
        </Text>
      </Box>

      {/* Premium credits */}
      <Box>
        <Group justify="space-between" mb={6}>
          <Group gap={6}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#C9A84C' }}>workspace_premium</span>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>Premium Credits</Text>
            {premiumLow && (
              <Box style={{ padding: '1px 6px', background: 'rgba(230,81,0,0.1)', border: '1px solid rgba(230,81,0,0.3)', borderRadius: 3 }}>
                <Text style={{ fontSize: 9, fontWeight: 700, color: '#E65100', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Low</Text>
              </Box>
            )}
          </Group>
          <Text style={{ fontSize: 12, fontFamily: 'monospace', color: premiumLow ? '#E65100' : '#1A1A1A', fontWeight: 600 }}>
            {premiumCredits} / {premiumIncluded}
          </Text>
        </Group>
        <Box style={{ height: 6, background: '#EDE8E0', borderRadius: 3, overflow: 'hidden' }}>
          <Box
            style={{
              height: '100%',
              width: `${premiumPct}%`,
              background: premiumLow ? '#E65100' : '#C9A84C',
              borderRadius: 3,
              transition: 'width 600ms ease',
            }}
          />
        </Box>
        <Text style={{ fontSize: 10, color: '#9A8E7C', marginTop: 3 }}>
          Sarees & complex garments — 1 Premium credit each
        </Text>
      </Box>
    </Box>
  );
}
