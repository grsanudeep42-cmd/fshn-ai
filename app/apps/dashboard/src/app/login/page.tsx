'use client';

import React, { useState } from 'react';
import { Box, Text, TextInput, PasswordInput, Button, Stack, Group, Checkbox } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1200);
  }

  return (
    <Box
      style={{
        minHeight: '100dvh',
        background: '#0F0F0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Login card */}
      <Box
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: 12,
          padding: 40,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Group gap={12} mb={40} justify="center">
          <Box
            style={{
              width: 36,
              height: 36,
              background: '#C9A84C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 800, color: '#0F0F0F', letterSpacing: '-0.03em' }}>V</Text>
          </Box>
          <Box>
            <Text
              style={{
                fontFamily: 'var(--font-bodoni), Bodoni Moda, serif',
                fontSize: 20,
                fontWeight: 400,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              VTON
            </Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: '#C9A84C', letterSpacing: '0.20em', textTransform: 'uppercase', marginTop: 2 }}>
              Operator Portal
            </Text>
          </Box>
        </Group>

        {/* Heading */}
        <Box mb={28}>
          <Text
            style={{
              fontFamily: 'var(--font-bodoni), Bodoni Moda, serif',
              fontSize: 24,
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            Welcome back
          </Text>
          <Text style={{ fontSize: 13, color: '#6B6560' }}>
            Sign in to manage your shop
          </Text>
        </Box>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Stack gap={14}>
            <TextInput
              id="login-email"
              label="Email Address"
              placeholder="rajesh@lakshmisilks.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              styles={{
                label: { fontSize: 11, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 6 },
                input: {
                  background: '#111111',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  fontSize: 14,
                  '&::placeholder': { color: '#4A4A4A' },
                  '&:focus': { borderColor: '#C9A84C' },
                },
              }}
            />
            <PasswordInput
              id="login-password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              styles={{
                label: { fontSize: 11, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 6 },
                input: {
                  background: '#111111',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  fontSize: 14,
                },
                innerInput: { color: '#FFFFFF' },
              }}
            />

            <Group justify="space-between" align="center">
              <Checkbox
                label={<Text style={{ fontSize: 12, color: '#9A8E7C' }}>Remember me</Text>}
                color="gold"
                size="xs"
              />
              <Text
                component="button"
                type="button"
                style={{ fontSize: 12, color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Forgot password?
              </Text>
            </Group>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              mt={8}
              size="md"
              styles={{
                root: {
                  background: '#C9A84C',
                  color: '#1A1A1A',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  height: 44,
                  '&:hover': { background: '#B8962F' },
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </form>

        {/* Footer */}
        <Text style={{ fontSize: 11, color: '#4A4A4A', textAlign: 'center', marginTop: 32, lineHeight: 1.6 }}>
          By signing in you agree to VTON's terms of service.
          <br />
          Need help? <Text component="a" href="https://wa.me/919876543210" style={{ color: '#C9A84C', fontSize: 11 }}>Contact us on WhatsApp</Text>
        </Text>
      </Box>
    </Box>
  );
}
