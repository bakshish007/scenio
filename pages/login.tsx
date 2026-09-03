import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, X, Mail, CheckCircle2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [view, setView] = useState<'main' | 'email' | 'check-email'>('main');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading('email');
    await signIn('email', { email, redirect: false, callbackUrl: '/dashboard' });
    setIsLoading(null);
    setView('check-email');
  };

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
                <button 
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={isLoading !== null}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {isLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
                </button>
              </div>

              <button 
                onClick={() => setView('email')}
                className="text-sm font-medium text-indigo-500 hover:text-indigo-400 mb-12"
              >
                Continue with email
              </button>
            </>
          ) : view === 'email' ? (
            <>
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 shadow-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-serif tracking-tight mb-8">Enter your email</h1>
              
              <form onSubmit={handleEmailSignIn} className="w-full space-y-4 mb-6">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-black border border-[#333] focus:border-indigo-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                  required
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={isLoading !== null || !email}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                  {isLoading === 'email' ? 'Sending link...' : 'Continue with Email'}
                </button>
              </form>

              <button 
                onClick={() => setView('main')}
                className="text-sm font-medium text-indigo-500 hover:text-indigo-400 mb-12"
              >
                Back to sign in
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center w-full transform transition-all duration-500 opacity-100 translate-y-0">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#333] rounded-[1.5rem] flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Mail className="w-8 h-8 text-indigo-400" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#050505] rounded-full flex items-center justify-center border-4 border-[#050505]">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-serif tracking-tight mb-3 text-white">Check your inbox</h1>
              <p className="text-gray-400 text-sm mb-6 text-center max-w-[280px] leading-relaxed">
                We sent a magic link to securely sign you in. Click the link in the email sent to:
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 mb-10 w-full max-w-[280px] flex items-center justify-center shadow-inner">
                <p className="text-indigo-300 font-semibold truncate text-sm tracking-wide">{email}</p>
              </div>

              <button 
                onClick={() => setView('main')}
                className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors mb-4"
              >
                <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                Back to sign in
              </button>
            </div>
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
