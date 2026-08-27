'use client';

import React, { useState } from 'react';
import {
  Box, Text, Group, Stack, SimpleGrid, Card, Table,
  Button, Badge, ActionIcon, Tabs, Select,
} from '@mantine/core';
import { AreaChart, BarChart, DonutChart, LineChart } from '@mantine/charts';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CreditMeter } from '@/components/ui/CreditMeter';
import {
  PLATFORM_KPIS, DAILY_VOLUME_30D, CATEGORY_STATS,
  MONTHLY_REVENUE, RECENT_ACTIVITY, MOCK_SHOPS,
} from '@/lib/mock-data';
import { formatINR, formatRelativeTime, formatNumber } from '@/lib/utils';

const DONUT_DATA = [
  { name: 'Normal', value: PLATFORM_KPIS.normalCreditsMonth, color: '#4A90A4' },
  { name: 'Premium', value: PLATFORM_KPIS.premiumCreditsMonth, color: '#C9A84C' },
];

export default function OverviewPage() {
  const [range, setRange] = useState('30d');
  const chartData = range === '14d' ? DAILY_VOLUME_30D.slice(-14) : DAILY_VOLUME_30D;

  const shop = MOCK_SHOPS[0];

  return (
    <Stack gap={24}>
      {/* Page title */}
      <Box>
        <Text
          style={{
            fontFamily: 'var(--font-bodoni), Bodoni Moda, serif',
            fontSize: 'clamp(20px, 5vw, 26px)',
            fontWeight: 400,
            color: '#1A1A1A',
            letterSpacing: '-0.01em',
          }}
        >
          Good morning, {shop.ownerName.split(' ')[0]} ✦
        </Text>
        <Text style={{ fontSize: 12, color: '#9A8E7C', marginTop: 2 }}>
          {shop.name} · {shop.city} · {shop.plan === 'standard' ? 'Standard Plan' : 'Basic Plan'}
        </Text>
      </Box>

      {/* KPI Grid */}
      <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 5 }} spacing={{ base: 10, md: 16 }}>
        <KpiCard
          label="Try-Ons Today"
          value={String(PLATFORM_KPIS.totalTryOnsToday)}
          delta={undefined}
          icon="auto_awesome"
          subtext="Since opening"
          accentColor="#C9A84C"
        />
        <KpiCard
          label="This Month"
          value={formatNumber(PLATFORM_KPIS.totalTryOnsMonth)}
          delta={PLATFORM_KPIS.monthVsLastMonth}
          deltaPositive={true}
          icon="trending_up"
          subtext="vs last month"
          accentColor="#4A90A4"
        />
        <KpiCard
          label="Credits Left"
          value={`${shop.normalCredits + shop.premiumCredits}`}
          icon="account_balance_wallet"
          subtext={`${shop.normalCredits} normal · ${shop.premiumCredits} premium`}
          accentColor="#9A8E7C"
        />
        <KpiCard
          label="Revenue (Est.)"
          value={formatINR(PLATFORM_KPIS.revenueMonth)}
          delta={PLATFORM_KPIS.revenueGrowth}
          deltaPositive={true}
          icon="payments"
          subtext="This month"
          accentColor="#2E7D32"
        />
        <KpiCard
          label="Gross Margin"
          value={`${PLATFORM_KPIS.grossMarginPct}%`}
          delta={String(+(PLATFORM_KPIS.grossMarginPct - PLATFORM_KPIS.grossMarginPrev).toFixed(1))}
          deltaPositive={PLATFORM_KPIS.grossMarginPct >= PLATFORM_KPIS.grossMarginPrev}
          icon="show_chart"
          subtext="vs last month"
          accentColor="#C9A84C"
        />
      </SimpleGrid>

      {/* Charts row — CSS grid for span control */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
        className="charts-grid"
      >
        {/* Try-On Volume (big chart) */}
        <Card
          style={{ gridColumn: 'span 2', background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}
          className="md:col-span-2"
        >
          <Group justify="space-between" align="center" mb={16}>
            <Box>
              <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.02em' }}>
                Try-On Volume
              </Text>
              <Text style={{ fontSize: 11, color: '#9A8E7C', marginTop: 2 }}>
                Normal vs Premium credits consumed
              </Text>
            </Box>
            <Select
              value={range}
              onChange={(v) => setRange(v ?? '30d')}
              data={[
                { label: 'Last 14 days', value: '14d' },
                { label: 'Last 30 days', value: '30d' },
              ]}
              size="xs"
              styles={{ input: { height: 30, minHeight: 30, fontSize: 12, borderColor: '#E8E0D6' } }}
              w={130}
            />
          </Group>
          <AreaChart
            h={220}
            data={chartData}
            dataKey="date"
            series={[
              { name: 'normal', label: 'Normal', color: '#4A90A4' },
              { name: 'premium', label: 'Premium', color: '#C9A84C' },
            ]}
            curveType="monotone"
            withLegend
            legendProps={{ verticalAlign: 'top', height: 28 }}
            withTooltip
            tooltipAnimationDuration={150}
            gridColor="#EDE8E0"
            strokeWidth={2}
            fillOpacity={0.15}
            tickLine="none"
            withDots={false}
            styles={{
              axis: { fontSize: 10, color: '#9A8E7C' },
            }}
          />
        </Card>

        {/* Credit Split donut */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20, gridColumn: 'span 1' }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Credit Breakdown
          </Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>
            This month — {formatNumber(PLATFORM_KPIS.totalCreditsMonth)} total
          </Text>
          <DonutChart
            data={DONUT_DATA}
            h={160}
            withTooltip
            tooltipDataSource="segment"
            thickness={28}
            paddingAngle={3}
            chartLabel={`${PLATFORM_KPIS.totalCreditsMonth}`}
            styles={{ label: { fontSize: 22, fontWeight: 700, fill: '#1A1A1A' } }}
          />
          <Stack gap={8} mt={16}>
            {DONUT_DATA.map((d) => (
              <Group key={d.name} justify="space-between">
                <Group gap={6}>
                  <Box style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <Text style={{ fontSize: 12, color: '#6B6560' }}>{d.name}</Text>
                </Group>
                <Text style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', fontFamily: 'monospace' }}>
                  {d.value} credits
                </Text>
              </Group>
            ))}
          </Stack>
        </Card>
      </Box>

      {/* Category + Revenue row */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }}>
        {/* Category breakdown bar */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            By Garment Category
          </Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>
            Total try-ons this month
          </Text>
          <BarChart
            h={200}
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
        </Card>

        {/* Monthly revenue trend */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>
            Revenue Trend
          </Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>
            Plan + top-up (last 6 months)
          </Text>
          <AreaChart
            h={200}
            data={MONTHLY_REVENUE.map(m => ({
              month: m.month,
              'Plan Revenue': m.planRevenue,
              'Top-up Revenue': m.topupRevenue,
            }))}
            dataKey="month"
            series={[
              { name: 'Plan Revenue', color: '#4A5568' },
              { name: 'Top-up Revenue', color: '#C9A84C' },
            ]}
            curveType="monotone"
            withLegend
            legendProps={{ verticalAlign: 'top', height: 28 }}
            withTooltip
            gridColor="#EDE8E0"
            strokeWidth={2}
            fillOpacity={0.1}
            tickLine="none"
            withDots={false}
            styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
          />
        </Card>
      </SimpleGrid>

      {/* Bottom row — Credits + Activity */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 12, md: 16 }}>
        {/* Credit meter */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Group justify="space-between" align="center" mb={20}>
            <Box>
              <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Credit Balance</Text>
              <Text style={{ fontSize: 11, color: '#9A8E7C', marginTop: 2 }}>
                Plan includes 90 normal + 10 premium monthly
              </Text>
            </Box>
            <Button
              component="a"
              href="/credits"
              size="xs"
              variant="outline"
              color="dark"
              radius="sm"
              rightSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>}
              styles={{ root: { borderColor: '#E8E0D6', fontSize: 11 } }}
            >
              Buy Credits
            </Button>
          </Group>
          <CreditMeter
            normalCredits={shop.normalCredits}
            premiumCredits={shop.premiumCredits}
          />
        </Card>

        {/* Activity feed */}
        <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
          <Group justify="space-between" align="center" mb={16}>
            <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Recent Activity</Text>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 8px',
                background: 'rgba(46,125,50,0.08)',
                borderRadius: 4,
              }}
            >
              <Box className="status-dot-active" style={{ width: 5, height: 5, borderRadius: '50%', background: '#2E7D32', flexShrink: 0 }} />
              <Text style={{ fontSize: 10, fontWeight: 600, color: '#2E7D32', letterSpacing: '0.08em' }}>LIVE</Text>
            </Box>
          </Group>
          <Stack gap={0}>
            {RECENT_ACTIVITY.slice(0, 7).map((act, i) => (
              <Box
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 0',
                  borderBottom: i < 6 ? '1px solid #F5F2ED' : 'none',
                }}
              >
                {/* Icon */}
                <Box
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: act.type === 'try_on'
                      ? 'rgba(201,168,76,0.12)'
                      : act.type === 'topup'
                        ? 'rgba(46,125,50,0.10)'
                        : 'rgba(74,144,164,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 14,
                      color: act.type === 'try_on'
                        ? '#C9A84C'
                        : act.type === 'topup'
                          ? '#2E7D32'
                          : '#4A90A4',
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {act.type === 'try_on' ? 'checkroom' : act.type === 'topup' ? 'add_circle' : 'key'}
                  </span>
                </Box>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#1A1A1A',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {act.description}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#9A8E7C', marginTop: 1 }}>
                    {formatRelativeTime(act.timestamp)}
                  </Text>
                </Box>
                {act.creditType && (
                  <Box
                    style={{
                      padding: '1px 6px',
                      borderRadius: 3,
                      background: act.creditType === 'premium'
                        ? 'rgba(201,168,76,0.12)'
                        : 'rgba(74,144,164,0.12)',
                      border: `1px solid ${act.creditType === 'premium' ? 'rgba(201,168,76,0.30)' : 'rgba(74,144,164,0.30)'}`,
                      flexShrink: 0,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: act.creditType === 'premium' ? '#C9A84C' : '#4A90A4',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {act.creditType}
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
