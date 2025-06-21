// hooks/useScheduledEmails.ts
'use client';
import { useQuery } from '@tanstack/react-query';

export function useScheduledEmails() {
  return useQuery({
    queryKey: ['scheduledEmails'],
    queryFn: async () => {
      const res = await fetch('/api/emails/scheduled');
      if (!res.ok) throw new Error('Failed to fetch scheduled emails');
      return res.json();
    },
    refetchInterval: 30000
    
  });
}
