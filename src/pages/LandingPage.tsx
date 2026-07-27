import React, { useState } from 'react';
import logoHorizontal from '../logo/logo_horizontal.png';
import logoMark from '../logo/logo.png';
import { 
  ShieldCheck, 
  Building2, 
  UsersRound, 
  MapIcon, 
  Network, 
  Activity, 
  Lock, 
  BellRing, 
  FileSpreadsheet, 
  UserCheck2, 
  Globe, 
  ChevronsRight,
  ClipboardList
} from 'lucide-react';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  const [lang, setLang] = useState('EN');

  // Multi-lingual content mappings
  const content = {
    EN: {
      tag: "DIGITAL IDENTITY PLATFORM",
      headline: "Digitizing Rwanda's Residence Records, from Village to Nation",
      subtext: "R-RMS replaces manual catalogs with a secure, role-based database of administrative hierarchy registries, dual-approval relocations, and digital population audit trails.",
      ctaPrimary: "Login to Dashboard",
      ctaSecondary: "Learn More",
    },
    RW: {
      tag: "IKOMANIDRO GIKURIKIRA IMIDUGUDU",
      headline: "Gukoresha Ikarita y'Abaturage Kuva ku Mudugudu Kugera ku Gihugu",
      subtext: "R-RMS isimbura ibitabo by'intoki ku mudugudu. Ni sisitemu yizewe yandika imiryango, abaturage, na relocations zemejwe n'abayobozi babiri.",
      ctaPrimary: "Kwinjira muri Sisitemu",
      ctaSecondary: "Soma Ibindi",
    },
    FR: {
      tag: "PLATEFORME D'IDENTITÉ NUMÉRIQUE",
      headline: "Numérisation des Registres de Résidents, du Village à la Nation",
      subtext: "R-RMS remplace les registres manuels par une base de données sécurisée conforme aux structures d'administration locales et garantissant les flux de mutations.",
      ctaPrimary: "Se Connecter",
      ctaSecondary: "En savoir plus",
    }
  };

  const currentText = content[lang as keyof typeof content] || content.EN;

  return (
    <div className="flex-1 w-full min-h-screen bg-slate-50 text-slate-800 font-inter">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Lockup */}
            <div className="flex items-center">
              <img 
                src={logoHorizontal} 
                alt="R-RMS Logo" 
                className="h-12 w-auto object-contain cursor-pointer" 
              />
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex space-x-8 text-sm font-semibold text-rrms-navy">
              <a href="#home" className="hover:text-rrms-navy-dark transition-colors">Home</a>
              <a href="#about" className="hover:text-rrms-navy-dark transition-colors">About</a>
              <a href="#hierarchy" className="hover:text-rrms-navy-dark transition-colors">Scope Hierarchy</a>
              <a href="#features" className="hover:text-rrms-navy-dark transition-colors">Platform Features</a>
            </div>

            {/* Actions: Lang + Login */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang}</span>
                </button>
                <div className="absolute right-0 mt-1 w-16 bg-white border border-slate-200 rounded-lg shadow-lg hidden group-hover:block z-50">
                  {['EN', 'RW', 'FR'].map(l => (
                    <button 
                      key={l}
                      onClick={() => setLang(l)}
                      className="w-full text-center py-1.5 hover:bg-slate-50 text-xs font-bold block"
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {/* Fallback selectors */}
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="EN">EN</option>
                  <option value="RW">RW</option>
                  <option value="FR">FR</option>
                </select>
              </div>

              <button 
                onClick={onGoToLogin}
                className="bg-rrms-navy hover:bg-rrms-navy-dark text-white px-5 py-2.5 rounded-lg text-xs font-bold outline outline-2 outline-transparent hover:outline-rrms-gold transition-all shadow-md active:scale-95"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="bg-gradient-to-br from-rrms-navy via-[#2C4977] to-rrms-navy-dark text-white pt-16 pb-24 lg:pt-24 lg:pb-36 relative overflow-hidden">
        {/* Ceremic ribbon/gold accents in BG */}
        <div className="absolute top-0 right-0 w-[50%] h-full opacity-10 bg-no-repeat bg-contain" style={{ backgroundImage: `url(${logoMark})` }}></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 rounded-full bg-rrms-green/10 blur-[130px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-block bg-rrms-gold/25 border border-rrms-gold/30 text-rrms-gold px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider">
                {currentText.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-poppins">
                {currentText.headline}
              </h1>
              <p className="text-md sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {currentText.subtext}
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={onGoToLogin} 
                  className="w-full sm:w-auto bg-rrms-gold hover:bg-yellow-505 text-rrms-navy px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all text-center"
                >
                  {currentText.ctaPrimary}
                </button>
                <a 
                  href="#about" 
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm text-white active:scale-95 transition-all text-center"
                >
                  {currentText.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Right Block: Image Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl max-w-sm w-full">
                <img 
                  src={logoMark} 
                  alt="R-RMS National Emblem Seal" 
                  className="w-full h-auto object-contain mx-auto drop-shadow-2xl" 
                />
                <div className="absolute -bottom-6 -right-6 bg-rrms-green border border-rrms-green-light px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-white" />
                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-300 font-bold">Data Privacy</span>
                    <span className="text-xs text-white font-extrabold">State Protected Registry</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST / STATS STRIP */}
      <section id="stats" className="relative z-20 mt-[-40px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Villages Onboarded', num: '14,837', tag: 'Imidugudu' },
            { label: 'Registered Households', num: '3,115,224', tag: 'Families' },
            { label: 'Residents Recorded', num: '13,248,192', tag: 'Total Citizens' },
            { label: 'Districts Covered', num: '30 / 30', tag: 'Full Coverage' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white border-t-4 border-rrms-gold p-6 sm:p-8 rounded-2xl shadow-lg text-center hover:scale-103 transition-transform duration-200"
            >
              <p className="text-xs uppercase font-bold text-rrms-grey tracking-wider mt-1">{stat.label}</p>
              <p className="text-4xl font-extrabold text-rrms-navy font-poppins mt-2 tracking-tight">{stat.num}</p>
              <span className="inline-block bg-slate-100 text-rrms-navy text-[10px] font-bold px-2.5 py-1 rounded mt-2">{stat.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-rrms-navy font-poppins">System Enrollment & Execution Flow</h2>
          <p className="text-rrms-grey mt-2 text-sm">
            R-RMS processes follow a top-down security blueprint, onboarding local administrative structures to citizen ledger units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            { step: '01', title: 'Village Setup', desc: 'Cell Admins create villages and designate leaders.', icon: Building2 },
            { step: '02', title: 'Household Setup', desc: 'Village Leaders create Household codes.', icon: ClipboardList },
            { step: '03', title: 'Resident Enrollment', desc: 'Residents are grouped under a household head.', icon: UsersRound },
            { step: '04', title: 'Reporting & Analytics', desc: 'Realtime audits generate maps and charts.', icon: FileSpreadsheet }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md relative text-left hover:border-slate-350 transition-colors">
                <div className="absolute top-4 right-4 text-xs font-mono font-bold text-rrms-gold tracking-widest bg-rrms-gold/10 px-2 py-0.5 rounded">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-rrms-navy/5 flex items-center justify-center text-rrms-navy mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-md font-poppins">{item.title}</h3>
                <p className="text-xs text-rrms-grey mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ADMINISTRATIVE HIERARCHY NESTED SHOWCASE */}
      <section id="hierarchy" className="py-20 bg-slate-100/50 border-y border-slate-205">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-rrms-navy font-poppins">Scope Hierarchy Lineage</h2>
            <p className="text-sm text-rrms-grey mt-2">
              Every data entity references its parent directly, facilitating normalized structures and optimized lookups.
            </p>
          </div>

          <div className="flex flex-col space-y-3 max-w-3xl mx-auto text-xs font-semibold">
            {[
              { level: 'Republic of Rwanda', scope: 'State Domain Model', bg: 'bg-[#14294A] text-white' },
              { level: 'Provinces (5)', scope: 'Top Administrative Level', bg: 'bg-[#1A3764] text-slate-100' },
              { level: 'Districts (30)', scope: 'Sub-Province Councils', bg: 'bg-[#21477C] text-slate-100' },
              { level: 'Sectors (416)', scope: 'Decentralized Service Units', bg: 'bg-[#2E5E9E] text-slate-100' },
              { level: 'Cells (2,148)', scope: 'Coordination Checkpoint', bg: 'bg-rrms-navy/70 text-slate-200' },
              { level: 'Villages (14,837)', scope: 'Basic Neighborhood (Umudugudu)', bg: 'bg-[#5B88C4] text-slate-100' },
              { level: 'Households', scope: 'Family Units (Unique Code)', bg: 'bg-[#008751] text-white border-t border-rrms-green-light' },
              { level: 'Residents', scope: 'Core Citizen Record Profile', bg: 'bg-rrms-green-light text-white' }
            ].map((idxObj, idx) => (
              <div 
                key={idx} 
                className={`${idxObj.bg} p-4 rounded-xl flex items-center justify-between shadow-sm transform hover:scale-[1.01] transition-transform cursor-default`}
                style={{ paddingLeft: `${idx * 16 + 16}px` }}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rrms-gold"></span>
                  <span className="font-bold font-poppins text-sm">{idxObj.level}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{idxObj.scope}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES GRID */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-rrms-navy font-poppins">Technical Features Suite</h2>
          <p className="text-rrms-grey mt-2 text-sm">
            R-RMS is built on security, relational normalization, and strict operational guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Role-Based Access Control', desc: 'Hierarchical role levels sandboxed down to specific administrative scopes.', icon: ShieldCheck },
            { title: 'Secure Authentication', desc: 'JWT brief access tokens coupled with encrypted rotating cookie refresh tokens.', icon: Lock },
            { title: 'Real-Time Notifications', desc: 'In-app alert tickers backed by Socket.io dispatch streams.', icon: BellRing },
            { title: 'Transfer Relocations', desc: 'Dual-approval checkpoints ensuring validation by both origin and destination leaders.', icon: Network },
            { title: 'Reports & Analytics', desc: 'Demographic indices, age charts, and export formats in PDF/Excel/CSV.', icon: FileSpreadsheet },
            { title: 'Immutable Audit Trail', desc: 'Detailed log records locking operator actions, module markers, IP stamps, and payloads.', icon: Activity }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md group hover:border-rrms-navy transition-all">
                <div className="w-12 h-12 rounded-2xl bg-rrms-navy/5 flex items-center justify-center text-rrms-navy mb-6 group-hover:bg-rrms-navy group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg font-poppins">{item.title}</h3>
                <p className="text-xs text-rrms-grey mt-2.5 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

   
      {/* SECURITY & COMPLIANCE BANNER */}
      <section className="bg-rrms-green text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <ShieldCheck className="w-10 h-10 text-white flex-shrink-0" />
            <div>
              <p className="font-extrabold text-md tracking-tight leading-none">Security Compliance Standard</p>
              <p className="text-xs text-slate-200 mt-1">This platform complies with Law N° 058/2021 relating to Personal Data Protection and Privacy.</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest border border-white/30 px-3 py-1.5 rounded bg-white/10 uppercase">
            Data Hashed & Safe
          </span>
        </div>
      </section>

      {/* CALL TO ACTION BAND */}
      <section className="bg-gradient-to-r from-rrms-navy-dark to-rrms-navy py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold font-poppins">System Operator Entry</h2>
          <p className="text-md text-slate-350 max-w-xl mx-auto">
            Access credentials restricted to government-appointed administrative secretaries and leaders.
          </p>
          <button 
            onClick={onGoToLogin}
            className="bg-rrms-gold hover:bg-yellow-500 text-rrms-navy inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all"
          >
            <span>Access Portal Console</span>
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#12181F] text-slate-400 py-16 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 text-left">
            <img src={logoHorizontal} alt="Horizontal Lockup Footer" className="h-10 w-auto object-contain brightness-105" />
            <p className="leading-relaxed">
              Rwanda's official registry platform digitizing residence hierarchies across cells and villages.
            </p>
          </div>

          {/* Col 2 */}
          <div className="text-left">
            <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#home" className="hover:text-white transition-colors">Home Portal</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Services Overview</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features List</a></li>
              <li><a href="#hierarchy" className="hover:text-white transition-colors">Scope Hierarchy</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="text-left">
            <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Support & Contact</h4>
            <p className="leading-relaxed text-slate-300">
              Ministry of Local Government (MINALOC)<br />
              Kigali, Rwanda<br />
              Email: support@rrms.gov.rw<br />
              Phone: +250 788 123 456
            </p>
          </div>

          {/* Col 4 */}
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Institutional Seal</h4>
            <img src={logoMark} alt="Seal of Rwanda" className="h-14 w-auto object-contain" />
            <span className="block text-[9px] uppercase tracking-widest font-extrabold text-rrms-green-light">MINALOC ICT</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[11px] gap-4">
          <p>© 2026 Government of Rwanda. All rights reserved. Platform v1.0.0 (Typescript Core).</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
            <a href="#" className="hover:text-white transition-colors">Data Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Usage Agreement</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
