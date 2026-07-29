'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassModal from '@/components/ui/GlassModal';
import ChartView from '@/components/ui/ChartView';
import {
  ShieldCheck,
  Users,
  FileSpreadsheet,
  Newspaper,
  FolderOpen,
  Mail,
  Lock,
  Settings,
  BarChart2,
  Download,
  Plus,
  Trash2,
  Eye,
  Upload,
  Palette,
  Layout,
  Type,
  Video,
  Image as ImageIcon,
  Sliders,
  Check,
  Copy,
  Edit,
  Send,
  Phone,
  MapPin,
  Globe,
  FileCode,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'customizer' | 'pagecms' | 'reports' | 'blogs' | 'media' | 'messages' | 'logs' | 'users' | 'analytics' | 'settings'
  >('customizer');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper for CSV export
  const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename} successfully!`);
  };

  // Analytics Data
  const topCalculatorsChart = [
    { name: 'Molarity', value: 4250 },
    { name: 'OEE', value: 3890 },
    { name: 'Pasteurization', value: 3120 },
    { name: 'Reynolds No.', value: 2780 },
    { name: 'Density/Brix', value: 2450 },
  ];

  const conversionsChart = [
    { name: 'Jan', value: 1240 },
    { name: 'Feb', value: 1890 },
    { name: 'Mar', value: 2400 },
    { name: 'Apr', value: 3100 },
    { name: 'May', value: 4200 },
    { name: 'Jun', value: 5800 },
  ];

  // Users State
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', email: 'sarah@dairytech.com', role: 'Dairy Technologist', status: 'Active', country: 'United States', date: '2026-07-28' },
    { id: 2, name: 'Marco Silva', email: 'marco@bioprocess.io', role: 'Process Engineer', status: 'Active', country: 'Germany', date: '2026-07-27' },
    { id: 3, name: 'Ananya Gupta', email: 'ananya@qc-labs.in', role: 'QA Executive', status: 'Blocked', country: 'India', date: '2026-07-25' },
    { id: 4, name: 'Jean Dupont', email: 'jean@agri.fr', role: 'Factory Manager', status: 'Active', country: 'France', date: '2026-07-24' },
    { id: 5, name: 'Chen Wei', email: 'chen@biotech.cn', role: 'Biotechnologist', status: 'Active', country: 'China', date: '2026-07-23' },
  ]);

  // Report Logs State
  const [reports, setReports] = useState([
    { id: 'IC-849201', code: 'VER-9A8F1', tool: 'Molarity Calculator', user: 'Dr. Sarah Jenkins', email: 'sarah@dairytech.com', role: 'Dairy Technologist', date: '2026-07-28 14:32' },
    { id: 'IC-910482', code: 'VER-7B2M9', tool: 'Pasteurization Holding Time', user: 'Marco Silva', email: 'marco@bioprocess.io', role: 'Process Engineer', date: '2026-07-28 11:15' },
    { id: 'IC-732910', code: 'VER-4K2P9', tool: 'OEE Calculator', user: 'Jean Dupont', email: 'jean@agri.fr', role: 'Factory Manager', date: '2026-07-27 16:45' },
    { id: 'IC-610294', code: 'VER-8M3X1', tool: 'Reynolds Number', user: 'Ananya Gupta', email: 'ananya@qc-labs.in', role: 'QA Executive', date: '2026-07-26 09:20' },
  ]);

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: 'Optimizing Holding Tube Lethality (F0) in HTST Systems', category: 'Food & Dairy', author: 'Dr. Robert Sterling', imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5', excerpt: 'Deep-dive into fluid velocity, holding tube volume scaling, and thermal lethal value calculations.', content: 'Full article text regarding HTST pasteurization parameters...', status: 'Published', date: '2026-07-24' },
    { id: 2, title: 'Eliminating the 6 Big Losses: Achieving 85%+ OEE', category: 'Production & AI', author: 'Elena Rostova', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', excerpt: 'Comprehensive operational framework to audit Availability, Performance, and Quality metrics.', content: 'Full article text regarding OEE lean manufacturing metrics...', status: 'Published', date: '2026-07-20' },
    { id: 3, title: 'Why Reynolds Number > 10,000 is Mandatory for CIP', category: 'Chemical Eng', author: 'Marcus Vance', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758', excerpt: 'Analyzing wall shear stress, boundary layer collapse, and turbulent flow regimes in automated CIP.', content: 'Full article text regarding fluid dynamics in CIP tubing...', status: 'Published', date: '2026-07-15' },
  ]);

  // Media Library State
  const [mediaItems, setMediaItems] = useState([
    { id: 1, name: 'brand-logo-neon.png', type: 'image/png', size: '240 KB', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5' },
    { id: 2, name: 'hero-background-video.mp4', type: 'video/mp4', size: '14.2 MB', url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-background-31742-large.mp4' },
    { id: 3, name: 'lottie-process-animation.json', type: 'application/json', size: '85 KB', url: 'https://assets.lottiefiles.com/packages/lf20_process.json' },
    { id: 4, name: 'favicon-icon.ico', type: 'image/x-icon', size: '32 KB', url: '/favicon.ico' },
  ]);

  // Messages State
  const [messages, setMessages] = useState([
    { id: 1, name: 'Michael Chang', email: 'michael@chemcorp.com', phone: '+1 555 0192', subject: 'Custom Fermentation Yield Calculator Request', body: 'We need to integrate our proprietary biomass density conversion formula into the fermentation yield tool.', date: '2026-07-28', status: 'Unread' },
    { id: 2, name: 'Laura Martinez', email: 'laura@foodtech.es', phone: '+34 600 123 456', subject: 'Enterprise Site License Inquiry', body: 'Can we license IndustrialCalc for our multi-site dairy quality assurance teams across Spain?', date: '2026-07-27', status: 'Replied' },
  ]);

  // Security Logs State
  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, ip: '192.168.1.104', country: 'United States', action: 'Admin Authentication Success', risk: 'Low', time: '2026-07-29 19:40' },
    { id: 2, ip: '45.142.120.9', country: 'Russia', action: 'Failed Password Attempt', risk: 'High', time: '2026-07-29 18:12' },
    { id: 3, ip: '103.22.14.88', country: 'India', action: 'PDF Report Export Generated', risk: 'Low', time: '2026-07-29 17:05' },
  ]);

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'IndustrialCalc',
    smtpHost: 'smtp.sendgrid.net:587',
    mongoUri: 'mongodb+srv://admin:xxxx@cluster0.mongodb.net/industrialcalc',
    jwtSecret: 'super-secret-jwt-key-2026',
    googleOAuthKey: '8492019482-apps.googleusercontent.com',
    maintenanceMode: false,
  });

  // Site & Theme Customizer State
  const [siteConfig, setSiteConfig] = useState({
    logoUrl: '/branding/logo.png',
    faviconUrl: '/favicon.ico',
    websiteName: 'IndustrialCalc',
    slogan: 'Next-Gen Industrial & Process Engineering Suite',
    supportEmail: 'support@industrialcalc.app',
    supportPhone: '+1 (800) 555-CALC',
    headquartersAddress: 'Industrial Technology Park, Suite 400',
    mapLocationText: 'San Francisco, CA • Zurich, Switzerland',
    heroBadgeText: 'Spatial Computing Interface • VisionOS & Acrylic',
    heroTitle: 'Next-Gen Industrial & Process Calculators',
    heroSubtext: '50 verified calculation engines for Food Tech, Dairy Processing, Chemical Engineering, Water Analysis, and Plant Operations.',
    heroPrimaryBtnText: 'Search 50 Calculators',
    heroSecondaryBtnText: 'Explore News',
    heroImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-31741-large.mp4',
    aiImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    gifLibraryUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJvY2VzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKsjRrfIPjeiVyM/giphy.gif',
    lottieAnimationUrl: 'https://assets.lottiefiles.com/packages/lf20_process.json',
    backgroundVideoUrl: '',
    backgroundImageUrl: '',
    primaryColor: '#00FF99',
    secondaryColor: '#00E5FF',
    accentColor: '#FF007A',
    lightGradientStart: '#FFFFFF',
    lightGradientEnd: '#F7F7FF',
    darkGradientStart: '#050505',
    darkGradientEnd: '#0D2415',
    defaultTheme: 'dark',
    fontFamily: 'Inter',
    cardBlur: '24px',
    cardBorderOpacity: '25%',
    buttonStyle: 'rounded-full',
    showHeroSection: true,
    showStatsSection: true,
    showTrendingSection: true,
    showFeaturesSection: true,
    showBlogSection: true,
    showFaqSection: true,
  });

  // PAGE CMS RICH TEXT EDITOR STATE
  const [selectedPage, setSelectedPage] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'about'>('privacy');
  const [pagesConfig, setPagesConfig] = useState<Record<string, { title: string; content: string }>>({
    privacy: {
      title: 'Privacy Policy',
      content: `<h2>1. Data Collection Principles</h2><p>IndustrialCalc collects user lead information (name, work email, mobile number, professional role) exclusively when exporting calculation reports.</p><h2>2. Use of Information</h2><p>Your inputs and parameters remain private and are processed in client-side memory to compute engineering metrics.</p><h2>3. Compliance Standards</h2><p>We strictly adhere to ISO 27001 data security practices and GDPR compliance guidelines.</p>`,
    },
    terms: {
      title: 'Terms of Service',
      content: `<h2>1. Acceptance of Terms</h2><p>By accessing IndustrialCalc, you agree to comply with our terms of service for engineering calculations.</p><h2>2. Disclaimer of Warranty</h2><p>Calculations are provided for process guidance and verification purposes. Final engineering designs should be audited by certified plant engineers.</p>`,
    },
    cookies: {
      title: 'Cookie Policy',
      content: `<h2>1. Essential Cookies</h2><p>We use essential cookies and browser local storage to remember your visual theme preference (Light/Dark mode) and active calculation parameters.</p>`,
    },
    disclaimer: {
      title: 'Engineering Disclaimer',
      content: `<h2>1. Professional Verification Required</h2><p>All calculations on IndustrialCalc are designed using validated mathematical models. However, users are advised to verify critical plant safety calculations with certified process engineers.</p>`,
    },
    about: {
      title: 'About IndustrialCalc',
      content: `<h2>Next-Gen Process Engineering Suite</h2><p>IndustrialCalc provides 50 specialized calculation engines designed for Food Processing, Dairy Technology, Biotechnology, Chemical Engineering, and Plant Automation.</p>`,
    },
  });

  const [editorPreviewMode, setEditorPreviewMode] = useState(false);

  // Load persisted siteConfig & pagesConfig on mount
  useEffect(() => {
    const savedSite = localStorage.getItem('industrialcalc_siteConfig');
    if (savedSite) {
      try {
        setSiteConfig(JSON.parse(savedSite));
      } catch (e) {
        console.warn('Failed parsing siteConfig', e);
      }
    }

    const savedPages = localStorage.getItem('industrialcalc_pagesConfig');
    if (savedPages) {
      try {
        setPagesConfig(JSON.parse(savedPages));
      } catch (e) {
        console.warn('Failed parsing pagesConfig', e);
      }
    }
  }, []);

  // RICH TEXT TOOLBAR INSERTER
  const insertRichTag = (prefix: string, suffix: string = '') => {
    const currentPage = pagesConfig[selectedPage];
    if (!currentPage) return;
    const newContent = `${currentPage.content}\n${prefix}Sample Text${suffix}`;
    setPagesConfig({
      ...pagesConfig,
      [selectedPage]: { ...currentPage, content: newContent },
    });
  };

  // Save Page CMS
  const handleSavePageCMS = () => {
    localStorage.setItem('industrialcalc_pagesConfig', JSON.stringify(pagesConfig));
    showToast(`Saved Rich Content for ${pagesConfig[selectedPage].title} Successfully!`);
  };

  // MODAL STATES
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Food & Dairy',
    author: 'Admin Editorial',
    imageUrl: '',
    excerpt: '',
    content: '',
    status: 'Published',
  });

  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaForm, setMediaForm] = useState({ name: '', type: 'image/png', url: '' });

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyingMessage, setReplyingMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const [viewReportModalOpen, setViewReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Save Customizer Config to LocalStorage
  const handleSaveCustomizer = () => {
    localStorage.setItem('industrialcalc_siteConfig', JSON.stringify(siteConfig));
    showToast('Saved Contact Details, Map Locations, Colors & Branding Settings!');
  };

  // Save System Config
  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('System Infrastructure & API Settings Saved!');
  };

  // Blog Handlers
  const handleOpenBlogModal = (post?: any) => {
    if (post) {
      setEditingPost(post);
      setBlogForm({
        title: post.title,
        category: post.category,
        author: post.author,
        imageUrl: post.imageUrl || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        status: post.status || 'Published',
      });
    } else {
      setEditingPost(null);
      setBlogForm({
        title: '',
        category: 'Food & Dairy',
        author: 'Admin Editorial',
        imageUrl: '',
        excerpt: '',
        content: '',
        status: 'Published',
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) return;

    if (editingPost) {
      setBlogPosts(
        blogPosts.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...blogForm }
            : p
        )
      );
      showToast(`Updated article "${blogForm.title}" successfully!`);
    } else {
      const newPost = {
        id: Date.now(),
        ...blogForm,
        date: new Date().toISOString().split('T')[0],
      };
      setBlogPosts([newPost, ...blogPosts]);
      showToast(`Created new blog post "${blogForm.title}"!`);
    }
    setBlogModalOpen(false);
  };

  const handleDeleteBlogPost = (id: number) => {
    setBlogPosts(blogPosts.filter((p) => p.id !== id));
    showToast('Blog article removed.');
  };

  // Media Handlers
  const handleSaveMediaItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.name || !mediaForm.url) return;
    const newItem = {
      id: Date.now(),
      name: mediaForm.name,
      type: mediaForm.type,
      size: '1.2 MB',
      url: mediaForm.url,
    };
    setMediaItems([newItem, ...mediaItems]);
    setMediaModalOpen(false);
    showToast(`Uploaded ${mediaForm.name} to Media Library!`);
  };

  const handleDeleteMedia = (id: number) => {
    setMediaItems(mediaItems.filter((m) => m.id !== id));
    showToast('Media file deleted.');
  };

  // Message Handlers
  const handleOpenReplyModal = (msg: any) => {
    setReplyingMessage(msg);
    setReplyText(`Hi ${msg.name},\n\nThank you for contacting IndustrialCalc...`);
    setReplyModalOpen(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingMessage) {
      setMessages(
        messages.map((m) =>
          m.id === replyingMessage.id ? { ...m, status: 'Replied' } : m
        )
      );
      showToast(`Sent response to ${replyingMessage.email}!`);
      setReplyModalOpen(false);
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    showToast('Inquiry removed from inbox.');
  };

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id));
    showToast(`Report ${id} removed from logs.`);
  };

  const toggleUserBlock = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u
      )
    );
    showToast('User status updated.');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    showToast('User deleted from directory.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-950 border border-[#00FF99] text-[#00FF99] text-xs font-bold flex items-center gap-2 shadow-2xl animate-bounce">
          <Check className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* ADMIN HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border-[#00FF99]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00FF99]/20 border border-[#00FF99] flex items-center justify-center text-[#00FF99]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Control Suite</h1>
            <p className="text-xs text-slate-400">Manage Site Contact Details, Page CMS Rich Editor, Branding, CMS & Telemetry</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem('adminAuthenticated');
              document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              window.location.href = '/admin/login';
            }}
            className="px-3.5 py-2 rounded-xl glass-panel text-slate-300 hover:text-red-400 text-xs font-bold transition-colors"
          >
            Sign Out
          </button>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF99] animate-ping" /> System Nominal
          </span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'customizer', label: 'Site & Theme Customizer', icon: Sliders },
          { id: 'pagecms', label: 'Page CMS (Rich Editor)', icon: FileCode },
          { id: 'reports', label: 'Report Logs', icon: FileSpreadsheet },
          { id: 'blogs', label: 'Blog CMS', icon: Newspaper },
          { id: 'media', label: 'Media Library', icon: FolderOpen },
          { id: 'messages', label: 'Contact Messages', icon: Mail },
          { id: 'logs', label: 'Security Logs', icon: Lock },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: BarChart2 },
          { id: 'settings', label: 'System Config', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#00FF99] text-black shadow-lg shadow-[#00FF99]/20'
                  : 'glass-panel text-slate-300 hover:text-[#00FF99]'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SITE & THEME CUSTOMIZER */}
      {activeTab === 'customizer' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col */}
            <div className="lg:col-span-6 space-y-6">
              <GlassCard hoverEffect={false} className="space-y-4 border-[#00FF99]/40">
                <h3 className="text-base font-bold text-[#00FF99] flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Information & Global Map Settings
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#00FF99]" /> Support Email
                    </label>
                    <input
                      type="email"
                      value={siteConfig.supportEmail}
                      onChange={(e) => setSiteConfig({ ...siteConfig, supportEmail: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#00E5FF]" /> Engineering Hotline / Phone
                    </label>
                    <input
                      type="text"
                      value={siteConfig.supportPhone}
                      onChange={(e) => setSiteConfig({ ...siteConfig, supportPhone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF007A]" /> Global Headquarters Address
                    </label>
                    <input
                      type="text"
                      value={siteConfig.headquartersAddress}
                      onChange={(e) => setSiteConfig({ ...siteConfig, headquartersAddress: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" /> Map Center Location Text
                    </label>
                    <input
                      type="text"
                      value={siteConfig.mapLocationText}
                      onChange={(e) => setSiteConfig({ ...siteConfig, mapLocationText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#00E5FF] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> Logo, Favicon & Site Identity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Website Name</label>
                    <input
                      type="text"
                      value={siteConfig.websiteName}
                      onChange={(e) => setSiteConfig({ ...siteConfig, websiteName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Slogan / Subtitle</label>
                    <input
                      type="text"
                      value={siteConfig.slogan}
                      onChange={(e) => setSiteConfig({ ...siteConfig, slogan: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Logo Image URL</label>
                    <input
                      type="text"
                      value={siteConfig.logoUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, logoUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Favicon URL</label>
                    <input
                      type="text"
                      value={siteConfig.faviconUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, faviconUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#FF007A] flex items-center gap-2">
                  <Layout className="w-5 h-5" /> Hero Section, Text & Action Buttons
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Hero Badge Text</label>
                    <input
                      type="text"
                      value={siteConfig.heroBadgeText}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroBadgeText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Hero Headline Text</label>
                    <input
                      type="text"
                      value={siteConfig.heroTitle}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroTitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Hero Subtext Description</label>
                    <textarea
                      rows={2}
                      value={siteConfig.heroSubtext}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroSubtext: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-6 space-y-6">
              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#00FF99] flex items-center gap-2">
                  <Palette className="w-5 h-5" /> Colors, Gradients & Theme Palettes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Neon Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteConfig.primaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-slate-300">{siteConfig.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Secondary Cyan</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteConfig.secondaryColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, secondaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-slate-300">{siteConfig.secondaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Accent Pink</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteConfig.accentColor}
                        onChange={(e) => setSiteConfig({ ...siteConfig, accentColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <span className="font-mono text-slate-300">{siteConfig.accentColor}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <button
                onClick={handleSaveCustomizer}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#00FF99] text-black font-black text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Save All Site Customizer Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAGE CMS (RICH MODERN TEXT EDITOR) */}
      {activeTab === 'pagecms' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#00FF99]" /> Page Content CMS & Rich Modern WYSIWYG Editor
              </h3>
              <p className="text-xs text-slate-400">Edit Legal & Support pages (Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, About Us)</p>
            </div>

            <button
              onClick={handleSavePageCMS}
              className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-90"
            >
              <Check className="w-4 h-4" /> Save Page Content
            </button>
          </div>

          {/* PAGE SELECTOR TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms of Service' },
              { id: 'cookies', label: 'Cookie Policy' },
              { id: 'disclaimer', label: 'Disclaimer' },
              { id: 'about', label: 'About Us' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPage(p.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedPage === p.id
                    ? 'bg-emerald-500/20 text-[#00FF99] border border-[#00FF99]'
                    : 'glass-panel text-slate-300 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* PAGE TITLE FIELD */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-300">Page Headline Title</label>
            <input
              type="text"
              value={pagesConfig[selectedPage]?.title || ''}
              onChange={(e) =>
                setPagesConfig({
                  ...pagesConfig,
                  [selectedPage]: { ...pagesConfig[selectedPage], title: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl glass-panel text-white font-bold text-sm"
            />
          </div>

          {/* RICH MODERN TEXT EDITOR TOOLBAR */}
          <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden space-y-0">
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center flex-wrap gap-1.5 text-xs text-slate-300">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mr-2">WYSIWYG Toolbar:</span>
              <button
                type="button"
                onClick={() => insertRichTag('<b>', '</b>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<i>', '</i>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<u>', '</u>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Underline"
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
                type="button"
                onClick={() => insertRichTag('<h2>', '</h2>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Heading 2"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<h3>', '</h3>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Heading 3"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
                type="button"
                onClick={() => insertRichTag('<ul>\n  <li>', '</li>\n</ul>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<ol>\n  <li>', '</li>\n</ol>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<blockquote>', '</blockquote>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<code>', '</code>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Code"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<a href="https://industrialcalc.app">', '</a>')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Insert Link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertRichTag('<img src="https://images.unsplash.com/photo-1527661591475-527312dd65f5" alt="Banner" class="w-full rounded-xl my-4" />')}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-[#00FF99]"
                title="Insert Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditorPreviewMode(!editorPreviewMode)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    editorPreviewMode ? 'bg-[#00FF99] text-black' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> {editorPreviewMode ? 'Edit Mode' : 'Live Preview'}
                </button>
              </div>
            </div>

            {/* EDITOR / PREVIEW CONTENT */}
            {editorPreviewMode ? (
              <div
                className="p-6 bg-slate-950 text-slate-200 text-sm leading-relaxed min-h-[350px] max-h-[500px] overflow-y-auto prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: pagesConfig[selectedPage]?.content || '' }}
              />
            ) : (
              <textarea
                rows={14}
                value={pagesConfig[selectedPage]?.content || ''}
                onChange={(e) =>
                  setPagesConfig({
                    ...pagesConfig,
                    [selectedPage]: { ...pagesConfig[selectedPage], content: e.target.value },
                  })
                }
                className="w-full p-6 bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed border-none resize-y min-h-[350px]"
                placeholder="Write or edit HTML content using the Rich Toolbar above..."
              />
            )}
          </div>
        </GlassCard>
      )}

      {/* OTHER TABS */}
      {/* REPORTS */}
      {activeTab === 'reports' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#00FF99]" /> Exported Calculation Reports Archive ({reports.length})
            </h3>
            <button
              onClick={() =>
                downloadCSV(
                  'industrialcalc_report_logs.csv',
                  ['Report ID', 'Verification Code', 'Calculator Tool', 'User Name', 'Email', 'Role', 'Date'],
                  reports.map((r) => [r.id, r.code, r.tool, r.user, r.email, r.role, r.date])
                )
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Export All Reports (CSV)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">Report ID</th>
                  <th className="p-3">Verification Code</th>
                  <th className="p-3">Calculator Tool</th>
                  <th className="p-3">User Lead Name</th>
                  <th className="p-3">Professional Role</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono font-bold text-[#00FF99]">{r.id}</td>
                    <td className="p-3 font-mono text-slate-400">{r.code}</td>
                    <td className="p-3 font-bold text-white">{r.tool}</td>
                    <td className="p-3">{r.user} ({r.email})</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">{r.role}</span></td>
                    <td className="p-3 text-slate-400">{r.date}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedReport(r);
                          setViewReportModalOpen(true);
                        }}
                        className="p-1.5 rounded bg-emerald-500/20 text-[#00FF99] hover:bg-[#00FF99] hover:text-black"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(r.id)}
                        className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                        title="Delete Log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* BLOG CMS */}
      {activeTab === 'blogs' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#00E5FF]" /> Blog & Industry News CMS ({blogPosts.length})
            </h3>
            <button
              onClick={() => handleOpenBlogModal()}
              className="px-4 py-2 rounded-xl bg-[#00FF99] text-black text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Create New Post
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">Cover Image</th>
                  <th className="p-3">Article Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Publish Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {blogPosts.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/50">
                    <td className="p-3">
                      <div
                        className="w-12 h-9 rounded bg-cover bg-center border border-slate-700"
                        style={{ backgroundImage: `url(${b.imageUrl})` }}
                      />
                    </td>
                    <td className="p-3 font-bold text-white max-w-xs truncate">{b.title}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400">{b.category}</span></td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${b.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{b.date}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenBlogModal(b)}
                        className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(b.id)}
                        className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* MEDIA LIBRARY */}
      {activeTab === 'media' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#FF007A]" /> Media Library & Upload Assets ({mediaItems.length})
            </h3>
            <button
              onClick={() => {
                setMediaForm({ name: '', type: 'image/png', url: '' });
                setMediaModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Upload className="w-4 h-4" /> Upload New File
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="glass-panel p-4 rounded-2xl flex flex-col justify-between space-y-3 border border-slate-800 hover:border-pink-500/40 transition-colors">
                <div>
                  <div className="text-xs font-mono font-bold text-[#00FF99] truncate">{item.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.type} • {item.size}</div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      showToast('Copied URL to clipboard!');
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-[#00FF99]"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </button>
                  <button onClick={() => handleDeleteMedia(item.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* MESSAGES */}
      {activeTab === 'messages' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00FF99]" /> Contact Inquiries Inbox ({messages.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">Sender Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Subject / Inquiry</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {messages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">{m.name}</td>
                    <td className="p-3">{m.email} <br/><span className="text-slate-500">{m.phone}</span></td>
                    <td className="p-3">
                      <div className="font-bold text-slate-200">{m.subject}</div>
                      <div className="text-[11px] text-slate-400 max-w-xs truncate mt-0.5">{m.body}</div>
                    </td>
                    <td className="p-3 text-slate-400">{m.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${m.status === 'Unread' ? 'bg-pink-500/20 text-pink-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenReplyModal(m)}
                        className="px-2.5 py-1 rounded bg-[#00FF99] text-black font-bold flex items-center gap-1 hover:opacity-90"
                      >
                        <Send className="w-3 h-3" /> Reply
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1 rounded text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* LOGS */}
      {activeTab === 'logs' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-400" /> Security & IP Action Telemetry Logs ({securityLogs.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Geographic Location</th>
                  <th className="p-3">Logged Action Event</th>
                  <th className="p-3">Risk Assessment</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {securityLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono font-bold text-slate-200">{l.ip}</td>
                    <td className="p-3">{l.country}</td>
                    <td className="p-3">{l.action}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${l.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {l.risk} Risk
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* USERS */}
      {activeTab === 'users' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Registered Users & Leads Directory ({users.length})</h3>
            <button
              onClick={() =>
                downloadCSV(
                  'industrialcalc_users.csv',
                  ['User ID', 'Name', 'Email', 'Role', 'Country', 'Status', 'Registration Date'],
                  users.map((u) => [u.id, u.name, u.email, u.role, u.country, u.status, u.date])
                )
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-[#00FF99] hover:text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Export Users (CSV)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Work Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-[#00FF99]">{u.role}</span></td>
                    <td className="p-3">{u.country}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button onClick={() => toggleUserBlock(u.id)} className="text-xs text-slate-400 hover:text-white underline">
                        {u.status === 'Active' ? 'Block' : 'Unblock'}
                      </button>
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Top Calculator Engine</div>
              <div className="text-2xl font-black text-[#00FF99] mt-1">Molarity (M)</div>
              <div className="text-[11px] text-slate-500 mt-1">4,250 calculations this month</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Lead Conversions</div>
              <div className="text-2xl font-black text-[#00E5FF] mt-1">68.4%</div>
              <div className="text-[11px] text-slate-500 mt-1">+12% vs last 30 days</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Total User Leads</div>
              <div className="text-2xl font-black text-[#FF007A] mt-1">14,890</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 24 professional roles</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Active Countries</div>
              <div className="text-2xl font-black text-white mt-1">42 Nations</div>
              <div className="text-[11px] text-slate-500 mt-1">USA, Germany, India, France top</div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartView data={topCalculatorsChart} title="Most Used Calculator Engines (30 Days)" />
            <ChartView data={conversionsChart} title="Report Downloads & Lead Conversions Trend" />
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {activeTab === 'settings' && (
        <GlassCard hoverEffect={false} className="space-y-6 max-w-3xl">
          <h3 className="text-lg font-bold text-white">System Infrastructure & Server Configuration</h3>

          <form onSubmit={handleSaveSystemSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1">SITE NAME</label>
              <input
                type="text"
                value={systemSettings.siteName}
                onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-panel text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">MONGODB ATLAS CONNECTION URI</label>
              <input
                type="password"
                value={systemSettings.mongoUri}
                onChange={(e) => setSystemSettings({ ...systemSettings, mongoUri: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-panel text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-mono mb-1">JWT SECRET</label>
                <input
                  type="password"
                  value={systemSettings.jwtSecret}
                  onChange={(e) => setSystemSettings({ ...systemSettings, jwtSecret: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-panel text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono mb-1">SMTP HOST</label>
                <input
                  type="text"
                  value={systemSettings.smtpHost}
                  onChange={(e) => setSystemSettings({ ...systemSettings, smtpHost: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-panel text-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#00FF99] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
              >
                Save System Infrastructure Settings
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* MODALS */}
      {/* BLOG MODAL */}
      <GlassModal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        title={editingPost ? 'Edit Blog Article' : 'Create New Blog Post'}
      >
        <form onSubmit={handleSaveBlogPost} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Category *</label>
              <select
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white bg-slate-900"
              >
                <option value="Food & Dairy">Food & Dairy</option>
                <option value="Production & AI">Production & AI</option>
                <option value="Chemical Eng">Chemical Eng</option>
                <option value="AI in Manufacturing">AI in Manufacturing</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={blogForm.author}
                onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-[#00FF99]/30 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#00FF99] flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" /> Cover Image Insertion & Media Upload Section
            </label>
            <input
              type="text"
              required
              placeholder="Insert Image URL (https://images.unsplash.com/...)"
              value={blogForm.imageUrl}
              onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
            />
            {blogForm.imageUrl && (
              <div className="flex items-center gap-3 pt-2">
                <div
                  className="w-24 h-16 rounded-xl bg-cover bg-center border border-[#00FF99]"
                  style={{ backgroundImage: `url(${blogForm.imageUrl})` }}
                />
                <span className="text-[11px] text-slate-400 font-mono">Cover Image Preview Active</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Article Excerpt *</label>
            <input
              type="text"
              required
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Full Article Content *</label>
            <textarea
              rows={5}
              required
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white font-mono"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setBlogModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black font-bold uppercase tracking-wider">
              {editingPost ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </form>
      </GlassModal>

      {/* MEDIA MODAL */}
      <GlassModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} title="Upload File to Media Library">
        <form onSubmit={handleSaveMediaItem} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">File Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. process-diagram.png"
              value={mediaForm.name}
              onChange={(e) => setMediaForm({ ...mediaForm, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">MIME Type *</label>
            <select
              value={mediaForm.type}
              onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white bg-slate-900"
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="video/mp4">video/mp4</option>
              <option value="application/json">application/json (Lottie)</option>
              <option value="image/x-icon">image/x-icon (Favicon)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">File Target URL / CDN Link *</label>
            <input
              type="text"
              required
              placeholder="https://..."
              value={mediaForm.url}
              onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white font-mono"
            />
          </div>
          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setMediaModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-pink-600 text-white font-bold uppercase tracking-wider">
              Save to Library
            </button>
          </div>
        </form>
      </GlassModal>

      {/* REPLY MODAL */}
      <GlassModal isOpen={replyModalOpen} onClose={() => setReplyModalOpen(false)} title={`Reply to ${replyingMessage?.name || 'Inquiry'}`}>
        <form onSubmit={handleSendReply} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono">
            <div>To: {replyingMessage?.email}</div>
            <div>Subject: Re: {replyingMessage?.subject}</div>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Reply Message Body *</label>
            <textarea
              rows={6}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white"
            />
          </div>
          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setReplyModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Send Email Response
            </button>
          </div>
        </form>
      </GlassModal>

      {/* REPORT VIEW MODAL */}
      <GlassModal isOpen={viewReportModalOpen} onClose={() => setViewReportModalOpen(false)} title={`Report Details - ${selectedReport?.id || ''}`}>
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-[#00FF99] text-emerald-400 font-mono space-y-1">
              <div><strong className="text-white">Report ID:</strong> {selectedReport.id}</div>
              <div><strong className="text-white">Verification Code:</strong> {selectedReport.code}</div>
              <div><strong className="text-white">Calculator Engine:</strong> {selectedReport.tool}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl glass-panel">
              <div>
                <span className="text-slate-400">User Name:</span>
                <div className="font-bold text-white text-sm">{selectedReport.user}</div>
              </div>
              <div>
                <span className="text-slate-400">Professional Role:</span>
                <div className="font-bold text-[#00FF99] text-sm">{selectedReport.role}</div>
              </div>
              <div>
                <span className="text-slate-400">User Email:</span>
                <div className="text-white">{selectedReport.email}</div>
              </div>
              <div>
                <span className="text-slate-400">Export Timestamp:</span>
                <div className="text-slate-300">{selectedReport.date}</div>
              </div>
            </div>
            <div className="pt-3 flex justify-end">
              <button
                onClick={() => window.open(`/verify?code=${selectedReport.code}`, '_blank')}
                className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Open Verification Webpage
              </button>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}
