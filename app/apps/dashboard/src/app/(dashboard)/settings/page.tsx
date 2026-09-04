'use client';

import React, { useState } from 'react';
import {
  Box, Text, Group, Stack, TextInput, Button, Switch, Select,
  SimpleGrid, Tabs, PasswordInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

const SECTION_STYLE = {
  background: '#FFFFFF',
  border: '1px solid #E8E0D6',
  borderRadius: 8,
  padding: 24,
};

const LABEL_STYLE = {
  fontSize: 12,
  fontWeight: 600 as const,
  color: '#6B6560',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom: 4,
};

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <Box mb={20}>
      <Group gap={8} mb={4}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#C9A84C', fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{title}</Text>
      </Group>
      {subtitle && (
        <Text style={{ fontSize: 12, color: '#9A8E7C', marginLeft: 26 }}>{subtitle}</Text>
      )}
    </Box>
  );
}

export default function SettingsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [lowCreditThreshold, setLowCreditThreshold] = useState('15');
  const [activeTab, setActiveTab] = useState<string | null>('account');

  function handleSave() {
    notifications.show({
      message: 'Settings saved successfully',
      color: 'green',
      icon: <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>,
    });
  }

  return (
    <Stack gap={24}>
      {/* Header */}
      <Box>
        <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
          Settings
        </Text>
        <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
          Account, notifications, daily code delivery, and credit preferences
        </Text>
      </Box>

      <Tabs value={activeTab} onChange={setActiveTab} styles={{
        tab: { fontSize: 13, fontWeight: 500 },
        tabLabel: { color: '#6B6560' },
      }}>
        <Tabs.List mb={20}>
          <Tabs.Tab value="account" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>}>Account</Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>notifications</span>}>Notifications</Tabs.Tab>
          <Tabs.Tab value="credits" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>account_balance_wallet</span>}>Credits</Tabs.Tab>
          <Tabs.Tab value="privacy" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>shield</span>}>Privacy</Tabs.Tab>
        </Tabs.List>

        {/* Account tab */}
        <Tabs.Panel value="account">
          <Stack gap={16}>
            <Box style={SECTION_STYLE}>
              <SectionTitle icon="store" title="Shop Information" subtitle="Your shop profile visible to VTON team" />
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={14}>
                <TextInput label="Shop Name" defaultValue="Lakshmi Sarees & Silks" styles={{ label: LABEL_STYLE }} />
                <TextInput label="Owner Name" defaultValue="Rajesh Varma" styles={{ label: LABEL_STYLE }} />
                <TextInput label="Phone Number" defaultValue="+91 98765 43210" styles={{ label: LABEL_STYLE }} />
                <TextInput label="Email Address" defaultValue="rajesh@lakshmisilks.in" styles={{ label: LABEL_STYLE }} />
                <TextInput label="City" defaultValue="Visakhapatnam" styles={{ label: LABEL_STYLE }} />
                <TextInput label="Mall / Location" defaultValue="CMR Mall Vizag" styles={{ label: LABEL_STYLE }} />
                <TextInput
                  label="Shop Address"
                  defaultValue="Ground Floor, CMR Mall, Siripuram"
                  style={{ gridColumn: 'span 2' }}
                  styles={{ label: LABEL_STYLE }}
                />
              </SimpleGrid>
              <Button color="dark" mt={16} size="sm" onClick={handleSave}>Save Changes</Button>
            </Box>

            <Box style={SECTION_STYLE}>
              <SectionTitle icon="lock" title="Change Password" subtitle="Use a strong password of at least 8 characters" />
              <Stack gap={12} style={{ maxWidth: 400 }}>
                <PasswordInput label="Current Password" placeholder="••••••••" styles={{ label: LABEL_STYLE }} />
                <PasswordInput label="New Password" placeholder="••••••••" styles={{ label: LABEL_STYLE }} />
                <PasswordInput label="Confirm New Password" placeholder="••••••••" styles={{ label: LABEL_STYLE }} />
                <Button color="dark" size="sm" w="fit-content" onClick={handleSave}>Update Password</Button>
              </Stack>
            </Box>
          </Stack>
        </Tabs.Panel>

        {/* Notifications tab */}
        <Tabs.Panel value="notifications">
          <Stack gap={16}>
            <Box style={SECTION_STYLE}>
              <SectionTitle icon="key" title="Daily Code Delivery" subtitle="How your daily access code is sent to you each morning" />
              <Stack gap={14}>
                <Group justify="space-between" align="center" style={{ padding: '14px 0', borderBottom: '1px solid #F5F2ED' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>WhatsApp</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>
                      Sent to +91 98765 43210 at 8:00 AM daily
                    </Text>
                  </Box>
                  <Switch
                    checked={whatsappEnabled}
                    onChange={e => setWhatsappEnabled(e.currentTarget.checked)}
                    color="dark"
                    styles={{ track: { cursor: 'pointer' } }}
                  />
                </Group>
                <Group justify="space-between" align="center" style={{ padding: '14px 0', borderBottom: '1px solid #F5F2ED' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>SMS</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>
                      Fallback SMS to registered number
                    </Text>
                  </Box>
                  <Switch
                    checked={smsEnabled}
                    onChange={e => setSmsEnabled(e.currentTarget.checked)}
                    color="dark"
                    styles={{ track: { cursor: 'pointer' } }}
                  />
                </Group>
                <Group justify="space-between" align="center" style={{ padding: '14px 0' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>Email</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>
                      Daily summary + code to rajesh@lakshmisilks.in
                    </Text>
                  </Box>
                  <Switch
                    checked={emailEnabled}
                    onChange={e => setEmailEnabled(e.currentTarget.checked)}
                    color="dark"
                    styles={{ track: { cursor: 'pointer' } }}
                  />
                </Group>
              </Stack>
              <Button color="dark" size="sm" mt={16} onClick={handleSave}>Save Preferences</Button>
            </Box>

            <Box style={SECTION_STYLE}>
              <SectionTitle icon="notifications_active" title="Alert Preferences" subtitle="When we notify you about credits, inventory, and billing" />
              <Stack gap={14}>
                <Group justify="space-between" align="center" style={{ padding: '14px 0', borderBottom: '1px solid #F5F2ED' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>Low Credit Alert</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>Notify when credits fall below threshold</Text>
                  </Box>
                  <Select
                    value={lowCreditThreshold}
                    onChange={v => setLowCreditThreshold(v ?? '15')}
                    data={['5', '10', '15', '20', '25', '30']}
                    size="xs"
                    w={80}
                    styles={{ input: { fontSize: 12, borderColor: '#E8E0D6' } }}
                  />
                </Group>
                <Group justify="space-between" align="center" style={{ padding: '14px 0', borderBottom: '1px solid #F5F2ED' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>Low Stock Alerts</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>Notify when garments have fewer than 5 units</Text>
                  </Box>
                  <Switch
                    checked={inventoryAlerts}
                    onChange={e => setInventoryAlerts(e.currentTarget.checked)}
                    color="dark"
                    styles={{ track: { cursor: 'pointer' } }}
                  />
                </Group>
                <Group justify="space-between" align="center" style={{ padding: '14px 0' }}>
                  <Box>
                    <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>Invoice Reminders</Text>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>3 days before due date</Text>
                  </Box>
                  <Switch defaultChecked color="dark" styles={{ track: { cursor: 'pointer' } }} />
                </Group>
              </Stack>
              <Button color="dark" size="sm" mt={16} onClick={handleSave}>Save Alerts</Button>
            </Box>
          </Stack>
        </Tabs.Panel>

        {/* Credits tab */}
        <Tabs.Panel value="credits">
          <Box style={SECTION_STYLE}>
            <SectionTitle icon="auto_awesome" title="Credit Routing Rules" subtitle="Which garment categories use Normal vs Premium credits" />
            <Box style={{ border: '1px solid #E8E0D6', borderRadius: 6, overflow: 'hidden' }}>
              {[
                { category: 'Saree', creditType: 'Premium', reason: 'Complex draping — uses FASHN v1.6', color: '#C9A84C', bg: 'rgba(201,168,76,0.06)' },
                { category: 'Dress / Lehenga', creditType: 'Normal', reason: 'Standard garment — uses Nano Banana', color: '#4A90A4', bg: 'transparent' },
                { category: 'Top / Kurti', creditType: 'Normal', reason: 'Standard garment', color: '#4A90A4', bg: 'rgba(74,144,164,0.04)' },
                { category: 'Bottom / Palazzo', creditType: 'Normal', reason: 'Standard garment', color: '#4A90A4', bg: 'transparent' },
                { category: 'Children', creditType: 'Normal', reason: 'Standard garment', color: '#4A90A4', bg: 'rgba(74,144,164,0.04)' },
                { category: 'Other', creditType: 'Normal', reason: 'Default', color: '#4A90A4', bg: 'transparent' },
              ].map((row, i) => (
                <Group key={row.category} justify="space-between" style={{ padding: '12px 16px', background: row.bg, borderTop: i > 0 ? '1px solid #E8E0D6' : 'none' }}>
                  <Text style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{row.category}</Text>
                  <Group gap={12}>
                    <Text style={{ fontSize: 11, color: '#9A8E7C' }}>{row.reason}</Text>
                    <Box style={{ padding: '2px 10px', borderRadius: 4, background: row.bg || 'rgba(201,168,76,0.10)', border: `1px solid ${row.color}44` }}>
                      <Text style={{ fontSize: 10, fontWeight: 700, color: row.color, textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                        {row.creditType}
                      </Text>
                    </Box>
                  </Group>
                </Group>
              ))}
            </Box>
            <Text style={{ fontSize: 11, color: '#9A8E7C', marginTop: 12 }}>
              Credit routing is managed by VTON. Contact support if you need changes.
            </Text>
          </Box>
        </Tabs.Panel>

        {/* Privacy tab */}
        <Tabs.Panel value="privacy">
          <Box style={SECTION_STYLE}>
            <SectionTitle icon="photo_camera" title="Customer Photo Data" subtitle="How VTON handles photos taken in your shop" />
            <Stack gap={12}>
              {[
                {
                  q: 'How long are customer photos stored?',
                  a: 'Customer photos used for try-on are deleted immediately after the AI generates the result. We do not store the original photo on our servers.',
                },
                {
                  q: 'Are generated try-on images stored?',
                  a: 'Generated images are stored temporarily for the session duration (until the daily code expires at midnight). After midnight, all session images are purged automatically.',
                },
                {
                  q: 'Is customer consent required?',
                  a: 'For in-store mode: the shop staff should inform the customer that a photo will be taken for virtual try-on. No explicit digital consent form is required for casual in-store use. For home mode: users explicitly accept terms during onboarding.',
                },
                {
                  q: 'Is inventory data shared with third parties?',
                  a: 'No. Your inventory data belongs to you. VTON uses it solely to power the suggestion feature within your shop. It is never shared with other shops or third parties.',
                },
              ].map(faq => (
                <Box key={faq.q} style={{ padding: 16, background: '#FAF8F5', borderRadius: 6, border: '1px solid #E8E0D6' }}>
                  <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>{faq.q}</Text>
                  <Text style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.6 }}>{faq.a}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
