import { ServicesContext } from '@/context/Services';
import { useContext } from 'react';

export default function useServices() {
  const ctx = useContext(ServicesContext);
  return { services: ctx.services } as const;
}
