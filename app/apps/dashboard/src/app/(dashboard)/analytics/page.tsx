'use client';

import React, { useState } from 'react';
import {
  Box, Text, Group, Stack, SimpleGrid, Card, Table, Select, Button,
} from '@mantine/core';
import { AreaChart, BarChart, DonutChart, LineChart } from '@mantine/charts';
import {
  DAILY_VOLUME_30D, CATEGORY_STATS, MONTHLY_REVENUE, PLATFORM_KPIS,
} from '@/lib/mock-data';
import { formatINR, formatNumber } from '@/lib/utils';

const FUNNEL_DATA = [
  { stage: 'Sessions Started', count: 721, pct: 100 },
  { stage: 'Photo Captured', count: 698, pct: 96.8 },
  { stage: 'Garment Selected', count: 672, pct: 93.2 },
  { stage: 'AI Generated', count: 652, pct: 90.4 },
  { stage: 'Shown to Customer', count: 618, pct: 85.7 },
];

const REGEN_DATA = [
  { category: 'Saree', generated: 312, regenerated: 48, abandoned: 12 },
  { category: 'Dress', generated: 124, regenerated: 11, abandoned: 4 },
  { category: 'Top', generated: 98, regenerated: 6, abandoned: 3 },
  { category: 'Children', generated: 72, regenerated: 4, abandoned: 2 },
  { category: 'Bottom', generated: 32, regenerated: 2, abandoned: 1 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('30d');
  const chartData = range === '14d' ? DAILY_VOLUME_30D.slice(-14) : DAILY_VOLUME_30D;

  const totalGenCost = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1].genCost;
  const totalRevenue = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1].totalRevenue;
  const margin = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1].margin;
  const marginPct = ((margin / totalRevenue) * 100).toFixed(1);

  return (
    <Stack gap={24}>
      {/* Header */}
      <Group justify="space-between" align="flex-end" wrap="wrap" gap={12}>
        <Box>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
            Analytics
          </Text>
          <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
            Try-on volume, category breakdown, cost vs revenue
          </Text>
        </Box>
        <Select
          value={range}
          onChange={v => setRange(v ?? '30d')}
          data={[
            { label: 'Last 14 days', value: '14d' },
            { label: 'Last 30 days', value: '30d' },
          ]}
          size="sm"
          w={150}
          styles={{ input: { borderColor: '#E8E0D6', fontSize: 13 } }}
        />
      </Group>

      {/* KPI Summary */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing={{ base: 10, md: 14 }}>
        {[
          { label: 'Total Try-Ons', value: formatNumber(PLATFORM_KPIS.totalTryOnsMonth), icon: 'auto_awesome', color: '#C9A84C', sub: 'This month' },
          { label: 'Success Rate', value: '85.7%', icon: 'check_circle', color: '#2E7D32', sub: 'Shown to customer' },
          { label: 'Avg / Day', value: (PLATFORM_KPIS.totalTryOnsMonth / 30).toFixed(1), icon: 'calendar_today', color: '#4A90A4', sub: 'Try-ons per day' },
          { label: 'Cost This Month', value: formatINR(totalGenCost), icon: 'payments', color: '#9A8E7C', sub: 'Generation cost' },
        ].map(stat => (
          <Box key={stat.label} className="kpi-card" style={{
            background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: '16px 18px',
          }}>
            <Group gap={6} mb={8}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: stat.color, fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
              <Text style={{ fontSize: 10, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                {stat.label}
              </Text>
            </Group>
            <Text style={{ fontSize: 24, fontWeight: 400, fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', color: '#1A1A1A', lineHeight: 1 }}>
              {stat.value}
            </Text>
            <Text style={{ fontSize: 11, color: '#9A8E7C', marginTop: 4 }}>{stat.sub}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Volume chart */}
      <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
        <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Try-On Volume Over Time</Text>
        <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>Normal vs Premium credits consumed daily</Text>
        <AreaChart
          h={240}
          data={chartData}
          dataKey="date"
          series={[
            { name: 'normal', label: 'Normal', color: '#4A90A4' },
            { name: 'premium', label: 'Premium', color: '#C9A84C' },
          ]}
          curveType="monotone"
          withLegend
          legendProps={{ verticalAlign: 'top', height: 30 }}
          withTooltip
          gridColor="#EDE8E0"
          strokeWidth={2}
          fillOpacity={0.15}
          tickLine="none"
          withDots={false}
          styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
        />
      </Card>

      {/* Category + Funnel */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }}>
        {/* Category breakdown */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>By Garment Category</Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>Try-on count this month</Text>
          <BarChart
            h={220}
            data={CATEGORY_STATS.map(c => ({ category: c.category, 'Try-Ons': c.count }))}
            dataKey="category"
            series={[{ name: 'Try-Ons', color: '#C9A84C' }]}
            withTooltip
            withLegend={false}
            tickLine="none"
            gridColor="#EDE8E0"
            barProps={{ radius: [3, 3, 0, 0] }}
            styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
          />
          <Stack gap={6} mt={16}>
            {CATEGORY_STATS.map(c => (
              <Group key={c.category} justify="space-between">
                <Text style={{ fontSize: 12, color: '#6B6560' }}>{c.category}</Text>
                <Group gap={12}>
                  <Text style={{ fontSize: 12, fontFamily: 'monospace', color: '#1A1A1A', fontWeight: 600 }}>{c.count}</Text>
                  <Box style={{ width: 60, height: 4, background: '#EDE8E0', borderRadius: 2, overflow: 'hidden' }}>
                    <Box style={{ width: `${c.percentage}%`, height: '100%', background: '#C9A84C', borderRadius: 2 }} />
                  </Box>
                  <Text style={{ fontSize: 10, color: '#9A8E7C', fontFamily: 'monospace', width: 32, textAlign: 'right' }}>{c.percentage}%</Text>
                </Group>
              </Group>
            ))}
          </Stack>
        </Card>

        {/* Conversion funnel */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Session Funnel</Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 20 }}>Drop-off at each step this month</Text>
          <Stack gap={0}>
            {FUNNEL_DATA.map((step, i) => (
              <Box key={step.stage}>
                <Group justify="space-between" align="center" mb={6}>
                  <Group gap={8}>
                    <Box style={{
                      width: 20, height: 20, borderRadius: '50%', background: '#1A1A1A',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Text style={{ fontSize: 9, fontWeight: 700, color: '#C9A84C' }}>{i + 1}</Text>
                    </Box>
                    <Text style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500 }}>{step.stage}</Text>
                  </Group>
                  <Group gap={8}>
                    <Text style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 600, color: '#1A1A1A' }}>
                      {formatNumber(step.count)}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C', width: 40, textAlign: 'right' }}>
                      {step.pct}%
                    </Text>
                  </Group>
                </Group>
                <Box style={{ height: 8, background: '#EDE8E0', borderRadius: 4, overflow: 'hidden', marginBottom: i < 4 ? 16 : 0 }}>
                  <Box
                    style={{
                      width: `${step.pct}%`,
                      height: '100%',
                      background: i === 0 ? '#4A5568' : i === 4 ? '#2E7D32' : '#C9A84C',
                      borderRadius: 4,
                      transition: 'width 800ms ease',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Revenue + Margin */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }}>
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Revenue vs Cost</Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>Monthly — last 6 months</Text>
          <AreaChart
            h={200}
            data={MONTHLY_REVENUE.map(m => ({
              month: m.month,
              'Total Revenue': m.totalRevenue,
              'Gen Cost': m.genCost,
              'Margin': m.margin,
            }))}
            dataKey="month"
            series={[
              { name: 'Total Revenue', color: '#2E7D32' },
              { name: 'Gen Cost', color: '#E65100' },
              { name: 'Margin', color: '#C9A84C' },
            ]}
            curveType="monotone"
            withLegend
            legendProps={{ verticalAlign: 'top', height: 28 }}
            withTooltip
            gridColor="#EDE8E0"
            strokeWidth={2}
            fillOpacity={0.08}
            tickLine="none"
            withDots={false}
            styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
          />
        </Card>

        {/* Regeneration quality table */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Generation Quality</Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>First-try success vs regenerations</Text>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Generated</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Regen</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Abandoned</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Success</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {REGEN_DATA.map(row => {
                const successPct = (((row.generated - row.abandoned) / row.generated) * 100).toFixed(0);
                return (
                  <Table.Tr key={row.category}>
                    <Table.Td><Text style={{ fontSize: 12, fontWeight: 500 }}>{row.category}</Text></Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}><Text style={{ fontSize: 12, fontFamily: 'monospace' }}>{row.generated}</Text></Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: 12, fontFamily: 'monospace', color: row.regenerated > 20 ? '#E65100' : '#9A8E7C' }}>
                        {row.regenerated}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: 12, fontFamily: 'monospace', color: '#9A8E7C' }}>{row.abandoned}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: 12, fontWeight: 700, color: Number(successPct) > 90 ? '#2E7D32' : '#E65100', fontFamily: 'monospace' }}>
                        {successPct}%
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
