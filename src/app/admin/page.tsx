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
  RotateCcw,
  Smartphone,
  Key,
  MessageSquare,
  ShieldAlert,
  QrCode,
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

  // ANALYTICS STATE (SUPPORT FRESH RESET)
  const defaultAnalytics = {
    topEngine: 'Molarity (M)',
    topEngineCount: 4250,
    conversionRate: 68.4,
    totalLeads: 14890,
    activeCountries: 42,
    topCalculatorsChart: [
      { name: 'Molarity', value: 4250 },
      { name: 'OEE', value: 3890 },
      { name: 'Pasteurization', value: 3120 },
      { name: 'Reynolds No.', value: 2780 },
      { name: 'Density/Brix', value: 2450 },
    ],
    conversionsChart: [
      { name: 'Jan', value: 1240 },
      { name: 'Feb', value: 1890 },
      { name: 'Mar', value: 2400 },
      { name: 'Apr', value: 3100 },
      { name: 'May', value: 4200 },
      { name: 'Jun', value: 5800 },
    ],
  };

  const [analyticsData, setAnalyticsData] = useState(defaultAnalytics);

  const handleResetAnalytics = () => {
    setAnalyticsData({
      topEngine: 'None (Fresh Start)',
      topEngineCount: 0,
      conversionRate: 0.0,
      totalLeads: 0,
      activeCountries: 0,
      topCalculatorsChart: [
        { name: 'Molarity', value: 0 },
        { name: 'OEE', value: 0 },
        { name: 'Pasteurization', value: 0 },
        { name: 'Reynolds No.', value: 0 },
        { name: 'Density/Brix', value: 0 },
      ],
      conversionsChart: [
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
      ],
    });
    showToast('Analytics Metrics Reset to Fresh Baseline (0 Calculations)!');
  };

  // ADMIN CREDENTIALS STATE & CHANGE HANDLER
  const [adminCreds, setAdminCreds] = useState({
    email: 'admin@industrialcalc.app',
    password: 'Admin@2026',
  });

  const [credForm, setCredForm] = useState({
    newEmail: 'admin@industrialcalc.app',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 2FA & MULTI-FACTOR SECURITY STATE
  const [twoFactorConfig, setTwoFactorConfig] = useState({
    totpEnabled: false,
    smsEnabled: false,
    emailOtpEnabled: true,
    phoneNumber: '+1 555-0199',
    secretKey: 'JBSWY3DPEHPK3PXP',
    backupCodes: [
      '8492-0194',
      '7301-9482',
      '1048-2938',
      '9201-4829',
      '5810-9122',
      '3819-2049',
      '7491-0294',
      '6102-9481',
    ],
  });

  const [showQrModal, setShowQrModal] = useState(false);

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

  // Site & Theme Customizer State (ALL 25 PARAMETERS INCLUDED)
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
      content: `<h2>1. Data Collection Principles</h2><p>IndustrialCalc collects user lead information (name, work email, mobile number, professional role) exclusively when exporting calculation reports.</p><h2>2. Use of Information</h2><p>Your inputs and parameters remain private and are processed in client-side memory to compute engineering metrics.</p>`,
    },
    terms: {
      title: 'Terms of Service',
      content: `<h2>1. Acceptance of Terms</h2><p>By accessing IndustrialCalc, you agree to comply with our terms of service for engineering calculations.</p>`,
    },
    cookies: {
      title: 'Cookie Policy',
      content: `<h2>1. Essential Cookies</h2><p>We use essential cookies and browser local storage to remember your visual theme preference.</p>`,
    },
    disclaimer: {
      title: 'Engineering Disclaimer',
      content: `<h2>1. Professional Verification Required</h2><p>All calculations on IndustrialCalc are designed using validated mathematical models.</p>`,
    },
    about: {
      title: 'About IndustrialCalc',
      content: `<h2>Next-Gen Process Engineering Suite</h2><p>IndustrialCalc provides 50 specialized calculation engines.</p>`,
    },
  });

  // Load persisted configs on mount
  useEffect(() => {
    const savedSite = localStorage.getItem('industrialcalc_siteConfig');
    if (savedSite) {
      try {
        setSiteConfig(JSON.parse(savedSite));
      } catch (e) {}
    }

    const savedCreds = localStorage.getItem('industrialcalc_adminCreds');
    if (savedCreds) {
      try {
        const parsed = JSON.parse(savedCreds);
        if (parsed.email && parsed.password) {
          setAdminCreds(parsed);
          setCredForm((prev) => ({ ...prev, newEmail: parsed.email }));
        }
      } catch (e) {}
    }

    const saved2FA = localStorage.getItem('industrialcalc_2faConfig');
    if (saved2FA) {
      try {
        setTwoFactorConfig(JSON.parse(saved2FA));
      } catch (e) {}
    }
  }, []);

  // Save Admin Credentials
  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (credForm.newPassword && credForm.newPassword !== credForm.confirmPassword) {
      showToast('Error: Passwords do not match!');
      return;
    }

    const updated = {
      email: credForm.newEmail,
      password: credForm.newPassword ? credForm.newPassword : adminCreds.password,
    };

    setAdminCreds(updated);
    localStorage.setItem('industrialcalc_adminCreds', JSON.stringify(updated));
    showToast('Admin Credentials Updated Successfully! Use new email/password to sign in.');
    setCredForm((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  // Save 2FA Settings
  const handleSave2FA = (newConfig: typeof twoFactorConfig) => {
    setTwoFactorConfig(newConfig);
    localStorage.setItem('industrialcalc_2faConfig', JSON.stringify(newConfig));
    showToast('Updated 2FA Multi-Factor Authentication Settings!');
  };

  // Generate Backup Codes
  const handleGenerateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () =>
      Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000)
    );
    const newConfig = { ...twoFactorConfig, backupCodes: codes };
    handleSave2FA(newConfig);
    showToast('Generated 8 New Emergency Backup Recovery Codes!');
  };

  // Save Customizer Config
  const handleSaveCustomizer = () => {
    localStorage.setItem('industrialcalc_siteConfig', JSON.stringify(siteConfig));
    showToast('Saved Contact Details, Logo, Favicon, Colors & Branding Settings!');
  };

  // Save System Config
  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('System Infrastructure & API Settings Saved!');
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
        blogPosts.map((p) => (p.id === editingPost.id ? { ...p, ...blogForm } : p))
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
        messages.map((m) => (m.id === replyingMessage.id ? { ...m, status: 'Replied' } : m))
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
      users.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u))
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
            <p className="text-xs text-slate-400">
              Manage Credentials, 2FA Security, Site Customizer, Logo/Favicon, Analytics Reset, CMS & Telemetry
            </p>
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
          { id: 'analytics', label: 'Analytics', icon: BarChart2 },
          { id: 'pagecms', label: 'Page CMS (Rich Editor)', icon: FileCode },
          { id: 'reports', label: 'Report Logs', icon: FileSpreadsheet },
          { id: 'blogs', label: 'Blog CMS', icon: Newspaper },
          { id: 'media', label: 'Media Library', icon: FolderOpen },
          { id: 'messages', label: 'Contact Messages', icon: Mail },
          { id: 'logs', label: 'Security Logs', icon: Lock },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'settings', label: 'Credentials & 2FA System', icon: Settings },
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

      {/* TAB 1: SITE & THEME CUSTOMIZER (RESTORED COMPLETE SECTIONS) */}
      {activeTab === 'customizer' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col */}
            <div className="lg:col-span-6 space-y-6">
              {/* CONTACT DETAILS & MAP LOCATION SECTION */}
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

              {/* LOGO, FAVICON & BRAND IDENTITY */}
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

              {/* HERO SECTION TEXT & BUTTONS */}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Primary Hero Button Text</label>
                      <input
                        type="text"
                        value={siteConfig.heroPrimaryBtnText}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroPrimaryBtnText: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Secondary Hero Button Text</label>
                      <input
                        type="text"
                        value={siteConfig.heroSecondaryBtnText}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroSecondaryBtnText: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-6 space-y-6">
              {/* MEDIA, VIDEOS & ANIMATIONS */}
              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#FF007A] flex items-center gap-2">
                  <Video className="w-5 h-5" /> Media, Animations & Background Video/Images
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Hero Background Image</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={siteConfig.heroImageUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Hero Video URL (.mp4)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={siteConfig.heroVideoUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroVideoUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">AI Generated Image Asset</label>
                    <input
                      type="text"
                      value={siteConfig.aiImageUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, aiImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">GIF Asset Library URL</label>
                    <input
                      type="text"
                      value={siteConfig.gifLibraryUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, gifLibraryUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold mb-1">Lottie Animation JSON URL</label>
                    <input
                      type="text"
                      value={siteConfig.lottieAnimationUrl}
                      onChange={(e) => setSiteConfig({ ...siteConfig, lottieAnimationUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                </div>
              </GlassCard>

              {/* COLORS & GRADIENTS */}
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

              {/* TYPOGRAPHY & BUTTON SHAPES */}
              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#00E5FF] flex items-center gap-2">
                  <Type className="w-5 h-5" /> Typography, Font, Card Blur & Button Shapes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Font Family</label>
                    <select
                      value={siteConfig.fontFamily}
                      onChange={(e) => setSiteConfig({ ...siteConfig, fontFamily: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-white bg-slate-900"
                    >
                      <option value="Inter">Inter (Default)</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Outfit">Outfit</option>
                      <option value="System UI">System UI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Card Glass Blur</label>
                    <select
                      value={siteConfig.cardBlur}
                      onChange={(e) => setSiteConfig({ ...siteConfig, cardBlur: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-white bg-slate-900"
                    >
                      <option value="12px">12px Subtle</option>
                      <option value="24px">24px VisionOS (Default)</option>
                      <option value="32px">32px Ultra Blur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Button Shape</label>
                    <select
                      value={siteConfig.buttonStyle}
                      onChange={(e) => setSiteConfig({ ...siteConfig, buttonStyle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-white bg-slate-900"
                    >
                      <option value="rounded-full">Pill (rounded-full)</option>
                      <option value="rounded-2xl">Modern (rounded-2xl)</option>
                      <option value="rounded-xl">Classic (rounded-xl)</option>
                    </select>
                  </div>
                </div>
              </GlassCard>

              {/* HOMEPAGE SECTIONS TOGGLE */}
              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#00FF99]" /> Homepage Sections Toggle & Reorder
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showHeroSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showHeroSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">Hero Header Section</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showStatsSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showStatsSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">Counter Stats Bar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showTrendingSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showTrendingSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">Trending Calculators</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showFeaturesSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showFeaturesSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">Features Overview</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showBlogSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showBlogSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">Knowledge Articles</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl glass-panel">
                    <input
                      type="checkbox"
                      checked={siteConfig.showFaqSection}
                      onChange={(e) => setSiteConfig({ ...siteConfig, showFaqSection: e.target.checked })}
                      className="accent-[#00FF99] w-4 h-4"
                    />
                    <span className="text-white font-semibold">FAQ Accordion</span>
                  </label>
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

      {/* TAB: ANALYTICS (WITH RESET ANALYTICS FEATURE) */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#00FF99]" /> System Real-time Telemetry Analytics
              </h3>
              <p className="text-xs text-slate-400">Calculation engine usage metrics, conversions, and regional distribution</p>
            </div>
            <button
              onClick={handleResetAnalytics}
              className="px-4 py-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Reset Analytics (Fresh Baseline)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Top Calculator Engine</div>
              <div className="text-2xl font-black text-[#00FF99] mt-1">{analyticsData.topEngine}</div>
              <div className="text-[11px] text-slate-500 mt-1">{analyticsData.topEngineCount} calculations logged</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Lead Conversions</div>
              <div className="text-2xl font-black text-[#00E5FF] mt-1">{analyticsData.conversionRate}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Report download conversion rate</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Total User Leads</div>
              <div className="text-2xl font-black text-[#FF007A] mt-1">{analyticsData.totalLeads}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 24 professional roles</div>
            </GlassCard>
            <GlassCard hoverEffect={false}>
              <div className="text-xs font-bold text-slate-400 uppercase">Active Countries</div>
              <div className="text-2xl font-black text-white mt-1">{analyticsData.activeCountries} Nations</div>
              <div className="text-[11px] text-slate-500 mt-1">Global user reach</div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartView data={analyticsData.topCalculatorsChart} title="Most Used Calculator Engines (30 Days)" />
            <ChartView data={analyticsData.conversionsChart} title="Report Downloads & Lead Conversions Trend" />
          </div>
        </div>
      )}

      {/* TAB: PAGE CMS */}
      {activeTab === 'pagecms' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#00FF99]" /> Page Content CMS & Rich Modern WYSIWYG Editor
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['privacy', 'terms', 'cookies', 'disclaimer', 'about'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPage(p as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  selectedPage === p ? 'bg-emerald-500/20 text-[#00FF99] border border-[#00FF99]' : 'glass-panel text-slate-300'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
          <textarea
            rows={12}
            value={pagesConfig[selectedPage]?.content || ''}
            onChange={(e) =>
              setPagesConfig({
                ...pagesConfig,
                [selectedPage]: { ...pagesConfig[selectedPage], content: e.target.value },
              })
            }
            className="w-full p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl"
          />
        </GlassCard>
      )}

      {/* TAB: REPORT LOGS */}
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
              className="px-4 py-2 rounded-xl bg-emerald-600 text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Export All Reports (CSV)
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="p-3">Report ID</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Tool</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td className="p-3 font-mono text-[#00FF99]">{r.id}</td>
                    <td className="p-3 font-mono">{r.code}</td>
                    <td className="p-3 text-white font-bold">{r.tool}</td>
                    <td className="p-3">{r.user}</td>
                    <td className="p-3">{r.role}</td>
                    <td className="p-3">{r.date}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button onClick={() => handleDeleteReport(r.id)} className="p-1 text-red-400">
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

      {/* TAB: BLOG CMS */}
      {activeTab === 'blogs' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#00E5FF]" /> Blog & Industry News CMS ({blogPosts.length})
            </h3>
            <button onClick={() => handleOpenBlogModal()} className="px-4 py-2 rounded-xl bg-[#00FF99] text-black text-xs font-bold flex items-center gap-1">
              <Plus className="w-4 h-4" /> Create New Post
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {blogPosts.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3 text-white font-bold">{b.title}</td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3 flex items-center gap-2">
                      <button onClick={() => handleOpenBlogModal(b)} className="p-1 text-slate-300">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteBlogPost(b.id)} className="p-1 text-red-400">
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

      {/* TAB: MEDIA LIBRARY */}
      {activeTab === 'media' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#FF007A]" /> Media Assets ({mediaItems.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mediaItems.map((m) => (
              <div key={m.id} className="glass-panel p-3 rounded-xl">
                <div className="text-xs font-mono text-[#00FF99] truncate">{m.name}</div>
                <div className="text-[10px] text-slate-400">{m.size}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* TAB: MESSAGES */}
      {activeTab === 'messages' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <h3 className="text-lg font-bold text-white">Contact Messages ({messages.length})</h3>
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="glass-panel p-4 rounded-xl space-y-1">
                <div className="text-xs font-bold text-white">{m.name} ({m.email})</div>
                <div className="text-xs text-slate-300">{m.subject}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* TAB: LOGS */}
      {activeTab === 'logs' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <h3 className="text-lg font-bold text-white">Security & Audit Logs</h3>
          <div className="space-y-2 text-xs font-mono">
            {securityLogs.map((l) => (
              <div key={l.id} className="p-3 rounded bg-slate-950 flex justify-between">
                <span className="text-[#00FF99]">{l.ip}</span>
                <span className="text-slate-300">{l.action}</span>
                <span className="text-slate-500">{l.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* TAB: USERS */}
      {activeTab === 'users' && (
        <GlassCard hoverEffect={false} className="space-y-6">
          <h3 className="text-lg font-bold text-white">User Directory ({users.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* TAB: CREDENTIALS & 2FA SYSTEM */}
      {activeTab === 'settings' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <GlassCard hoverEffect={false} className="space-y-4 border-[#00FF99]/40">
                <h3 className="text-base font-bold text-[#00FF99] flex items-center gap-2">
                  <Key className="w-5 h-5" /> Change Admin Login Credentials
                </h3>
                <form onSubmit={handleChangeCredentials} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Admin Email Address</label>
                    <input
                      type="email"
                      required
                      value={credForm.newEmail}
                      onChange={(e) => setCredForm({ ...credForm, newEmail: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">New Password (Leave blank to keep current)</label>
                    <input
                      type="password"
                      placeholder="Enter new strong password"
                      value={credForm.newPassword}
                      onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      value={credForm.confirmPassword}
                      onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-[#00FF99] text-black font-extrabold uppercase tracking-wider transition-all shadow-md mt-2"
                  >
                    Update Admin Credentials
                  </button>
                </form>
              </GlassCard>

              <GlassCard hoverEffect={false} className="space-y-4">
                <h3 className="text-base font-bold text-[#00E5FF] flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Infrastructure & Server Configuration
                </h3>
                <form onSubmit={handleSaveSystemSettings} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">SITE NAME</label>
                    <input
                      type="text"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">MONGODB ATLAS CONNECTION URI</label>
                    <input
                      type="password"
                      value={systemSettings.mongoUri}
                      onChange={(e) => setSystemSettings({ ...systemSettings, mongoUri: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-panel text-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-wider"
                  >
                    Save Server Infrastructure
                  </button>
                </form>
              </GlassCard>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <GlassCard hoverEffect={false} className="space-y-5 border-[#FF007A]/40">
                <h3 className="text-base font-bold text-[#FF007A] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" /> Multi-Factor Security & 2FA Authentication
                </h3>
                <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-[#00FF99]" />
                      <div>
                        <div className="text-xs font-bold text-white">Google Authenticator (TOTP 2FA)</div>
                        <div className="text-[11px] text-slate-400">Time-based one-time passwords via 2FA apps</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorConfig.totpEnabled}
                        onChange={(e) =>
                          handleSave2FA({ ...twoFactorConfig, totpEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF99]" />
                    </label>
                  </div>
                  {twoFactorConfig.totpEnabled && (
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                      <span className="font-mono text-slate-400">Secret: {twoFactorConfig.secretKey}</span>
                      <button
                        onClick={() => setShowQrModal(true)}
                        className="px-3 py-1 rounded-lg bg-emerald-500/20 text-[#00FF99] font-bold flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" /> Setup QR Code
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
                      <div>
                        <div className="text-xs font-bold text-white">SMS & WhatsApp Message Auth</div>
                        <div className="text-[11px] text-slate-400">Receive 6-digit OTP codes via mobile SMS</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorConfig.smsEnabled}
                        onChange={(e) =>
                          handleSave2FA({ ...twoFactorConfig, smsEnabled: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5FF]" />
                    </label>
                  </div>
                  {twoFactorConfig.smsEnabled && (
                    <div className="pt-2 text-xs space-y-1">
                      <label className="block text-slate-400">Registered Phone Number</label>
                      <input
                        type="text"
                        value={twoFactorConfig.phoneNumber}
                        onChange={(e) =>
                          handleSave2FA({ ...twoFactorConfig, phoneNumber: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-xl glass-panel text-white font-mono"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Emergency Backup Recovery Codes</div>
                      <div className="text-[11px] text-slate-400">Single-use codes for emergency access</div>
                    </div>
                    <button
                      onClick={handleGenerateBackupCodes}
                      className="px-3 py-1.5 rounded-xl bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white text-xs font-bold transition-colors"
                    >
                      Generate New Codes
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {twoFactorConfig.backupCodes.map((code, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="text-slate-500">{idx + 1}.</span> {code}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      )}

      {/* QR MODAL */}
      <GlassModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} title="Setup Google Authenticator 2FA">
        <div className="text-center space-y-4 py-4 text-xs">
          <p className="text-slate-300">Scan this QR code with Google Authenticator or Microsoft Authenticator app:</p>
          <div className="w-44 h-44 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=otpauth://totp/IndustrialCalc:admin@industrialcalc.app?secret=${twoFactorConfig.secretKey}&issuer=IndustrialCalc`}
              alt="2FA QR Code"
              className="w-full h-full"
            />
          </div>
          <div className="font-mono text-slate-400">Secret Key: {twoFactorConfig.secretKey}</div>
          <button onClick={() => setShowQrModal(false)} className="px-6 py-2 rounded-xl bg-[#00FF99] text-black font-bold uppercase">
            Done Setting Up
          </button>
        </div>
      </GlassModal>

      {/* OTHER MODALS */}
      <GlassModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} title={editingPost ? 'Edit Blog Article' : 'Create New Blog Post'}>
        <form onSubmit={handleSaveBlogPost} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Article Title *</label>
            <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white font-bold" />
          </div>
          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setBlogModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black font-bold uppercase tracking-wider">{editingPost ? 'Save Changes' : 'Publish Post'}</button>
          </div>
        </form>
      </GlassModal>

      <GlassModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} title="Upload File to Media Library">
        <form onSubmit={handleSaveMediaItem} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">File Name *</label>
            <input type="text" required value={mediaForm.name} onChange={(e) => setMediaForm({ ...mediaForm, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white" />
          </div>
          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setMediaModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-pink-600 text-white font-bold uppercase tracking-wider">Save to Library</button>
          </div>
        </form>
      </GlassModal>

      <GlassModal isOpen={replyModalOpen} onClose={() => setReplyModalOpen(false)} title={`Reply to ${replyingMessage?.name || 'Inquiry'}`}>
        <form onSubmit={handleSendReply} className="space-y-4 text-xs">
          <textarea rows={6} required value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-white" />
          <div className="pt-3 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setReplyModalOpen(false)} className="px-4 py-2 rounded-xl glass-panel text-slate-300">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#00FF99] text-black font-bold uppercase tracking-wider flex items-center gap-1.5"><Send className="w-4 h-4" /> Send Email Response</button>
          </div>
        </form>
      </GlassModal>

      <GlassModal isOpen={viewReportModalOpen} onClose={() => setViewReportModalOpen(false)} title={`Report Details - ${selectedReport?.id || ''}`}>
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-[#00FF99] text-emerald-400 font-mono space-y-1">
              <div><strong className="text-white">Report ID:</strong> {selectedReport.id}</div>
              <div><strong className="text-white">Verification Code:</strong> {selectedReport.code}</div>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}
