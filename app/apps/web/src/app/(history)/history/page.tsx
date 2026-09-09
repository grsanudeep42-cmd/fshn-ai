import Link from 'next/link';
import { Stack, Group, Text, Paper, Box, Button } from '@mantine/core';

export default function HistoryPage() {
  const historyItems = [
    {
      id: 'try-001',
      date: 'Today, 2:45 PM',
      garment: 'Kanjivaram Silk Saree (Crimson & Gold)',
      branch: 'Flagship Boutique',
      status: 'completed',
    },
    {
      id: 'try-002',
      date: 'Yesterday, 5:12 PM',
      garment: 'Chanderi Zari Kurti Set',
      branch: 'Online Atelier',
      status: 'completed',
    },
    {
      id: 'try-003',
      date: 'Sep 8, 11:30 AM',
      garment: 'Emerald Velvet Indo-Western Lehenga',
      branch: 'Flagship Boutique',
      status: 'completed',
    },
  ];

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
        <Text size="xs" tt="uppercase" c="#9E7E1E" fw={600} style={{ letterSpacing: '0.12em', padding: '2px 8px', background: 'rgba(158, 126, 30, 0.1)', border: '1px solid rgba(158, 126, 30, 0.3)' }}>
          Try-On History
        </Text>
      </Group>

      <Group justify="space-between" align="center">
        <Text size="sm" fw={700} c="#1A1A1A">Your Lookbook ({historyItems.length})</Text>
        <Text size="xs" c="#6B6560">Auto-saved</Text>
      </Group>

      <Stack gap="sm">
        {historyItems.map((item) => (
          <Paper key={item.id} withBorder p="sm" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
            <Group gap="md" wrap="nowrap" align="center">
              <Box style={{ width: 64, height: 80, background: '#FAF8F5', border: '1px solid #E8E0D6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#C9A84C' }}>auto_awesome</span>
              </Box>

              <Box style={{ flex: 1, minWidth: 0 }}>
                <Group gap="xs" mb={4}>
                  <Text size="xs" c="#6B6560" style={{ fontSize: 10 }}>{item.date}</Text>
                  <Text size="xs" tt="uppercase" style={{ fontSize: 9, padding: '2px 6px', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7' }}>{item.status}</Text>
                </Group>
                <Text size="xs" fw={600} c="#1A1A1A" truncate>{item.garment}</Text>
                <Text size="xs" c="#6B6560" truncate style={{ fontSize: 11 }}>{item.branch}</Text>

                <Group gap="md" mt="sm">
                  <Text component="button" size="xs" c="#C9A84C" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 11 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>visibility</span>
                    View Look
                  </Text>
                  <Text component="button" size="xs" c="#6B6560" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 11 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>share</span>
                    Share
                  </Text>
                </Group>
              </Box>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
