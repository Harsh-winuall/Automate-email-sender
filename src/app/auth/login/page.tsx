'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error || 'Invalid credentials');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-indigo-600">MailFlow</div>
          <p className="text-gray-500 mt-1 text-sm">Log in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200"
          >
            {loading && <div className="w-4 h-4 animate-spin">Q</div>}
            Log In
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{' '}
          <Link href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </div>

        {/* <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="mx-4 text-sm text-gray-400">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
            <img src="/media/icons/google.webp" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
            <img src="/media/icons/github.webp" alt="GitHub" className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
