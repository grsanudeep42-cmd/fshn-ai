'use client';

import { useState } from 'react';
import { Box, Text, Group, Stack, Badge, ActionIcon, Button, Table, Paper, SimpleGrid, CopyButton } from '@mantine/core';
import { MOCK_SHOPS, getTodayCode, getCodeHistory } from '@/lib/mock-data';
import { getWhatsappLink, formatDate, formatDateTime } from '@/lib/utils';

export default function DailyCodePage() {
  const shop = MOCK_SHOPS[0];
  const todayCode = getTodayCode(shop.id);
  const history = getCodeHistory(shop.id);

  const sessionsToday = todayCode?.sessionsCount ?? 0;
  const avgSessions = 12;
  const activationsMonth = 24;

  const [code, setCode] = useState(todayCode?.code ?? 'VT7KM2');

  return (
    <Stack gap={24}>
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
          Daily Access Code
        </Text>
        <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
          This code is required for staff to open the VTON app. Rotates every 24 hours at midnight.
        </Text>
      </Box>

      {/* Big code card — white */}
      <Box
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E0D6',
          borderLeft: '4px solid #C9A84C',
          borderRadius: 10,
          padding: '32px 24px 28px',
        }}
      >
        <Stack align="center" gap={14}>
          {/* Status */}
          <Group gap={6}>
            <Box
              className="status-dot-active"
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#2E7D32', flexShrink: 0 }}
            />
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#2E7D32', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Active
            </Text>
          </Group>

          {/* Code display */}
          <Text
            style={{
              fontFamily: 'ui-monospace, "Cascadia Code", monospace',
              letterSpacing: '0.32em',
              fontSize: 52,
              color: '#C9A84C',
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {code}
          </Text>
          <Text style={{ fontSize: 12, color: '#9A8E7C', textAlign: 'center' }}>
            Daily Access Code — Valid until midnight tonight
          </Text>

          {/* Actions */}
          <Group gap={12} mt={4} wrap="wrap" justify="center">
            <CopyButton value={code} timeout={2000}>
              {({ copied, copy }) => (
                <Button
                  variant="outline"
                  onClick={copy}
                  leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>{copied ? 'check' : 'content_copy'}</span>}
                  styles={{
                    root: {
                      borderColor: copied ? '#2E7D32' : '#D4C5A9',
                      color: copied ? '#2E7D32' : '#6B6560',
                      background: '#FFFFFF',
                      fontSize: 13,
                    },
                  }}
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
              )}
            </CopyButton>

            <Button
              component="a"
              href={getWhatsappLink(shop.phone, code, shop.name)}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>}
              styles={{ root: { background: '#25D366', color: '#FFFFFF', fontSize: 13, '&:hover': { background: '#1DA851' } } }}
            >
              Send via WhatsApp
            </Button>
          </Group>

          {/* Stats row */}
          <Group
            gap={0}
            mt={8}
            style={{
              borderTop: '1px solid #F0EBE3',
              paddingTop: 20,
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            {[
              { label: 'Date', value: formatDate(new Date().toISOString()) },
              { label: 'Sessions Today', value: String(sessionsToday) },
              { label: 'WhatsApp Sent', value: todayCode?.sentViaWhatsapp ? 'Yes' : 'Not yet', valueColor: todayCode?.sentViaWhatsapp ? '#2E7D32' : '#9A8E7C' },
            ].map(stat => (
              <Box key={stat.label} style={{ textAlign: 'center' }}>
                <Text style={{ fontSize: 10, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                  {stat.label}
                </Text>
                <Text style={{ fontSize: 14, color: stat.valueColor ?? '#1A1A1A', fontWeight: 600, marginTop: 3, fontFamily: 'monospace' }}>
                  {stat.value}
                </Text>
              </Box>
            ))}
          </Group>

          <Button
            variant="subtle"
            size="xs"
            onClick={() => setCode('NEW' + Math.random().toString(36).slice(2, 7).toUpperCase())}
            styles={{ root: { color: '#9A8E7C', fontSize: 11 } }}
          >
            Regenerate Code
          </Button>
        </Stack>
      </Box>

      {/* Stats cards */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={14}>
        {[
          { label: 'Sessions Today', value: sessionsToday, icon: 'touch_app', color: '#C9A84C' },
          { label: 'Avg Sessions / Day', value: avgSessions, icon: 'bar_chart', color: '#4A90A4' },
          { label: 'Code Activations This Month', value: activationsMonth, icon: 'key', color: '#2E7D32' },
        ].map(stat => (
          <Box key={stat.label} style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: '16px 18px' }}>
            <Group gap={6} mb={8}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: stat.color, fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
              <Text style={{ fontSize: 10, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                {stat.label}
              </Text>
            </Group>
            <Text style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace', lineHeight: 1 }}>
              {stat.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Code history */}
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 18, fontWeight: 400, color: '#1A1A1A', marginBottom: 14 }}>
          Code History
        </Text>
        <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, overflow: 'hidden' }}>
          <Box className="dash-table-container" style={{ overflowX: 'auto' }}>
            <Table className="dash-table">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Activated At</Table.Th>
                  <Table.Th style={{ textAlign: 'center' }}>Sessions</Table.Th>
                  <Table.Th style={{ textAlign: 'center' }}>WhatsApp</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {history.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text style={{ fontSize: 12, color: '#6B6560' }}>{formatDate(item.date)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ fontFamily: 'monospace', letterSpacing: '0.18em', fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>
                        {item.code}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Box style={{
                        display: 'inline-flex', padding: '2px 8px', borderRadius: 4,
                        background: item.status === 'active' ? 'rgba(46,125,50,0.10)' : item.status === 'used' ? 'rgba(21,101,192,0.10)' : 'rgba(107,101,96,0.08)',
                        border: `1px solid ${item.status === 'active' ? 'rgba(46,125,50,0.30)' : item.status === 'used' ? 'rgba(21,101,192,0.30)' : 'rgba(107,101,96,0.20)'}`,
                      }}>
                        <Text style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                          color: item.status === 'active' ? '#2E7D32' : item.status === 'used' ? '#1565C0' : '#6B6560',
                        }}>
                          {item.status}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ fontSize: 12, color: '#6B6560' }}>
                        {item.activatedAt ? formatDateTime(item.activatedAt) : '—'}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#C9A84C' }}>
                        {item.sessionsCount}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: item.sentViaWhatsapp ? '#25D366' : '#D4C9B8', fontVariationSettings: "'FILL' 1" }}>
                        {item.sentViaWhatsapp ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
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
