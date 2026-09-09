'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box, Stack, Group, Text, Title, Button, Paper,
  ScrollArea, ActionIcon,
} from '@mantine/core';

// TODO Phase 2: replace mock recent try-on session thumbnails with user history from Worker API & MongoDB
const MOCK_RECENT_SESSIONS = [
  {
    id: 'session-1',
    title: 'Kanjivaram Silk Saree',
    price: '₹14,999',
    color: 'Crimson & Gold',
    fabric: 'Pure Silk',
    fittedAgo: '2h ago',
    tag: 'Popular',
    fitMetric: 'Natural Fit',
    size: 'Free Size',
    imageSrc: '/images/high_fashion_editorial_lookbook_photo_of_an_elegant_model_wearing_an_olive.png',
    bookmarked: true,
  },
  {
    id: 'session-2',
    title: 'Chanderi Zari Kurti Set',
    price: '₹4,890',
    color: 'Champagne',
    fabric: 'Chanderi Silk',
    fittedAgo: 'Yesterday',
    tag: 'New In',
    fitMetric: 'Smooth Fit',
    size: 'Medium',
    imageSrc: '/images/luxury_fashion_editorial_photograph_of_a_model_in_a_fluid_draped_silk_cream.png',
    bookmarked: false,
  },
  {
    id: 'session-3',
    title: 'Indo-Western Linen Suit',
    price: '₹6,120',
    color: 'Olive Sage',
    fabric: 'Handloom Linen',
    fittedAgo: '3d ago',
    tag: 'Boutique Pick',
    fitMetric: 'Comfort Fit',
    size: 'Large',
    imageSrc: '/images/high_fashion_full_body_editorial_photograph_of_a_model_wearing_an_architectural.png',
    bookmarked: false,
  },
  {
    id: 'session-4',
    title: 'Banarasi Zari Lehenga',
    price: '₹18,200',
    color: 'Emerald & Gold',
    fabric: 'Raw Silk',
    fittedAgo: '4d ago',
    tag: 'Bridal',
    fitMetric: 'Tailored Fit',
    size: 'Custom Fit',
    imageSrc: '/images/high_fashion_editorial_portrait_of_an_elegant_woman_serene_expression_minimal.png',
    bookmarked: true,
  },
];

