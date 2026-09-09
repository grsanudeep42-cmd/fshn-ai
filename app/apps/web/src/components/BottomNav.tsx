'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Flex } from '@mantine/core';

interface NavItem { label: string; href: string; icon: string; }

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: 'view_quilt' },
  { label: 'Try On', href: '/try-on', icon: 'crop_free' },
  { label: 'History', href: '/history', icon: 'auto_stories' },
  { label: 'Account', href: '/account', icon: 'account_circle' },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <Box
      component="nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        zIndex: 50,
        background: '#FAF8F5',
        borderTop: '1px solid #E8E0D6',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <Flex style={{ height: 60, padding: '0 20px' }} align="center" justify="space-around">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                minWidth: 56,
                minHeight: 44,
                justifyContent: 'center',
                textDecoration: 'none',
                color: isActive ? '#1A1A1A' : '#6B6560',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 22,
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
}
