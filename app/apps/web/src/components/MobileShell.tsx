import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, ActionIcon } from '@mantine/core';
import { BottomNav } from './BottomNav';

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <Box style={{ minHeight: '100dvh', background: '#FAF8F5', display: 'flex', justifyContent: 'center' }}>
      <Box
        style={{
          width: '100%',
          maxWidth: 480,
          minHeight: '100dvh',
          background: '#FAF8F5',
          borderLeft: '1px solid #E8E0D6',
          borderRight: '1px solid #E8E0D6',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingBottom: 72,
        }}
      >
        <Box
          component="header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            background: '#FAF8F5',
            borderBottom: '1px solid #E8E0D6',
            padding: '0 20px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ position: 'relative', height: 28, width: 76 }}>
              <Image
                src="/images/vton_wordmark_logo.png"
                alt="VTON Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
              }}
            >
              VTON
            </span>
          </Link>

          <Flex align="center" gap={8}>
            <ActionIcon variant="subtle" color="dark" size="md" aria-label="Sensors" style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>sensors</span>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, background: '#1A1A1A', display: 'block' }} />
            </ActionIcon>
            <Link href="/account" aria-label="Account" style={{ textDecoration: 'none' }}>
              <ActionIcon variant="outline" color="dark" size="md" radius="xl" style={{ borderColor: '#E8E0D6' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>account_circle</span>
              </ActionIcon>
            </Link>
          </Flex>
        </Box>

        <Box component="main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>

        <BottomNav />
      </Box>
    </Box>
  );
}
