import Link from 'next/link';
import { Bug, Bell, Star, Menu, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface TopbarProps {
  transparent?: boolean;
  title?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function Topbar({ transparent = false, title, onMenuClick, showMenuButton = false }: TopbarProps) {
  const { data: session } = useSession();
  
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  const userFirstName = session?.user?.name ? session.user.name.split(' ')[0] : 'Guest';
  const userInitials = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header 
      className={`h-16 flex items-center justify-between px-4 sm:px-6 transition-colors shrink-0 ${
        transparent ? 'bg-transparent absolute top-0 w-full z-20' : 'bg-[#111111] border-b border-[#222222] w-full z-10 sticky top-0'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        {showMenuButton && !transparent && (
          <button 
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        
        {transparent ? (
           <nav className="hidden lg:flex items-center gap-6 ml-32">
             {/* Main Navigation for Landing Page */}
             <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Products</Link>
             <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Use Cases</Link>
             <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Resources</Link>
             <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">Pricing</Link>
             <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap">User Guide</Link>
           </nav>
        ) : (
          <h1 className="text-sm font-medium text-gray-200 truncate pr-2">
            {title || `${greeting}, ${userFirstName}`}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {!transparent && (
          <Link href="#" className="hidden lg:flex items-center text-xs font-medium text-gray-400 hover:text-white border border-[#333333] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
            User Guide
          </Link>
        )}

        <button className="hidden sm:block text-gray-400 hover:text-white transition-colors p-1">
          <Bug className="w-5 h-5" />
        </button>
        
        <button className="text-gray-400 hover:text-white transition-colors p-1 relative">
          <Bell className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-[#1f1f1f] border border-[#333333] px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white whitespace-nowrap">0 Credits</span>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1 shrink-0"></div>
        </div>

        {session?.user && !transparent ? (
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ml-1 sm:ml-2">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name || "User"} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white/10 shrink-0" />
            ) : (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10">
                {userInitials}
              </div>
            )}
            <span className="text-sm font-medium hidden md:block whitespace-nowrap">
              {session.user.name || session.user.email?.split('@')[0]}
            </span>
          </div>
        ) : !transparent ? (
          <div className="flex items-center gap-2 cursor-pointer ml-1 sm:ml-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-white/10 shrink-0">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
