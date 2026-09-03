import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, X, Mail } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [view, setView] = useState<'main' | 'email'>('main');

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <Head>
        <title>Sign in - Scenio.AI</title>
      </Head>

      {/* Left side - Background Image (Hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 relative bg-[#111]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/login-bg.jpg)' }}
        />
        {/* Logo over image */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <img src="/scenio.png" alt="Scenio Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight drop-shadow-md">Scenio.AI</span>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-8 bg-[#050505]">
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-6 left-6 z-10 flex items-center gap-2">
          <img src="/scenio.png" alt="Scenio Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight">Scenio.AI</span>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => router.push('/')}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Form Container */}
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          
          {view === 'main' ? (
            <>
              <h1 className="text-3xl font-serif tracking-tight mb-2">Your story is just a<br/>login away</h1>
              <p className="text-gray-400 text-sm mb-10">Create an account or sign in to continue</p>
              
              <div className="w-full space-y-4 mb-6">
                <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors">
                  <svg className="w-[22px] h-[22px] mb-0.5" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <button 
                onClick={() => setView('email')}
                className="text-sm font-medium text-indigo-500 hover:text-indigo-400 mb-12"
              >
                Continue with email
              </button>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 shadow-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-serif tracking-tight mb-8">Enter your email</h1>
              
              <div className="w-full space-y-4 mb-6">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-black border border-[#333] focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  autoFocus
                />
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Continue with Email
                </button>
              </div>

              <button 
                onClick={() => setView('main')}
                className="text-sm font-medium text-indigo-500 hover:text-indigo-400 mb-12"
              >
                Back to Google log-in
              </button>
            </>
          )}

          <p className="text-xs text-gray-500 max-w-[250px] leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="#" className="text-gray-300 underline underline-offset-2">Terms of service</Link>
            {' '}and{' '}
            <Link href="#" className="text-gray-300 underline underline-offset-2">Privacy policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
