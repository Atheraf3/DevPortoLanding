import { useState, useEffect, useRef, Fragment } from 'react';
import anime from 'animejs/lib/anime.es.js';
import {
  Github,
  Linkedin,
  Mail,
  // ExternalLink,
  Code,
  Menu,
  X,
  ChevronDown,
  Instagram,
  MessageCircle,
  Globe,
} from 'lucide-react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDotnet,
  SiGit,
  SiDbeaver,
  SiPostman,
} from 'react-icons/si';

// --- Data & Konfigurasi Konten ---

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const TECH_ROW_1 = [
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Git', icon: SiGit },
  { name: 'DBeaver', icon: SiDbeaver },
  { name: 'Postman', icon: SiPostman },
];

const TECH_ROW_2 = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'ASP.NET', icon: SiDotnet },
];

const PROJECTS = [
  {
    title: 'Nutrify - Food Delivery WebApp',
    desc: 'Nutrify adalah panduan nutrisi cerdas yang membantu pengguna memilih makanan sesuai kondisi kesehatan mereka.',
    tags: ['Next.JS', 'Hapi.JS', 'MongoDB', 'Tailwind'],
    github: 'https://github.com/Capstone-Team-Nutrify',
    demo: 'https://www.nutrify.web.id/',
    image:
      'https://raw.githubusercontent.com/Capstone-Team-Nutrify/.github/56b5954f90c6f013be934291b006e3a732c9c0bb/profile/nutrify-thumbnail.png?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Explore Indonesia - Interactive Culture Application',
    desc: 'Platform ini memperkenalkan kekayaan budaya Indonesia secara sederhana, interaktif, dan tentunya sangat menyenangkan.',
    tags: ['Kotlin', 'Express.JS', 'Firebase', 'GCP'],
    github: 'https://github.com/Capstone-ExploreIndonesia',
    demo: 'https://www.youtube.com/watch?v=G3vvsTXq2vo#',
    image:
      'https://ik.imagekit.io/2xthk8ud4/explore-indonesia-thumb.png?updatedAt=1772534741967?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Hexamood',
    desc: 'Alat berbasis Machine Learning untuk membantu Gen Z memantau dan memprediksi tingkat stres mereka.',
    tags: [],
    github: null,
    demo: 'https://proceeding.unindra.ac.id/index.php/semnasristek/article/view/8884',
    image: 'https://ik.imagekit.io/2xthk8ud4/Tumbnail-Hexamood.png?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Nomophobia Checker',
    desc: 'Sistem Pakar Berbasis Pengetahuan Untuk deteksi dini NOMOPHOBIA menggunakan instrumen NMPQ.',
    tags: ['React', 'Tailwind', 'Zustand'],
    github: 'https://github.com/Atheraf3/SistemPakarNomophobia',
    demo: 'https://sistem-pakar-nomophobia.vercel.app/',
    image: 'https://ik.imagekit.io/2xthk8ud4/TA/Sampul.png?auto=format&fit=crop&q=80&w=800',
  },
];

// --- Komponen UI Reusable ---

