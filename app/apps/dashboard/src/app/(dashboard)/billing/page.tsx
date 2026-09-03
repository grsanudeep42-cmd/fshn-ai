'use client';

import React, { useState } from 'react';
import {
  Box, Text, Group, Stack, SimpleGrid, Card, Table, Button,
  Badge, Modal,
} from '@mantine/core';
import { BarChart, LineChart } from '@mantine/charts';
import { MOCK_INVOICES, MOCK_SHOPS, MONTHLY_REVENUE } from '@/lib/mock-data';
import { formatINR, formatDate, PLAN_LABELS } from '@/lib/utils';

const PLAN_COMPARISON = [
  {
    key: 'basic',
    name: 'Basic',
    price: 2000,
    devices: 10,
    normalCredits: 90,
    premiumCredits: 10,
    features: ['10 devices', '100 credits/month', 'Daily access codes', 'Analytics dashboard', 'Email support'],
  },
  {
    key: 'standard',
    name: 'Standard',
    price: 5000,
    devices: 50,
    normalCredits: 70,
    premiumCredits: 30,
    features: ['50 devices', '100 credits/month (more premium)', 'Daily access codes', 'Analytics + billing', 'WhatsApp code delivery', 'Priority support'],
    recommended: true,
  },
];

export default function BillingPage() {
  const shop = MOCK_SHOPS[0];
  const invoices = MOCK_INVOICES.filter(i => i.shopId === shop.id);
  const currentInvoice = invoices[0];
  const [planOpen, setPlanOpen] = useState(false);

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0);
  const totalTopups = invoices.reduce((sum, i) => sum + i.topupAmount, 0);

  return (
    <Stack gap={24}>
      {/* Header */}
      <Group justify="space-between" align="flex-start" wrap="wrap" gap={12}>
        <Box>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
            Billing
          </Text>
          <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
            Invoices, plan management, and spending overview
          </Text>
        </Box>
      </Group>

      {/* Current plan + invoice summary */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: 12, md: 16 }}>
        {/* Current plan card — light */}
        <Card
          style={{
            background: 'linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)',
            border: '1.5px solid #D4C5A9',
            borderRadius: 8,
            padding: 24,
          }}
        >
          <Group gap={8} mb={16}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#C9A84C', fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Current Plan
            </Text>
          </Group>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 28, fontWeight: 400, color: '#1A1A1A', lineHeight: 1, marginBottom: 4 }}>
            Standard
          </Text>
          <Text style={{ fontSize: 13, color: '#9A8E7C', marginBottom: 20 }}>
            ₹5,000 / month · Auto-renews Sep 30
          </Text>
          <Box style={{ borderTop: '1px solid #E0D5C0', paddingTop: 16 }}>
            {['50 devices', '100 credits included', 'Priority support'].map(f => (
              <Group key={f} gap={6} mb={6}>
                <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#C9A84C', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <Text style={{ fontSize: 12, color: '#6B6560' }}>{f}</Text>
              </Group>
            ))}
          </Box>
          <Button
            fullWidth
            variant="outline"
            mt={16}
            onClick={() => setPlanOpen(true)}
            styles={{ root: { borderColor: '#D4C5A9', color: '#6B6560', fontSize: 12, height: 36, background: '#FFFFFF' } }}
          >
            Change Plan
          </Button>
        </Card>

        {/* Current invoice */}
        <Card style={{ background: '#FFFFFF', border: currentInvoice?.status === 'due' ? '1px solid rgba(230,81,0,0.4)' : '1px solid #E8E0D6', borderRadius: 8, padding: 24 }}>
          <Group justify="space-between" mb={16}>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
              Current Invoice
            </Text>
            {currentInvoice && (
              <Box style={{
                padding: '2px 8px', borderRadius: 4,
                background: currentInvoice.status === 'paid' ? 'rgba(46,125,50,0.10)' : 'rgba(230,81,0,0.10)',
                border: `1px solid ${currentInvoice.status === 'paid' ? 'rgba(46,125,50,0.30)' : 'rgba(230,81,0,0.30)'}`,
              }}>
                <Text style={{
                  fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: currentInvoice.status === 'paid' ? '#2E7D32' : '#E65100',
                }}>
                  {currentInvoice.status === 'paid' ? 'Paid' : 'Payment Due'}
                </Text>
              </Box>
            )}
          </Group>
          {currentInvoice && (
            <>
              <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 28, fontWeight: 400, color: '#1A1A1A', lineHeight: 1 }}>
                {formatINR(currentInvoice.totalAmount)}
              </Text>
              <Text style={{ fontSize: 12, color: '#9A8E7C', marginTop: 4, marginBottom: 16 }}>
                {currentInvoice.month}
              </Text>
              <Stack gap={6}>
                {[
                  { label: 'Plan fee', amount: currentInvoice.planFee },
                  { label: 'Extra credits', amount: currentInvoice.topupAmount },
                ].map(row => (
                  <Group key={row.label} justify="space-between">
                    <Text style={{ fontSize: 12, color: '#6B6560' }}>{row.label}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'monospace', color: '#1A1A1A' }}>{formatINR(row.amount)}</Text>
                  </Group>
                ))}
              </Stack>
              {currentInvoice.status === 'due' && (
                <Button fullWidth color="dark" mt={16} size="sm">
                  Pay Now
                </Button>
              )}
            </>
          )}
        </Card>

        {/* Spending summary */}
        <Stack gap={12}>
          {[
            { label: 'Total Paid (6 months)', value: formatINR(totalPaid), icon: 'payments', color: '#2E7D32' },
            { label: 'Credit Top-Ups Total', value: formatINR(totalTopups), icon: 'add_card', color: '#C9A84C' },
            { label: 'Avg Monthly Spend', value: formatINR(Math.round(totalPaid / 5)), icon: 'show_chart', color: '#4A90A4' },
          ].map(stat => (
            <Box key={stat.label} style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: '14px 18px' }}>
              <Group gap={8}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: stat.color, fontVariationSettings: "'FILL' 1" }}>
                  {stat.icon}
                </span>
                <Box>
                  <Text style={{ fontSize: 10, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                    {stat.label}
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace', lineHeight: 1.3 }}>
                    {stat.value}
                  </Text>
                </Box>
              </Group>
            </Box>
          ))}
        </Stack>
      </SimpleGrid>

      {/* Revenue chart */}
      <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
        <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Monthly Spend Breakdown</Text>
        <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>Plan fees vs top-up costs over 6 months</Text>
        <BarChart
          h={220}
          data={MONTHLY_REVENUE.map(m => ({
            month: m.month,
            'Plan Fee': m.planRevenue / 6,
            'Top-up Credits': m.topupRevenue / 6,
          }))}
          dataKey="month"
          series={[
            { name: 'Plan Fee', color: '#4A5568' },
            { name: 'Top-up Credits', color: '#C9A84C' },
          ]}
          withTooltip
          withLegend
          legendProps={{ verticalAlign: 'top', height: 28 }}
          tickLine="none"
          gridColor="#EDE8E0"
          barProps={{ radius: [3, 3, 0, 0] }}
          type="stacked"
          styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
        />
      </Card>

      {/* Invoice history */}
      <Card style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 20 }}>
        <Group justify="space-between" mb={16}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Invoice History</Text>
          <Button
            variant="subtle"
            color="dark"
            size="xs"
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span>}
            styles={{ root: { fontSize: 11 } }}
          >
            Download All
          </Button>
        </Group>
        <Box className="dash-table-container" style={{ overflowX: 'auto' }}>
          <Table className="dash-table">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Month</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Plan Fee</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Top-up Credits</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Status</Table.Th>
                <Table.Th>Due / Paid Date</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {invoices.map(inv => (
                <Table.Tr key={inv.id}>
                  <Table.Td>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>{inv.month}</Text>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'monospace' }}>{formatINR(inv.planFee)}</Text>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Text style={{ fontSize: 12, fontFamily: 'monospace' }}>{formatINR(inv.topupAmount)}</Text>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <Text style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#1A1A1A' }}>{formatINR(inv.totalAmount)}</Text>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }}>
                    <Box style={{
                      display: 'inline-flex', padding: '2px 8px', borderRadius: 4,
                      background: inv.status === 'paid' ? 'rgba(46,125,50,0.10)' : inv.status === 'due' ? 'rgba(230,81,0,0.10)' : 'rgba(183,28,28,0.10)',
                      border: `1px solid ${inv.status === 'paid' ? 'rgba(46,125,50,0.30)' : 'rgba(230,81,0,0.30)'}`,
                    }}>
                      <Text style={{
                        fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                        color: inv.status === 'paid' ? '#2E7D32' : '#E65100',
                      }}>
                        {inv.status === 'paid' ? 'Paid' : inv.status === 'due' ? 'Due' : 'Overdue'}
                      </Text>
                    </Box>
                  </Table.Td>
                  <Table.Td>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>
                      {inv.status === 'paid' ? `Paid ${formatDate(inv.paidAt!)}` : `Due ${formatDate(inv.dueDate)}`}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Button variant="subtle" color="dark" size="xs" styles={{ root: { fontSize: 11, height: 24 } }}>
                      PDF
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Card>

      {/* Plan change modal */}
      <Modal
        opened={planOpen}
        onClose={() => setPlanOpen(false)}
        title={
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}>
            Change Plan
          </Text>
        }
        size="lg"
        radius="sm"
        centered
        styles={{ header: { borderBottom: '1px solid #E8E0D6', paddingBottom: 12 }, body: { paddingTop: 20 } }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 12, md: 16 }}>
          {PLAN_COMPARISON.map(plan => (
            <Box
              key={plan.key}
              style={{
                border: `2px solid ${plan.key === shop.plan ? '#C9A84C' : '#E8E0D6'}`,
                borderRadius: 8,
                padding: 20,
                position: 'relative',
                background: plan.recommended ? '#FAF8F5' : '#FFFFFF',
              }}
            >
              {plan.recommended && (
                <Box style={{
                  position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                  background: '#C9A84C', padding: '2px 12px', borderRadius: 10,
                }}>
                  <Text style={{ fontSize: 9, fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                    Recommended
                  </Text>
                </Box>
              )}
              <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>
                {plan.name}
              </Text>
              <Text style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace' }}>
                {formatINR(plan.price)}<Text component="span" style={{ fontSize: 12, fontWeight: 400, color: '#9A8E7C', fontFamily: 'Inter' }}>/month</Text>
              </Text>
              <Stack gap={6} mt={16}>
                {plan.features.map(f => (
                  <Group key={f} gap={6}>
                    <span className="material-symbols-outlined" style={{ fontSize: 13, color: '#C9A84C', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <Text style={{ fontSize: 12, color: '#6B6560' }}>{f}</Text>
                  </Group>
                ))}
              </Stack>
              <Button
                fullWidth
                mt={16}
                color={plan.key === shop.plan ? 'gray' : 'dark'}
                variant={plan.key === shop.plan ? 'outline' : 'filled'}
                disabled={plan.key === shop.plan}
                styles={{ root: { fontSize: 12 } }}
              >
                {plan.key === shop.plan ? 'Current Plan' : `Switch to ${plan.name}`}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Modal>
    </Stack>
  );
}
