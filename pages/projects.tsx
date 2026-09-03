import Layout from '../components/Layout';
import { Search, LayoutGrid, List, Plus, Hash } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
  return (
    <Layout title="All Projects">
      <div className="p-4 sm:p-6 min-h-[calc(100vh-64px)] flex flex-col w-full">
        {/* Header Actions */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold">All Projects</h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full xl:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-[#1f1f1f] border border-[#333] text-sm text-white placeholder-gray-500 rounded-full pl-9 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="hidden sm:flex items-center bg-[#1f1f1f] border border-[#333] rounded-md p-1 shrink-0">
              <button className="p-1 text-gray-400 hover:text-white bg-[#333] rounded-sm">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-500 hover:text-white rounded-sm">
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-start">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 text-sm font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                <Hash className="w-4 h-4" />
                New Canvas
              </button>
              
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center pb-20">
          <div className="w-full max-w-[400px] aspect-video sm:h-64 sm:aspect-auto border border-dashed border-[#333] rounded-2xl flex flex-col items-center justify-center bg-[#111111] mb-8 p-4 sm:p-6 relative overflow-hidden group">
             {/* decorative glowing bg in card */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-2xl"></div>
             
             <div className="w-full flex-1 sm:h-32 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] mb-4 flex items-center justify-center z-10 p-4">
                <span className="text-gray-600 text-xs sm:text-sm font-medium text-center">Your project here</span>
             </div>
             <div className="w-3/4 h-2 bg-[#222] rounded-full mb-2 z-10"></div>
             <div className="w-1/2 h-2 bg-[#222] rounded-full z-10"></div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight text-center px-4">Create your first project</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-6 text-center max-w-xs px-4">
            Start creating your video-comic drama with AI-powered tools.
          </p>

          <Link href="/canvas" className="w-full sm:w-auto px-6">
             <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
               <Plus className="w-4 h-4 shrink-0" />
               Create Your First Project
             </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