export default function HomePage() {
  const [creditBalance] = useState<number>(13);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({
    'session-1': true,
    'session-4': true,
  });
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: string } | null>(null);

  const showToast = (text: string, icon = 'check') => {
    setToastMessage({ text, icon });
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleBookmark = (id: string, title: string) => {
    setSavedItems((prev) => {
      const nextState = !prev[id];
      showToast(nextState ? `Saved ${title}` : `Removed ${title}`, nextState ? 'bookmark' : 'bookmark_border');
      return { ...prev, [id]: nextState };
    });
  };

  return (
    <Stack gap={0} pb="xl">
      {/* Store Location Bar */}
      <Box px={20} pt={16} pb={8}>
        <Group justify="space-between" align="center">
          <Group gap={6}>
            <Box w={6} h={6} style={{ background: '#1A1A1A' }} />
            <Text size="xs" c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.12em' }}>
              CMR Mall Vizag
            </Text>
          </Group>
          <Text size="xs" c="#6B6560" style={{ letterSpacing: '0.08em' }}>In-Store Mode</Text>
        </Group>
        <Box mt={8}>
          <Title order={1} style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, Georgia, serif', fontWeight: 400, fontSize: 26, color: '#1A1A1A' }}>
            Good afternoon, Elena
          </Title>
          <Text size="sm" c="#6B6560" mt={2}>
            Your virtual fitting room is ready.
          </Text>
        </Box>
      </Box>

      {/* Credit Balance Card */}
      <Box px={20} mb={16}>
        <Paper withBorder p="md" radius="xs" style={{ borderColor: '#E8E0D6', background: '#fff' }}>
          <Group justify="space-between" align="flex-start">
            <Stack gap={4}>
              <Text size="xs" c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.12em' }}>
                Fitting Credits
              </Text>
              <Group align="baseline" gap={8}>
                <Text
                  style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 42, fontWeight: 400, lineHeight: 1, color: '#1A1A1A' }}
                >
                  {creditBalance}
                </Text>
                <Text size="xs" c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.08em' }}>Try-ons left</Text>
              </Group>
            </Stack>
            <ActionIcon
              variant="light"
              color="gray"
              size="sm"
              radius="xs"
              onClick={() => showToast('13 credits available in your wallet', 'info')}
              aria-label="Credit info"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>info</span>
            </ActionIcon>
          </Group>
          <Box
            mt="sm"
            p="xs"
            style={{ background: '#FAF8F5', border: '1px solid #E8E0D6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Group gap={6}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#1A1A1A' }}>verified</span>
              <Text size="xs" c="#1A1A1A">Free in-store try-ons active today</Text>
            </Group>
            <Text size="xs" c="#6B6560" tt="uppercase" style={{ letterSpacing: '0.08em' }}>Active</Text>
          </Box>
        </Paper>
      </Box>

      {/* Primary Actions (Phase 1 Spec: Try On & Buy Credits) */}
      <Stack gap="xs" px={20} mb={24}>
        <Button
          component={Link}
          href="/try-on"
          fullWidth
          size="lg"
          color="dark"
          radius="xs"
          rightSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>}
          leftSection={<span className="material-symbols-outlined" style={{ fontSize: 20 }}>crop_free</span>}
          styles={{ root: { height: 52 } }}
        >
          Start Try-On
        </Button>
        <Button
          component={Link}
          href="/wallet"
          variant="outline"
          color="dark"
          radius="xs"
          fullWidth
          leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>}
          styles={{ root: { borderColor: '#E8E0D6', height: 44 } }}
        >
          Buy Credits
        </Button>
      </Stack>

      {/* Recent Try-Ons */}
      <Box mb={24}>
        <Group justify="space-between" align="center" px={20} mb={12}>
          <Group gap={6}>
            <Text size="xs" fw={600} tt="uppercase" c="#1A1A1A" style={{ letterSpacing: '0.14em' }}>Recent Try-Ons</Text>
            <Box w={4} h={4} style={{ background: '#6B6560', borderRadius: '50%' }} />
            <Text size="xs" c="#6B6560">Lookbook</Text>
          </Group>
          <Button component={Link} href="/history" variant="subtle" size="xs" color="dark">
            View All
          </Button>
        </Group>
        <ScrollArea type="never" offsetScrollbars={false}>
          <Group
            gap="md"
            px={20}
            pb={8}
            wrap="nowrap"
            style={{ width: 'max-content' }}
          >
            {MOCK_RECENT_SESSIONS.map((session) => {
              const isBookmarked = !!savedItems[session.id];
              return (
                <Box
                  key={session.id}
                  style={{
                    width: 240,
                    flexShrink: 0,
                    border: '1px solid #E8E0D6',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Image container 3:4 */}
                  <Box style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#EDE8E0' }}>
                    <Image
                      src={session.imageSrc}
                      alt={session.title}
                      fill
                      sizes="240px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                    {/* Tag */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: 'rgba(255,255,255,0.95)',
                        border: '1px solid #E8E0D6',
                        padding: '2px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Box w={5} h={5} style={{ background: '#1A1A1A', flexShrink: 0 }} />
                      <Text size="xs" fw={600} tt="uppercase" style={{ fontSize: 9, letterSpacing: '0.1em' }}>{session.tag}</Text>
                    </Box>
                    {/* Bookmark */}
                    <ActionIcon
                      size="sm"
                      radius="xs"
                      variant="white"
                      onClick={() => toggleBookmark(session.id, session.title)}
                      aria-label={`Bookmark ${session.title}`}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        border: '1px solid #E8E0D6',
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </ActionIcon>
                    {/* Fit scrim */}
                    <Box
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(26,26,26,0.85)',
                        padding: '4px 8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text size="xs" c="#fff" style={{ fontSize: 10 }}>{session.fitMetric}</Text>
                      <Text size="xs" c="#fff" ff="monospace" style={{ fontSize: 10 }}>{session.size}</Text>
                    </Box>
                  </Box>
                  {/* Card metadata */}
                  <Box p="xs">
                    <Group justify="space-between" align="baseline" mb={4}>
                      <Text
                        style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}
                      >
                        {session.title}
                      </Text>
                      <Text ff="monospace" size="xs" c="#1A1A1A">{session.price}</Text>
                    </Group>
                    <Text size="xs" c="#6B6560">
                      {session.color} • {session.fabric} • {session.fittedAgo}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Group>
        </ScrollArea>
      </Box>

      {/* Action Feedback Toast */}
      {toastMessage && (
        <Box
          style={{
            position: 'fixed',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            background: '#1A1A1A',
            color: '#fff',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #333',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{toastMessage.icon}</span>
          <Text size="xs" fw={600} tt="uppercase" c="#fff" style={{ letterSpacing: '0.08em' }}>
            {toastMessage.text}
          </Text>
        </Box>
      )}
    </Stack>
  );
}
