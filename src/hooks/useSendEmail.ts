'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// hooks/useSendEmail.ts
export function useSendEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      templateId: string;
      recipient: string;
      variables: Record<string, string>;
      sendFollowUp: boolean;
    }) => {
      // Ensure variables is always an object
      const payload = {
        ...data,
        variables: data.variables || {}
      };

      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentEmails'] });
      toast.success("Email sent successfully");
    },
    onError: (error) => {
      toast.error("Error sending email: " + error.message);
    },
  });
}