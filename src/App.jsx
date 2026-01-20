import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';

// --- KOLEKSI LOGO BRAND ---
const ICONS = {
  email: <svg viewBox="0 0 24 24" fill="#EA4335" className="w-6 h-6"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="#E1306C" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="#0A66C2" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  discord: <svg viewBox="0 0 24 24" fill="#5865F2" className="w-6 h-6"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/></svg>,
  twitter: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  website: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
};

// --- HELPER UNTUK CROP IMAGE ---
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }, 'image/jpeg');
  });
}

// --- DATA DEFAULT ---
const defaultStories = [
  { 
    id: 1, 
    title: "Malam di Neo-Jakarta", 
    category: "One-Shot", 
    date: "20 Jan 2026", 
    image: null, 
    snippet: "Lampu neon berkedip seirama detak jantung kota...", 
    content: "Lampu neon berkedip seirama detak jantung kota. Di sudut gang sempit yang basah oleh hujan asam, aku berdiri menanti kontak misterius itu. \n\n'Kau telat,' suara berat terdengar dari balik bayangan.\n'Macet di sektor 7,' jawabku singkat sambil merapatkan jaket.\n\nMereka bilang kota ini tidak pernah tidur, tapi bagiku, kota ini sedang bermimpi buruk. Dan aku adalah salah satu yang terjebak di dalamnya."
  }
];

const defaultProjects = [{ id: 1, title: "Smart Parking System", role: "Android Dev", tech: "Java/Firebase", image: null, desc: "Aplikasi reservasi parkir kampus UIB." }];

// UPDATE: Menambahkan field 'desc' untuk efek hover
const defaultGames = [
    { 
        id: 1, 
        title: "Minecraft", 
        status: "Server Admin", 
        rank: "Veteran", 
        image: null,
        desc: "Mengelola private server Survival dengan 50+ pemain aktif. Berpengalaman dalam konfigurasi plugin Spigot/Paper dan manajemen komunitas."
    }
];

const defaultSkills = ["Java", "Python", "React", "Firebase", "Android Studio", "Tailwind"];

const defaultSocials = [
  { id: 'email', name: "Gmail", icon: "email", link: "mailto:taufik@student.uib.ac.id", display: "taufik@student.uib.ac.id" },
  { id: 'github', name: "Github", icon: "github", link: "https://github.com/taufik", display: "github.com/taufik" },
  { id: 'instagram', name: "Instagram", icon: "instagram", link: "https://instagram.com/taufik", display: "@taufik_ig" },
  { id: 'linkedin', name: "LinkedIn", icon: "linkedin", link: "https://linkedin.com/in/taufik", display: "M. Taufik Hidayat" },
  { id: 'discord', name: "Discord", icon: "discord", link: "https://discord.com/users/taufik", display: "taufik#1234" }
];

// --- ANIMATION VARIANTS ---
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

