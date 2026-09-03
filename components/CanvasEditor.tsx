import { 
  MousePointer2, Move, Plus, PenTool, RotateCcw, 
  Type, Image as ImageIcon, Square, Layers, Download, 
  Settings, MessageSquare, BrainCircuit, Zap, Video, 
  Volume2, Search, Edit2
} from 'lucide-react';
import Link from 'next/link';

export default function CanvasEditor() {
  return (
    <div className="flex flex-col h-[100dvh] bg-[#0f0f0f] text-white overflow-hidden">
      
      {/* Custom Topbar for Canvas */}
      <header className="h-14 border-b border-[#222] bg-[#111] flex items-center justify-between px-2 sm:px-4 shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/dashboard" className="w-8 h-8 bg-white rounded-md flex items-center justify-center shrink-0">
             <div className="w-5 h-5 bg-black rounded-sm"></div>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">Untitled Canvas</span>
              <Edit2 className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white shrink-0" />
            </div>
            <span className="text-[10px] text-gray-500">Episode 1</span>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-[#1f1f1f] rounded-full p-1 border border-[#333] mx-4 shrink-0">
          <button className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium text-white bg-[#333] rounded-full shadow-sm flex items-center gap-2 transition-colors">
            <span className="w-3 h-3 border border-current rounded-sm inline-block"></span>
            Canvas
          </button>
          <button className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium text-gray-400 hover:text-white rounded-full flex items-center gap-2 transition-colors">
            <span className="w-3 h-3 border-t-2 border-b-2 border-current inline-block"></span>
            Timeline
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <div className="w-6 h-6 rounded-full bg-purple-600 hidden sm:flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            N
          </div>
          <button className="w-6 h-6 rounded-full border border-[#444] hidden sm:flex items-center justify-center shrink-0">
            <Plus className="w-3 h-3 text-gray-400" />
          </button>
          <div className="w-[1px] h-4 bg-[#333] mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-1 sm:gap-2 bg-[#1f1f1f] border border-[#333] px-2 sm:px-3 py-1 rounded-full shrink-0">
            <span className="text-[10px] font-medium text-white flex items-center gap-1 whitespace-nowrap">
               <span className="w-2 h-2 rounded-full bg-gray-400 inline-block"></span> 0 Credits
            </span>
          </div>
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 sm:ml-2">
            N
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Toolbar */}
        <div className="w-12 sm:w-14 bg-[#111] border-r border-[#222] flex flex-col items-center py-4 shrink-0 overflow-y-auto no-scrollbar z-10">
          <div className="flex flex-col gap-1 sm:gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center group relative">
              <Move className="w-4 h-4 text-white" />
              <div className="absolute left-10 bg-[#333] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none hidden sm:block">Pan (H)</div>
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <MousePointer2 className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <PenTool className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Type className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <ImageIcon className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Square className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Layers className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-auto flex flex-col gap-1 sm:gap-2 pt-4">
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-[#0f0f0f] relative overflow-hidden flex items-center justify-center p-4 min-w-0">
          <div className="w-full max-w-[400px] aspect-video border border-dashed border-[#333] rounded-2xl flex flex-col items-center justify-center bg-[#141414] shadow-2xl">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm font-medium text-gray-400 text-center px-4">Your video takes shape here</p>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1 text-center px-4">Continue with the agent in the chat</p>
          </div>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex items-center bg-[#1a1a1a] border border-[#333] rounded-lg p-1 gap-1 sm:gap-2 text-gray-400 z-10 shadow-lg">
            <button className="hover:text-white p-1 transition-colors"><Search className="w-3 h-3" /></button>
            <span className="text-[10px] sm:text-xs font-mono">19%</span>
            <button className="hover:text-white p-1 transition-colors"><Search className="w-3 h-3" /></button>
          </div>
        </div>

        {/* Right Sidebar - Quick Actions (Hidden on mobile/tablet) */}
        <div className="w-80 bg-[#141414] border-l border-[#222] shrink-0 flex-row hidden xl:flex z-20">
           <div className="w-12 border-r border-[#222] flex flex-col items-center py-4 gap-4 bg-[#111] shrink-0">
             <button className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white"><MessageSquare className="w-4 h-4" /></button>
             <button className="w-8 h-8 rounded-full hover:bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors"><BrainCircuit className="w-4 h-4" /></button>
             <button className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center transition-colors"><Zap className="w-4 h-4" /></button>
           </div>
           
           <div className="flex-1 p-5 overflow-y-auto">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-sm">Quick Actions</h3>
                <button className="text-gray-500 hover:text-white transition-colors"><Move className="w-4 h-4" /></button>
             </div>
             
             <div className="mb-4">
               <span className="text-[10px] font-bold tracking-widest text-gray-500 block mb-1">CREATE</span>
               <span className="text-xs text-gray-400">Generate from prompt and references</span>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mb-3">
               <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-4 h-32 flex flex-col cursor-pointer hover:border-[#555] transition-colors relative">
                 <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                   5 <span className="w-2 h-2 rounded-full border border-gray-400 inline-block"></span>
                 </div>
                 <div className="mt-auto">
                   <h4 className="font-semibold text-sm">Generate</h4>
                   <h4 className="font-semibold text-sm">Image</h4>
                 </div>
               </div>
               
               <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-4 h-32 flex flex-col cursor-pointer hover:border-[#555] transition-colors relative">
                 <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                   95 <span className="w-2 h-2 rounded-full border border-gray-400 inline-block"></span>
                 </div>
                 <div className="mt-auto">
                   <h4 className="font-semibold text-sm">Generate</h4>
                   <h4 className="font-semibold text-sm">Video</h4>
                 </div>
               </div>
             </div>
             
             <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-4 h-32 flex flex-col cursor-pointer hover:border-[#555] transition-colors relative w-[calc(50%-6px)]">
                 <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                   1 <span className="w-2 h-2 rounded-full border border-gray-400 inline-block"></span>
                 </div>
                 <div className="mt-auto">
                   <h4 className="font-semibold text-sm">Generate</h4>
                   <h4 className="font-semibold text-sm">Audio</h4>
                 </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
}
