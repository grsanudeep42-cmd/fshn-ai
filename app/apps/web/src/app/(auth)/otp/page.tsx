import { Metadata } from 'next';
import { AuthFlow } from '@/components/AuthFlow';

export const metadata: Metadata = {
  title: 'Verify Fitting Pass | VTON Atelier',
  description: 'Enter your 4-digit verification code to activate your in-store fitting session.',
};

export default function OtpPage() {
  return <AuthFlow initialStep="otp" />;
}
