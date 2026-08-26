'use client';

import React from 'react';
import { Box, Text, Group, ActionIcon, Breadcrumbs, Anchor } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Overview',
  '/codes': 'Daily Code',
  '/credits': 'Credits',
  '/inventory': 'Inventory',
  '/analytics': 'Analytics',
  '/billing': 'Billing',
  '/settings': 'Settings',
};

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const label = PAGE_LABELS[pathname] ?? 'Dashboard';

  const crumbs = [
    { title: 'Dashboard', href: '/' },
    ...(pathname !== '/' ? [{ title: label, href: pathname }] : []),
  ];

  return (
    <Box
      component="header"
      style={{
        height: 60,
        background: '#FFFFFF',
        borderBottom: '1px solid #E8E0D6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
        gap: 12,
      }}
    >
      {/* Left — Hamburger + Breadcrumb */}
      <Group gap={12} align="center" style={{ flex: 1, minWidth: 0 }}>
        {/* Hamburger — visible on tablet and below */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          radius="sm"
          onClick={onMenuClick}
          aria-label="Open menu"
          id="sidebar-toggle"
          className="topbar-hamburger"
          style={{ flexShrink: 0 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#6B6560' }}>
            menu
          </span>
        </ActionIcon>

        {/* Logo — mobile only (sidebar hidden) */}
        <Box
          style={{
            display: 'none',
          }}
          className="mobile-logo"
        >
          <Group gap={6}>
            <Box style={{ width: 20, height: 20, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 10, fontWeight: 800, color: '#C9A84C' }}>V</Text>
            </Box>
            <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 14, fontWeight: 400, color: '#1A1A1A', letterSpacing: '0.06em' }}>
              VTON
            </Text>
          </Group>
        </Box>

        {/* Breadcrumb — desktop only */}
        <Box style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1A1A1A',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Text>
          {pathname === '/' && (
            <Text style={{ fontSize: 10, color: '#9A8E7C', whiteSpace: 'nowrap', marginTop: 1 }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </Text>
          )}
        </Box>
      </Group>

      {/* Right — Actions */}
      <Group gap={4} align="center" style={{ flexShrink: 0 }}>
        {/* Notification */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          radius="sm"
          aria-label="Notifications"
          style={{ position: 'relative' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#9A8E7C' }}>
            notifications
          </span>
          <Box
            style={{
              position: 'absolute',
              top: 9,
              right: 9,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#C9A84C',
              border: '1.5px solid #FFFFFF',
            }}
          />
        </ActionIcon>

        {/* Divider */}
        <Box style={{ width: 1, height: 20, background: '#E8E0D6', margin: '0 2px' }} />

        {/* Avatar */}
        <Box
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#FAF8F5',
            border: '2px solid #E8E0D6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.02em' }}>
            RV
          </Text>
        </Box>
      </Group>
    </Box>
  );
}
