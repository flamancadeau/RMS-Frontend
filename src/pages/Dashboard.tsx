import React, { useState, useEffect } from 'react';
import logoMark from '../logo/logo.png';
import { 
  BarChart3, 
  Users, 
  Home, 
  MapPin, 
  ArrowRightLeft, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  UserCheck, 
  ShieldAlert, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Filter, 
  PlusCircle, 
  ClipboardCopy, 
  FileDown, 
  Check, 
  X, 
  ChevronDown, 
  LogOut,
  Sliders,
  UserCheck2,
  FolderTree
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardProps {
  onLogout: () => void;
  initialRole: string;
}

// Mock database lists corresponding to administrative levels
const STATE_SCOPES = {
  'Super Admin': {
    scopeName: 'National Scope (Rwanda)',
    residents: 13248192,
    households: 3115224,
    villages: 14837,
    pendingTransfers: 87,
    growth: '+2.4%',
    locationType: 'Provinces',
    rankedData: [
      { name: 'Kigali City', value: 1632104 },
      { name: 'Eastern Province', value: 3512402 },
      { name: 'Southern Province', value: 3110298 },
      { name: 'Western Province', value: 2901244 },
      { name: 'Northern Province', value: 2092144 }
    ],
    genderDistribution: { male: 48, female: 52 },
    ageGroups: [
      { label: '0-17', val: '38%' },
      { label: '18-35', val: '40%' },
      { label: '36-60', val: '16%' },
      { label: '60+', val: '6%' }
    ],
    transfersData: { pending: 87, approved: 1240, rejected: 242 }
  },
  'Cell Admin': {
    scopeName: 'Sector/Cell Scope (Kagugu Cell)',
    residents: 48120,
    households: 11420,
    villages: 8,
    pendingTransfers: 6,
    growth: '+1.8%',
    locationType: 'Villages',
    rankedData: [
      { name: 'Rwimbogo', value: 12040 },
      { name: 'Rukiri', value: 9240 },
      { name: 'Gasharu', value: 6810 },
      { name: 'Kabarondo', value: 5040 },
      { name: 'Kinyinya', value: 14990 }
    ],
    genderDistribution: { male: 47, female: 53 },
    ageGroups: [
      { label: '0-17', val: '32%' },
      { label: '18-35', val: '45%' },
      { label: '36-60', val: '18%' },
      { label: '60+', val: '5%' }
    ],
    transfersData: { pending: 6, approved: 94, rejected: 14 }
  },
  'Village Leader': {
    scopeName: 'Village Scope (Rwimbogo Village)',
    residents: 1220,
    households: 284,
    villages: 1,
    pendingTransfers: 2,
    growth: '+0.9%',
    locationType: 'Household Streets',
    rankedData: [
      { name: 'Kagugu Road', value: 410 },
      { name: 'Lane 12', value: 310 },
      { name: 'Village Center', value: 280 },
      { name: 'Sector Border', value: 220 }
    ],
    genderDistribution: { male: 49, female: 51 },
    ageGroups: [
      { label: '0-17', val: '41%' },
      { label: '18-35', val: '38%' },
      { label: '36-60', val: '15%' },
      { label: '60+', val: '6%' }
    ],
    transfersData: { pending: 2, approved: 18, rejected: 3 }
  }
};

// Raw Resident details mock table register
const INITIAL_TABLE_ROWS = [
  { id: '1', name: 'Jean-Paul Kagame', nid: '1198580012345082', village: 'Rwimbogo', hhCode: 'HH-RWB-082', gender: 'Male', age: 41, status: 'Active' },
  { id: '2', name: 'Amina Uwamahoro', nid: '1198970054321012', village: 'Rwimbogo', hhCode: 'HH-RWB-082', gender: 'Female', age: 37, status: 'Active' },
  { id: '3', name: 'Divine Kagame', nid: '1201580123456722', village: 'Rwimbogo', hhCode: 'HH-RWB-082', gender: 'Female', age: 11, status: 'Active' },
  { id: '4', name: 'Emmanuel Nsengimana', nid: '1197280045612348', village: 'Rwimbogo', hhCode: 'HH-RWB-104', gender: 'Male', age: 54, status: 'Active' },
  { id: '5', name: 'Marie Jeanne Murekatete', nid: '1197870023456123', village: 'Rwimbogo', hhCode: 'HH-RWB-104', gender: 'Female', age: 48, status: 'Active' },
  { id: '6', name: 'Alice Uwase', nid: '1199580045678123', village: 'Umucyo', hhCode: 'HH-UMC-005', gender: 'Female', age: 29, status: 'Pending' },
  { id: '7', name: 'Faustin Nsengimana', nid: '1200580034567129', village: 'Rwimbogo', hhCode: 'HH-RWB-104', gender: 'Male', age: 21, status: 'Suspended' },
  { id: '8', name: 'Paul Mutabazi', nid: '1196880098765432', village: 'Umucyo', hhCode: 'HH-UMC-012', gender: 'Male', age: 58, status: 'Rejected' },
  { id: '9', name: 'Gaston Gasana', nid: '1199080034512390', village: 'Kabiri', hhCode: 'HH-KBR-033', gender: 'Male', age: 36, status: 'Active' },
  { id: '10', name: 'Angelique Nyirahabimana', nid: '1199370041234567', village: 'Kabiri', hhCode: 'HH-KBR-033', gender: 'Female', age: 33, status: 'Active' }
];

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, initialRole }) => {
  const { theme, toggleTheme } = useTheme();
  
  // App UI state
  const [role, setRole] = useState(initialRole);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Table lists, pagination, filtering state
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  // Active dataset based on role
  const scopeData = STATE_SCOPES[role as keyof typeof STATE_SCOPES] || STATE_SCOPES['Super Admin'];

  useEffect(() => {
    // Sync scope variables when role is changed via helper
    setSelectedRows([]);
    setCurrentPage(1);
  }, [role]);

  // Sidebar Menu list
  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, badge: null },
    { name: 'Users', icon: UserCheck2, badge: null },
    { name: 'Roles', icon: Sliders, badge: null },
    { name: 'Location Hierarchy', icon: FolderTree, badge: '8' },
    { name: 'Villages', icon: MapPin, badge: null },
    { name: 'Households', icon: Home, badge: null },
    { name: 'Residents', icon: Users, badge: null },
    { name: 'Transfers', icon: ArrowRightLeft, badge: '87' },
    { name: 'Notifications', icon: Bell, badge: '5' },
    { name: 'Settings', icon: Settings, badge: null }
  ];

  // Quick Action triggers based on Operator level
  const handleQuickAction = (actionName: string) => {
    alert(`[R-RMS SECURE GATEWAY] Action "${actionName}" triggered under authorization of custom role code: "${role}". Node.js service simulation recorded.`);
  };

  // Standard filter & search logic
  const filteredRows = INITIAL_TABLE_ROWS.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          row.nid.includes(searchText) || 
                          row.hhCode.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    
    // Scoping simulation: Village Leaders only see residents of village 'Rwimbogo'
    const matchesScope = role !== 'Village Leader' || row.village === 'Rwimbogo';
    
    return matchesSearch && matchesStatus && matchesScope;
  });

  // Paginated Rows
  const totalPages = Math.ceil(filteredRows.length / resultsPerPage);
  const indexLastRow = currentPage * resultsPerPage;
  const indexFirstRow = indexLastRow - resultsPerPage;
  const currentRowsPaginated = filteredRows.slice(indexFirstRow, indexLastRow);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(currentRowsPaginated.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(prev => prev.filter(rId => rId !== id));
    } else {
      setSelectedRows(prev => [...prev, id]);
    }
  };

  // Helper colors for status badges
  const getBadgeStyles = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Approved':
        return 'bg-rrms-green/10 text-rrms-green border-rrms-green/20';
      case 'Pending':
        return 'bg-rrms-gold/10 text-rrms-navy border-rrms-gold/20';
      case 'Rejected':
      case 'Inactive':
        return 'bg-rrms-red/10 text-rrms-red border-rrms-red/20';
      case 'Suspended':
      default:
        return 'bg-rrms-grey/10 text-rrms-grey border-rrms-grey/25';
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-rrms-bg-light dark:bg-slate-905 transition-colors duration-300 font-inter text-slate-800 dark:text-slate-100">
      
      {/* SIDEBAR */}
      <aside 
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } bg-[#1F3864] text-white flex flex-col justify-between transition-all duration-300 border-r border-[#14294A] z-30`}
      >
        <div>
          {/* Sidebar Top Branding Area */}
          <div className="p-5 flex items-center space-x-3.5 border-b border-[#14294A]/80 h-20 overflow-hidden">
            <img 
              src={logoMark} 
              alt="R-RMS Icon Mark" 
              className="w-10 h-10 object-contain flex-shrink-0" 
            />
            {!sidebarCollapsed && (
              <div className="truncate">
                <h1 className="text-md font-bold tracking-tight leading-none font-poppins">R-RMS</h1>
                <span className="text-[9px] font-bold text-rrms-gold uppercase tracking-widest block mt-1">Console Control</span>
              </div>
            )}
          </div>

          {/* Navigation Links Grouped */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = activeMenuTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenuTab(item.name)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive 
                      ? 'bg-rrms-navy-dark text-white border-l-4 border-rrms-gold' 
                      : 'hover:bg-rrms-navy-dark/40 text-slate-205 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-rrms-gold flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span className="bg-rrms-navy-dark text-rrms-gold text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#14294A]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[#14294A]/80">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-rrms-navy-dark/65 hover:bg-rrms-navy-dark transition-all text-slate-300"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4.5 h-4.5" /> : <ChevronLeft className="w-4.5 h-4.5" />}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR CONTAINER */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-805 flex items-center justify-between px-6 md:px-8 z-10 transition-colors">
          
          {/* Breadcrumbs or Role Info */}
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase font-extrabold text-rrms-grey tracking-wider">Console</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <h2 className="text-sm font-bold text-rrms-navy dark:text-white capitalize flex items-center gap-1.5 font-poppins">
              <span>{activeMenuTab}</span>
              <span className="bg-rrms-navy/5 dark:bg-slate-800 text-[10px] text-rrms-navy dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {scopeData.scopeName}
              </span>
            </h2>
          </div>

          {/* Interactive Role Switcher & Operator Configs */}
          <div className="flex items-center space-x-4">
            
            {/* Quick Demo Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <span className="text-[10px]/none font-extrabold text-slate-400 px-2 uppercase tracking-wide">Select Role:</span>
              {['Super Admin', 'Cell Admin', 'Village Leader'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                    role === r 
                      ? 'bg-[#1F3864] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {r.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Notification Center */}
            <button className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-450 relative transition-all">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rrms-gold animate-pulse"></span>
            </button>

            {/* Accent Theme Switcher */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-450 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 transition-all border border-slate-205 dark:border-slate-705"
              >
                <div className="w-7.5 h-7.5 rounded-md bg-gradient-to-tr from-rrms-navy to-rrms-green flex items-center justify-center text-white font-extrabold text-xs">
                  {role.charAt(0)}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden font-medium text-xs">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="block font-bold text-slate-800 dark:text-white truncate">{role} Operator</span>
                    <span className="text-[10px] text-slate-400 block truncate">operator@rrms.gov.rw</span>
                  </div>
                  <button className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 block text-slate-650 dark:text-slate-300">
                    My Account Setup
                  </button>
                  <button className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 block text-slate-650 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                    Security Center
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left p-3 text-rrms-red hover:bg-red-500/5 dark:hover:bg-red-500/10 flex items-center space-x-2 font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Console</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* WORKSPACE CONTENT SCROLL */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          
          {/* Welcome Alert Strip */}
          <div className="p-5 bg-gradient-to-r from-rrms-navy to-[#2E5E9E] rounded-3xl text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div>
              <h3 className="text-lg font-bold font-poppins">Welcome back, {role}</h3>
              <p className="text-slate-250 text-xs mt-1">Logged in under standard secure access protocols. Dynamic ledger scoping active.</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-xs text-rrms-gold font-bold">
              Scoped Area: {scopeData.scopeName}
            </div>
          </div>

          {/* DYNAMIC STAT CARDS PANEL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Scoped Residents', num: scopeData.residents.toLocaleString(), desc: 'Active records', icon: Users, color: 'text-rrms-navy' },
              { title: 'Total Households', num: scopeData.households.toLocaleString(), desc: 'Registered keys', icon: Home, color: 'text-rrms-green' },
              { title: 'Active Villages', num: scopeData.villages.toLocaleString(), desc: 'Umudugudu units', icon: MapPin, color: 'text-rrms-gold' },
              { title: 'Pending Transfers', num: scopeData.pendingTransfers, desc: 'Awaiting signature', icon: ArrowRightLeft, color: 'text-rrms-red' },
              { title: 'Growth Rate', num: scopeData.growth, desc: 'Compared to Q1', icon: BarChart3, color: 'text-slate-500' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{stat.title}</span>
                      <strong className="text-2xl font-extrabold text-slate-900 dark:text-white font-poppins block">{stat.num}</strong>
                    </div>
                    <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-850 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-[10px] text-slate-405 dark:text-slate-400 font-medium">
                    {stat.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC CHARTS & AUDIT FEED SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart 1: Population Area Chart */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins">Demographic Growth Timeline</h3>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Simulated scope projection</span>
                </div>
                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-350 transition-colors">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter Period</span>
                </button>
              </div>

              {/* Area Chart SVG simulation */}
              <div className="h-64 relative bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-end p-4 border border-slate-100 dark:border-slate-800">
                <svg className="w-full h-full absolute inset-0 text-rrms-navy/10 dark:text-rrms-navy/20" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <path d="M0,200 L0,150 Q125,90 250,110 T500,40 L500,200 Z" fill="currentColor"></path>
                  <path d="M0,150 Q125,90 250,110 T500,40" fill="none" stroke="#1F3864" strokeWidth="4" strokeLinecap="round"></path>
                </svg>
                
                {/* Overlay details */}
                <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono relative z-10">
                  <span>Q1 (2025)</span>
                  <span>Q2 (2025)</span>
                  <span>Q3 (2025)</span>
                  <span>Q4 (2025)</span>
                  <span>Q1 (2026)</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Demographics breakdown */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins">Gender Share Index</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Demographics Breakdown</span>
              </div>

              {/* Donut Chart SVG */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.8" fill="none" stroke="#e2e8f0" strokeWidth="3"></circle>
                    {/* Circle dasharray is: circumference = 2 * PI * r = ~100. Let's make it 52% female (green) and 48% male (navy) */}
                    <circle cx="18" cy="18" r="15.8" fill="none" stroke="#1E7145" strokeWidth="3" strokeDasharray="52 100" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="15.8" fill="none" stroke="#1F3864" strokeWidth="3" strokeDasharray="48 100" strokeDashoffset="-52"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <strong className="text-xl font-extrabold font-mono text-rrms-navy dark:text-white">52%</strong>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Female</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="flex items-center space-x-2 border-r border-slate-100 dark:border-slate-800 pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rrms-navy flex-shrink-0"></span>
                  <div>
                    <span className="block text-[9px] uppercase text-slate-400">Male Share</span>
                    <span className="text-slate-800 dark:text-white font-bold">{scopeData.genderDistribution.male}% share</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rrms-green flex-shrink-0"></span>
                  <div>
                    <span className="block text-[9px] uppercase text-slate-400">Female Share</span>
                    <span className="text-slate-800 dark:text-white font-bold">{scopeData.genderDistribution.female}% share</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart 3: Age Group distribution */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins">Age Distribution Index</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Population Age Bands</span>
              </div>

              <div className="space-y-4 my-6">
                {scopeData.ageGroups.map(group => (
                  <div key={group.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Band: {group.label}</span>
                      <strong className="text-slate-700 dark:text-slate-250">{group.val}</strong>
                    </div>
                    <div className="w-full bg-slate-55 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rrms-gold h-full rounded-full" style={{ width: group.val }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-rrms-grey dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center font-medium">
                Demographics computed from national ID logs.
              </div>
            </div>

            {/* Chart 4: Sub-jurisdiction ranking list */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins">Ranked Location Spread</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Top entries in {scopeData.locationType}</span>
              </div>

              <div className="space-y-3.5 my-6">
                {scopeData.rankedData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-850 text-rrms-navy dark:text-slate-300 flex items-center justify-center font-bold font-mono text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-205">{item.name}</span>
                    </div>
                    <span className="font-mono text-slate-500 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2 py-0.5 rounded">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 text-center font-mono">
                Last calculated sync: 12:30 PM (Current)
              </div>
            </div>

            {/* Chart 5: Transfers Statistics stacked indicators */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins">Relocation Actions Ledger</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Transfer logs summary</span>
              </div>

              <div className="my-6 space-y-4">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rrms-gold"></span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pending Actions</span>
                  </div>
                  <strong className="text-sm font-mono text-rrms-navy dark:text-white font-extrabold">{scopeData.transfersData.pending}</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rrms-green"></span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Completed Success</span>
                  </div>
                  <strong className="text-sm font-mono text-rrms-navy dark:text-white font-extrabold">{scopeData.transfersData.approved}</strong>
                </div>

                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rrms-red"></span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Denied Transfers</span>
                  </div>
                  <strong className="text-sm font-mono text-rrms-navy dark:text-white font-extrabold">{scopeData.transfersData.rejected}</strong>
                </div>
              </div>

              <div className="w-full flex h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-rrms-gold h-full" style={{ width: '8%' }}></div>
                <div className="bg-rrms-green h-full" style={{ width: '75%' }}></div>
                <div className="bg-rrms-red h-full" style={{ width: '17%' }}></div>
              </div>
            </div>

          </div>

          {/* SCOPED QUICK ACTIONS WIDGETS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-805 p-6 rounded-2xl text-left shadow-sm">
            <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins mb-6">
              Scoped System Actions Module ({role})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {role === 'Super Admin' && (
                <>
                  <button 
                    onClick={() => handleQuickAction('Create Admin User')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <PlusCircle className="w-6 h-6 text-[#14294A] mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Create Operator Acc</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Assign sector roles.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('Add Village')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <MapPin className="w-6 h-6 text-[#14294A] mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Register New Village</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Define geographical coordinates.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('Export System Audits')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <FileDown className="w-6 h-6 text-[#14294A] mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Export Server Audits</strong>
                      <span className="text-[10px] text-slate-400 block mt-1 flex items-center gap-1">
                        <span>Retrieve CSV reports.</span>
                      </span>
                    </div>
                  </button>
                </>
              )}

              {role === 'Cell Admin' && (
                <>
                  <button 
                    onClick={() => handleQuickAction('Approve Village Config')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <UserCheck className="w-6 h-6 text-rrms-green mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Approve Village Leader</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Sign credentials profiles.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('Generate Relocation Code')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <ClipboardCopy className="w-6 h-6 text-rrms-green mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Generate Transfer Token</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Temporary clearance key.</span>
                    </div>
                  </button>
                </>
              )}

              {role === 'Village Leader' && (
                <>
                  <button 
                    onClick={() => handleQuickAction('Register Resident')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <PlusCircle className="w-6 h-6 text-rrms-green mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Register Resident</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Record ID & demographics.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('Create Household')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <Home className="w-6 h-6 text-rrms-green mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Create Household</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Initiate unique code.</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('Request Transfer')}
                    className="p-5 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-rrms-navy dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950 text-left flex items-start space-x-4 transition-all"
                  >
                    <ArrowRightLeft className="w-6 h-6 text-rrms-navy mt-0.5" />
                    <div>
                      <strong className="block text-xs font-bold text-slate-800 dark:text-white font-poppins">Request Relocation</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Initiate approval flow.</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* STANDARDIZED DATA REGISTER TABLE WIDGET */}
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-3xl overflow-hidden shadow-sm text-left">
            <div className="p-6 border-b border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-gradient-to-r dark:from-slate-950/20 dark:to-transparent">
              <h3 className="font-bold text-sm text-slate-905 dark:text-white uppercase tracking-wider font-poppins mb-4">
                Local Citizens registries catalog
              </h3>

              {/* Advanced Filter / Search Row */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                
                {/* Search query input */}
                <div className="relative flex-1 max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search standard variables (Name, NID, HH-Code)..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-rrms-navy transition-all"
                  />
                </div>

                {/* status Filters Chips */}
                <div className="flex items-center space-x-2 overflow-x-auto text-[10px] font-bold">
                  {['All', 'Active', 'Pending', 'Suspended', 'Rejected'].map(state => (
                    <button
                      key={state}
                      onClick={() => setStatusFilter(state)}
                      className={`px-3.5 py-2 rounded-xl border transition-all ${
                        statusFilter === state
                          ? 'bg-[#1F3864] text-white border-[#1F3864] shadow-sm'
                          : 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-552 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {state} Catalog
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Bulk items action toolbar */}
            {selectedRows.length > 0 && (
              <div className="bg-rrms-navy/5 dark:bg-rrms-navy/20 px-6 py-3.5 flex justify-between items-center text-xs border-b border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-rrms-navy dark:text-slate-300">
                  {selectedRows.length} item(s) selected for bulk commands
                </span>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleQuickAction('Bulk Export Selection')}
                    className="bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-205 dark:border-slate-705 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-lg font-bold text-[10px]"
                  >
                    Export Selection
                  </button>
                  <button 
                    onClick={() => handleQuickAction('Bulk Mark Suspended')}
                    className="bg-rrms-red text-white px-3 py-1.5 rounded-lg font-bold text-[10px]"
                  >
                    Deactivate Selection
                  </button>
                </div>
              </div>
            )}

            {/* Main Table view */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-350 text-[10px] uppercase font-bold tracking-wider border-b border-slate-205 dark:border-slate-805">
                    <th className="p-4 pl-6 w-10">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={selectedRows.length === currentRowsPaginated.length && currentRowsPaginated.length > 0}
                        className="rounded border-slate-300 focus:ring-rrms-navy"
                      />
                    </th>
                    <th className="p-4">Citizen Name</th>
                    <th className="p-4">National ID (16-Digit)</th>
                    <th className="p-4">Household Ref</th>
                    <th className="p-4">Village Scope</th>
                    <th className="p-4">Demographics</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Catalog Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-805 text-xs text-slate-700 dark:text-slate-350">
                  {currentRowsPaginated.map(row => {
                    const isSelected = selectedRows.includes(row.id);
                    return (
                      <tr 
                        key={row.id} 
                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-colors ${
                          isSelected ? 'bg-rrms-navy/5 dark:bg-slate-850/50' : ''
                        }`}
                      >
                        <td className="p-4 pl-6">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(row.id)}
                            className="rounded border-slate-300 focus:ring-rrms-navy"
                          />
                        </td>
                        <td className="p-4 font-bold text-slate-900 dark:text-white">
                          {row.name}
                        </td>
                        <td className="p-4 font-mono text-slate-450 dark:text-slate-400">
                          {row.nid}
                        </td>
                        <td className="p-4 font-mono font-semibold text-rrms-navy dark:text-slate-300">
                          {row.hhCode}
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{row.village}</span>
                        </td>
                        <td className="p-4">
                          <span>{row.gender}, {row.age} yrs</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${getBadgeStyles(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6 space-x-1">
                          <button
                            onClick={() => handleQuickAction(`View ${row.name}`)}
                            className="text-[10px] font-bold text-rrms-navy dark:text-slate-200 hover:underline"
                          >
                            View
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => handleQuickAction(`Edit ${row.name}`)}
                            className="text-[10px] font-bold text-rrms-navy dark:text-slate-200 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-10 text-center text-slate-450 dark:text-slate-500 font-medium">
                        <div>
                          <ShieldAlert className="w-10 h-10 mx-auto text-slate-305 dark:text-slate-700 mb-2" />
                          <p className="text-xs font-semibold">No records match the active criteria.</p>
                          <p className="text-[10px] text-slate-400 mt-1">Try relaxing filters or changing search query terms.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            {filteredRows.length > 0 && (
              <div className="p-5 border-t border-slate-150 dark:border-slate-805 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
                <span className="text-slate-550 dark:text-slate-400">
                  Showing <strong className="text-slate-800 dark:text-white">{indexFirstRow + 1}</strong> to{' '}
                  <strong className="text-slate-800 dark:text-white">{Math.min(indexLastRow, filteredRows.length)}</strong> of{' '}
                  <strong className="text-slate-800 dark:text-white">{filteredRows.length}</strong> resident records
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="p-2 border border-slate-205 dark:border-slate-750 bg-white hover:bg-slate-50 dark:bg-slate-900 rounded-lg disabled:opacity-40 disabled:hover:bg-white text-slate-650 dark:text-slate-350"
                  >
                    Previous
                  </button>
                  <span className="text-slate-450 dark:text-slate-400">
                    Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of{' '}
                    <strong className="text-slate-900 dark:text-white">{totalPages || 1}</strong>
                  </span>
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="p-2 border border-slate-205 dark:border-slate-750 bg-white hover:bg-slate-50 dark:bg-slate-900 rounded-lg disabled:opacity-40 disabled:hover:bg-white text-slate-650 dark:text-slate-350"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>

        </main>

        {/* Minimal Footer */}
        <footer className="h-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-805 px-6 flex items-center justify-between text-[10px] text-slate-400 transition-colors">
          <span>System Version: v1.0.0 (TS Active)</span>
          <span>Last Sync: Real-time DB Engine</span>
        </footer>

      </div>
    </div>
  );
};
