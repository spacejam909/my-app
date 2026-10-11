'use client';

import Link from 'next/link';
import { 
  ArrowRight, Check, Compass, LayoutDashboard, Zap, 
  BarChart2, Shield, Users, Command, Star 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#101828] font-sans antialiased selection:bg-orange-500 selection:text-white">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eaecf0]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center text-white font-black text-xs tracking-wider">
                OR
              </div>
              <div>
                <span className="font-bold tracking-wider text-sm text-gray-900 block leading-none">ORBIT</span>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase block mt-0.5">WORK BOARD</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-500 tracking-wider uppercase">
              <a href="#features" className="hover:text-gray-900 transition-colors">PRODUCT</a>
              <a href="#features" className="hover:text-gray-900 transition-colors">FEATURES</a>
              <a href="#pricing" className="hover:text-gray-900 transition-colors">PRICING</a>
              <a href="#" className="hover:text-gray-900 transition-colors">DOCS</a>
              <a href="#" className="hover:text-gray-900 transition-colors">BLOG</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-wider">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              SIGN IN
            </Link>
            <Link 
              href="/board" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all shadow-sm flex items-center space-x-1"
            >
              <span>LAUNCH APP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-16 pb-20 px-6 text-center bg-grid-pattern relative border-b border-[#eaecf0]">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-200 px-3 py-1 rounded text-[11px] font-bold text-orange-600 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span>INTRODUCING ORBIT V1.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 uppercase leading-none">
            YOUR WORK. <br />
            <span className="text-orange-500">IN ORBIT.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            A precision task board built for teams who ship. Gantt timelines, priority queues, and live diagnostics — all in one structured workspace.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link 
              href="/board" 
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>START FOR FREE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto bg-white border border-[#eaecf0] hover:bg-gray-50 text-gray-700 px-6 py-3 rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-1"
            >
              <span>SEE FEATURES</span>
              <span className="text-gray-400">›</span>
            </a>
          </div>

          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold pt-1">
            NO CREDIT CARD · FREE 14-DAY TRIAL · CANCEL ANYTIME
          </p>
        </div>

        {/* Board App Preview Window */}
        <div className="max-w-5xl mx-auto mt-12 bg-white border border-[#eaecf0] rounded-lg shadow-2xl overflow-hidden text-left">
          <div className="h-8 bg-gray-50 border-b border-[#eaecf0] px-4 flex items-center justify-between text-xs text-gray-400">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
            <span className="font-mono text-[10px] text-gray-400">orbit.app / board</span>
            <div className="w-10"></div>
          </div>
          <div className="p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#eaecf0] pb-3 text-xs font-bold text-gray-500 uppercase">
              <span>OCT 2026</span>
              <div className="flex space-x-8 text-[11px] text-gray-400">
                <span>MON</span><span>TUE</span><span className="text-orange-500 font-bold border-b-2 border-orange-500">WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <span className="w-24 text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-orange-500 rounded-xs"></span>
                  <span>GROWTH</span>
                </span>
                <div className="flex-1 bg-orange-50 border border-orange-200 rounded p-2 text-xs text-orange-700 font-semibold shadow-xs max-w-md">
                  Homepage redesign
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="w-24 text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-xs"></span>
                  <span>MOBILE APP</span>
                </span>
                <div className="flex-1 bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-700 font-semibold shadow-xs max-w-sm ml-20">
                  Auth flow v2
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= METRICS STATS BAR ================= */}
      <section className="bg-white border-b border-[#eaecf0]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#eaecf0] text-center">
          <StatBox metric="12,400+" label="TEAMS ONBOARD" />
          <StatBox metric="3.2M" label="TASKS COMPLETED" />
          <StatBox metric="99.9%" label="UPTIME SLA" />
          <StatBox metric="< 80ms" label="AVG RESPONSE" />
        </div>
      </section>

      {/* ================= CAPABILITIES GRID ================= */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="inline-block bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
            CAPABILITIES
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-none">
              BUILT FOR PEOPLE <br /> WHO ACTUALLY SHIP.
            </h2>
            <Link 
              href="/board" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-sm self-start md:self-auto flex items-center space-x-1"
            >
              <span>TRY IT FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            category="SCHEDULING"
            title="GANTT TIMELINE"
            description="Visual task bars across a 14-day window. See every project, every deadline, and every conflict at a glance."
            icon={<LayoutDashboard className="w-5 h-5 text-orange-500" />}
          />
          <FeatureCard 
            category="TRIAGE"
            title="PRIORITY QUEUES"
            description="Critical → High → Medium → Low hierarchy. Tasks float to the top of attention before they become blockers."
            icon={<Compass className="w-5 h-5 text-orange-500" />}
          />
          <FeatureCard 
            category="ANALYTICS"
            title="LIVE DIAGNOSTICS"
            description="Sprint velocity, cycle time, completion rate. Real-time signal strength per project — no dashboards to configure."
            icon={<BarChart2 className="w-5 h-5 text-orange-500" />}
          />
          <FeatureCard 
            category="COLLABORATION"
            title="TEAM BOARD"
            description="Shared workspace with role-based access. Assign tasks, track ownership, and see who is blocked in real time."
            icon={<Users className="w-5 h-5 text-orange-500" />}
          />
          <FeatureCard 
            category="SPEED"
            title="FAST INPUT"
            description="⌘K command palette. Add tasks in under 3 seconds. Keyboard-first so your hands never leave the home row."
            icon={<Zap className="w-5 h-5 text-orange-500" />}
          />
          <FeatureCard 
            category="GOVERNANCE"
            title="AUDIT TRAIL"
            description="Every state change is logged with a timestamp and actor. Full history, no surprises, perfect for compliance."
            icon={<Shield className="w-5 h-5 text-orange-500" />}
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 bg-[#f8fafc] border-y border-[#eaecf0]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-gray-200 border border-gray-300 px-2.5 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              HOW IT WORKS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StepCard number="01" title="CREATE A PROJECT" description="Name your project, pick a color, invite your team. Takes 30 seconds." />
            <StepCard number="02" title="ADD YOUR TASKS" description="Type tasks directly into the timeline. Set priority, due date, and owner." />
            <StepCard number="03" title="TRACK PROGRESS" description="Watch bars fill in real time. Diagnostics surface blockers before they escalate." />
            <StepCard number="04" title="SHIP FASTER" description="Sprint reports write themselves. Share a link, close the sprint, repeat." />
          </div>
        </div>
      </section>

      {/* ================= REVIEWS / TESTIMONIALS ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="inline-block bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
            REVIEWS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-none">
            TEAMS THAT SWITCHED <br /> DON'T LOOK BACK.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReviewCard 
            quote="“We moved off Jira after 4 years. Orbit cut our sprint planning time in half.”"
            author="SARAH K."
            role="VP ENGINEERING · LUMEN"
            avatarColor="bg-blue-600"
            initials="SK"
          />
          <ReviewCard 
            quote="“The gantt view is the only way I could track 5 projects simultaneously without losing my mind.”"
            author="MARCUS T."
            role="PRODUCT LEAD · FORMA"
            avatarColor="bg-emerald-600"
            initials="MT"
          />
          <ReviewCard 
            quote="“Diagnostics caught a velocity drop before it became a missed deadline. Genuinely useful.”"
            author="PRIYA N."
            role="ENG MANAGER · STACKR"
            avatarColor="bg-purple-600"
            initials="PN"
          />
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-20 px-6 bg-[#f8fafc] border-t border-[#eaecf0]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="inline-block bg-gray-200 border border-gray-300 px-2.5 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
              PRICING
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-none">
              STRAIGHTFORWARD. <br /> NO SURPRISES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Tier */}
            <div className="bg-white border border-[#eaecf0] rounded-lg p-6 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">FREE</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-gray-900">$0</span>
                  <span className="text-xs text-gray-400 font-medium">/mo</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Perfect for solo and small teams just getting started.</p>
                
                <ul className="space-y-2 text-xs text-gray-600 pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Up to 3 projects</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Unlimited tasks</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>7-day history</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Email support</span></li>
                </ul>
              </div>

              <Link 
                href="/board" 
                className="w-full bg-white border border-[#eaecf0] hover:bg-gray-50 text-gray-800 text-center py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
              >
                <span>START FREE</span>
                <span>›</span>
              </Link>
            </div>

            {/* Team Tier (Most Popular) */}
            <div className="bg-orange-50/40 border-2 border-orange-500 rounded-lg p-6 flex flex-col justify-between space-y-6 shadow-md relative">
              <div className="absolute -top-3 left-6 bg-orange-500 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                MOST POPULAR
              </div>

              <div className="space-y-4 pt-1">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">TEAM</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-gray-900">$18</span>
                  <span className="text-xs text-gray-500 font-medium">/seat/mo</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">For growing teams who need full diagnostics and collaboration.</p>

                <ul className="space-y-2 text-xs text-gray-700 pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Unlimited projects</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Priority queues</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Live diagnostics</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>90-day history</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Slack integration</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Priority support</span></li>
                </ul>
              </div>

              <Link 
                href="/board" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-1"
              >
                <span>START TRIAL</span>
                <span>›</span>
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white border border-[#eaecf0] rounded-lg p-6 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ENTERPRISE</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-gray-900">Custom</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">SSO, audit trail, custom SLA, and dedicated onboarding.</p>

                <ul className="space-y-2 text-xs text-gray-600 pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Everything in Team</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>SSO / SAML</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Full audit trail</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Custom retention</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>Dedicated CSM</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-orange-500" /><span>SLA guarantee</span></li>
                </ul>
              </div>

              <a 
                href="mailto:contact@orbit.app" 
                className="w-full bg-white border border-[#eaecf0] hover:bg-gray-50 text-gray-800 text-center py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1"
              >
                <span>CONTACT US</span>
                <span>›</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================= DARK FINAL CTA BANNER ================= */}
      <section className="py-24 px-6 bg-[#0a0c14] text-white text-center border-t border-gray-800 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
            READY TO PUT YOUR <br />
            <span className="text-orange-500">WORK IN ORBIT?</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto">
            Free for 14 days. No credit card required. Start tracking projects in under two minutes.
          </p>
          <div className="pt-2">
            <Link 
              href="/board" 
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <span>LAUNCH ORBIT FREE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#070910] text-gray-400 text-xs border-t border-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center text-white font-black text-[9px]">
                OR
              </div>
              <span className="font-bold tracking-wider text-white text-xs">ORBIT</span>
            </div>
            <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed">
              Precision task management for teams who ship.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">PRODUCT</h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Changelog</a></li>
              <li><a href="#" className="hover:text-white">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">COMPANY</h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Legal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3">RESOURCES</h4>
            <ul className="space-y-2 text-[11px] text-gray-400">
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Subcomponents

function StatBox({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="p-8 space-y-1">
      <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{metric}</div>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FeatureCard({ category, title, description, icon }: any) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-lg p-6 space-y-3 hover:border-gray-300 transition-colors shadow-xs">
      <div className="w-8 h-8 rounded bg-orange-50 border border-orange-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest block mb-0.5">{category}</span>
        <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase">{title}</h3>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-lg p-5 space-y-2 shadow-xs">
      <span className="text-3xl font-black text-orange-200 block">{number}</span>
      <h3 className="text-xs font-bold text-gray-900 tracking-wide uppercase">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function ReviewCard({ quote, author, role, avatarColor, initials }: any) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-lg p-6 space-y-4 flex flex-col justify-between shadow-xs">
      <div className="space-y-3">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-orange-500 rounded-xs"></div>
          ))}
        </div>
        <p className="text-xs text-gray-700 font-medium leading-relaxed italic">{quote}</p>
      </div>

      <div className="flex items-center space-x-3 pt-2 border-t border-[#eaecf0]">
        <div className={`w-7 h-7 rounded ${avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
          {initials}
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-900 tracking-wider">{author}</h4>
          <p className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">{role}</p>
        </div>
      </div>
    </div>
  );
}