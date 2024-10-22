import { ReactNode } from 'react';
import { AI } from './api/ai';

export default function Layout({ children }: { children: ReactNode }) {
  return <AI>{children}</AI>;
}