export default function App() {
  const [isDark, setIsDark] = useState(() => JSON.parse(localStorage.getItem('theme')) ?? true);
  const [profileImg, setProfileImg] = useState(() => localStorage.getItem('profileImg') || null);
  
  const [stories, setStories] = useState(() => JSON.parse(localStorage.getItem('stories')) || defaultStories);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('projects')) || defaultProjects);
  const [games, setGames] = useState(() => JSON.parse(localStorage.getItem('games')) || defaultGames);
  const [skills, setSkills] = useState(() => JSON.parse(localStorage.getItem('skills')) || defaultSkills);
  const [socials, setSocials] = useState(() => JSON.parse(localStorage.getItem('socials')) || defaultSocials);

  const [activeTab, setActiveTab] = useState("projects");
  const [storyFilter, setStoryFilter] = useState("All");
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // State untuk Reader Mode
  const [readingStory, setReadingStory] = useState(null);
  
  const [cropImage, setCropImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropAspect, setCropAspect] = useState(1);
  const [cropTarget, setCropTarget] = useState(null);

  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  useEffect(() => { localStorage.setItem('theme', JSON.stringify(isDark)); }, [isDark]);
  useEffect(() => { if(profileImg) localStorage.setItem('profileImg', profileImg); }, [profileImg]);
  useEffect(() => { localStorage.setItem('stories', JSON.stringify(stories)); }, [stories]);
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('games', JSON.stringify(games)); }, [games]);
  useEffect(() => { localStorage.setItem('skills', JSON.stringify(skills)); }, [skills]);
  useEffect(() => { localStorage.setItem('socials', JSON.stringify(socials)); }, [socials]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => { setCroppedAreaPixels(croppedAreaPixels); }, []);
  const initiateCrop = (e, targetType, targetId = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCropImage(reader.result);
        setCropTarget({ type: targetType, id: targetId });
        if (targetType === 'profile') setCropAspect(1 / 1);
        else if (targetType === 'projects') setCropAspect(16 / 9);
        else if (targetType === 'games') setCropAspect(3 / 4);
        else if (targetType === 'stories') setCropAspect(2 / 3);
      };
    }
    e.target.value = null; 
  };
  const saveCroppedImage = async () => {
    try {
      const croppedImageBase64 = await getCroppedImg(cropImage, croppedAreaPixels);
      if (cropTarget.type === 'profile') setProfileImg(croppedImageBase64);
      else {
        const updateList = (list) => list.map(item => item.id === cropTarget.id ? { ...item, image: croppedImageBase64 } : item);
        if (cropTarget.type === 'stories') setStories(updateList(stories));
        if (cropTarget.type === 'projects') setProjects(updateList(projects));
        if (cropTarget.type === 'games') setGames(updateList(games));
      }
      setCropImage(null); setZoom(1);
    } catch (e) { console.error(e); }
  };

  const openEditModal = (item, type) => { setEditingItem({ ...item, type }); };
  const saveEditText = () => {
    if (!editingItem) return;
    const { type, ...data } = editingItem;
    if (type === 'projects') setProjects(projects.map(p => p.id === data.id ? data : p));
    if (type === 'games') setGames(games.map(g => g.id === data.id ? data : g));
    if (type === 'stories') setStories(stories.map(s => s.id === data.id ? data : s));
    if (type === 'socials') setSocials(socials.map(s => s.id === data.id ? data : s));
    setEditingItem(null);
  };

  const addSkill = () => { const newSkill = prompt("Masukkan nama skill baru:"); if (newSkill) setSkills([...skills, newSkill]); };
  const removeSkill = (skillToRemove) => { if(confirm(`Hapus skill ${skillToRemove}?`)) setSkills(skills.filter(s => s !== skillToRemove)); };
  
  const addSocial = () => {
     const id = Date.now().toString();
     setSocials([...socials, { id, name: "New Link", icon: "website", link: "https://", display: "Link" }]);
  };
  const deleteSocial = (id) => {
    if(confirm("Hapus link ini?")) setSocials(socials.filter(s => s.id !== id));
  }

  const exportData = () => {
    const data = { profileImg, stories, projects, games, skills, socials, theme: isDark };
    const link = document.createElement("a");
    link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    link.download = "my-personal-space-backup.json";
    link.click();
    alert("Data berhasil didownload!");
  };
  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (confirm("Restore backup?")) {
            setProfileImg(data.profileImg || null); setStories(data.stories || []); setProjects(data.projects || []); setGames(data.games || []); setSkills(data.skills || []); setSocials(data.socials || defaultSocials); setIsDark(data.theme ?? true);
            alert("Data dipulihkan!");
          }
        } catch { alert("File backup rusak!"); }
      };
      reader.readAsText(file);
    }
  };

  // --- ADD FUNCTIONS ---
  const addStory = () => setStories([{ id: Date.now(), title: "New Story", category: "One-Shot", date: "Just Now", image: null, snippet: "Sinopsis singkat...", content: "Tulis cerita lengkap di sini..." }, ...stories]);
  const addProject = () => setProjects([{ id: Date.now(), title: "New Project", role: "Owner", tech: "Stack", image: null, desc: "Deskripsi project..." }, ...projects]);
  const addGame = () => setGames([{ id: Date.now(), title: "New Game", status: "Playing", rank: "Newbie", image: null, desc: "Deskripsi pengalaman bermain..." }, ...games]);
  const filteredStories = storyFilter === "All" ? stories : stories.filter(s => s.category === storyFilter);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen w-full font-sans transition-colors duration-500 bg-slate-100 text-slate-800 dark:bg-[#0a0a0a] dark:text-zinc-200 overflow-x-hidden">
        
        {/* === MODAL BACA CERITA (READER) === */}
        <AnimatePresence>
          {readingStory && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden">
               <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 backdrop-blur">
                  <h2 className="text-lg font-bold truncate max-w-[70%]">{readingStory.title}</h2>
                  <button onClick={() => setReadingStory(null)} className="px-4 py-2 rounded-full bg-slate-200 dark:bg-zinc-800 font-bold text-sm hover:scale-105 transition-transform">Close ✕</button>
               </div>
               <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-3xl mx-auto w-full">
                  <div className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {readingStory.content ? readingStory.content.split('\n').map((par, i) => (
                      <p key={i} className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{par}</p>
                    )) : <p className="italic text-slate-500">Belum ada konten cerita.</p>}
                  </div>
                  <div className="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800 text-center text-slate-400 text-sm">
                    — End of Story —
                  </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* === MODAL EDIT TEXT === */}
        {editingItem && (
          <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-lg border border-slate-200 dark:border-zinc-700 shadow-2xl my-auto">
              <h3 className="text-xl font-bold mb-4">Edit Details ✏️</h3>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {editingItem.type === 'socials' ? (
                  <>
                     <div>
                       <label className="text-xs font-bold uppercase text-slate-400">Platform Icon</label>
                       <select className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 outline-none" value={editingItem.icon} onChange={e => setEditingItem({...editingItem, icon: e.target.value})}>
                         <option value="email">Gmail / Email</option>
                         <option value="github">Github</option>
                         <option value="instagram">Instagram</option>
                         <option value="linkedin">LinkedIn</option>
                         <option value="discord">Discord</option>
                         <option value="twitter">Twitter / X</option>
                         <option value="website">Website / Link</option>
                       </select>
                     </div>
                     <div><label className="text-xs font-bold uppercase text-slate-400">Display Text</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.display} onChange={e => setEditingItem({...editingItem, display: e.target.value})} /></div>
                     <div><label className="text-xs font-bold uppercase text-slate-400">Link URL</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.link} onChange={e => setEditingItem({...editingItem, link: e.target.value})} /></div>
                  </>
                ) : (
                  <>
                    <div><label className="text-xs font-bold uppercase text-slate-400">Title / Name</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 border border-transparent focus:border-indigo-500 outline-none" value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} /></div>
                    
                    {editingItem.type === 'projects' && (
                      <>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Role</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.role} onChange={e => setEditingItem({...editingItem, role: e.target.value})} /></div>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Tech Stack</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.tech} onChange={e => setEditingItem({...editingItem, tech: e.target.value})} /></div>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Description</label><textarea className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 h-24" value={editingItem.desc} onChange={e => setEditingItem({...editingItem, desc: e.target.value})} /></div>
                      </>
                    )}
                    
                    {editingItem.type === 'games' && (
                      <>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Status</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})} /></div>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Rank</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.rank} onChange={e => setEditingItem({...editingItem, rank: e.target.value})} /></div>
                        {/* UPDATE: Input Deskripsi Game */}
                        <div><label className="text-xs font-bold uppercase text-indigo-400">Deskripsi (Hover Reveal)</label><textarea className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 h-24" value={editingItem.desc || ''} onChange={e => setEditingItem({...editingItem, desc: e.target.value})} placeholder="Tulis deskripsi yang akan muncul saat di-hover..." /></div>
                      </>
                    )}
                    
                    {editingItem.type === 'stories' && (
                      <>
                         <div><label className="text-xs font-bold uppercase text-slate-400">Category</label><select className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 outline-none" value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})}><option value="One-Shot">One-Shot</option><option value="Series">Series</option><option value="Draft">Draft</option></select></div>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Date</label><input className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800" value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})} /></div>
                        <div><label className="text-xs font-bold uppercase text-slate-400">Synopsis (Short)</label><textarea className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 h-16" value={editingItem.snippet} onChange={e => setEditingItem({...editingItem, snippet: e.target.value})} /></div>
                        <div><label className="text-xs font-bold uppercase text-indigo-400">Isi Cerita Lengkap</label><textarea className="w-full p-2 rounded bg-slate-100 dark:bg-zinc-800 h-64 font-mono text-sm" value={editingItem.content || ''} onChange={e => setEditingItem({...editingItem, content: e.target.value})} placeholder="Tulis ceritamu disini..." /></div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button onClick={() => setEditingItem(null)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                <button onClick={saveEditText} className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL CROPPER === */}
        {cropImage && (
          <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-2xl h-[60vh] bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700">
              <Cropper image={cropImage} crop={crop} zoom={zoom} aspect={cropAspect} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-md">
              <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} className="w-full accent-indigo-500"/>
              <div className="flex gap-4">
                <button onClick={() => setCropImage(null)} className="px-6 py-2 rounded-full font-bold bg-zinc-700 text-white">Batal</button>
                <button onClick={saveCroppedImage} className="px-6 py-2 rounded-full font-bold bg-indigo-600 text-white shadow-lg">Simpan Gambar ✅</button>
              </div>
            </div>
          </div>
        )}

        {/* BUTTON CONTROLS */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
          <AnimatePresence>
            {editMode && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex flex-col gap-2">
                <button onClick={exportData} className="px-4 py-2 rounded-xl font-bold shadow-lg bg-emerald-600 text-white text-sm hover:scale-105 flex items-center gap-2">💾 Save Backup</button>
                <button onClick={() => importInputRef.current.click()} className="px-4 py-2 rounded-xl font-bold shadow-lg bg-blue-600 text-white text-sm hover:scale-105 flex items-center gap-2">📂 Load Backup</button>
                <input type="file" ref={importInputRef} className="hidden" onChange={importData} accept=".json" />
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setEditMode(!editMode)} className={`px-6 py-3 rounded-full font-bold shadow-xl transition-all ${editMode ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'}`}>{editMode ? "Done 🔒" : "Edit ✏️"}</button>
        </div>

        <div className="w-full px-4 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === SIDEBAR KIRI === */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
              <div className="relative w-40 h-40 mx-auto rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 cursor-pointer group" onClick={() => fileInputRef.current.click()}>
                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {profileImg ? <img src={profileImg} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl font-bold text-indigo-500">MT</span>}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-white text-xs font-bold">Change</div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => initiateCrop(e, 'profile')} accept="image/*"/>
              </div>
              <div className="text-center mt-6">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">Muhammad Taufik Hidayat Pratama</h1>
                <p className="text-indigo-500 font-medium text-sm">Mahasiswa TI • UIB</p>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800 text-left">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">About Me</h3>
                  <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Mahasiswa Teknik Informatika di Universitas Internasional Batam (UIB). Saat ini sedang fokus mendalami pengembangan aplikasi Android dan kecerdasan buatan (AI). Di luar koding, saya aktif menulis cerita fiksi, bermain Game dan membaca komik. Bercita-cita menciptakan solusi teknologi yang bermanfaat bagi banyak orang.
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-400 dark:text-zinc-500"><p>🎂 11 Juni 2005 (20 Tahun) • 📍 Batam</p></div>
              </div>
              <button onClick={() => setIsDark(!isDark)} className="w-full mt-6 py-3 rounded-xl font-medium text-sm border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800">{isDark ? "Switch to Light ☀️" : "Switch to Dark 🌙"}</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{delay: 0.1}} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
               <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Tech Stack</h3>{editMode && <button onClick={addSkill} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-200">+ Add</button>}</div>
               <div className="flex flex-wrap gap-2">
                 {skills.map((skill, i) => (
                   <span key={i} onClick={() => editMode && removeSkill(skill)} className={`px-3 py-1 rounded-full text-xs font-medium border ${editMode ? 'cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-200' : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'}`}>
                     {skill} {editMode && "×"}
                   </span>
                 ))}
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{delay: 0.2}} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-lg">
               <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Connect</h3>
                  {editMode && <button onClick={addSocial} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-200">+ New</button>}
               </div>
               <p className="text-sm text-slate-500 dark:text-zinc-500 mb-4">Open for collaboration on Android & AI Projects.</p>
               <div className="space-y-3 text-sm font-medium">
                 {socials.map((s) => (
                   <div key={s.id} className="group flex items-center justify-between">
                     <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity flex-1 text-slate-700 dark:text-zinc-300">
                       <span className="shrink-0">{ICONS[s.icon] || ICONS.website}</span>
                       <span className="truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{s.display}</span>
                     </a>
                     {editMode && (
                       <div className="flex gap-1">
                         <button onClick={() => openEditModal(s, 'socials')} className="text-xs bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded hover:bg-indigo-100 dark:hover:bg-zinc-700">Edit</button>
                         <button onClick={() => deleteSocial(s.id)} className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white">×</button>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
            </motion.div>
          </div>

          {/* === CONTENT SECTION KANAN === */}
          <div className="lg:col-span-9">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {['projects', 'games', 'stories'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-2xl text-lg font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-slate-400 dark:bg-zinc-900 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
              ))}
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                
                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                     <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">My Works</h3>{editMode && <button onClick={addProject} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform">+ New</button>}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      <AnimatePresence>
                        {projects.map((p) => (
                          <motion.div layout variants={itemVariants} initial="hidden" animate="visible" exit="exit" key={p.id} className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 group">
                            <div className="h-48 bg-slate-200 dark:bg-zinc-800 relative">
                               {p.image ? <img src={p.image} className="w-full h-full object-cover" alt={p.title}/> : <div className="w-full h-full flex items-center justify-center text-4xl">💻</div>}
                               {editMode && <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"><label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-bold text-xs hover:scale-105"><span>📷 Cover</span><input type="file" className="hidden" onChange={(e) => initiateCrop(e, 'projects', p.id)}/></label></div>}
                            </div>
                            <div className="p-6">
                              <h3 className="font-bold text-xl mb-1">{p.title}</h3>
                              <p className="text-xs font-mono text-indigo-500 mb-4">{p.tech}</p>
                              <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-3">{p.desc}</p>
                              {editMode && <button onClick={() => openEditModal(p, 'projects')} className="w-full mt-4 py-2 bg-slate-100 dark:bg-zinc-800 text-xs font-bold rounded-lg hover:bg-indigo-100 dark:hover:bg-zinc-700 hover:text-indigo-600 transition-colors">Edit Text 📝</button>}
                            </div>
                            {editMode && <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))} className="absolute top-3 right-3 z-20 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg font-bold text-xs hover:bg-red-600">✕</button>}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* GAMES TAB (UPDATED: Hover Reveal Effect) */}
                {activeTab === 'games' && (
                  <motion.div key="games" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Gaming Center</h3>{editMode && <button onClick={addGame} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform">+ Add</button>}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <AnimatePresence>
                        {games.map((g) => (
                          <motion.div layout variants={itemVariants} initial="hidden" animate="visible" exit="exit" key={g.id} className="group relative aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-zinc-900 overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-lg cursor-pointer">
                             {/* IMAGE - Zoom on hover */}
                             <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                                {g.image ? <img src={g.image} className="w-full h-full object-cover" alt={g.title}/> : <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white"><span className="text-4xl">🎮</span></div>}
                             </div>
                             
                             {/* OVERLAY GRADIENT */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300" />
                             
                             {/* CONTENT - Slide Up Animation */}
                             <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                                <h4 className="font-bold text-white text-lg leading-tight mb-1">{g.title}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                   <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">{g.rank}</span>
                                   <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{g.status}</span>
                                </div>
                                
                                {/* DESKRIPSI - Muncul saat hover */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {g.desc || "Tidak ada deskripsi tambahan."}
                                        </p>
                                    </div>
                                </div>
                             </div>

                             {editMode && (
                               <>
                                 <div className="absolute inset-0 bg-black/60 flex flex-col gap-2 items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <label className="cursor-pointer bg-white text-black px-3 py-1 rounded-full font-bold text-[10px] hover:scale-105"><span>📷 Ganti</span><input type="file" className="hidden" onChange={(e) => initiateCrop(e, 'games', g.id)}/></label>
                                    <button onClick={() => openEditModal(g, 'games')} className="bg-indigo-600 text-white px-3 py-1 rounded-full font-bold text-[10px] hover:scale-105">Edit 📝</button>
                                 </div>
                                 <button onClick={(e) => {e.preventDefault(); setGames(games.filter(x => x.id !== g.id))}} className="absolute top-2 right-2 z-20 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md text-[10px] hover:bg-red-700">✕</button>
                               </>
                             )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* STORIES TAB */}
                {activeTab === 'stories' && (
                  <motion.div key="stories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <h3 className="text-xl font-bold">My Stories</h3>
                      <div className="flex gap-2 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-slate-200 dark:border-zinc-800">
                        {["All", "One-Shot", "Series", "Draft"].map(f => (
                          <button key={f} onClick={() => setStoryFilter(f)} className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${storyFilter === f ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>{f}</button>
                        ))}
                      </div>
                      {editMode && <button onClick={addStory} className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform">+ Write</button>}
                    </div>
                    <div className="space-y-6">
                      <AnimatePresence>
                        {filteredStories.map((s) => (
                          <motion.div layout variants={itemVariants} initial="hidden" animate="visible" exit="exit" key={s.id} className="relative flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-500 transition-all group">
                            <div className="w-full md:w-48 aspect-[2/3] bg-slate-200 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 relative">
                              {s.image ? <img src={s.image} className="w-full h-full object-cover" alt={s.title}/> : <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-4xl">📖</div>}
                              <span className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded backdrop-blur-sm">{s.category}</span>
                              {editMode && <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10"><label className="cursor-pointer bg-white text-black px-3 py-2 rounded-full font-bold text-xs hover:scale-105"><span>📷 Cover</span><input type="file" className="hidden" onChange={(e) => initiateCrop(e, 'stories', s.id)}/></label></div>}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div><h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">{s.title}</h2><span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-xs font-mono">{s.date}</span></div>
                                {editMode && <button onClick={() => setStories(stories.filter(x => x.id !== s.id))} className="text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-lg text-sm font-bold transition-colors">Delete 🗑️</button>}
                              </div>
                              <p className="mt-4 text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-3">{s.snippet}</p>
                              <div className="flex items-center gap-4 mt-6">
                                <button onClick={() => setReadingStory(s)} className="text-indigo-500 font-bold text-sm hover:underline flex items-center gap-1">Read Full Story <span>→</span></button>
                                {editMode && <button onClick={() => openEditModal(s, 'stories')} className="text-xs bg-slate-200 dark:bg-zinc-700 px-3 py-1 rounded font-bold hover:bg-indigo-100 dark:hover:bg-zinc-600">Edit Details 📝</button>}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}