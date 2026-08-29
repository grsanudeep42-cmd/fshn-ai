'use client';

import { Box, Text, Group, Stack, Badge, Button, Table, SimpleGrid } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { CreditMeter } from '@/components/ui/CreditMeter';
import { MOCK_SHOPS, getTransactions } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

export default function CreditsPage() {
  const shop = MOCK_SHOPS[0];
  const transactions = getTransactions(shop.id);

  const chartData = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return {
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      normal: Math.floor(Math.random() * 15) + 5,
      premium: Math.floor(Math.random() * 8) + 1,
    };
  });

  return (
    <Stack gap={24}>
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
          Credits & Top-ups
        </Text>
        <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
          Manage your try-on credits and purchase top-ups.
        </Text>
      </Box>

      {/* KPI Row */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={14}>
        {[
          { label: 'Current Balance', value: `${shop.normalCredits + shop.premiumCredits} credits`, sub: `${shop.normalCredits} normal · ${shop.premiumCredits} premium`, color: '#C9A84C' },
          { label: 'Used This Month', value: '54 credits', sub: 'Since 1st of the month', color: '#4A90A4' },
          { label: 'Top-ups This Month', value: '1 top-up', sub: '₹375 spent on extra credits', color: '#2E7D32' },
        ].map(stat => (
          <Box key={stat.label} style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: '18px 20px' }}>
            <Text style={{ fontSize: 10, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 6 }}>
              {stat.label}
            </Text>
            <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A', lineHeight: 1, marginBottom: 4 }}>
              {stat.value}
            </Text>
            <Text style={{ fontSize: 11, color: '#9A8E7C' }}>{stat.sub}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Credit meter + chart */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16}>
        <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 24 }}>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 16, fontWeight: 400, color: '#1A1A1A', marginBottom: 20 }}>
            Credit Balance
          </Text>
          <CreditMeter
            normalCredits={shop.normalCredits}
            premiumCredits={shop.premiumCredits}
            normalIncluded={90}
            premiumIncluded={30}
          />
        </Box>

        <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 24 }}>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 16, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>
            Last 14 Days Usage
          </Text>
          <Text style={{ fontSize: 11, color: '#9A8E7C', marginBottom: 16 }}>Normal vs Premium credits consumed</Text>
          <AreaChart
            h={180}
            data={chartData}
            dataKey="date"
            series={[
              { name: 'normal', label: 'Normal', color: '#4A90A4' },
              { name: 'premium', label: 'Premium', color: '#C9A84C' },
            ]}
            curveType="monotone"
            withDots={false}
            withLegend
            legendProps={{ verticalAlign: 'top', height: 28 }}
            gridColor="#EDE8E0"
            strokeWidth={2}
            fillOpacity={0.12}
            tickLine="none"
            styles={{ axis: { fontSize: 10, color: '#9A8E7C' } }}
          />
        </Box>
      </SimpleGrid>

      {/* Buy Credits */}
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>
          Buy Credits
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={16}>
          {[
            { name: 'Standard', credits: '50 Normal', price: '₹375', perCredit: '₹7.5 / credit', highlight: false, badge: null },
            { name: 'Bulk', credits: '400 Normal', price: '₹2,080', perCredit: '₹5.2 / credit', highlight: true, badge: 'Best Value' },
            { name: 'Enterprise', credits: '1,100 Credits', price: '₹5,720', perCredit: '₹5.2 / credit', highlight: false, badge: 'Festival Rush' },
          ].map(pack => (
            <Box
              key={pack.name}
              style={{
                background: '#FFFFFF',
                border: `2px solid ${pack.highlight ? '#C9A84C' : '#E8E0D6'}`,
                borderRadius: 8,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {pack.badge && (
                <Box style={{
                  position: 'absolute', top: 14, right: 14,
                  background: pack.highlight ? '#C9A84C' : '#1A1A1A',
                  padding: '2px 10px', borderRadius: 10,
                }}>
                  <Text style={{ fontSize: 9, fontWeight: 700, color: pack.highlight ? '#1A1A1A' : '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                    {pack.badge}
                  </Text>
                </Box>
              )}
              <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 18, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>
                {pack.name}
              </Text>
              <Text style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace', lineHeight: 1, marginBottom: 2 }}>
                {pack.credits}
              </Text>
              <Group justify="space-between" mt={12} mb="auto">
                <Text style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{pack.price}</Text>
                <Text style={{ fontSize: 11, color: '#9A8E7C' }}>{pack.perCredit}</Text>
              </Group>
              <Button
                fullWidth
                color="dark"
                mt={20}
                styles={{ root: { background: pack.highlight ? '#C9A84C' : '#1A1A1A', color: pack.highlight ? '#1A1A1A' : '#FFFFFF' } }}
              >
                Buy Now
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Transaction history */}
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>
          Transaction History
        </Text>
        <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, overflow: 'hidden' }}>
          <Box className="dash-table-container" style={{ overflowX: 'auto' }}>
            <Table className="dash-table">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Credit</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Amount</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Balance After</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {transactions.map((tx) => (
                  <Table.Tr key={tx.id}>
                    <Table.Td>
                      <Text style={{ fontSize: 11, color: '#9A8E7C', whiteSpace: 'nowrap' }}>{formatDateTime(tx.timestamp)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ fontSize: 13, color: '#1A1A1A' }}>{tx.description}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Box style={{
                        display: 'inline-flex', padding: '2px 8px', borderRadius: 4,
                        background: tx.type === 'used' ? 'rgba(107,101,96,0.08)' : tx.type === 'topup' ? 'rgba(21,101,192,0.10)' : tx.type === 'plan_credit' ? 'rgba(74,144,164,0.10)' : 'rgba(230,81,0,0.10)',
                      }}>
                        <Text style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                          color: tx.type === 'used' ? '#9A8E7C' : tx.type === 'topup' ? '#1565C0' : tx.type === 'plan_credit' ? '#4A90A4' : '#E65100',
                        }}>
                          {tx.type.replace('_', ' ')}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: tx.creditType === 'premium' ? '#C9A84C' : '#4A90A4' }}>
                          {tx.creditType === 'premium' ? 'workspace_premium' : 'bolt'}
                        </span>
                        <Text style={{ fontSize: 12, color: '#6B6560' }}>{tx.creditType === 'premium' ? 'Premium' : 'Normal'}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: tx.amount > 0 ? '#2E7D32' : '#E65100' }}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 13, color: '#1A1A1A' }}>{tx.balanceAfter}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
