import Layout from '../components/Layout';
import { Tv, Languages, Mic, Megaphone, Plus, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const skills = [
  { name: 'Script to Video', icon: Tv },
  { name: 'Remix a Video', icon: Languages },
  { name: 'Narration Video', icon: Mic },
  { name: 'Marketing Hub', icon: Megaphone },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 w-full max-w-4xl mx-auto py-4 sm:py-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-serif mb-2 sm:mb-3 tracking-tight">
            What are we making today{session.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}?
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Pick a Skill, or describe what you want to make.</p>
        </div>

        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 tracking-widest flex items-center gap-2">
              SKILLS LIBRARY
              <span className="w-4 h-4 rounded-full border border-gray-500 hidden sm:inline-flex items-center justify-center text-[10px] cursor-help">i</span>
            </h3>
            <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              See All Skills <span className="text-[10px]">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {skills.map((skill) => (
              <div 
                key={skill.name}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 sm:p-6 flex flex-col items-start hover:bg-[#222222] transition-colors cursor-pointer group h-32 sm:h-40"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-auto group-hover:bg-[#333333] transition-colors shrink-0">
                  <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                </div>
                <span className="font-medium text-xs sm:text-sm text-gray-200 mt-2 sm:mt-4 leading-tight">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a] to-[#2a2a2a] rounded-2xl p-[1px] opacity-20 group-hover:opacity-40 transition-opacity hidden sm:block"></div>
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3 relative z-10 transition-colors group-hover:border-[#444]">
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333] transition-colors shrink-0">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
            <input 
              type="text" 
              placeholder="Cut a teaser from my finished episode..." 
              className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:ring-0 px-1 sm:px-2 min-w-0"
            />
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333] transition-colors shrink-0 opacity-50 cursor-not-allowed">
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
          Know what you're making?{' '}
          <Link href="/canvas" className="text-white hover:underline font-medium ml-1">
            Start on the canvas →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
