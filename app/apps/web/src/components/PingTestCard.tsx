'use client';

import { useState, useEffect } from 'react';
import { pingWorker, getWorkerBaseUrl } from '@/lib/api-client';
import { PingResponse } from '@myfashion/shared-types';
import {
  Paper, Box, Text, Group, Badge, TextInput, Button, Code, Stack, Loader, Alert,
} from '@mantine/core';

export function PingTestCard() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [echoText, setEchoText] = useState('hello-worker');

  const triggerPing = async () => {
    setLoading(true);
    setError(null);
    const start = performance.now();
    try {
      const data = await pingWorker(echoText || undefined);
      setLatencyMs(Math.round(performance.now() - start));
      setResponse(data);
    } catch (err: unknown) {
      setLatencyMs(Math.round(performance.now() - start));
      setError(err instanceof Error ? err.message : 'Failed to connect to Worker');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { triggerPing(); }, []);

  const workerUrl = getWorkerBaseUrl();

  return (
    <Paper
      withBorder
      p="md"
      radius="xs"
      mb="lg"
      style={{ background: '#111', borderColor: '#333', color: '#E8E0D6' }}
    >
      <Group justify="space-between" mb="sm">
        <Text size="sm" fw={600} c="#E8E0D6">
          Worker Connection Status
        </Text>
        {loading ? (
          <Group gap={4}><Loader size="xs" color="yellow" /><Text size="xs" c="yellow">Testing...</Text></Group>
        ) : response ? (
          <Badge color="green" radius="xs">Connected ({latencyMs}ms)</Badge>
        ) : (
          <Badge color="red" radius="xs">Disconnected</Badge>
        )}
      </Group>

      <Text size="xs" c="dimmed" mb="sm" ff="monospace" style={{ wordBreak: 'break-all' }}>
        Target: <Text span c="#E8E0D6">{workerUrl}/api/ping</Text>
      </Text>

      <Group gap="xs" mb="sm">
        <TextInput
          value={echoText}
          onChange={(e) => setEchoText(e.target.value)}
          placeholder="Echo parameter"
          size="xs"
          radius="xs"
          style={{ flex: 1 }}
          styles={{ input: { background: '#1a1a1a', border: '1px solid #333', color: '#E8E0D6' } }}
        />
        <Button
          onClick={triggerPing}
          disabled={loading}
          size="xs"
          radius="xs"
          variant="outline"
          color="yellow"
        >
          Ping
        </Button>
      </Group>

      {response && (
        <Stack gap={4}>
          <Text size="xs" c="dimmed">GET /api/ping 200 OK • env: {response.environment}</Text>
          <Code block style={{ background: '#0a0a0a', color: '#86efac', fontSize: 11 }}>
            {JSON.stringify(response, null, 2)}
          </Code>
        </Stack>
      )}

      {error && (
        <Alert color="red" radius="xs" mt="xs" styles={{ root: { background: '#2d0a0a', borderColor: '#7f1d1d' } }}>
          <Text size="xs" fw={600} c="#fca5a5" mb={4}>Connection Error</Text>
          <Text size="xs" c="#f87171" ff="monospace" style={{ wordBreak: 'break-all' }}>{error}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            Tip: Ensure Worker is running on port 8787 via <Code>npm run dev:worker</Code>.
          </Text>
        </Alert>
      )}
    </Paper>
  );
}
