import Link from 'next/link';
import { Stack, Group, Text, Paper, Box, Button } from '@mantine/core';

export default function WalletPage() {
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
        <Text size="xs" tt="uppercase" c="#2E7D32" fw={600} style={{ letterSpacing: '0.12em', padding: '2px 8px', background: 'rgba(46, 125, 50, 0.1)', border: '1px solid rgba(46, 125, 50, 0.3)' }}>
          Store Credits
        </Text>
      </Group>

      <Paper p="xl" radius="xs" style={{ background: '#1A1A1A', color: '#fff' }}>
        <Group justify="space-between" align="center" mb="md">
          <Group gap="sm">
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#C9A84C' }}>account_balance_wallet</span>
            <Text size="xs" fw={600} c="#E8E0D6">Credit Balance</Text>
          </Group>
          <Text size="xs" c="#9A8E7C" style={{ fontFamily: 'monospace', fontSize: 10 }}>ID: WALLET-091</Text>
        </Group>

        <Group align="baseline" gap="xs" mb="lg">
          <Text style={{ fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1 }}>100</Text>
          <Text size="sm" c="#9A8E7C">credits</Text>
        </Group>

        <Group grow style={{ borderTop: '1px solid #333', paddingTop: 16 }}>
          <Group gap="sm" wrap="nowrap">
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64B5F6' }}>bolt</span>
            <Box>
              <Text size="xs" fw={600} c="#E8E0D6">90 Normal</Text>
              <Text size="xs" c="#9A8E7C" style={{ fontSize: 10 }}>Western & casual</Text>
            </Box>
          </Group>
          <Group gap="sm" wrap="nowrap">
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#C9A84C' }}>workspace_premium</span>
            <Box>
              <Text size="xs" fw={600} c="#E8E0D6">10 Premium</Text>
              <Text size="xs" c="#9A8E7C" style={{ fontSize: 10 }}>Intricate sarees</Text>
            </Box>
          </Group>
        </Group>
      </Paper>

      <Box>
        <Text size="xs" fw={600} c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.12em', marginBottom: 12 }}>
          Top-Up Credit Packs
        </Text>
        <Stack gap="sm">
          {[
            {
              title: 'Standard Top-Up',
              credits: '50 Credits',
              price: '₹375',
              rate: '₹7.5 / credit',
              badge: 'Popular',
            },
            {
              title: 'Bulk Top-Up Pack',
              credits: '400 Credits',
              price: '₹2,080',
              rate: '₹5.2 / credit',
              badge: 'Best Value',
            },
            {
              title: 'Enterprise Monthly',
              credits: '1,100 Credits',
              price: '₹5,720',
              rate: '₹5.2 / credit',
              badge: 'Festival Rush',
            },
          ].map((pack, i) => (
            <Paper key={i} withBorder p="md" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Box style={{ minWidth: 0, flex: 1 }}>
                  <Group gap="xs" mb={4}>
                    <Text size="xs" fw={700} c="#1A1A1A">{pack.title}</Text>
                    <Text size="xs" fw={600} c="#9E7E1E" style={{ fontSize: 9, padding: '2px 6px', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid rgba(201, 168, 76, 0.3)' }}>{pack.badge}</Text>
                  </Group>
                  <Text size="xs" c="#6B6560" style={{ fontSize: 11 }}>{pack.credits} • {pack.rate}</Text>
                </Box>
                <Button color="dark" variant="outline" radius="xs" size="xs" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>} styles={{ root: { borderColor: '#1A1A1A', color: '#1A1A1A' } }}>
                  {pack.price}
                </Button>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
