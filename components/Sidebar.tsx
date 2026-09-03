import Link from 'next/link';
import { Home, Folder, LayoutGrid, Wand2, Zap, ChevronRight, Box, X } from 'lucide-react';
import { useRouter } from 'next/router';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'All Projects', icon: Folder, href: '/projects' },
  { name: 'Canvas', icon: LayoutGrid, href: '/canvas' },
  { name: 'Remix', icon: Wand2, href: '#' },
  { name: 'Originals', icon: Zap, href: '#' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const router = useRouter();

  return (
    <aside 
      className={`w-64 h-screen bg-[#111111] border-r border-[#222222] flex flex-col fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={onClose}>
          <img src="/scenio.png" alt="Scenio Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold tracking-tight">Scenio.AI</span>
        </Link>
        <button className="ml-auto text-gray-500 hover:text-white transition-colors hidden md:block">
          <LayoutGrid className="w-5 h-5 opacity-50" />
        </button>
        {/* Mobile Close Button */}
        <button className="ml-auto text-gray-500 hover:text-white transition-colors md:hidden" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-[#1f1f1f] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-colors">
          <ChevronRight className="w-4 h-4 ml-0.5 shrink-0" />
          Legacy
        </button>

        {/* Recent Section */}
        <div className="mt-8 px-3">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-3">RECENT</h3>
          <p className="text-sm text-gray-500">No projects yet</p>
        </div>
      </nav>
    </aside>
  );
}
