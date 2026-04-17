/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "motion/react";
import { 
  Bot, 
  Gamepad2, 
  Instagram, 
  Youtube, 
  Github, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  TrendingUp,
  Lightbulb,
  Globe,
  Trophy,
  Cpu,
  ArrowLeft,
  ExternalLink,
  Mail,
  Upload,
  Send,
  CheckCircle2,
  Server,
  Link,
  Wand2,
  Download,
  CreditCard,
  FileText,
  AlertCircle,
  Monitor,
  Tablet,
  Smartphone,
  Maximize,
  RotateCcw,
  Edit3,
  Save,
  MessageCircle,
  Play,
  Menu,
  History,
  Image as ImageIcon
} from "lucide-react";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, onSnapshot, collection, query, where, orderBy, getDocFromServer } from 'firebase/firestore';
import { GoogleGenAI } from "@google/genai";
import JSZip from 'jszip';
import { auth, db, signInWithGoogle, logout } from './firebase';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const LOGO_URL = "https://i.ibb.co/vC79Nthr/Whats-App-Image-2026-03-23-at-6-49-47-PM.jpg";

// --- WEB3FORMS SETUP ---
const WEB3FORMS_KEY = "23c03e6d-8c00-4358-9f49-61fb70ad4d36";

const GlassCard = ({ children, className = "", status }: { children: ReactNode; className?: string; status?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`glass-panel p-8 md:p-10 flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div>
        {status && <div className="status-badge">{status}</div>}
        {children}
      </div>
    </motion.div>
  );
};

const Ecosystem3D = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] flex items-center justify-center perspective-2000 overflow-visible">
      <motion.div 
        animate={{ 
          rotateX: [25, 25],
          rotateY: [0, 360],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-64 h-64"
      >
        {/* Central Hub */}
        <div className="absolute inset-0 bg-blue-600 rounded-3xl shadow-2xl flex items-center justify-center text-white font-black text-2xl border-4 border-white/20" style={{ transform: "translateZ(50px)" }}>
          FUSIONHUB
        </div>
        
        {/* Orbiting Elements */}
        {[
          { icon: Bot, label: "Discord Bots", color: "bg-indigo-500", pos: "translateY(-150px) translateZ(0px)" },
          { icon: Gamepad2, label: "Roblox Games", color: "bg-red-500", pos: "translateX(150px) translateZ(0px)" },
          { icon: Globe, label: "Web Apps", color: "bg-emerald-500", pos: "translateX(-150px) translateZ(0px)" },
          { icon: Cpu, label: "Systems", color: "bg-amber-500", pos: "translateY(150px) translateZ(0px)" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 ${item.color} rounded-2xl shadow-xl flex flex-col items-center justify-center text-white p-4 border-2 border-white/20`}
            style={{ 
              transform: `${item.pos} rotateY(0deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            <item.icon className="w-8 h-8 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-center">{item.label}</span>
          </motion.div>
        ))}
        
        {/* Connecting Lines (Visual only) */}
        <div className="absolute inset-0 border-4 border-dashed border-blue-500/20 rounded-full scale-[2.5]" />
      </motion.div>
    </div>
  );
};

const ProductsSection = ({ showButtons = true, setPage }: { showButtons?: boolean; setPage?: (p: string) => void }) => (
  <section id="products-home" className="py-32 relative z-10">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Creations</h2>
        <p className="text-gray-600 font-medium">Explore the digital worlds we've built.</p>
      </div>
      {!showButtons && setPage && (
        <button 
          onClick={() => setPage('products')}
          className="px-8 py-3 rounded-full bg-white text-blue-600 border border-blue-100 font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          View All Products <Zap className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      <GlassCard status="LIVE ON DISCORD">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Fusion Bot</h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
          Enhanced automation and moderation for your community server. 
          Featuring advanced music systems and utility tools.
        </p>
        {showButtons && (
          <div className="mt-auto pt-6">
            <a 
              href="https://bot.fusionhub.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg w-full md:w-fit"
            >
              Visit bot.fusionhub.in <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </GlassCard>

      <GlassCard status="ROBLOX EXPERIENCE">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Hub World</h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
          Immersive multiplayer environments built for the Roblox ecosystem. 
          Experience smooth gameplay and modern features.
        </p>
        {showButtons && (
          <div className="mt-auto pt-6">
            <a 
              href="https://game.fusionhub.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 border border-blue-100 font-bold hover:bg-blue-50 transition-all shadow-md w-full md:w-fit"
            >
              Visit game.fusionhub.in <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </GlassCard>
    </div>
  </section>
);

const AboutSection = ({ setPage }: { setPage?: (p: string) => void }) => (
  <section className="py-32 relative z-10">
    <div className="glass-panel p-8 md:p-16">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About FusionHub</h2>
          <p className="text-gray-600 font-medium">A small software company with big ideas.</p>
        </div>
        {setPage && (
          <button 
            onClick={() => setPage('about')}
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            Learn More <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
            FusionHub is a growing software company focused on building high-quality digital solutions. 
            We prioritize user-friendly experiences and clean, professional design in every project.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-sm">
              <Zap className="w-4 h-4" /> Performance
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-600 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" /> Security
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 font-bold text-sm">
              <Cpu className="w-4 h-4" /> Scalability
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <Bot className="w-8 h-8 text-blue-600 mb-3" />
            <span className="text-sm font-bold text-gray-900">Discord Bots</span>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <Gamepad2 className="w-8 h-8 text-red-600 mb-3" />
            <span className="text-sm font-bold text-gray-900">Roblox Games</span>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <Globe className="w-8 h-8 text-emerald-600 mb-3" />
            <span className="text-sm font-bold text-gray-900">Web Apps</span>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <Target className="w-8 h-8 text-amber-600 mb-3" />
            <span className="text-sm font-bold text-gray-900">Innovation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutItem = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-5 p-5 rounded-3xl bg-white/40 border border-white/20 hover:bg-white/60 transition-all group shadow-sm"
  >
    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[16px] leading-relaxed text-gray-700 font-medium">{text}</p>
  </motion.div>
);

const AboutPage = ({ setPage }: { setPage: (p: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-5xl mx-auto px-6 py-32"
    >
      <button 
        onClick={() => setPage('home')}
        className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft className="w-6 h-6" /> Back to Home
      </button>

      <div className="glass-panel p-12 md:p-20">
        <h2 className="text-5xl font-bold mb-12 tracking-tight">ABOUT FUSIONHUB</h2>
        <div className="grid gap-6">
          <AboutItem icon={Globe} text="FusionHub is a growing software company focused on building high-quality digital solutions." delay={0.1} />
          <AboutItem icon={Gamepad2} text="We develop immersive and engaging games on Roblox with smooth gameplay and modern features." delay={0.2} />
          <AboutItem icon={Bot} text="We create advanced all-in-one Discord bots with moderation, automation, music, and utility systems." delay={0.3} />
          <AboutItem icon={Cpu} text="Our products are designed with a focus on performance, stability, and scalability." delay={0.4} />
          <AboutItem icon={Target} text="We prioritize user-friendly experiences and clean, professional design in every project." delay={0.5} />
          <AboutItem icon={ShieldCheck} text="We ensure reliability and security across all our applications and services." delay={0.6} />
          <AboutItem icon={TrendingUp} text="FusionHub is continuously learning, improving, and adapting to new technologies." delay={0.7} />
          <AboutItem icon={Lightbulb} text="Innovation and creativity are at the core of everything we build." delay={0.8} />
          <AboutItem icon={Zap} text="Our goal is to deliver impactful digital experiences that provide real value to users." delay={0.9} />
          <AboutItem icon={Trophy} text="We are committed to maintaining high standards and growing into a recognized tech brand." delay={1.0} />
        </div>
      </div>
    </motion.div>
  );
};

const GetStartedPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    websiteType: '',
    businessName: '',
    hosting: '',
    domainOption: '',
    logo: null as File | null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Using Web3Forms for real email delivery
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: formData.email,
          subject: `FUSIONHUB: New Website Request from ${formData.businessName}`,
          from_name: "FUSIONHUB Website",
          message: `
            --- NEW WEBSITE REQUEST ---
            Business Name: ${formData.businessName}
            Client Email: ${formData.email}
            Website Type: ${formData.websiteType}
            Hosting: ${formData.hosting}
            Domain Option: ${formData.domainOption || 'N/A'}
            ---------------------------
          `
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error("Web3Forms failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback to mailto
      const subject = encodeURIComponent(`Website Request: ${formData.businessName}`);
      const body = encodeURIComponent(`
Email: ${formData.email}
Website Type: ${formData.websiteType}
Business Name: ${formData.businessName}
Hosting: ${formData.hosting}
Domain Option: ${formData.domainOption || 'N/A'}
      `);
      window.location.href = `mailto:fusionhub122@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto px-6 py-40 text-center"
      >
        <div className="glass-panel p-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Request Received!</h2>
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
            Thank you for reaching out. Check your mail under 24 hours, our team will reply to your request.
          </p>
          <button 
            onClick={() => setPage('home')}
            className="btn-apple px-10 py-4"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="max-w-3xl mx-auto px-6 py-32"
    >
      <button 
        onClick={() => setPage('home')}
        className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft className="w-6 h-6" /> Back to Home
      </button>

      <div className="glass-panel p-8 md:p-16 text-center">
        <h2 className="text-5xl font-bold mb-4 tracking-tight">Get Started</h2>
        <p className="text-xl text-gray-600 font-medium mb-12">Tell us about your project and we'll bring it to life.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Your Email Address
            </label>
            <input 
              required
              type="email" 
              placeholder="example@gmail.com"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-lg"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Kind of website needed
            </label>
            <select 
              required
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-lg appearance-none"
              value={formData.websiteType}
              onChange={e => setFormData({...formData, websiteType: e.target.value})}
            >
              <option value="" disabled>Select an option</option>
              <option value="Business">Business Website</option>
              <option value="Portfolio">Personal Portfolio</option>
              <option value="E-commerce">E-commerce Store</option>
              <option value="Blog">Blog / News</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Target className="w-4 h-4" /> Business or Website Name
            </label>
            <input 
              required
              type="text" 
              placeholder="Enter your business name"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-lg"
              value={formData.businessName}
              onChange={e => setFormData({...formData, businessName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Server className="w-4 h-4" /> Hosting Preference
            </label>
            <select 
              required
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-lg appearance-none"
              value={formData.hosting}
              onChange={e => setFormData({...formData, hosting: e.target.value})}
            >
              <option value="" disabled>Select hosting option</option>
              <option value="Self Host">I want to host the website by myself</option>
              <option value="FUSIONHUB Host">FUSIONHUB hosts my website</option>
            </select>
          </div>

          <AnimatePresence>
            {formData.hosting !== '' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                  <Link className="w-4 h-4" /> Domain Option
                </label>
                <select 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-lg appearance-none"
                  value={formData.domainOption}
                  onChange={e => setFormData({...formData, domainOption: e.target.value})}
                >
                  <option value="" disabled>Select domain option</option>
                  <option value="Buy from FUSIONHUB">I want to buy a domain from FUSIONHUB</option>
                  <option value="Have own domain">I have my own domain</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Your Logo (Optional)
            </label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={e => setFormData({...formData, logo: e.target.files?.[0] || null})}
              />
              <div className="w-full px-6 py-10 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 group-hover:border-blue-400 group-hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-gray-500">
                  {formData.logo ? formData.logo.name : "Click or drag to upload logo"}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-8"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Save & Submit <Send className="w-6 h-6" /></>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const AIBuilderPage = ({ setPage, user }: { setPage: (p: string) => void, user: User | null }) => {
  const [prompt, setPrompt] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [bill, setBill] = useState<any>(null);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const isGeneratingRef = useRef(false);
  const [buildCount, setBuildCount] = useState(() => {
    return parseInt(localStorage.getItem("ai_build_count") || "0");
  });
  const [progress, setProgress] = useState("");
  const [aiMode, setAiMode] = useState<'website' | 'photo' | 'bill' | 'animation'>('website');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewKey, setPreviewKey] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [aiEditPrompt, setAiEditPrompt] = useState("");
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [htmlHistory, setHtmlHistory] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [userBills, setUserBills] = useState<any[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "bills"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserBills(bills);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const BUILD_LIMIT = user ? 5 : 3;

  useEffect(() => {
    if (user) {
      // Clear local guest count UI immediately on login to avoid confusion
      setBuildCount(0); 

      // Sync build count from Firestore
      const userRef = doc(db, "users", user.uid);
      const unsub = onSnapshot(userRef, { includeMetadataChanges: true }, (docSnap) => {
        // Critical: Do not overwrite optimistic state while generating
        if (isGeneratingRef.current) return;
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const today = new Date().toDateString();
          
          // Only sync if the date matches to avoid accidental local resets
          if (data.lastBuildDate === today) {
            setBuildCount(data.buildCount || 0);
          } else {
            // It's a new day, but only reset if we aren't mid-build
            console.log("Date mismatch - resetting count for new day");
            setBuildCount(0);
          }
        } else {
          setBuildCount(0);
          setDoc(userRef, { 
            uid: user.uid, 
            email: user.email, 
            buildCount: 0, 
            lastBuildDate: new Date().toDateString()
          }).catch(console.error);
        }
      });
      return () => unsub();
    } else {
      setUserBills([]);
      // If user logs out, restore guest count from localStorage
      setBuildCount(parseInt(localStorage.getItem("ai_build_count") || "0"));
    }
  }, [user]);

  useEffect(() => {
    if (generatedHtml && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [generatedHtml]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'MANUAL_EDIT') {
        setGeneratedHtml(e.data.html);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleGenerate = async () => {
    if (buildCount >= BUILD_LIMIT) {
      setError(`You have reached your limit of ${BUILD_LIMIT} builds.`);
      return;
    }

    setLoading(true);
    setIsGenerating(true);
    isGeneratingRef.current = true;
    setIsEditMode(false);
    setError("");
    setGeneratedHtml("");
    setPrice(null);
    setProgress("Initializing AI...");

    // Optimistic UI update
    setBuildCount(prev => prev + 1);

    try {
      let systemPrompt = "You are an expert web developer at FUSIONHUB. Generate a complete, polished, single-file HTML website. Use Tailwind CSS and Lucide Icons. Ensure the site is modern, responsive, and visually stunning. Return ONLY the raw HTML code without any markdown blocks.";
      let userPrompt = `Create a professional website for "${businessName}". Focus/Requirements: ${prompt}.`;

      if (aiMode === 'photo') {
        systemPrompt = "You are a professional visual content strategist. Generate a stunning HTML showcase with photography sections and branding. Use high-quality placeholders from Pexels/Unsplash style tags. Return ONLY HTML.";
        userPrompt = `Generate a visual branding suite for "${businessName}". Theme: ${prompt}.`;
      } else if (aiMode === 'bill') {
        systemPrompt = "You are a specialized business accounting AI. Generate a professional, beautiful Invoice/Bill using Tailwind. Return ONLY HTML.";
        userPrompt = `Generate a detailed professional bill for "${businessName}" based on: ${prompt}.`;
      } else if (aiMode === 'animation') {
        systemPrompt = "You are a master of web animations. Generate a website using HTML and Tailwind, including scroll-reveal and interaction effects. Return ONLY HTML.";
        userPrompt = `Build an animated landing page for "${businessName}". Focus: ${prompt}.`;
      }

      setProgress("Analyzing requirements...");
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const fullText = response.text || "";
      const cleanedHtml = fullText.replace(/```html/g, "").replace(/```/g, "").trim();

      if (!cleanedHtml || cleanedHtml.length < 200) {
        throw new Error("AI returned invalid or empty content");
      }

      setGeneratedHtml(cleanedHtml);
      setHtmlHistory(prev => [cleanedHtml, ...prev]);
      
      // Attempt to estimate price
      try {
        const priceRes = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Estimate complexity price in INR for a site called "${businessName}". Return only a number.`,
        });
        const p = parseInt(priceRes.text?.replace(/[^0-9]/g, "") || "5000");
        setPrice(p);
      } catch (e) {
        setPrice(5000);
      }

      // Sync build count to Firestore if logged in
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { 
          buildCount: increment(1),
          lastBuildDate: new Date().toDateString()
        });
      } else {
        localStorage.setItem("ai_build_count", (buildCount + 1).toString());
      }

      setProgress("Finalizing layout...");
    } catch (err: any) {
      console.error("AI Generation error:", err);
      setError("AI generation failed. Please check your internet or try again later.");
      // Revert optimistic update on failure
      setBuildCount(prev => Math.max(0, prev - 1));
    } finally {
      setLoading(false);
      setIsGenerating(false);
      isGeneratingRef.current = false;
      setProgress("");
    }
  };

  const handleDownload = async () => {
    if (!isPaid) {
      setShowPayment(true);
      return;
    }

    try {
      setLoading(true);
      setProgress("Packaging assets...");

      const zip = new JSZip();
      const folderName = businessName.toLowerCase().replace(/\s+/g, "_");
      const webFolder = zip.folder(folderName);

      if (!webFolder) throw new Error("Could not create ZIP folder");

      // Extract all image URLs from HTML
      const doc = new DOMParser().parseFromString(generatedHtml, 'text/html');
      const images = Array.from(doc.querySelectorAll('img'));
      const imageUrls = images.map(img => img.src).filter(url => url.startsWith('http'));

      // Download images and add to ZIP
      setProgress("Fetching 2026 graphics...");
      const imgPromises = imageUrls.map(async (url, i) => {
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          const ext = url.split('.').pop()?.split('?')[0] || 'jpg';
          const filename = `asset_${i}.${ext}`;
          
          // Update HTML to point to local asset
          const imgInHtml = images.find(img => img.src === url);
          if (imgInHtml) imgInHtml.src = `./assets/${filename}`;
          
          webFolder.folder("assets")?.file(filename, blob);
        } catch (e) {
          console.warn("Failed to fetch image:", url);
        }
      });

      await Promise.all(imgPromises);

      // Add final HTML
      webFolder.file("index.html", doc.documentElement.outerHTML);

      const content = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(content);
      const zipLink = document.createElement("a");
      zipLink.href = zipUrl;
      zipLink.download = `${folderName}_package_v2026.zip`;
      document.body.appendChild(zipLink);
      zipLink.click();
      document.body.removeChild(zipLink);
      URL.revokeObjectURL(zipUrl);

      // Generate Bill with Frontend AI
      const now = new Date();
      try {
        const billRes = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate a professional text-based bill for ${businessName} - amount ₹${price}. include a thank you note from FUSIONHUB.`,
        });
        const billText = billRes.text || `Bill for ${businessName}: ₹${price}`;
        setBill({
          billId: `INV-${Date.now()}`,
          date: now.toLocaleString(),
          items: [{ desc: "Custom AI Website Build", amount: price }],
          total: price,
          aiText: billText
        });
      } catch (e) {
        setBill({
          billId: `INV-${Date.now()}`,
          date: now.toLocaleString(),
          items: [{ desc: "Custom AI Website Build", amount: price }],
          total: price
        });
      }

      // Trigger Download of Website
      const blob = new Blob([generatedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${businessName.toLowerCase().replace(/\s+/g, "_")}_website.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoading(false);
      setIsGenerating(false);
      setProgress("");
    }
  };

  const handleAIEdit = async () => {
    if (!aiEditPrompt || loading) return;
    
    setLoading(true);
    setIsGenerating(true);
    isGeneratingRef.current = true;
    setProgress("Refining design...");
    setError("");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Current HTML: ${generatedHtml.substring(0, 20000)}\n\nUser request for changes: ${aiEditPrompt}. Return ONLY the full updated HTML code.`,
        config: {
          systemInstruction: "You are an expert web developer. Modify the provided HTML based on user request. Return ONLY the complete updated HTML code without markdown blocks.",
          temperature: 0.5,
        }
      });

      const cleanedHtml = response.text?.replace(/```html/g, "").replace(/```/g, "").trim() || "";
      
      if (!cleanedHtml) throw new Error("AI returned empty refinement");
      
      setHtmlHistory(prev => [...prev.slice(-15), cleanedHtml]); 
      setChatHistory(prev => [...prev, { role: "user", content: aiEditPrompt }, { role: "assistant", content: "Applied your optimization using FUSIONHUB AI." }]);
      setGeneratedHtml(cleanedHtml);
      setAiEditPrompt("");
      setPreviewKey(k => k + 1);
    } catch (err: any) {
      console.error("Edit error:", err);
      setError("Failed to apply AI edit: " + err.message);
    } finally {
      setLoading(false);
      setIsGenerating(false);
      isGeneratingRef.current = false;
      setProgress("");
    }
  };

  const syncManualEdits = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const editedHtml = iframeRef.current.contentDocument.documentElement.outerHTML;
      setGeneratedHtml(editedHtml);
      setIsEditMode(false);
    }
  };

  const toggleEditMode = () => {
    const nextMode = !isEditMode;
    setIsEditMode(nextMode);
    
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const doc = iframeRef.current.contentDocument;
      if (nextMode) {
        doc.designMode = "on";
        // Enable drag for buttons and images
        const els = doc.querySelectorAll('button, img, div');
        els.forEach((el: any) => {
          if (el.tagName === 'BUTTON' || el.tagName === 'IMG' || el.classList.contains('bg-blue-600')) {
            el.setAttribute('draggable', 'true');
            el.style.cursor = 'move';
          }
        });

        const style = doc.createElement('style');
        style.id = "edit-mode-styles";
        style.textContent = `
          [contenteditable="true"]:hover, *:hover { outline: 1px dashed #3b82f6 !important; }
          button[draggable="true"]:active, img[draggable="true"]:active { opacity: 0.5; }
        `;
        doc.head.appendChild(style);
      } else {
        doc.designMode = "off";
        const style = doc.getElementById('edit-mode-styles');
        if (style) style.remove();
        doc.querySelectorAll('[draggable="true"]').forEach((el: any) => {
          el.removeAttribute('draggable');
          el.style.cursor = '';
        });
      }
    }
  };

  const downloadBill = () => {
    if (!bill) return;
    const billText = `
-----------------------------------------
            FUSIONHUB INVOICE
-----------------------------------------
Invoice ID: ${bill.billId}
Date: ${bill.date}
Client: ${businessName}
-----------------------------------------
Items:
${bill.items.map((item: any) => `- ${item.desc}: ₹${item.amount}`).join('\n')}
-----------------------------------------
TOTAL PAID: ₹${bill.total}
-----------------------------------------
Thank you for choosing FUSIONHUB!
    `;
    const blob = new Blob([billText], { type: "text/plain" });
    const billUrl = URL.createObjectURL(blob);
    const billLink = document.createElement("a");
    billLink.href = billUrl;
    billLink.download = `FUSIONHUB_Invoice_${bill.billId}.txt`;
    document.body.appendChild(billLink);
    billLink.click();
    document.body.removeChild(billLink);
    URL.revokeObjectURL(billUrl);
  };

  const handleRestore = () => {
    if (htmlHistory.length > 1) {
      const newHistory = [...htmlHistory];
      newHistory.pop(); // Remove current
      const prev = newHistory[newHistory.length - 1];
      setHtmlHistory(newHistory);
      setGeneratedHtml(prev);
      setPreviewKey(k => k + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col relative overflow-hidden">
      {/* Top Header */}
      <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Chat History"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setPage('home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-gray-900 tracking-tight">FUSIONHUB</h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">AI Builder</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="mr-6 py-1 px-3 bg-gray-50 rounded-full border border-gray-100 hidden md:flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-current" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {buildCount} / {BUILD_LIMIT}
            </span>
          </div>
          {user ? (
            <div className="flex items-center gap-2 pr-4 border-r border-gray-100 italic">
              <span className="text-xs font-bold text-gray-400">@{user.displayName?.split(' ')[0]}</span>
              <img src={user.photoURL || ""} className="w-8 h-8 rounded-full border border-blue-100" />
              <button onClick={logout} className="ml-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors">Exit</button>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-[11px] font-black uppercase text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2 mr-2"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" /> Login
            </button>
          )}
          <button 
            onClick={() => setShowPayment(true)}
            className="bg-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <CreditCard className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - AI Features */}
        <div className="w-[450px] border-r border-gray-200 bg-white/50 backdrop-blur-md flex flex-col">
          <div className="flex-1 overflow-auto p-8 space-y-10">
            {/* Header Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-black text-sm uppercase tracking-widest italic">AI Studio Mode</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                Bring your vision <br/> to life.
              </h2>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Describe your business and watch our AI craft a production-ready website in real-time.
              </p>
            </div>

            {/* Main Form */}
            {!generatedHtml || loading ? (
              <div className="space-y-6">
                {/* AI Mode Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Select Purpose</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'website', icon: Globe, label: 'Website' },
                      { id: 'photo', icon: ImageIcon, label: 'Photos' },
                      { id: 'bill', icon: FileText, label: 'Bill AI' },
                      { id: 'animation', icon: Zap, label: 'Anim' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setAiMode(mode.id as any)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all group ${
                          aiMode === mode.id 
                            ? 'border-blue-600 bg-blue-50 text-blue-600' 
                            : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'
                        }`}
                      >
                        <mode.icon className={`w-4 h-4 ${aiMode === mode.id ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Business Identity</label>
                  <input 
                    type="text" 
                    placeholder="Business Name..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300 shadow-inner"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Website Blueprint</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe sections, colors, vibes..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white outline-none transition-all font-bold text-gray-800 placeholder:text-gray-300 shadow-inner resize-none"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3 text-sm font-bold border border-red-100"
                  >
                    <AlertCircle className="w-4 h-4" /> {error}
                  </motion.div>
                )}

                <button 
                  onClick={handleGenerate}
                  disabled={loading || !prompt || !businessName || buildCount >= BUILD_LIMIT}
                  className="w-full py-5 rounded-xl bg-gray-900 text-white font-black text-lg shadow-2xl hover:bg-black disabled:opacity-30 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{progress}</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-current" />
                      Generate Structure
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Project</span>
                    <button 
                      onClick={() => setGeneratedHtml("")}
                      className="text-[10px] font-black text-gray-400 uppercase hover:text-red-500 transition-colors"
                    >New Build</button>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 tracking-tight">{businessName}</h4>
                  <p className="text-sm text-gray-500 font-medium line-clamp-2">{prompt}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">AI Refinement (2026 Edition)</span>
                    </div>
                    {htmlHistory.length > 1 && (
                      <button 
                        onClick={handleRestore}
                        className="text-[10px] font-black text-blue-600 uppercase hover:underline"
                      >Restore Version {htmlHistory.length - 1}</button>
                    )}
                  </div>

                  {/* Chat History Panel */}
                  <div className="max-h-40 overflow-y-auto space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                    {chatHistory.map((chat, i) => (
                      <div key={i} className={`text-[11px] leading-tight ${chat.role === 'user' ? 'text-blue-600 font-bold ml-4' : 'text-gray-500 italic'}`}>
                        {chat.role === 'user' ? '→ ' : '✧ '}{chat.content}
                      </div>
                    ))}
                    {chatHistory.length === 0 && <span className="text-[10px] text-gray-300 italic">No refinement history yet...</span>}
                  </div>

                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Ask AI to change something..."
                      className="w-full pl-6 pr-14 py-4 rounded-xl bg-blue-50/30 border-2 border-transparent focus:border-blue-200 outline-none transition-all font-bold text-sm"
                      value={aiEditPrompt}
                      onChange={e => setAiEditPrompt(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAIEdit()}
                    />
                    <button 
                      onClick={handleAIEdit}
                      disabled={!aiEditPrompt || loading}
                      className="absolute right-2 top-2 bottom-2 w-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <Download className="w-4 h-4" /> Export Store
                    </button>
                    <button 
                      onClick={() => setViewport(v => v === 'desktop' ? 'mobile' : v === 'mobile' ? 'tablet' : 'desktop')}
                      className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-all shadow-sm"
                    >
                      <Smartphone className="w-4 h-4" /> Device View
                    </button>
                  </div>

                  {price && (
                    <div className="p-4 rounded-xl bg-gray-900 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">License Value</span>
                      </div>
                      <span className="text-lg font-black italic">₹{price}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
          </div>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-hidden flex flex-col">
          {/* Preview Toolbar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <div className="flex gap-1.5 mr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-mono text-gray-500 truncate max-w-[300px]">
                {businessName ? `https://${businessName.toLowerCase().replace(/\s+/g, '-')}.fusionhub.in` : 'preview.fusionhub.in'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center p-1 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => setViewport('desktop')}
                  className={`px-3 py-1.5 rounded-md transition-all text-[10px] font-bold uppercase tracking-wider ${viewport === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >Desktop</button>
                <button 
                  onClick={() => setViewport('tablet')}
                  className={`px-3 py-1.5 rounded-md transition-all text-[10px] font-bold uppercase tracking-wider ${viewport === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >Tablet</button>
                <button 
                  onClick={() => setViewport('mobile')}
                  className={`px-3 py-1.5 rounded-md transition-all text-[10px] font-bold uppercase tracking-wider ${viewport === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >Mobile</button>
              </div>

              <div className="w-px h-6 bg-gray-200 mx-2" />

              <button 
                onClick={toggleEditMode}
                className={`p-2.5 rounded-lg transition-all ${isEditMode ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                title="Edit Mode"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPreviewKey(k => k + 1)}
                className="p-2.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-all"
                title="Reload"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([generatedHtml], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="p-2.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-all"
                title="External Link"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Iframe Frame */}
          <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden bg-[#e9ecef]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-full max-w-2xl bg-white p-12 rounded-[2rem] shadow-2xl flex flex-col items-center text-center space-y-8 border-4 border-blue-500/10"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white relative z-10 shadow-[0_0_50px_-10px_rgba(37,99,235,0.5)]">
                      <Wand2 className="w-12 h-12 animate-pulse" />
                    </div>
                    <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-2xl animate-pulse" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">{progress}</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Processing Infrastructure Design...</p>
                  </div>

                  <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-blue-600"
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ) : generatedHtml ? (
                <motion.div 
                  key={viewport}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden shrink-0 transition-all duration-700 h-full ${
                    viewport === 'desktop' ? 'w-full' : 
                    viewport === 'tablet' ? 'w-[768px]' : 
                    'w-[375px]'
                  }`}
                >
                  <iframe 
                    ref={iframeRef}
                    key={previewKey}
                    srcDoc={generatedHtml} 
                    className="w-full h-full border-none"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                    onLoad={() => {
                      if (isEditMode && iframeRef.current?.contentDocument) {
                        iframeRef.current.contentDocument.designMode = "on";
                      }
                    }}
                  />
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-6 opacity-30 select-none grayscale">
                  <Globe className="w-32 h-32 text-gray-300" strokeWidth={0.5} />
                  <p className="font-black text-2xl tracking-tighter uppercase italic">Waiting for input...</p>
                </div>
              )}
            </AnimatePresence>

            {/* Manual Edit Indicator */}
            {isEditMode && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-10 inset-x-0 mx-auto w-fit z-50"
              >
                <div className="px-6 py-3 rounded-2xl bg-orange-600 text-white shadow-2xl flex items-center gap-4 font-black text-sm uppercase italic tracking-widest">
                  <Edit3 className="w-5 h-5" />
                  Visual Editor Active
                  <div className="h-4 w-px bg-white/20" />
                  <button 
                    onClick={syncManualEdits}
                    className="px-4 py-1 rounded-lg bg-white text-orange-600 hover:bg-gray-100 transition-colors"
                  >Save</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(showPayment || verifyingPayment) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-blue-900/40 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md liquid-glass rounded-[2.5rem] p-12 overflow-hidden shadow-2xl text-center relative text-white"
            >
              {verifyingPayment ? (
                <div className="py-12 space-y-8">
                  <div className="w-24 h-24 rounded-full border-8 border-offset-8 border-white/50 border-t-white animate-spin mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black italic tracking-tighter">Securing Assets...</h3>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest leading-relaxed px-6">
                      Authenticating License ID: <span className="text-white">{bill?.billId}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md text-white rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-6 border border-white/20 shadow-xl">
                      <CreditCard className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter italic mb-2">Checkout.</h3>
                    <p className="text-white/70 font-bold px-4 leading-relaxed">License ID: {bill?.billId}</p>
                    <div className="mt-4 p-4 rounded-2xl bg-black/20 text-xs font-mono text-left whitespace-pre-wrap">
                      {bill?.bill}
                    </div>
                  </div>

                  <div className="aspect-square rounded-[2rem] overflow-hidden border-8 border-gray-50 mb-10 shadow-inner group relative bg-white flex items-center justify-center p-6">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`upi://pay?pa=7383718802@omni&pn=FusionHub&am=${price}&cu=INR`)}`} 
                      alt="Payment QR" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all">
                      Scan to Pay ₹{price}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={async () => {
                        setVerifyingPayment(true);
                        // Simulate verification logic 
                        await new Promise(r => setTimeout(r, 4500));
                        setVerifyingPayment(false);
                        setIsPaid(true);
                        setShowPayment(false);
                        // Small timeout to allow state to settle
                        setTimeout(handleDownload, 100);
                      }}
                      className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      Verify Transaction <Zap className="w-6 h-6 fill-current" />
                    </button>
                    <button 
                      onClick={() => setShowPayment(false)}
                      className="text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600"
                    >Cancel Order</button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[100] flex justify-start">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-white shadow-2xl flex flex-col border-r border-gray-200"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg leading-none">Chat History</h3>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">Version Control</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-400"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <div className="p-6 space-y-8">
                  {/* Chat History Section */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">Conversation</h4>
                    <div className="space-y-6">
                      {chatHistory.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">No chat history yet...</p>
                      ) : (
                        chatHistory.map((item, idx) => (
                          <div key={idx} className={`space-y-1 ${item.role === 'assistant' ? 'pl-4 border-l-2 border-blue-500/20' : ''}`}>
                            <span className={`text-[8px] font-black uppercase tracking-widest ${
                              item.role === 'user' ? 'text-gray-400' : 'text-blue-600'
                            }`}>
                              {item.role}
                            </span>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Bills History Section */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">My Bills & Purchases</h4>
                    <div className="space-y-3">
                      {userBills.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">No purchase history found.</p>
                      ) : (
                        userBills.map((b, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2 group hover:bg-white transition-all">
                            <div className="flex items-center justify-between font-black text-[10px] tracking-widest uppercase">
                              <span className="text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</span>
                              <span className={b.status === 'paid' ? 'text-emerald-600' : 'text-orange-500'}>{b.status}</span>
                            </div>
                            <h5 className="font-bold text-gray-800 text-sm truncate">{b.businessName}</h5>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900 font-black italic">₹{b.amount}</span>
                              <span className="text-[9px] text-gray-300 font-mono">{b.billId}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Restore Points</span>
                  <span>{htmlHistory.length} Saved</span>
                </div>
                <button 
                  onClick={handleRestore}
                  disabled={htmlHistory.length <= 1}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 font-black uppercase text-xs tracking-widest hover:border-blue-500/50 hover:text-blue-500 transition-all disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-200"
                >
                  <RotateCcw className="w-4 h-4 mx-auto mb-2" />
                  Step Back One Version
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="flex-1 bg-black/40 backdrop-blur-sm"
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/90 backdrop-blur-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-white rounded-[3rem] p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 inset-x-0 h-4 bg-blue-600" />
              
              <div className="mb-12">
                <h2 className="text-5xl font-black tracking-tighter text-blue-600 italic">FUSIONHUB</h2>
                <div className="w-24 h-1 bg-gray-100 mx-auto mt-4" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 italic">Official Marketplace Invoice</p>
              </div>

              <div className="grid grid-cols-2 gap-12 w-full text-left mb-12 py-8 border-y border-gray-50">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Ref</p>
                  <p className="font-mono text-xs font-bold text-gray-600 mt-1">#FH-{bill.billId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Purchase Date</p>
                  <p className="font-bold text-gray-900 mt-1 text-sm">{bill.date}</p>
                </div>
              </div>

              <div className="w-full space-y-6 mb-16">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</p>
                    <h4 className="text-xl font-black text-gray-900 leading-tight">AI Generated Structure</h4>
                  </div>
                  <p className="text-2xl font-black text-gray-900">₹{price}</p>
                </div>
                <div className="flex justify-between items-center pt-8 border-t-2 border-dashed border-gray-100">
                  <span className="text-xl font-black text-gray-900 italic tracking-tighter uppercase italic_none">Settled Amount</span>
                  <span className="text-5xl font-black text-blue-600">₹{bill.total}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={downloadBill}
                  className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  <Download className="w-6 h-6" /> Export Invoice (PDF)
                </button>
                <button 
                  onClick={() => setBill(null)}
                  className="font-black text-gray-400 uppercase text-[10px] tracking-[0.2em] py-4 hover:text-gray-600 transition-colors"
                >Back to Studio</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsPage = ({ setPage }: { setPage: (p: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-7xl mx-auto px-6 py-32"
    >
      <button 
        onClick={() => setPage('home')}
        className="flex items-center gap-2 text-blue-600 font-bold mb-12 hover:gap-4 transition-all"
      >
        <ArrowLeft className="w-6 h-6" /> Back to Home
      </button>

      <ProductsSection showButtons={true} />
    </motion.div>
  );
};

const LoginPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      setPage('ai-builder');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in. Please check if your domain is authorized in Firebase Console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full glass-panel p-12 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        
        <div className="w-24 h-24 mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 rotate-3 hover:rotate-0 transition-transform duration-500">
          <img src={LOGO_URL} alt="FusionHub" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black italic tracking-tighter text-gray-900">FUSIONHUB</h1>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
            Welcome to the future of web building
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <div className="py-8 space-y-4">
          <p className="text-gray-600 font-medium">To access the AI Website Builder and your workspace, please sign in with Google.</p>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#1d1d1f] text-white font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Globe className="w-5 h-5 text-blue-400" />
                Continue to FusionHub
              </>
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 italic text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Secure Authentication & Real-time Cloud Storage
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.02]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
      <div ref={containerRef} className="min-h-screen relative vibrant-bg selection:bg-blue-200 font-sans text-[#1d1d1f] overflow-x-hidden">
      {/* Background Grid */}
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl tracking-tighter">FUSIONHUB</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
            <button onClick={() => setPage('home')} className={`hover:text-blue-600 transition-colors ${page === 'home' ? 'text-blue-600' : ''}`}>Home</button>
            <button onClick={() => setPage('about')} className={`hover:text-blue-600 transition-colors ${page === 'about' ? 'text-blue-600' : ''}`}>About</button>
            <button onClick={() => setPage('products')} className={`hover:text-blue-600 transition-colors ${page === 'products' ? 'text-blue-600' : ''}`}>Products</button>
            <button onClick={() => setPage('ai-builder')} className={`hover:text-blue-600 transition-colors ${page === 'ai-builder' ? 'text-blue-600' : ''}`}>AI Builder</button>
            <button onClick={() => setPage('get-started')} className={`hover:text-blue-600 transition-colors ${page === 'get-started' ? 'text-blue-600' : ''}`}>Get Started</button>
            <a href="#socials" className="hover:text-blue-600 transition-colors">Connect</a>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!authReady ? (
          <div key="loading" className="min-h-screen flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : (page === 'ai-builder' && !user) ? (
          <div key="login">
            <LoginPage setPage={setPage} />
          </div>
        ) : page === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6"
          >
            {/* Hero Section */}
            <motion.section 
              style={{ y: heroY }}
              className="pt-48 pb-32 text-center relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="w-32 h-32 mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
              >
                <img src={LOGO_URL} alt="FusionHub Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-shadow-sm"
              >
                Crafting Digital Worlds.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl md:text-3xl text-gray-600 font-medium max-w-4xl mx-auto leading-tight mb-12"
              >
                FUSIONHUB - A small software company with big ideas
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="text-center">
                  <p className="text-gray-500 font-bold uppercase tracking-[0.2em] mb-4">Build your own or for business website with us</p>
                  <button 
                    onClick={() => setPage('get-started')}
                    className="flex mx-auto px-12 py-5 rounded-full bg-blue-600 text-white font-bold text-xl shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all items-center gap-3"
                  >
                    Get Started <Zap className="w-6 h-6 fill-current" />
                  </button>
                </div>
              </motion.div>
            </motion.section>

            {/* Mission Section */}
            <section className="py-32 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Our Mission</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                  We are dedicated to pushing the boundaries of what's possible in the digital space.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Sparkles, title: "Innovation", desc: "Constantly exploring new technologies to build unique experiences." },
                  { icon: ShieldCheck, title: "Quality", desc: "Uncompromising standards in every line of code we write." },
                  { icon: Target, title: "Community", desc: "Building tools that bring people together across platforms." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="glass-panel p-8 text-center hover:scale-105 transition-transform cursor-default"
                  >
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 relative z-10">
              <div className="glass-panel p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                  { label: "Discord Users", value: "40" },
                  { label: "Roblox Visits", value: "8" },
                  { label: "Projects Built", value: "2" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <div className="text-5xl md:text-6xl font-black text-blue-600 mb-2">{stat.value}</div>
                    <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Ecosystem Visualization */}
            <section className="py-32 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">FusionHub Ecosystem</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                  Our interconnected digital world where bots, games, and systems work in harmony.
                </p>
              </motion.div>
              <div className="max-w-5xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/50 glass-panel bg-gray-900">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto block"
                >
                  <source src="https://cdn.dribbble.com/userupload/10636706/file/original-4c8d5c8d5c8d5c8d5c8d5c8d5c8d5c8d.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-lines-and-dots-23537-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>

            <ProductsSection showButtons={false} setPage={setPage} />
            <AboutSection setPage={setPage} />
          </motion.div>
        ) : page === 'about' ? (
          <AboutPage setPage={setPage} />
        ) : page === 'products' ? (
          <ProductsPage setPage={setPage} />
        ) : page === 'ai-builder' ? (
          <AIBuilderPage setPage={setPage} user={user} />
        ) : (
          <GetStartedPage setPage={setPage} />
        )}
      </AnimatePresence>

      {/* Socials Section */}
      <section id="socials" className="py-32 text-center max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16 tracking-tight">Connect With Us</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <SocialLink href="https://discord.gg/76s7FsSf9U" label="Discord" icon={MessageSquare} />
          <SocialLink href="https://github.com/fusionhub122-ux" label="GitHub" icon={Github} />
          <SocialLink href="https://www.instagram.com/fusionhub.in1/" label="Instagram" icon={Instagram} />
          <SocialLink href="https://www.youtube.com/@fusionhub-tp" label="YouTube" icon={Youtube} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-white/40 backdrop-blur-md text-center border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl border-2 border-white/50">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mb-4 text-shadow-sm">FUSIONHUB</p>
          <div className="flex justify-center gap-6 mb-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <button onClick={() => setPage('home')} className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => setPage('about')} className="hover:text-blue-600 transition-colors">About</button>
            <button onClick={() => setPage('products')} className="hover:text-blue-600 transition-colors">Products</button>
            <button onClick={() => setPage('ai-builder')} className="hover:text-blue-600 transition-colors">AI Builder</button>
            <button onClick={() => setPage('get-started')} className="hover:text-blue-600 transition-colors text-blue-600">Get Started</button>
          </div>
          <p className="text-gray-400 text-sm font-medium">&copy; {new Date().getFullYear()} FusionHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -8, scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
    className="flex items-center gap-4 px-8 py-4 rounded-3xl bg-white/70 border border-white/30 shadow-xl backdrop-blur-md transition-all font-bold text-lg"
    aria-label={label}
  >
    <Icon className="w-6 h-6 text-blue-600" />
    {label}
  </motion.a>
);
