'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Stack, Group, Text, Title, Button, Paper,
  TextInput, NativeSelect, Alert, Grid,
} from '@mantine/core';

interface AuthFlowProps {
  initialStep?: 'login' | 'otp';
}

export function AuthFlow({ initialStep = 'login' }: AuthFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'otp'>(initialStep);
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [phoneNumber, setPhoneNumber] = useState<string>('98765 43210');
  const [digits, setDigits] = useState<string[]>(['8', '4', '9', '2']);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(42);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  useEffect(() => {
    if (step !== 'otp' || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step, countdown]);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phoneNumber.trim()) {
      showToast('Please enter a valid mobile number');
      return;
    }
    setStep('otp');
    setCountdown(42);
    setHasError(false);
    showToast(`Verification code sent to ${countryCode} ${phoneNumber}`);
  };

  const handleDigitPress = (digit: string) => {
    if (digits.length < 4) {
      const next = [...digits, digit];
      setDigits(next);
      setHasError(false);
      if (next.length === 4) {
        verifyOtp(next.join(''));
      }
    }
  };

  const handleBackspace = () => {
    if (digits.length > 0) {
      setDigits(digits.slice(0, -1));
      setHasError(false);
    }
  };

  const verifyOtp = (codeString: string) => {
    if (codeString === '0000') {
      setHasError(true);
      return;
    }

    // TODO Phase 2: replace with real OTP provider + Worker verification endpoint.
    setIsVerifying(true);
    setHasError(false);

    setTimeout(() => {
      setIsVerifying(false);
      showToast('Code verified successfully.');
      setTimeout(() => {
        router.push('/');
      }, 600);
    }, 1000);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(42);
    setDigits([]);
    setHasError(false);
    showToast('New verification code sent');
  };

  return (
    <Box style={{ width: '100%', maxWidth: 440, margin: '0 auto', padding: '16px 20px 48px' }}>
      {/* Store Offer Context Header */}
      <Paper withBorder p="sm" mb="md" radius="xs" style={{ background: '#FAF8F5', borderColor: '#E8E0D6' }}>
        <Group align="flex-start" gap="xs" wrap="nowrap">
          <span className="material-symbols-outlined" style={{ color: '#1A1A1A', fontSize: 18, marginTop: 2 }}>
            location_on
          </span>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Group justify="space-between" align="center" gap="xs">
              <Text size="xs" fw={600} tt="uppercase" c="#1A1A1A" style={{ letterSpacing: '0.12em' }} truncate>
                CMR Mall Vizag
              </Text>
              <Group gap={4} style={{ background: '#F5F2ED', padding: '2px 8px', border: '1px solid #E8E0D6' }}>
                <Box w={6} h={6} style={{ background: '#1A1A1A' }} />
                <Text size="xs" style={{ fontSize: 11, fontFamily: 'monospace' }}>In-Store Mode</Text>
              </Group>
            </Group>
            <Group gap={8} mt={4}>
              <Text size="xs" fw={500} c="#1A1A1A">5 Free Try-Ons — Provided by CMR Mall Vizag</Text>
            </Group>
          </Box>
        </Group>
      </Paper>

      {/* Screen Title & Header */}
      <Stack align="center" ta="center" my="xs" gap="xs">
        <Box style={{ position: 'relative', width: 112, height: 36, marginBottom: 8 }}>
          <Image
            src="/images/vton_wordmark_logo.png"
            alt="VTON Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
        <Title order={1} style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, Georgia, serif', fontWeight: 400, fontSize: 28, color: '#1A1A1A' }}>
          {step === 'login' ? 'Sign In' : 'Enter Verification Code'}
        </Title>
        <Text size="sm" c="#6B6560" style={{ maxWidth: 320 }}>
          {step === 'login'
            ? 'Enter your mobile number to receive a 4-digit verification code.'
            : 'We sent a 4-digit verification code to your phone. Enter it below.'}
        </Text>
      </Stack>

      {/* Login Step */}
      {step === 'login' && (
        <form onSubmit={handleSendOtp}>
          <Stack gap="sm" mt="sm">
            <Paper withBorder p="md" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
              <Stack gap="xs">
                <Text component="label" htmlFor="phone-input" size="xs" tt="uppercase" c="#6B6560" style={{ letterSpacing: '0.12em' }}>
                  Mobile Number
                </Text>
                <Group gap="xs" wrap="nowrap">
                  <NativeSelect
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.currentTarget.value)}
                    data={[
                      { label: '+91 (IN)', value: '+91' },
                      { label: '+1 (US)', value: '+1' },
                      { label: '+44 (UK)', value: '+44' },
                      { label: '+971 (UAE)', value: '+971' },
                    ]}
                    radius="xs"
                    styles={{ input: { height: 48, fontFamily: 'monospace', borderColor: '#E8E0D6' } }}
                  />
                  <TextInput
                    id="phone-input"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    radius="xs"
                    required
                    style={{ flex: 1 }}
                    styles={{ input: { height: 48, fontFamily: 'monospace', borderColor: '#E8E0D6' } }}
                  />
                </Group>
                <Text size="xs" c="#6B6560" style={{ fontSize: 11 }}>
                  We will send a 4-digit verification code to this mobile number.
                </Text>
              </Stack>
            </Paper>

            <Button
              type="submit"
              color="dark"
              radius="xs"
              size="lg"
              fullWidth
              rightSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>}
              styles={{ root: { height: 56, letterSpacing: '0.14em' } }}
            >
              Send Code
            </Button>
          </Stack>
        </form>
      )}

      {/* OTP Verification Step */}
      {step === 'otp' && (
        <Stack gap={0}>
          <Paper withBorder p="sm" mt="sm" mb="md" radius="xs" style={{ background: '#FAF8F5', borderColor: '#E8E0D6' }}>
            <Group justify="space-between" align="center" wrap="nowrap">
              <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
                <Box
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F2ED', border: '1px solid #E8E0D6', fontSize: 12, fontFamily: 'monospace' }}
                >
                  {countryCode}
                </Box>
                <Stack gap={0} style={{ minWidth: 0 }}>
                  <Text size="xs" tt="uppercase" c="#6B6560" style={{ letterSpacing: '0.12em' }}>Code sent to</Text>
                  <Text size="sm" fw={500} style={{ fontFamily: 'monospace' }} truncate>{countryCode} {phoneNumber}</Text>
                </Stack>
              </Group>
              <Button variant="subtle" color="dark" size="xs" onClick={() => setStep('login')} rightSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>}>
                Edit
              </Button>
            </Group>
          </Paper>

          <Paper withBorder p="md" radius="xs" style={{ background: '#FFFFFF', borderColor: '#E8E0D6' }}>
            <Stack align="center" gap="md">
              <Group gap="sm" style={{ cursor: 'text' }} onClick={() => hiddenInputRef.current?.focus()}>
                {[0, 1, 2, 3].map((index) => {
                  const val = digits[index];
                  const isFocused = index === digits.length;
                  return (
                    <Box
                      key={index}
                      style={{
                        width: 48,
                        height: 56,
                        border: `1px solid ${isFocused ? '#1A1A1A' : '#E8E0D6'}`,
                        background: isFocused ? '#F5F2ED' : '#FAF8F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 150ms',
                      }}
                    >
                      {val ? (
                        <Text style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 500, color: '#1A1A1A' }}>{val}</Text>
                      ) : isFocused ? (
                        <Box style={{ width: 2, height: 24, background: '#1A1A1A' }} />
                      ) : null}
                    </Box>
                  );
                })}
              </Group>

              <input
                ref={hiddenInputRef}
                type="tel"
                maxLength={4}
                value={digits.join('')}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setDigits(clean.split(''));
                  setHasError(false);
                  if (clean.length === 4) verifyOtp(clean);
                }}
                className="sr-only"
                style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}
                aria-label="4-digit verification code"
              />

              {hasError && (
                <Alert color="red" radius="xs" icon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>} styles={{ root: { width: '100%' } }}>
                  That code didn't match. Check the code sent to your phone and try again.
                </Alert>
              )}

              <Stack gap="xs" align="center" mt="md">
                <Group gap={6}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#6B6560' }}>schedule</span>
                  {countdown > 0 ? (
                    <Text size="sm" c="#6B6560">
                      Resend code in <Text component="span" fw={600} c="#1A1A1A" style={{ fontFamily: 'monospace' }}>0:{countdown < 10 ? `0${countdown}` : countdown}</Text>
                    </Text>
                  ) : (
                    <Text component="button" size="sm" fw={600} c="dark" td="underline" onClick={handleResend} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      Resend Code
                    </Text>
                  )}
                </Group>
              </Stack>
            </Stack>
          </Paper>

          <Stack gap="xs" mt="md">
            <Button
              disabled={digits.length < 4 || isVerifying}
              onClick={() => verifyOtp(digits.join(''))}
              color="dark"
              radius="xs"
              size="lg"
              fullWidth
              style={{ height: 56, letterSpacing: '0.14em' }}
            >
              <Group justify="space-between" style={{ width: '100%' }}>
                <Group gap="sm">
                  {isVerifying ? (
                    <>
                      <Box style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <span>Verify Code</span>
                  )}
                </Group>
                <Group gap="xs">
                  <Text style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', fontSize: 10, letterSpacing: 'normal' }}>5 Try-Ons Included</Text>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                </Group>
              </Group>
            </Button>
          </Stack>
        </Stack>
      )}

      {/* Honest Privacy Guarantee Footer */}
      <Stack align="center" mt="xl" pt="xs" gap={4}>
        <Group gap={4}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#6B6560' }}>shield</span>
          <Text size="xs" tt="uppercase" c="#6B6560" style={{ letterSpacing: '0.16em' }}>Privacy &amp; Data Security</Text>
        </Group>
        <Text size="xs" c="#6B6560" ta="center" style={{ fontSize: 11, maxWidth: 320 }}>
          Your photo is processed securely by our AI try-on engine to generate your outfit preview and is automatically deleted within 24 hours.
        </Text>
      </Stack>

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
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>
          <Text size="xs" fw={600} tt="uppercase" c="#fff" style={{ letterSpacing: '0.08em' }}>
            {toastMessage}
          </Text>
        </Box>
      )}
    </Box>
  );
}
