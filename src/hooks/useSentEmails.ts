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

export function useEmail(id: string) {
  return useQuery({
    queryKey: ['email', id],
    queryFn: async () => {
      const response = await fetch(`/api/emails/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!id,
  });
}