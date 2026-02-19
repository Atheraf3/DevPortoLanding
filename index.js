import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Layout, 
  Terminal, 
  Menu,
  X,
  ChevronDown,
  Instagram,
  MessageCircle,
  Globe // Added Globe to imports
} from 'lucide-react';

// --- Data & Konfigurasi Konten ---

const NAV_LINKS = [
  { name: 'Tentang', href: '#about' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
];

const SKILLS = [
  { name: 'Frontend', icon: <Layout className="w-6 h-6" />, tools: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'Backend', icon: <Database className="w-6 h-6" />, tools: ['Node.js', 'PostgreSQL', 'Express', 'Firebase'] },
  { name: 'Tools', icon: <Terminal className="w-6 h-6" />, tools: ['Git', 'Docker', 'VS Code', 'Figma'] },
];

const PROJECTS = [
  {
    title: 'E-Commerce Dashboard',
    desc: 'Platform manajemen inventaris dan analitik penjualan real-time dengan visualisasi data interaktif.',
    tags: ['React', 'Chart.js', 'Supabase'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'AI Chat Interface',
    desc: 'Antarmuka obrolan minimalis yang terintegrasi dengan OpenAI API, mendukung markdown dan syntax highlighting.',
    tags: ['Next.js', 'Tailwind', 'OpenAI API'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Travel Booking App',
    desc: 'Aplikasi pemesanan perjalanan dengan fitur pencarian destinasi, filter harga, dan integrasi peta.',
    tags: ['React Native', 'Firebase', 'Maps API'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
  }
];

// --- Komponen UI Reusable ---

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-slate-100 mb-4"
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: '80px' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="h-1 bg-emerald-500 mx-auto rounded-full mb-4"
    />
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, href, className = '' }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 focus:ring-emerald-500",
    outline: "border border-slate-600 hover:border-emerald-500 hover:text-emerald-500 text-slate-300 focus:ring-slate-500 bg-transparent",
    ghost: "text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50"
  };

  const content = (
    <>
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};

// --- Komponen Utama ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect untuk navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code className="text-emerald-500" />
            <span>Dev<span className="text-emerald-500">Portfolio</span>.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {NAV_LINKS.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium hover:text-emerald-400"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center min-h-screen md:min-h-[800px] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/20">
              Available for Freelance & Full-time
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Membangun Pengalaman Digital yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Memukau & Fungsional</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Halo, saya <span className="text-slate-200 font-semibold">Alex Developer</span>. Mahasiswa Teknik Informatika yang fokus menciptakan aplikasi web modern, cepat, dan responsif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/resume.pdf" variant="outline" icon={ExternalLink}>
                Unduh Resume
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="animate-bounce text-slate-500 w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Mengenal lebih jauh tentang siapa saya dan apa yang saya lakukan.">
            Tentang Saya
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600" 
                alt="Profile" 
                className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover aspect-[4/5]"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Menjembatani Desain & Teknologi</h3>
              <p className="text-slate-400 leading-relaxed">
                Sebagai mahasiswa Informatika semester akhir, saya memiliki hasrat mendalam pada dunia pengembangan web. Saya percaya bahwa kode yang bersih sama pentingnya dengan desain yang indah.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Saya tidak hanya menulis kode, tetapi juga memecahkan masalah. Fokus saya adalah menciptakan solusi yang skalabel, mudah dipelihara, dan memberikan pengalaman pengguna yang luar biasa (User Experience).
              </p>
              <div className="mt-8">
                <div>
                  <h4 className="text-emerald-400 font-bold text-lg">3.95</h4>
                  <p className="text-sm text-slate-500">IPK Saat Ini</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading subtitle="Daftar teknologi dan alat yang saya gunakan untuk mewujudkan ide.">
            Tech Stack & Keahlian
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.tools.map((tool) => (
                    <li key={tool} className="flex items-center text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading subtitle="Beberapa proyek pilihan yang telah saya kerjakan.">
            Galeri Proyek
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={project.github} className="p-2 bg-slate-800 rounded-full text-white hover:bg-emerald-500 transition-colors" title="View Code">
                      <Github size={20} />
                    </a>
                    <a href={project.demo} className="p-2 bg-slate-800 rounded-full text-white hover:bg-emerald-500 transition-colors" title="Live Demo">
                      <Globe size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 text-emerald-400 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" href="https://github.com" icon={Github}>
              Lihat Proyek Lainnya di GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <SectionHeading subtitle="Tertarik untuk berkolaborasi atau punya penawaran menarik? Mari terhubung.">
            Hubungi Saya
          </SectionHeading>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 md:p-16 shadow-2xl relative z-10 max-w-2xl mx-auto">
            <p className="text-slate-400 mb-10 text-lg">
              Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau kesempatan menjadi bagian dari visi Anda.
            </p>
            
            <div className="flex flex-col gap-6 items-center">
              <a href="mailto:hello@alexdev.com" className="w-full max-w-md p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center hover:border-emerald-500 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-lg text-white font-medium">hello@alexdev.com</p>
                </div>
              </a>

              <a href="https://wa.me/628123456789" className="w-full max-w-md p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center hover:border-emerald-500 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageCircle size={24} />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm text-slate-500">WhatsApp</p>
                  <p className="text-lg text-white font-medium">+62 812 3456 789</p>
                </div>
              </a>

              <a href="https://instagram.com/alexdeveloper" className="w-full max-w-md p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center hover:border-emerald-500 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Instagram size={24} />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm text-slate-500">Instagram</p>
                  <p className="text-lg text-white font-medium">@alexdeveloper</p>
                </div>
              </a>

              <div className="flex gap-4 mt-4 justify-center w-full">
                <a href="https://linkedin.com" className="p-3 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com" className="p-3 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Code className="text-emerald-500 w-5 h-5" />
             <span className="font-bold text-xl text-white">DevPortfolio.</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Didesain dan dibangun dengan hati-hati menggunakan React & Tailwind CSS.
          </p>
          <div className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Alex Developer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
