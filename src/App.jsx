import { motion } from 'framer-motion';

const projects = [
  { title: "Smart Parking App", tech: "Java, Android Studio, Firebase", desc: "Aplikasi reservasi parkir otomatis untuk efisiensi area komersial." },
  { title: "Face Recognition Attendance", tech: "Python, ML, React", desc: "Sistem absensi otomatis menggunakan pengenalan wajah untuk skripsi." }
];

const stories = [
  { title: "Dunia di Balik Layar", tag: "Personal", date: "Jan 2026" },
  { title: "Logika vs Imajinasi", tag: "Fiction", date: "Dec 2025" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
      
      {/* NAVBAR */}
      <nav className="p-8 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-tighter italic text-indigo-500">MY.SPACE</h1>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#stories" className="hover:text-white transition-all">Stories</a>
          <a href="#portfolio" className="hover:text-white transition-all">Portfolio</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-4xl mx-auto px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Student & Tech Enthusiast</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4 tracking-tight leading-tight">
            Digital Architect <br /> & Storyteller.
          </h2>
          <p className="mt-8 text-zinc-400 text-lg max-w-lg leading-relaxed">
            Membangun sistem Android yang presisi dan merangkai narasi imajinatif. Selamat datang di arsip pribadi saya.
          </p>
        </motion.div>

        {/* STORIES SECTION */}
        <section id="stories" className="mt-32">
          <h3 className="text-sm font-mono text-indigo-400 mb-8 uppercase tracking-widest">// Latest Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded uppercase tracking-tighter">{s.tag}</span>
                  <span className="text-[10px] text-zinc-600 font-mono">{s.date}</span>
                </div>
                <h4 className="text-xl font-semibold mt-4 group-hover:text-indigo-300 transition-colors">{s.title}</h4>
                <p className="text-zinc-500 mt-2 text-sm">Klik untuk membaca cerita lengkap...</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="mt-32 pb-24">
          <h3 className="text-sm font-mono text-indigo-400 mb-8 uppercase tracking-widest">// Projects</h3>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center p-8 border border-zinc-800 rounded-3xl hover:bg-zinc-900/20 transition-all gap-4"
              >
                <div>
                  <h4 className="text-2xl font-bold">{p.title}</h4>
                  <p className="text-indigo-500/80 text-xs font-mono mt-1">{p.tech}</p>
                  <p className="text-zinc-500 text-sm mt-3 max-w-md">{p.desc}</p>
                </div>
                <div className="text-zinc-700 group-hover:text-indigo-500 group-hover:translate-x-2 transition-all text-3xl font-light">→</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}