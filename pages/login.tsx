import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [view, setView] = useState<'main' | 'credentials' | 'verify-email'>('main');
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading('credentials');
    setError('');

    try {
      if (isRegistering) {
        // Handle Registration
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Switch to check email view instead of auto-logging in
        setView('verify-email');
        setIsLoading(null);
      } else {
        // Handle Sign In
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          throw new Error(res.error);
        }

        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(null);
    }
  };

  // Check URL for verification success
  const isVerified = router.query.verified === 'true';

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <Head>
        <title>{isRegistering ? 'Create Account' : 'Sign In'} - Scenio.AI</title>
      </Head>

      {/* Left side - Background Image */}
      <div className="hidden md:block md:w-1/2 relative bg-[#111]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/login-bg.jpg)' }}
        />
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

        <div className="w-full max-w-sm flex flex-col items-center text-center">
          
          {view === 'main' ? (
            <div className="animate-in fade-in zoom-in duration-300">
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

              <div className="flex items-center gap-4 w-full mb-6">
                <div className="h-px bg-[#333] flex-1"></div>
                <span className="text-xs text-gray-500 font-medium">OR</span>
                <div className="h-px bg-[#333] flex-1"></div>
              </div>

              <button 
                onClick={() => {
                  setIsRegistering(false);
                  setView('credentials');
                }}
                className="w-full flex items-center justify-center gap-3 bg-[#111] border border-[#333] hover:bg-[#1a1a1a] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors mb-4"
              >
                <Mail className="w-5 h-5 text-gray-400" />
                Sign in with Email
              </button>
              
              <button 
                onClick={() => {
                  setIsRegistering(true);
                  setView('credentials');
                }}
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors mb-12"
              >
                Don't have an account? Sign up
              </button>
            </div>
          ) : (
            <div className="w-full animate-in slide-in-from-right-4 fade-in duration-300">
              <h1 className="text-3xl font-serif tracking-tight mb-2">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                {isRegistering ? 'Enter your details to get started' : 'Enter your credentials to access your account'}
              </p>
              
              <form onSubmit={handleCredentialsSubmit} className="w-full space-y-4 mb-6">
                
                {isVerified && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-lg text-left mb-4">
                    Email verified successfully! You can now sign in.
                  </div>
                )}
                
                {isRegistering && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name (Optional)"
                      className="w-full bg-black border border-[#333] focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-colors"
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-black border border-[#333] focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    minLength={6}
                    className="w-full bg-black border border-[#333] focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-colors"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-left">
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading !== null || !email || !password}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-50 mt-2"
                >
                  {isLoading === 'credentials' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : null}
                  {isRegistering ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError('');
                  }}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>

                <button 
                  onClick={() => setView('main')}
                  className="text-sm font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Back to main menu
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full transform transition-all duration-500 opacity-100 translate-y-0">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#333] rounded-[1.5rem] flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Mail className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
              
              <h1 className="text-3xl font-serif tracking-tight mb-3 text-white">Verify your email</h1>
              <p className="text-gray-400 text-sm mb-6 text-center max-w-[280px] leading-relaxed">
                We sent a verification link to securely activate your account. Please check your inbox:
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 mb-10 w-full max-w-[280px] flex items-center justify-center shadow-inner">
                <p className="text-indigo-300 font-semibold truncate text-sm tracking-wide">{email}</p>
              </div>

              <button 
                onClick={() => setView('credentials')}
                className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white transition-colors mb-4"
              >
                <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                Back to sign in
              </button>
            </div>
          )}

          <p className="text-xs text-gray-600 max-w-[250px] leading-relaxed mt-12">
            By continuing, you agree to our{' '}
            <Link href="#" className="text-gray-400 hover:text-gray-300 underline underline-offset-2">Terms of service</Link>
            {' '}and{' '}
            <Link href="#" className="text-gray-400 hover:text-gray-300 underline underline-offset-2">Privacy policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
