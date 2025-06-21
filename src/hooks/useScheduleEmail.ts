// hooks/useScheduleEmail.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useScheduleEmail() {
  return useMutation({
    mutationFn: async (data: {
      templateId: string;
      subject: string;
      body: string;
      category: string;
      recipient: string;
      variables: Record<string, string>;
      scheduleTime: string; // ISO date string
    }) => {
      const response = await fetch("/api/emails/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to schedule email");
      }
      return response.json();
    },
    onSuccess: () => toast.success("Email scheduled successfully"),
    onError: (error) => toast.error("Error: " + error.message),
  });
}
