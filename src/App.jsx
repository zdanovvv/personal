import { useState } from 'react';
import { motion } from 'framer-motion';

// --- DATA PRIBADI ---
const projects = [
  { title: "Smart Parking", type: "Android App", status: "Selesai", tech: "Java" },
  { title: "Face Recognition", type: "Skripsi", status: "In Progress", tech: "Python/ML" }
];

const games = [
  { title: "Minecraft", activity: "Hosting Server", status: "Online" },
  { title: "King's Avatar", activity: "Reading Novel", status: "Chapter 1042" }
];

const stories = [
  { title: "Malam di Neo-Jakarta", genre: "Sci-Fi", readTime: "5 min" },
  { title: "Catatan Skripsi", genre: "Jurnal", readTime: "2 min" }
];

export default function App() {
  // State untuk Dark Mode (Default: True/Gelap)
  const [isDark, setIsDark] = useState(true);

  return (
    // Wrapper Utama untuk Logic Dark Mode
    <div className={isDark ? "dark" : ""}>
      
      {/* Container Halaman dengan Transisi Warna Halus */}
      <div className="min-h-screen font-sans p-4 md:p-8 transition-colors duration-500
        bg-slate-50 text-slate-800 
        dark:bg-[#09090b] dark:text-zinc-200"
      >
        
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* --- HEADER --- */}
          <header className="flex flex-col md:flex-row justify-between items-end pb-6 border-b border-slate-200 dark:border-zinc-800 transition-colors duration-500">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Halo, Folkz.
              </h1>
              <p className="text-slate-500 dark:text-zinc-500 mt-2">
                Welcome back to your personal command center.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm font-medium">
              {/* TOMBOL TOGGLE THEME */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-white border border-slate-200 shadow-sm 
                dark:bg-zinc-900 dark:border-zinc-700 hover:scale-110 transition-all"
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>

              <span className="hidden md:flex px-3 py-1 bg-white rounded-full border border-slate-200 shadow-sm items-center gap-2 dark:bg-zinc-900 dark:border-zinc-800">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Available
              </span>
            </div>
          </header>

          {/* --- MAIN GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* 1. ABOUT ME */}
            <motion.div whileHover={{ y: -2 }} className="md:col-span-8 p-8 rounded-3xl shadow-sm border transition-colors duration-500
              bg-white border-slate-200 
              dark:bg-zinc-900/50 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">About Me</h2>
              <p className="leading-relaxed text-lg text-slate-600 dark:text-zinc-400">
                Mahasiswa tingkat akhir yang hidup di antara baris kode dan paragraf cerita. 
                Saat ini sedang fokus menamatkan <span className="font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 px-1 rounded">Skripsi</span> tentang Machine Learning, 
                sambil ngulik <span className="font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-1 rounded">Android Dev</span>.
              </p>
            </motion.div>

            {/* 2. PROGRESS BAR */}
            <motion.div whileHover={{ y: -2 }} className="md:col-span-4 p-8 rounded-3xl shadow-sm border flex flex-col justify-center transition-colors duration-500
              bg-white border-slate-200 
              dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="text-sm font-mono uppercase mb-4 text-slate-400 dark:text-zinc-500">Current Focus</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>Skripsi (Bab 4)</span>
                    <span className="text-indigo-600 dark:text-indigo-400">75%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <div className="h-full bg-indigo-500 w-[75%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                    <span>Next Story</span>
                    <span className="text-emerald-600 dark:text-emerald-400">30%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <div className="h-full bg-emerald-500 w-[30%]"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. GAMING & HOBBY */}
            <motion.div whileHover={{ y: -2 }} className="md:col-span-4 p-6 rounded-3xl shadow-sm border transition-colors duration-500
              bg-linear-to-br from-indigo-50 to-white border-indigo-100 
              dark:from-indigo-900/10 dark:to-zinc-900 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-zinc-200">
                🎮 Gaming Status
              </h3>
              <div className="space-y-3">
                {games.map((g, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl border shadow-sm transition-colors duration-500
                    bg-white border-indigo-100/50 
                    dark:bg-black/20 dark:border-white/5">
                    <div>
                      <div className="font-medium text-slate-700 dark:text-zinc-300">{g.title}</div>
                      <div className="text-xs text-slate-500 dark:text-zinc-500">{g.activity}</div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">{g.status}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. PROJECTS */}
            <motion.div whileHover={{ y: -2 }} className="md:col-span-4 p-6 rounded-3xl shadow-sm border transition-colors duration-500
              bg-white border-slate-200 
              dark:bg-zinc-900/50 dark:border-zinc-800">
               <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">💻 Kuliah & Code</h3>
               <div className="space-y-3">
                {projects.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl cursor-pointer border border-transparent transition-colors duration-500
                    bg-slate-50 hover:bg-slate-100 hover:border-slate-200 
                    dark:bg-zinc-800/30 dark:hover:bg-zinc-800/60 dark:hover:border-zinc-700">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-slate-800 dark:text-zinc-200">{p.title}</h4>
                      {p.status === "In Progress" && <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>}
                    </div>
                    <p className="text-xs mt-1 text-slate-500 dark:text-zinc-500">{p.type} • {p.tech}</p>
                  </div>
                ))}
               </div>
            </motion.div>

            {/* 5. ARSIP CERITA */}
            <motion.div whileHover={{ y: -2 }} className="md:col-span-4 p-6 rounded-3xl shadow-sm border transition-colors duration-500
              bg-white border-slate-200 
              dark:bg-zinc-900/50 dark:border-zinc-800">
              <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">📝 Arsip Cerita</h3>
              <div className="space-y-4">
                {stories.map((s, i) => (
                  <div key={i} className="group flex justify-between items-center pb-2 last:border-0 cursor-pointer border-b transition-colors duration-500
                    border-slate-100 
                    dark:border-zinc-800">
                    <div>
                      <div className="font-medium transition-colors group-hover:text-indigo-600 dark:text-zinc-300 dark:group-hover:text-indigo-400">{s.title}</div>
                      <div className="text-xs text-slate-400 dark:text-zinc-600">{s.genre}</div>
                    </div>
                    <div className="text-xs font-mono px-2 py-1 rounded bg-slate-50 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500">{s.readTime}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2 text-xs font-medium text-center border border-dashed rounded-lg transition-all
                border-slate-300 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 
                dark:border-zinc-700 dark:text-zinc-500 dark:hover:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-800">
                + Tulis Cerita Baru
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}