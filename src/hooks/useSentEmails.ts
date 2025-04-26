'use client'
import { useQuery } from '@tanstack/react-query';

export function useSentEmails(category?: string) {
  return useQuery({
    queryKey: ['sentEmails', category],
    queryFn: async () => {
      const url = category 
        ? `/api/emails?category=${encodeURIComponent(category)}`
        : '/api/emails';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}