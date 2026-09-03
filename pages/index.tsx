import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Box, Menu, X, ArrowRight, Play, Sparkles, 
  MessageSquare, Zap, Layers, Globe, Shield, ChevronDown, Calendar, Star
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Dynamic Word State
  const dynamicWords = ['social reel', 'short film', 'product explainer', 'marketing campaign'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsFading(false);
      }, 500); // 500ms fade out duration
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    { q: "What is Scenio?", a: "Scenio is an AI-native platform designed to help storytellers go from an idea to a finished video seamlessly using state-of-the-art models." },
    { q: "Do I need technical skills?", a: "No, Scenio is built with a chat-native canvas that makes video creation as simple as having a conversation." },
    { q: "What models do you support?", a: "We support a wide range of frontier models including Runway, Pika, Kling, OpenAI, and more." },
    { q: "Is there a free trial?", a: "Yes, you can start creating for free with basic credits to test out our core features." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30">
      <Head>
        <title>Scenio.AI - AI Native Video Creation</title>
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/scenio.png" alt="Scenio Logo" className="w-14 h-14 object-contain" />
            <span className="text-xl font-bold tracking-tight">Scenio.AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 relative">
            {/* Products Mega Menu */}
            <div className="group">
              <Link href="#" className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors tracking-[0.05em] uppercase py-6">Products <ChevronDown className="w-3 h-3 opacity-70" /></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-[750px] pt-1">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-8 flex shadow-2xl shadow-black">
                  {/* Left Sidebar */}
                  <div className="w-1/3 pr-8 border-r border-[#333]">
                    <h3 className="text-sm font-bold tracking-wider mb-2">PRODUCTS</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">Every tool in the studio, from script to finished cut.</p>
                    <div className="aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden mb-4 bg-cover bg-center" style={{backgroundImage: 'url(/menu_featured.jpg)'}}></div>
                    <h4 className="font-bold text-sm mb-1">Fast Lane to Production</h4>
                    <p className="text-xs text-gray-400">Start with our Artist</p>
                  </div>
                  {/* Right Content */}
                  <div className="w-2/3 pl-8 grid grid-cols-2 gap-x-8 gap-y-10">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">AI VIDEO GENERATOR</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">Script to Video Maker</Link></li>
                        <li><Link href="#" className="hover:text-white">Story to Video Maker</Link></li>
                        <li><Link href="#" className="hover:text-white">Video Clip Generator</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">AI VIDEO EDITOR</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">Voiceover</Link></li>
                        <li><Link href="#" className="hover:text-white">Face Swap</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">AI IMAGE GENERATOR</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">AI Storyboarder</Link></li>
                        <li><Link href="#" className="hover:text-white">AI Face Swap</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">AI VOICE & TEXT</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">AI Voice Generator</Link></li>
                        <li><Link href="#" className="hover:text-white">AI Script Writer</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases Mega Menu */}
            <div className="group">
              <Link href="#" className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors tracking-[0.05em] uppercase py-6">Use Cases <ChevronDown className="w-3 h-3 opacity-70" /></Link>
              <div className="absolute top-full left-1/2 -translate-x-[40%] hidden group-hover:block w-[950px] pt-1">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-8 flex shadow-2xl shadow-black">
                  {/* Left Sidebar */}
                  <div className="w-[28%] pr-8 border-r border-[#333]">
                    <h3 className="text-sm font-bold tracking-wider mb-2">USE CASES</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">Built around the work you already make.</p>
                    <div className="aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden mb-4 bg-cover bg-center" style={{backgroundImage: 'url(/login-bg.jpg)'}}></div>
                    <h4 className="font-bold text-sm mb-1">Fast Lane to Production</h4>
                    <p className="text-xs text-gray-400">Start with our Artist</p>
                  </div>
                  {/* Right Content */}
                  <div className="w-[72%] pl-8 grid grid-cols-3 gap-x-8 gap-y-10">
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">STORYTELLERS</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">Book to Audiobook</Link></li>
                        <li><Link href="#" className="hover:text-white">Podcast Video Maker</Link></li>
                      </ul>
                      <div className="mt-8">
                        <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">LEARNING & DEVELOPMENT</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                          <li><Link href="#" className="hover:text-white">Training Video Maker</Link></li>
                          <li><Link href="#" className="hover:text-white">Infographic Video Maker</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">DIGITAL MARKETERS</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">UGC Videos</Link></li>
                        <li><Link href="#" className="hover:text-white">AI Video Ads</Link></li>
                      </ul>
                      <div className="mt-8">
                        <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">SOCIAL MEDIA CREATORS</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                          <li><Link href="#" className="hover:text-white">YouTube Short Generator</Link></li>
                          <li><Link href="#" className="hover:text-white">YouTube Video Maker</Link></li>
                          <li><Link href="#" className="hover:text-white">Instagram Video Maker</Link></li>
                          <li><Link href="#" className="hover:text-white">TikTok Video Maker</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">FILMMAKERS</h4>
                      <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link href="#" className="hover:text-white">Anime Video</Link></li>
                        <li><Link href="#" className="hover:text-white">Trailer Maker</Link></li>
                        <li><Link href="#" className="hover:text-white">Music Video Maker</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Mega Menu */}
            <div className="group">
              <Link href="#" className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors tracking-[0.05em] uppercase py-6">Resources <ChevronDown className="w-3 h-3 opacity-70" /></Link>
              <div className="absolute top-full left-1/2 -translate-x-[20%] hidden group-hover:block w-[550px] pt-1">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-8 flex shadow-2xl shadow-black">
                  {/* Left Sidebar */}
                  <div className="w-[60%] pr-8 border-r border-[#333]">
                    <h3 className="text-sm font-bold tracking-wider mb-2">RESOURCES</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">Templates and writing to start from.</p>
                    <div className="w-full aspect-[4/3] bg-[#1a1a1a] rounded-xl overflow-hidden mb-4 bg-cover bg-center border border-[#333]" style={{backgroundImage: 'url(/trophy_no_text.jpg)'}}></div>
                    <h4 className="font-bold text-sm mb-1">Scenio ranks #1 on Physion-Arc</h4>
                    <p className="text-xs text-gray-400">Independently evaluated against seven other agents.</p>
                  </div>
                  {/* Right Content */}
                  <div className="w-[40%] pl-8">
                    <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">RESOURCES</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                      <li><Link href="#" className="hover:text-white">Templates</Link></li>
                      <li><Link href="#" className="hover:text-white">Blogs</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link href="#" className="text-xs font-medium text-gray-300 hover:text-white transition-colors tracking-[0.05em] uppercase py-6">Pricing</Link>
            <Link href="#" className="text-xs font-medium text-gray-300 hover:text-white transition-colors tracking-[0.05em] uppercase py-6">User Guide</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium bg-white text-black px-7 py-2 rounded-[10px] hover:bg-gray-100 transition-colors">Sign in</Link>
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6 flex flex-col gap-6 md:hidden">
          <Link href="#" className="text-2xl font-semibold border-b border-white/10 pb-4">Features</Link>
          <Link href="#" className="text-2xl font-semibold border-b border-white/10 pb-4">Use Cases</Link>
          <Link href="#" className="text-2xl font-semibold border-b border-white/10 pb-4">Pricing</Link>
          <Link href="#" className="text-2xl font-semibold border-b border-white/10 pb-4">Request API</Link>
          <div className="mt-auto pb-12 flex flex-col gap-4">
            <Link href="#" className="text-center py-4 rounded-xl border border-white/20 font-medium">Book a demo</Link>
            <Link href="/login" className="text-center py-4 rounded-xl bg-white text-black font-medium">Sign In</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 overflow-hidden bg-[#050505]">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-indigo-500/30"></div>
        <div className="absolute top-1/3 right-[20%] w-2.5 h-2.5 bg-indigo-500/20"></div>
        <div className="absolute top-2/3 right-[10%] w-1.5 h-1.5 bg-indigo-500/40"></div>
        <div className="absolute bottom-1/4 left-[30%] w-2 h-2 bg-indigo-500/20"></div>
        <div className="absolute top-20 right-[5%] w-2 h-2 bg-indigo-500/30"></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-indigo-500/20"></div>
        <div className="absolute top-1/2 left-[5%] w-2.5 h-2.5 bg-indigo-500/40"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm font-medium text-gray-300 mb-8 hover:bg-[#222] transition-colors cursor-pointer group">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <Star className="w-3 h-3 text-white" fill="white" />
            </div>
            <span>Scenio ranks #1 on Physion-Arc</span>
            <ArrowRight className="w-3 h-3 text-gray-500 group-hover:translate-x-1 transition-transform" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05] mb-6 w-full max-w-4xl min-h-[120px] sm:min-h-0 text-white">
            Go from an idea to <br className="hidden sm:block" />
            <span className={`text-[#5865F2] inline-block mt-2 transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              a {dynamicWords[wordIndex]}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Your creative agent.<br/>
            Built for creators and teams producing video at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5865F2]/20">
              Start creating
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 sm:py-24 px-4 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-medium mb-12 text-center">Made with Scenio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 cursor-pointer bg-cover bg-center" style={{backgroundImage: `url(/showcase_${i}.jpg)`}}>
                {/* Overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-medium text-lg mb-1">Created by @artist_{i}</h3>
                  <p className="text-gray-400 text-sm">Using Scenio AI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium mb-6 tracking-tight">Precision, consistency, and scale.</h2>
            <p className="text-gray-400 text-lg">Everything you need to build professional video content, orchestrated in one powerful canvas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-[#151515] transition-colors lg:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <Layers className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-medium mb-3">End-to-end creation</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">Go from script to storyboard, to final render without leaving the platform. Our timeline seamlessly integrates generated assets.</p>
            </div>
            
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-[#151515] transition-colors">
              <MessageSquare className="w-8 h-8 text-pink-400 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Chat-native canvas</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Direct the AI like a human assistant. Ask for revisions, alternative angles, or different lighting styles conversationally.</p>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-[#151515] transition-colors">
              <Globe className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Localize to any language</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Instantly translate and lip-sync your final video into 30+ languages to reach a global audience.</p>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 sm:p-8 hover:bg-[#151515] transition-colors lg:col-span-2 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <Shield className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Enterprise-grade control</h3>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">Brand kits, custom model fine-tuning, and robust access controls ensure your content stays on-brand and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Models Marquee */}
      <section className="py-16 sm:py-24 border-y border-white/5 bg-white/[0.02] overflow-hidden flex flex-col items-center">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-10 text-center">We support all the frontier models</h3>
        
        <div className="w-full relative flex overflow-hidden mask-edges">
          {/* mask-edges would typically use a transparent gradient mask in css, simulating it: */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-[200%] animate-marquee whitespace-nowrap opacity-50">
            {/* First set */}
            <div className="flex items-center justify-around w-1/2 shrink-0 px-4 text-2xl font-bold text-gray-400 gap-20">
              <span>OpenAI</span> <span>Runway Gen-3</span> <span>Pika Labs</span> <span>Kling</span> <span>Luma Dream Machine</span> <span>ElevenLabs</span>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-around w-1/2 shrink-0 px-4 text-2xl font-bold text-gray-400 gap-20">
              <span>OpenAI</span> <span>Runway Gen-3</span> <span>Pika Labs</span> <span>Kling</span> <span>Luma Dream Machine</span> <span>ElevenLabs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-medium mb-2">Handpicked templates</h2>
              <p className="text-gray-400">Start fast with pre-orchestrated workflows.</p>
            </div>
            <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-400 transition-colors flex items-center gap-1">
              View all templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Product Explainer', 'Social Media Ad', 'Narrative Short', 'Podcast Visualizer'].map((title, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-[#111] rounded-xl border border-white/10 mb-4 overflow-hidden relative bg-cover bg-center" style={{backgroundImage: `url(/template_${i+1}.jpg)`}}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-medium text-white border border-white/10">
                    0:15
                  </div>
                </div>
                <h3 className="text-white font-medium mb-1 group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm">Multiple aspect ratios</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-medium mb-12 text-center">Frequently asked questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-2xl bg-[#111] overflow-hidden transition-colors hover:border-white/20">
                <button 
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-16">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <img src="/scenio.png" alt="Scenio Logo" className="w-12 h-12 object-contain" />
                <span className="text-lg font-bold tracking-tight">Scenio.AI</span>
              </Link>
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                The AI-native platform designed for storytellers to generate, edit, and orchestrate video projects.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Scenio, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">Discord</Link>
              <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
