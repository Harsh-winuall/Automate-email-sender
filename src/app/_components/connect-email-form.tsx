"use client";

import { useGetAppPassword, useSaveAppPassword } from "@/hooks/useAppPassword";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function ConnectEmail(onOpenChange: () => void ) {
  const [appPassword, setAppPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const appPasswordMutation = useSaveAppPassword();
  const { data, isLoading } = useGetAppPassword();

  useEffect(() => {
    if (data?.appPassword) {
      setAppPassword(data.appPassword);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    appPasswordMutation.mutate(appPassword, {
      onSuccess: () => {
        toast.success("Credentials saved successfully!");
        setStatus("Credentials saved successfully!");
        setAppPassword("");
      },
      onError: (error) => {
        toast.error("Error saving password");
        setStatus(`Error: ${error.message}`);
      },
    });

    setLoading(false);
  };

  return (
    <div className="max-w-lg bg-white rounded-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your Gmail</h1>
        <p className="text-gray-600 text-sm">
          To send emails from your app using your Gmail account, enter your{" "}
          <strong>Gmail App Password</strong> below. You can generate one from your Google Account settings.
          Need help?{" "}
          <Link href="/docs" className="text-blue-600 underline hover:text-blue-800" onClick={() => onOpenChange(false)}>
            View Docs
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="appPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Gmail App Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="appPassword"
            required
            disabled={data?.appPassword}
            value={appPassword}
            placeholder="Enter your Gmail App Password"
            onChange={(e) => setAppPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {loading ? (data?.appPassword ? "Updating..." : "Saving...") : (data?.appPassword ? "Update Password" : "Save Password")}
        </button>

        {status && (
          <p className="text-sm text-green-600 mt-2">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
