import Link from 'next/link';
import { Stack, Group, Text, Paper, Box, Button, Grid } from '@mantine/core';

interface StorePageProps {
  params: {
    branchSlug: string;
  };
}

export default function StoreBranchPage({ params }: StorePageProps) {
  const branchName = params.branchSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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
        <Text size="xs" tt="uppercase" c="#1565C0" fw={600} style={{ letterSpacing: '0.12em', padding: '2px 8px', background: 'rgba(21, 101, 192, 0.1)', border: '1px solid rgba(21, 101, 192, 0.3)' }}>
          In-Store Mode
        </Text>
      </Group>

      <Paper withBorder p="md" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
        <Group gap="md" mb="sm" wrap="nowrap">
          <Box style={{ padding: 8, background: 'rgba(21, 101, 192, 0.1)', borderRadius: 8, color: '#1565C0', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>storefront</span>
          </Box>
          <Box>
            <Text size="sm" fw={700} c="#1A1A1A">{branchName}</Text>
            <Group gap={4} mt={2}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#6B6560' }}>location_on</span>
              <Text size="xs" c="#6B6560" style={{ fontSize: 11 }}>Flagship Store • Branch: {params.branchSlug}</Text>
            </Group>
          </Box>
        </Group>
        <Text size="xs" c="#6B6560" style={{ lineHeight: 1.5 }}>
          Scan garment barcodes or select in-store picks to try them immediately on your digital model.
        </Text>
      </Paper>

      <Paper withBorder p="md" radius="xs" style={{ background: '#1A1A1A', borderColor: '#333' }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <Box style={{ padding: 8, background: '#333', borderRadius: 8, color: '#C9A84C' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>qr_code_scanner</span>
            </Box>
            <Box>
              <Text size="xs" fw={600} c="#fff">Scan Garment QR / Tag</Text>
              <Text size="xs" c="#9A8E7C" style={{ fontSize: 11 }}>Instant virtual try-on from store rack</Text>
            </Box>
          </Group>
          <Button component={Link} href="/try-on" color="yellow" radius="xs" size="xs" styles={{ root: { color: '#1A1A1A' } }}>
            Scan
          </Button>
        </Group>
      </Paper>

      <Box>
        <Group justify="space-between" align="center" mb="sm">
          <Text size="xs" fw={600} c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.12em' }}>
            Available In Store Today
          </Text>
          <Text size="xs" fw={600} c="#C9A84C" style={{ fontSize: 11 }}>10+ Featured</Text>
        </Group>

        <Grid gutter="sm">
          {[
            { name: 'Kanjivaram Silk Saree', cat: 'Saree', price: '₹14,999' },
            { name: 'Handloom Banarasi Saree', cat: 'Saree', price: '₹18,500' },
            { name: 'Raw Silk Sherwani', cat: 'Men', price: '₹12,400' },
            { name: 'Zari Border Anarkali', cat: 'Dress', price: '₹8,990' },
          ].map((item, idx) => (
            <Grid.Col span={6} key={idx}>
              <Paper withBorder p="sm" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box style={{ aspectRatio: '3/4', background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#9A8E7C' }}>local_offer</span>
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="xs" tt="uppercase" c="#C9A84C" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{item.cat}</Text>
                  <Text size="xs" fw={600} c="#1A1A1A" lineClamp={1}>{item.name}</Text>
                  <Text size="xs" fw={500} c="#6B6560" mt={4}>{item.price}</Text>
                </Box>
                <Button component={Link} href={`/try-on?garment=${encodeURIComponent(item.name)}`} color="dark" variant="outline" fullWidth size="xs" radius="xs" mt="sm" leftSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_awesome</span>}>
                  Try On
                </Button>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
