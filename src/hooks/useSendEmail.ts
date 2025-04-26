'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSendEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      templateId: string;
      recipient: string;
      variables: Record<string, string>;
    }) => {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentEmails'] });
    },
  });
}