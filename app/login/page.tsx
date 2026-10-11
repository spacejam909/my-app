'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Compass, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleAuth(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMessage(error.message);
      else alert('Check your email for the confirmation link!');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push('/board');
      }
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0d0f17] text-[#94a3b8] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a0c14] border border-[#1e2330] rounded-xl p-8 shadow-2xl space-y-6">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-lg shadow-orange-500/20">
            OR
          </div>
          <h1 className="text-white font-bold tracking-widest text-lg">ORBIT MISSION CONTROL</h1>
          <p className="text-xs text-zinc-500">Sign in to access your telemetry boards</p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase text-zinc-500 font-semibold mb-1">Email Address</label>
            <input 
              type="email5" // standard email input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="commander@orbit.app"
              required
              className="w-full bg-[#131622] border border-[#23293a] text-xs text-white p-2.5 rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase text-zinc-500 font-semibold mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#131622] border border-[#23293a] text-xs text-white p-2.5 rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2.5 rounded shadow-lg shadow-orange-600/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : isSignUp ? 'Initialize Account' : 'Authenticate'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#1e2330]">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-zinc-400 hover:text-orange-400 transition-colors cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Need a workspace account? Sign up"}
          </button>
        </div>

      </div>
    </div>
  );
}