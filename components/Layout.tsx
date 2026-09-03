import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  hideSidebar?: boolean;
}

export default function Layout({ children, title, hideSidebar = false }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Scenio.AI{title ? ` - ${title}` : ''}</title>
      </Head>
      <div className="min-h-screen bg-[#0f0f0f] text-white font-sans flex overflow-hidden">
        {/* Mobile Overlay */}
        {!hideSidebar && isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {!hideSidebar && (
          <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
        
        <div className={`flex flex-col flex-1 w-full min-w-0 ${!hideSidebar ? 'md:ml-64' : ''}`}>
          <Topbar 
            title={title} 
            onMenuClick={() => setIsMobileMenuOpen(true)}
            showMenuButton={!hideSidebar}
          />
          <main className="flex-1 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
