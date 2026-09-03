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
          <img src="/scenio.png" alt="Scenio Logo" className="w-14 h-14 object-contain" />
          <span className="text-xl font-bold tracking-tight drop-shadow-md">Scenio.AI</span>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-8 bg-[#050505]">
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-6 left-6 z-10 flex items-center gap-2">
          <img src="/scenio.png" alt="Scenio Logo" className="w-14 h-14 object-contain" />
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
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 13.92c-.02-3.15 2.58-4.67 2.7-4.74-1.47-2.14-3.75-2.44-4.56-2.48-1.93-.2-3.78 1.14-4.77 1.14-.99 0-2.5-1.11-4.1-1.08-2.11.03-4.06 1.23-5.15 3.12-2.19 3.79-.56 9.4 1.58 12.49 1.04 1.51 2.27 3.2 3.88 3.14 1.56-.06 2.14-.99 4.02-.99 1.88 0 2.41 1 4.04.96 1.66-.03 2.74-1.54 3.77-3.04 1.19-1.74 1.68-3.42 1.7-3.51-.04-.02-3.17-1.22-3.11-4.91zM14.61 5.3c.86-1.04 1.44-2.5 1.28-3.95-1.25.05-2.77.83-3.65 1.88-.78.93-1.42 2.41-1.24 3.84 1.4.11 2.75-.73 3.61-1.77z"/>
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
