import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetAppPassword() {
  return useQuery({
    queryKey: ['appPassword'],
    queryFn: async () => {
      const response = await fetch('/api/emails/credentials');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}


export function useSaveAppPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appPassword: string) => {
      const response = await fetch("/api/emails/credentials", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appPassword }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appPassword'] });
      toast.success("Credentials saved successfully!");
    },
    onError: (error) => {
      toast.error(`Error Saving Password: ${error.message}`); // Show error message
    },
  });
}