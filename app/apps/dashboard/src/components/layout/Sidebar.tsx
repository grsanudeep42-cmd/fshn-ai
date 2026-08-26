'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Text, Group, Stack, Tooltip } from '@mantine/core';

interface NavItem { label: string; href: string; icon: string; }

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview',   href: '/',          icon: 'dashboard' },
  { label: 'Daily Code', href: '/codes',      icon: 'key' },
  { label: 'Credits',    href: '/credits',    icon: 'account_balance_wallet' },
  { label: 'Inventory',  href: '/inventory',  icon: 'inventory_2' },
  { label: 'Analytics',  href: '/analytics',  icon: 'bar_chart' },
  { label: 'Billing',    href: '/billing',    icon: 'receipt_long' },
  { label: 'Settings',   href: '/settings',   icon: 'settings' },
];

const BOTTOM_NAV: NavItem[] = [
  { label: 'Home',      href: '/',           icon: 'dashboard' },
  { label: 'Code',      href: '/codes',      icon: 'key' },
  { label: 'Credits',   href: '/credits',    icon: 'account_balance_wallet' },
  { label: 'Inventory', href: '/inventory',  icon: 'inventory_2' },
  { label: 'More',      href: '/analytics',  icon: 'more_horiz' },
];

// Must match DashboardShell RAIL_W
export const RAIL_W = 72;
const FULL_W = 236;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isDesktop: boolean;
}

export function Sidebar({ open, onClose, isDesktop }: SidebarProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const collapsed = isDesktop && !hovered;

  return (
    <>
      {/* Blur backdrop for tablet drawer */}
      {!isDesktop && open && (
        <Box
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(245,242,237,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 299,
          }}
        />
      )}

      {/* Sidebar panel */}
      <Box
        component="aside"
        onMouseEnter={() => isDesktop && setHovered(true)}
        onMouseLeave={() => isDesktop && setHovered(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 300,
          height: '100dvh',
          width: isDesktop ? (hovered ? FULL_W : RAIL_W) : FULL_W,
          background: '#FFFFFF',
          borderRight: '1px solid #EDE8E0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: isDesktop
            ? 'width 220ms cubic-bezier(0.4,0,0.2,1), box-shadow 220ms ease'
            : 'transform 260ms cubic-bezier(0.4,0,0.2,1)',
          transform: !isDesktop && !open ? 'translateX(-100%)' : 'translateX(0)',
          boxShadow: !isDesktop && open
            ? '6px 0 28px rgba(26,26,26,0.13)'
            : isDesktop && hovered
              ? '4px 0 24px rgba(26,26,26,0.08)'
              : 'none',
        }}
      >
        {/* ── Logo ── */}
        <Box
          style={{
            height: 58,
            borderBottom: '1px solid #F0EBE3',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            padding: collapsed ? 0 : '0 16px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10,
            transition: 'padding 220ms ease',
          }}
        >
          {/* V box — always visible, centered when collapsed */}
          <Box
            style={{
              width: 32,
              height: 32,
              background: '#FFFFFF',
              border: '1.5px solid #C9A84C',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 800, color: '#C9A84C', letterSpacing: '-0.03em', lineHeight: 1 }}>V</Text>
          </Box>

          {/* Label — zero width when collapsed so V stays centered */}
          <Box
            style={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : 'auto',
              overflow: 'hidden',
              transform: collapsed ? 'translateX(-6px)' : 'translateX(0)',
              transition: 'opacity 180ms ease, transform 180ms ease, width 220ms ease',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              flexShrink: 0,
            }}
          >
            <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 15, fontWeight: 400, color: '#1A1A1A', letterSpacing: '0.06em', lineHeight: 1 }}>
              VTON
            </Text>
            <Text style={{ fontSize: 8, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.20em', textTransform: 'uppercase', marginTop: 2 }}>
              Operator
            </Text>
          </Box>

          {/* Tablet close */}
          {!isDesktop && (
            <Box
              onClick={onClose}
              style={{ marginLeft: 'auto', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', flexShrink: 0 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#9A8E7C' }}>close</span>
            </Box>
          )}
        </Box>

        {/* ── Nav items ── */}
        <Stack gap={2} style={{ flex: 1, padding: '8px 6px', overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            const inner = (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => !isDesktop && onClose()}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Box
                  className="sidebar-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    gap: collapsed ? 0 : 10,
                    height: 40,
                    borderRadius: 8,
                    background: active ? 'rgba(201,168,76,0.10)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 150ms ease',
                    position: 'relative',
                    padding: collapsed ? 0 : '0 10px',
                  }}
                >
                  {/* Active left pill */}
                  {active && !collapsed && (
                    <Box style={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 3, height: 18, background: '#C9A84C', borderRadius: '0 2px 2px 0',
                    }} />
                  )}

                  {/* Icon */}
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 21,
                      color: active ? '#C9A84C' : '#9A8E7C',
                      fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                      flexShrink: 0,
                      lineHeight: 1,
                      transition: 'color 150ms ease',
                    }}
                  >
                    {item.icon}
                  </span>

                  {/* Label */}
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      color: active ? '#1A1A1A' : '#6B6560',
                      whiteSpace: 'nowrap',
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : 'auto',
                      overflow: 'hidden',
                      transition: 'opacity 180ms ease, width 220ms ease',
                      pointerEvents: 'none',
                    }}
                  >
                    {item.label}
                  </Text>
                </Box>
              </Link>
            );

            // Tooltip only when icon-only
            if (collapsed) {
              return (
                <Tooltip key={item.href} label={item.label} position="right" withArrow offset={10}
                  styles={{ tooltip: { fontSize: 12, background: '#1A1A1A', color: '#FFFFFF', padding: '4px 10px' } }}>
                  {inner}
                </Tooltip>
              );
            }
            return <React.Fragment key={item.href}>{inner}</React.Fragment>;
          })}
        </Stack>

        {/* ── Shop footer ── */}
        <Box
          style={{
            padding: '10px 8px',
            borderTop: '1px solid #F0EBE3',
            flexShrink: 0,
            overflow: 'hidden',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 180ms ease',
          }}
        >
          <Box style={{ padding: 12, background: '#FAF8F5', borderRadius: 8, border: '1px solid #EDE8E0' }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 3 }}>
              Current Shop
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', whiteSpace: 'nowrap' }}>
              Lakshmi Sarees & Silks
            </Text>
            <Group gap={5} mt={3}>
              <Box className="status-dot-active" style={{ width: 5, height: 5, borderRadius: '50%', background: '#2E7D32', flexShrink: 0 }} />
              <Text style={{ fontSize: 10, color: '#9A8E7C' }}>Standard · Vizag</Text>
            </Group>
          </Box>
        </Box>
      </Box>
    </>
  );
}

// ── Bottom Navigation (mobile / tablet only) ─────────────────────────────────
export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Box
      component="nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: '#FFFFFF',
        borderTop: '1px solid #E8E0D6',
        display: 'flex',
        alignItems: 'stretch',
        height: 58,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {BOTTOM_NAV.map((item) => {
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', flex: 1 }}>
            <Box
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 3, height: '100%', position: 'relative',
              }}
            >
              {active && (
                <Box style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 24, height: 2.5, background: '#C9A84C', borderRadius: '0 0 3px 3px',
                }} />
              )}
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 22,
                  color: active ? '#C9A84C' : '#C0B09A',
                  fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                  transition: 'color 150ms ease',
                }}
              >
                {item.icon}
              </span>
              <Text style={{
                fontSize: 9, fontWeight: active ? 700 : 500,
                color: active ? '#C9A84C' : '#C0B09A',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                {item.label}
              </Text>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
