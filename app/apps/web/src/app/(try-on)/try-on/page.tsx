'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Stack, Group, Text, Paper, Button, ActionIcon, Grid } from '@mantine/core';

const STEPS = [
  { id: 1, title: 'Photo', desc: 'Capture or Model' },
  { id: 2, title: 'Garment', desc: 'Pick apparel' },
  { id: 3, title: 'Generate', desc: 'AI draping' },
  { id: 4, title: 'Result', desc: 'Final fit' },
];

export default function TryOnPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('saree');

  return (
    <Stack gap="xl" px={20} pt={16} pb={80} style={{ minHeight: '100%' }}>
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
        <Text size="xs" tt="uppercase" c="#C9A84C" fw={600} style={{ letterSpacing: '0.12em', padding: '2px 8px', background: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201, 168, 76, 0.3)' }}>
          Virtual Fitting Room
        </Text>
      </Group>

      <Paper withBorder p="sm" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
        <Group grow align="flex-start" gap="xs">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <Stack key={step.id} gap={4} align="center" style={{ cursor: 'pointer' }} onClick={() => setCurrentStep(step.id)}>
                <Box
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    background: isActive ? '#C9A84C' : isCompleted ? '#E8E0D6' : '#FAF8F5',
                    color: isActive ? '#fff' : '#1A1A1A',
                    border: `1px solid ${isActive ? '#C9A84C' : '#E8E0D6'}`,
                  }}
                >
                  {step.id}
                </Box>
                <Text size="xs" fw={isActive ? 600 : 400} c={isActive ? '#1A1A1A' : '#6B6560'} style={{ fontSize: 10 }}>
                  {step.title}
                </Text>
              </Stack>
            );
          })}
        </Group>
      </Paper>

      <Box style={{ flex: 1 }}>
        {currentStep === 1 && (
          <Stack gap="sm">
            <Text size="sm" fw={600} c="#1A1A1A">Step 1: Choose or Capture Photo</Text>
            <Text size="xs" c="#6B6560">Provide a full-length customer photo or pick an AI reference model.</Text>

            <Grid gutter="sm">
              <Grid.Col span={6}>
                <Paper
                  withBorder
                  p="md"
                  radius="xs"
                  style={{ textAlign: 'center', cursor: 'pointer', borderColor: '#E8E0D6', background: '#FAF8F5' }}
                >
                  <ActionIcon variant="light" color="yellow" size="xl" radius="xl" mx="auto" mb="sm">
                    <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#C9A84C' }}>photo_camera</span>
                  </ActionIcon>
                  <Text size="xs" fw={600} c="#1A1A1A">Camera</Text>
                  <Text size="xs" c="#6B6560" style={{ fontSize: 10 }}>Take photo in-store</Text>
                </Paper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Paper
                  withBorder
                  p="md"
                  radius="xs"
                  style={{ textAlign: 'center', cursor: 'pointer', borderColor: '#E8E0D6', background: '#FAF8F5' }}
                >
                  <ActionIcon variant="light" color="yellow" size="xl" radius="xl" mx="auto" mb="sm">
                    <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#C9A84C' }}>upload</span>
                  </ActionIcon>
                  <Text size="xs" fw={600} c="#1A1A1A">Upload</Text>
                  <Text size="xs" c="#6B6560" style={{ fontSize: 10 }}>From gallery</Text>
                </Paper>
              </Grid.Col>
            </Grid>

            <Box mt="md">
              <Text size="xs" fw={500} c="#6B6560" mb="xs">Or select model preset:</Text>
              <Grid gutter="xs">
                {['Female (Saree)', 'Female (Western)', 'Male (Kurta)'].map((name, i) => (
                  <Grid.Col span={4} key={i}>
                    <Paper withBorder p="xs" radius="xs" style={{ textAlign: 'center', cursor: 'pointer', borderColor: '#E8E0D6', background: '#FFFFFF' }}>
                      <Text size="xs" c="#1A1A1A" style={{ fontSize: 10 }}>{name}</Text>
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          </Stack>
        )}

        {currentStep === 2 && (
          <Stack gap="sm">
            <Text size="sm" fw={600} c="#1A1A1A">Step 2: Select Garment</Text>
            <Text size="xs" c="#6B6560">Choose category and apparel to drape.</Text>

            <Group gap="xs" style={{ overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: 4 }}>
              {['saree', 'dress', 'top', 'bottom', 'children'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'filled' : 'outline'}
                  color="dark"
                  size="xs"
                  radius="xs"
                  onClick={() => setSelectedCategory(cat)}
                  style={{ flexShrink: 0, textTransform: 'capitalize' }}
                >
                  {cat}
                </Button>
              ))}
            </Group>

            <Paper withBorder p="xl" radius="xs" style={{ textAlign: 'center', borderStyle: 'dashed', borderColor: '#E8E0D6', background: '#FAF8F5' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#C9A84C', marginBottom: 8 }}>auto_awesome</span>
              <Text size="xs" fw={600} c="#1A1A1A" mb={4}>Select Garment from Catalog or Upload</Text>
              <Text size="xs" c="#6B6560" style={{ fontSize: 11 }}>Supports sarees, gowns, kurtas, and suits</Text>
            </Paper>
          </Stack>
        )}

        {currentStep === 3 && (
          <Stack gap="md" align="center" py="xl">
            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#C9A84C', animation: 'spin 2s linear infinite' }}>sync</span>
            <Text size="md" fw={600} c="#1A1A1A">Generating AI Look...</Text>
            <Text size="xs" c="#6B6560" ta="center" style={{ maxWidth: 280 }}>
              Synthesizing realistic fabric drape, folds, shadows, and lighting.
            </Text>
            <Text size="xs" fw={600} c="#C9A84C" style={{ fontFamily: 'monospace', padding: '4px 12px', background: 'rgba(201, 168, 76, 0.1)', borderRadius: 4 }}>
              Estimated time: ~10-15s
            </Text>
          </Stack>
        )}

        {currentStep === 4 && (
          <Stack gap="sm">
            <Group gap="xs" style={{ color: '#2ecc71' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
              <Text size="sm" fw={600}>Drape Generated Successfully</Text>
            </Group>
            <Paper withBorder radius="xs" style={{ aspectRatio: '3/4', background: '#FAF8F5', borderColor: '#E8E0D6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text size="xs" c="#6B6560">[VTON High-Fidelity Result Preview]</Text>
            </Paper>
          </Stack>
        )}
      </Box>

      <Group justify="space-between" pt="md" style={{ borderTop: '1px solid #E8E0D6', marginTop: 'auto' }}>
        <Button
          variant="subtle"
          color="gray"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          radius="xs"
        >
          Previous
        </Button>
        <Button
          color="dark"
          disabled={currentStep === 4}
          onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
          radius="xs"
          rightSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>}
        >
          Continue
        </Button>
      </Group>
    </Stack>
  );
}
