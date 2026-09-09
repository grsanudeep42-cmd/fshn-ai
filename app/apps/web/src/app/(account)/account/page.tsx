import Link from 'next/link';
import { Stack, Group, Text, Paper, Box, Button, TextInput } from '@mantine/core';

export default function AccountPage() {
  return (
    <Stack gap="xl" px={20} pt={16} pb={80}>
      <Group justify="space-between" align="center">
        <Button
          component={Link}
          href="/"
          variant="subtle"
          color="gray"
          size="xs"
          leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>}
          styles={{ root: { color: '#6B6560', padding: 0 } }}
        >
          Back
        </Button>
        <Text size="xs" tt="uppercase" c="#6B6560" fw={600} style={{ letterSpacing: '0.12em', padding: '2px 8px', background: '#F5F2ED', border: '1px solid #E8E0D6' }}>
          Account
        </Text>
      </Group>

      <Paper withBorder p="md" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
        <Group gap="sm" wrap="nowrap">
          <Box style={{ width: 48, height: 48, borderRadius: '50%', background: '#FAF8F5', border: '1px solid #E8E0D6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#C9A84C' }}>person</span>
          </Box>
          <Box>
            <Text size="xs" fw={600} c="#1A1A1A">Guest Shopper</Text>
            <Text size="xs" c="#6B6560" style={{ fontSize: 11 }}>Sign in with mobile number to save looks</Text>
          </Box>
        </Group>
      </Paper>

      <Paper withBorder p="md" radius="xs" style={{ background: '#FAF8F5', borderColor: '#E8E0D6' }}>
        <Group gap="sm" mb="md">
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#C9A84C' }}>phone_iphone</span>
          <Text size="xs" fw={600} c="#1A1A1A">Quick In-Store Sign In</Text>
        </Group>
        <Stack gap="sm">
          <Group gap="xs" wrap="nowrap">
            <Box style={{ padding: '0 12px', height: 42, background: '#FFFFFF', border: '1px solid #E8E0D6', display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: 12 }}>
              +91
            </Box>
            <TextInput
              placeholder="Enter 10-digit mobile number"
              radius="xs"
              style={{ flex: 1 }}
              styles={{ input: { height: 42, borderColor: '#E8E0D6', background: '#FFFFFF' } }}
            />
          </Group>
          <Button color="dark" radius="xs" fullWidth leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>}>
            Send OTP
          </Button>
        </Stack>
      </Paper>

      <Paper withBorder p="sm" radius="xs" style={{ background: '#F5F2ED', borderColor: '#E8E0D6' }}>
        <Group gap="sm" mb={4}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2E7D32' }}>shield</span>
          <Text size="xs" fw={600} c="#1A1A1A">Customer Photo Privacy & DPDP Act</Text>
        </Group>
        <Text size="xs" c="#6B6560" style={{ fontSize: 11, lineHeight: 1.5 }}>
          Customer photos are processed exclusively for virtual try-on drape generation. Consent is explicit, and raw customer captures can be set for instant automatic deletion.
        </Text>
      </Paper>

      <Stack gap="xs">
        {[
          { label: 'Store Preferences', desc: 'Select preferred retail showroom' },
          { label: 'Model Measurements', desc: 'Height, fit & drape settings' },
          { label: 'Privacy & Data Controls', desc: 'Manage photo retention & deletion' },
        ].map((item, i) => (
          <Paper key={i} withBorder p="sm" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6', cursor: 'pointer' }}>
            <Group justify="space-between" align="center" wrap="nowrap">
              <Box>
                <Text size="xs" fw={600} c="#1A1A1A">{item.label}</Text>
                <Text size="xs" c="#6B6560" style={{ fontSize: 10 }}>{item.desc}</Text>
              </Box>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#6B6560' }}>chevron_right</span>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
