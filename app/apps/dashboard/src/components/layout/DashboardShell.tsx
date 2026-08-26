'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mantine/core';
import { Sidebar, BottomNav } from './Sidebar';
import { TopBar } from './TopBar';

const DESKTOP_BREAKPOINT = 1024;
const RAIL_W = 72; // must match Sidebar RAIL_W

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      const desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(desktop);
      if (desktop) setSidebarOpen(false);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box style={{ display: 'flex', minHeight: '100dvh', background: '#F5F2ED' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDesktop={isDesktop}
      />

      {/* Main content — on desktop always offset by rail width (sidebar handles its own hover expand via fixed positioning) */}
      <Box
        style={{
          flex: 1,
          marginLeft: isDesktop ? RAIL_W : 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          transition: 'margin-left 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          paddingBottom: isDesktop ? 0 : 58,
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        <TopBar onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <Box
          component="main"
          className="page-content"
          style={{
            flex: 1,
            padding: isDesktop ? '20px 24px' : '14px 14px',
            overflowX: 'hidden',
            maxWidth: '100%',
            minWidth: 0,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Bottom nav — mobile / tablet only */}
      {!isDesktop && <BottomNav />}
    </Box>
  );
}
