import { Metadata } from 'next';
import { AuthFlow } from '@/components/AuthFlow';

export const metadata: Metadata = {
  title: 'Boutique Sign In | VTON Atelier',
  description: 'Enter your mobile phone number to receive your in-store fitting pass.',
};

export default function LoginPage() {
  return <AuthFlow initialStep="login" />;
}