const SectionHeading = ({ children }) => (
  <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
    <h2
      className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 pb-2 mb-4 anime-reveal origin-center" data-y="20" data-netflix="true"
    >
      {children}
    </h2>
    <div
      className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full origin-center anime-reveal anime-breathing-line" data-scale-x="true"
    />
  </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, href, className = '' }) => {
  const baseStyle =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  const variants = {
    primary:
      'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 focus:ring-emerald-500',
    outline:
      'border border-slate-600 hover:border-emerald-500 hover:text-emerald-500 text-slate-300 focus:ring-slate-500 bg-transparent',
    ghost: 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50',
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

  return <button className={`${baseStyle} ${variants[variant]} ${className}`}>{content}</button>;
};

// --- Komponen UI Reusable Tambahan ---

const AnimatedText = ({ text, className = '' }) => (
  <p className={`cursor-default ${className}`}>
    {text.split(' ').map((word, i, arr) => (
      <Fragment key={i}>
        <span className="anime-desc-word-outer inline-block origin-center">
          <span 
            className="anime-desc-word-inner inline-block"
            onMouseEnter={(e) => {
              anime.remove(e.currentTarget);
              anime({
                targets: e.currentTarget,
                translateX: anime.random(-30, 30),
                translateY: anime.random(-30, 30),
                rotate: anime.random(-15, 15),
                duration: 400,
                easing: 'easeOutElastic(1, .5)'
              });
            }}
            onMouseLeave={(e) => {
              anime.remove(e.currentTarget);
              anime({
                targets: e.currentTarget,
                translateX: 0,
                translateY: 0,
                rotate: 0,
                duration: 600,
                easing: 'easeOutElastic(1, .5)'
              });
            }}
          >
            {word}
          </span>
        </span>
        {i < arr.length - 1 ? ' ' : ''}
      </Fragment>
    ))}
  </p>
);

// --- Komponen Utama ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const patternRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: entry.target.dataset.y ? [parseInt(entry.target.dataset.y), 0] : [0, 0],
              scaleX: entry.target.dataset.scaleX ? [0, 1] : 1,
              scale: entry.target.dataset.netflix ? [3, 1] : 1,
              translateX: entry.target.dataset.x ? [parseInt(entry.target.dataset.x), 0] : [0, 0],
              opacity: [0, 1],
              duration: entry.target.dataset.netflix ? 1800 : 1000,
              easing: 'easeOutExpo',
              delay: entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0,
              complete: function() {
                if (entry.target.classList.contains('anime-breathing-line')) {
                  anime({
                    targets: entry.target,
                    scaleX: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                    duration: 2500,
                    loop: true,
                    easing: 'easeInOutSine'
                  });
                }
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.anime-reveal').forEach((el) => {
      el.style.opacity = 0;
      observer.observe(el);
    });
    if (patternRef.current) {
      const pattern = patternRef.current;
      pattern.innerHTML = '';
      const colors = ['#34d399', '#10b981', '#06b6d4', '#0ea5e9', '#2dd4bf', '#38bdf8'];
      const columns = 24;
      const segmentHeight = 50;

      for (let i = 0; i < columns; i++) {
        const x = i * 50;
        for (let j = 0; j < 8; j++) {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', x);
          rect.setAttribute('y', j * segmentHeight);
          rect.setAttribute('width', 50);
          rect.setAttribute('height', segmentHeight);
          rect.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
          pattern.appendChild(rect);

          anime({
            targets: rect,
            translateY: [
              { value: -20 + Math.random() * 40, duration: 100 + Math.random() * 100 },
              { value: 0, duration: 1000 + Math.random() * 100 }
            ],
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate',
            delay: Math.random() * 1000
          });
        }
      }
    }

    anime({
      targets: '.anime-bounce',
      translateY: [0, 10, 0],
      opacity: [0.3, 1, 0.3],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.anime-pulse-shadow',
      boxShadow: [
        '0px 0px 0px rgba(16, 185, 129, 0)',
        '0px 0px 20px rgba(16, 185, 129, 0.3)',
        '0px 0px 0px rgba(16, 185, 129, 0)'
      ],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.anime-nav-link',
      translateY: [0, -3, 0],
      duration: 3000,
      delay: anime.stagger(200),
      loop: true,
      easing: 'easeInOutSine'
    });

    anime.timeline({
      loop: true,
      direction: 'alternate',
    })
    .add({
      targets: '.anime-desc-word-outer',
      translateY: [-5, 0],
      scale: [1.05, 1],
      color: ['#0ea5e9', '#94a3b8'],
      duration: 1500,
      easing: 'easeInOutQuad',
      delay: anime.stagger(100),
      endDelay: 75
    });

    return () => observer.disconnect();
  }, []);

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
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-max transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-emerald-500/10' : 'shadow-md shadow-black/20'}`}>
        <nav
          className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3"
        >
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold text-white tracking-tight flex items-center gap-2 md:mr-6"
          >
            <Code size={20} className="text-emerald-400" />
            <span className="hidden sm:inline-block">
              Porto<span className="text-emerald-400">folio</span>.
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 pr-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 py-1 after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-center after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 md:hidden bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col p-4 gap-2 text-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors py-3"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center min-h-screen md:min-h-[800px] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto max-w-4xl text-center anime-reveal" data-y="20">
          <div
          >
            <div
              className="mb-6 flex justify-center"
            >
              <div
                className="anime-pulse-shadow inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20"
              >
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full bg-emerald-400 rounded-full opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span>Available for Internships, Freelance, and Full-time.</span>
              </div>
            </div>
            <h1 className="w-full max-w-[90vw] md:max-w-3xl lg:max-w-4xl mx-auto mb-6 select-none flex justify-center" aria-label="Muhammad Rafli">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" className="w-full h-auto" aria-hidden="true">
                <defs>
                  <pattern id="slidePattern" ref={patternRef} patternUnits="userSpaceOnUse" width="1200" height="200"></pattern>
                </defs>
                <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="115" fontWeight="900" fill="url(#slidePattern)">
                  Muhammad Rafli
                </text>
              </svg>
            </h1>
            <AnimatedText 
              text="Mahasiswa Teknik Informatika yang fokus menciptakan aplikasi modern, cepat, dan responsif." 
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed text-center"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                href="https://drive.usercontent.google.com/download?id=1-d59BwPly__rCUaWQMaa6mEC0-_OxIfU&export=download&authuser=0&confirm=t&uuid=a7ab45f3-f097-454c-81bf-4b3505ce7fef&at=AGN2oQ2YFwWM1on6PxF3KV9B6aeZ:1773501828810"
                variant="outline"
                icon={ExternalLink}
              >
                Unduh Resume
              </Button> */}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center cursor-pointer anime-reveal hover:scale-110 transition-transform" data-delay="1000"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div
            className="flex items-center justify-center p-2 anime-bounce"
          >
            <ChevronDown className="w-8 h-8 text-slate-500 hover:text-emerald-400 transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionHeading>Tentang Saya</SectionHeading>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div
              className="relative group anime-reveal" data-x="-30"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform opacity-20"></div>
              <img
                src="https://ik.imagekit.io/2xthk8ud4/3.png?auto=format&fit=crop&q=80&w=400"
                alt="Profile"
                className="relative rounded-2xl shadow-2xl blur-[20px] hover:blur-0 transition-all duration-500 w-full object-cover aspect-[4/5]"
              />
            </div>

            <div
              className="space-y-6 anime-reveal" data-x="30"
            >
              <AnimatedText 
                text="Sebagai mahasiswa Informatika semester akhir, saya memiliki keinginan kuat pada dunia software engineering. Saya percaya bahwa kode yang bersih sama pentingnya dengan desain yang indah." 
                className="text-lg md:text-xl text-slate-400 leading-relaxed text-justify"
              />
              <AnimatedText 
                text="Saya berusaha tidak hanya menulis kode, tetapi juga memecahkan masalah. Fokus saya adalah menciptakan solusi yang skalabel, mudah dipelihara, dan memberikan pengalaman pengguna yang luar biasa." 
                className="text-lg md:text-xl text-slate-400 leading-relaxed text-justify"
              />
              {/* <div className="mt-8">
                <div>
                  <h4 className="text-emerald-400 font-bold text-lg">3.67</h4>
                  <p className="text-sm text-slate-500">IPK Saat Ini</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading>Tech Stack</SectionHeading>

          <div className="flex flex-col gap-16 mt-16 [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
            
            {/* Row 1 (Moves Left) */}
            <div className="flex w-full overflow-hidden">
              <div className="flex animate-infinite-scroll items-center w-max">
                {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-4 group w-32 md:w-40 shrink-0">
                    <tech.icon className="text-5xl md:text-6xl text-slate-500 group-hover:text-white transition-colors duration-300" />
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors duration-300">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex animate-infinite-scroll items-center w-max" aria-hidden="true">
                {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
                  <div key={`duplicate-${i}`} className="flex flex-col items-center justify-center gap-4 group w-32 md:w-40 shrink-0">
                    <tech.icon className="text-5xl md:text-6xl text-slate-500 group-hover:text-white transition-colors duration-300" />
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors duration-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (Moves Right) */}
            <div className="flex w-full overflow-hidden">
              <div className="flex animate-infinite-scroll-reverse items-center w-max">
                {[...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-4 group w-32 md:w-40 shrink-0">
                    <tech.icon className="text-5xl md:text-6xl text-slate-500 group-hover:text-white transition-colors duration-300" />
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors duration-300">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex animate-infinite-scroll-reverse items-center w-max" aria-hidden="true">
                {[...TECH_ROW_2, ...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
                  <div key={`duplicate-${i}`} className="flex flex-col items-center justify-center gap-4 group w-32 md:w-40 shrink-0">
                    <tech.icon className="text-5xl md:text-6xl text-slate-500 group-hover:text-white transition-colors duration-300" />
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors duration-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeading>Galeri Projek</SectionHeading>

          <div className="overflow-hidden py-8 -mx-6 md:mx-0">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[1, 2].map((set) => (
                <div key={set} className="flex gap-6 pr-6" aria-hidden={set === 2 ? 'true' : 'false'}>
                  {PROJECTS.map((project, index) => (
                    <div
                      key={`${set}-${index}`}
                      className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 flex flex-col w-[85vw] sm:w-[340px] lg:w-[380px] shrink-0 self-stretch hover:-translate-y-2"
                    >
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="p-2 bg-slate-800 rounded-full text-white hover:bg-emerald-500 transition-colors"
                        title="View Code"
                      >
                        <Github size={20} />
                      </a>
                    )}

                    <a
                      href={project.demo}
                      className="p-2 bg-slate-800 rounded-full text-white hover:bg-emerald-500 transition-colors"
                      title="Live Demo"
                    >
                      <Globe size={20} />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-slate-800 text-emerald-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="text-center mt-12">
            <Button variant="outline" href="https://github.com/Atheraf3" icon={Github}>
              Lihat Proyek Lainnya di GitHub
            </Button>
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-4xl text-center">
          <SectionHeading>Hubungi Saya</SectionHeading>

          <div
            className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm anime-reveal" data-y="20"
          >
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Mari Berdiskusi!</h3>
                <p className="text-slate-400 leading-relaxed">
                  Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau kesempatan
                  menjadi bagian dari visi Anda. Hubungi saya melalui salah satu platform di bawah
                  ini.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Aktif mencari peluang baru
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  {
                    icon: <Mail size={24} />,
                    href: 'mailto:r4flimhmmd@gmail.com',
                    label: 'Email',
                    color: 'hover:text-red-500 hover:border-red-500',
                  },
                  {
                    icon: <MessageCircle size={24} />,
                    href: 'https://wa.me/6281213014738',
                    label: 'WhatsApp',
                    color: 'hover:text-green-500 hover:border-green-500',
                  },
                  {
                    icon: <Linkedin size={24} />,
                    href: 'https://linkedin.com/in/mhmmdrafli3',
                    label: 'LinkedIn',
                    color: 'hover:text-blue-500 hover:border-blue-500',
                  },
                  {
                    icon: <Github size={24} />,
                    href: 'https://github.com/Atheraf3',
                    label: 'GitHub',
                    color: 'hover:text-white hover:border-white',
                  },
                  {
                    icon: <Instagram size={24} />,
                    href: 'https://instagram.com/_.mrafli',
                    label: 'Instagram',
                    color: 'hover:text-pink-500 hover:border-pink-500',
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className={`group relative w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} shadow-lg shadow-black/20 hover:-translate-y-1`}
                  >
                    {social.icon}
                    {/* Tooltip */}
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-700 translate-y-2 group-hover:translate-y-0 shadow-xl">
                      {social.label}
                      {/* Tooltip Arrow */}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800" />
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-800/50">
                <p className="text-slate-500 text-sm mb-6">
                  Atau kirimkan pesan langsung melalui email
                </p>
                <Button href="mailto:r4flimhmmd@gmail.com" icon={Mail} variant="primary">
                  Kirim Pesan Cepat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Code className="text-emerald-400 w-5 h-5" />
            <span className="font-bold text-xl text-white">
              Porto<span className="text-emerald-400">folio</span>.
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-6">Didesain dan dibangun dengan hati.</p>
          <div className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Muhammad Rafli. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
