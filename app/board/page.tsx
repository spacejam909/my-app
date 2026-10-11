'use client';

import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Plus, Bell, Compass, LayoutDashboard, Zap, 
  BarChart2, Inbox, Users, Settings, 
  AlertCircle, CheckCircle2, Activity, X, LogOut, User
} from 'lucide-react';

export default function OrbitBoardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('Growth');
  const [newPriority, setNewPriority] = useState('medium');

  // 1. Auth check, initial data fetch & Realtime subscription
  useEffect(() => {
    async function checkUserAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      const { data, error } = await supabase.from('issues').select('*');
      if (error) {
        console.error('Error fetching tasks:', error);
      } else if (data) {
        setTasks(data);
      }
    }

    checkUserAndFetch();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'issues' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) =>
              prev.map((task) => (task.id === payload.new.id ? payload.new : task))
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((task) => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [router]);

  // Sign out handler
  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  // Insert new task into Supabase
  async function handleCreateTask(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const { error } = await supabase.from('issues').insert([
      {
        title: newTitle,
        category: newProject,
        priority: newPriority,
        status: 'backlog',
      },
    ]);

    if (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task: ' + error.message);
    } else {
      setNewTitle('');
      setIsModalOpen(false);
    }
  }

  const getProjectTasks = (projectName: string) =>
    tasks.filter((t) => t.category === projectName);

  return (
    <div className="flex h-screen w-screen bg-[#fcfcfd] text-[#101828] font-sans overflow-hidden select-none relative">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-60 bg-white border-r border-[#eaecf0] flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Logo / Header */}
          <div className="p-4 border-b border-[#eaecf0] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white font-black text-[10px] tracking-wider">
                OR
              </div>
              <div>
                <h1 className="text-gray-900 font-bold tracking-wider text-xs">ORBIT</h1>
                <p className="text-[9px] text-gray-400 tracking-widest uppercase">WORK BOARD</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="w-full bg-[#f9fafb] text-xs text-gray-800 placeholder-gray-400 pl-8 pr-7 py-1.5 rounded border border-[#eaecf0] focus:outline-none focus:border-orange-500"
              />
              <span className="absolute right-2 top-2 text-[9px] text-gray-400">⌘K</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-2 py-1 space-y-0.5">
            <p className="px-2 text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Navigation</p>
            <NavItem icon={<Compass className="w-4 h-4 text-orange-500" />} label="BOARD" active badge={`${tasks.length} active`} />
            <NavItem icon={<LayoutDashboard className="w-4 h-4 text-gray-400" />} label="OVERVIEW" sublabel="Summary" />
            <NavItem icon={<Zap className="w-4 h-4 text-gray-400" />} label="SPRINTS" sublabel="Live feed" />
            <NavItem icon={<BarChart2 className="w-4 h-4 text-gray-400" />} label="ANALYTICS" sublabel="Reports" />
            <NavItem icon={<Inbox className="w-4 h-4 text-gray-400" />} label="INBOX" badge="12 pending" badgeColor="bg-gray-100 text-gray-600" />
            <NavItem icon={<Users className="w-4 h-4 text-gray-400" />} label="TEAM" sublabel="8 members" />
          </div>

          {/* Projects Section */}
          <div className="px-2 py-2 border-t border-[#eaecf0] mt-2">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Projects</p>
              <Plus onClick={() => setIsModalOpen(true)} className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-orange-500" />
            </div>
            <div className="space-y-0.5">
              <ProjectItem color="bg-orange-500" name="GROWTH" active />
              <ProjectItem color="bg-blue-500" name="MOBILE APP" />
              <ProjectItem color="bg-emerald-500" name="BACKEND API" />
              <ProjectItem color="bg-purple-500" name="MARKETING" />
              <ProjectItem color="bg-rose-500" name="DOCS" />
            </div>
          </div>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-[#eaecf0] bg-white">
          <div className="flex items-center justify-between p-1.5 rounded hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-2 truncate">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="text-xs text-gray-800 font-medium truncate">Aliya Omorova</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email || 'Online'}</p>
              </div>
            </div>
            <button onClick={handleSignOut} title="Sign Out" className="text-gray-400 hover:text-red-500 p-1 cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= CENTER TIMELINE GRID ================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fcfcfd]">
        
        {/* Top Header */}
        <header className="h-12 border-b border-[#eaecf0] px-4 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">OCT 2026</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 border border-[#eaecf0] rounded text-gray-500 hover:bg-gray-50">
              <Bell className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW TASK</span>
            </button>
          </div>
        </header>

        {/* Dates Bar */}
        <div className="grid grid-cols-13 border-b border-[#eaecf0] bg-white text-[10px] text-center font-bold">
          <div className="p-2 border-r border-[#eaecf0] text-gray-400 uppercase">Swimlane</div>
          {['FRI 9', 'SAT 10', 'SUN 11', 'MON 12', 'TUE 13', 'WED 14', 'THU 15', 'FRI 16', 'SAT 17', 'SUN 18', 'MON 19', 'TUE 20'].map((day, i) => (
            <div key={i} className={`p-2 border-r border-[#eaecf0] ${day.includes('11') ? 'text-orange-500 bg-orange-50/50 border-b-2 border-b-orange-500' : 'text-gray-500'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Timeline Viewport */}
        <div className="flex-1 overflow-y-auto relative bg-grid-pattern">
          
          <SwimlaneRow title="GROWTH" count={`${getProjectTasks('Growth').length} tasks`} color="bg-orange-500">
            {getProjectTasks('Growth').map((t, idx) => (
              <div key={t.id || idx} className="absolute left-[8%] top-3 w-[26%] bg-orange-50 border border-orange-200 rounded px-2.5 py-1 text-xs text-orange-700 flex items-center justify-between shadow-sm">
                <span className="truncate font-medium">{t.title}</span>
              </div>
            ))}
          </SwimlaneRow>

          <SwimlaneRow title="MOBILE APP" count={`${getProjectTasks('Mobile App').length} tasks`} color="bg-blue-500">
            {getProjectTasks('Mobile App').map((t, idx) => (
              <div key={t.id || idx} className="absolute left-[20%] top-3 w-[22%] bg-blue-50 border border-blue-200 rounded px-2.5 py-1 text-xs text-blue-700 flex items-center justify-between shadow-sm">
                <span className="truncate font-medium">{t.title}</span>
              </div>
            ))}
          </SwimlaneRow>

          <SwimlaneRow title="BACKEND API" count={`${getProjectTasks('Backend API').length} tasks`} color="bg-emerald-500">
            {getProjectTasks('Backend API').map((t, idx) => (
              <div key={t.id || idx} className="absolute left-[34%] top-3 w-[24%] bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1 text-xs text-emerald-700 flex items-center justify-between shadow-sm">
                <span className="truncate font-medium">{t.title}</span>
              </div>
            ))}
          </SwimlaneRow>

          <SwimlaneRow title="MARKETING" count={`${getProjectTasks('Marketing').length} tasks`} color="bg-purple-500">
            {getProjectTasks('Marketing').map((t, idx) => (
              <div key={t.id || idx} className="absolute left-[26%] top-3 w-[22%] bg-purple-50 border border-purple-200 rounded px-2.5 py-1 text-xs text-purple-700 flex items-center justify-between shadow-sm">
                <span className="truncate font-medium">{t.title}</span>
              </div>
            ))}
          </SwimlaneRow>

          <SwimlaneRow title="DOCS" count={`${getProjectTasks('Docs').length} tasks`} color="bg-rose-500">
            {getProjectTasks('Docs').map((t, idx) => (
              <div key={t.id || idx} className="absolute left-[18%] top-3 w-[28%] bg-rose-50 border border-rose-200 rounded px-2.5 py-1 text-xs text-rose-700 flex items-center justify-between shadow-sm">
                <span className="truncate font-medium">{t.title}</span>
              </div>
            ))}
          </SwimlaneRow>

        </div>

        {/* Footer Metrics */}
        <footer className="h-9 bg-white border-t border-[#eaecf0] px-4 flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <div className="flex items-center space-x-4">
            <span>5 PROJECTS</span>
            <span>{tasks.length} TASKS</span>
            <span>3 DONE</span>
          </div>
          <button className="text-orange-500 hover:text-orange-600 font-bold uppercase">FULL VIEW →</button>
        </footer>
      </main>

      {/* ================= RIGHT CONTROL PANEL ================= */}
      <aside className="w-72 bg-white border-l border-[#eaecf0] flex flex-col shrink-0 z-20">
        <div className="p-3 border-b border-[#eaecf0] flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase">Control Panel</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>TASK</span>
          </button>
        </div>

        <div className="flex border-b border-[#eaecf0] text-xs font-semibold">
          <div className="flex-1 py-2 text-center text-orange-500 border-b-2 border-orange-500 bg-orange-50/30">TASKBOARD</div>
          <div className="flex-1 py-2 text-center text-gray-400 hover:text-gray-600 cursor-pointer">DIAGNOSTICS</div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-red-500 tracking-wider uppercase">Critical</span>
              <span className="text-[10px] text-gray-400 font-mono">1</span>
            </div>
            <div className="bg-white border border-red-200 rounded p-2.5 space-y-1 shadow-sm">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-900 font-semibold leading-snug">Fix auth flow regression</p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pl-5">
                <span>Mobile App</span>
                <span className="text-red-500 bg-red-50 px-1 rounded font-bold uppercase">Today</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase">High</span>
              <span className="text-[10px] text-gray-400 font-mono">3</span>
            </div>
            <div className="space-y-1.5">
              <TriageCard title="Homepage redesign kickoff" project="Growth" tag="Today" tagColor="text-orange-600 bg-orange-50" />
              <TriageCard title="Webhook refactor PR review" project="Backend API" tag="Oct 14" tagColor="text-gray-500 bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#eaecf0] bg-gray-50/50">
          <div className="flex items-center space-x-2 mb-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">Live Activity</span>
          </div>
          <div className="space-y-1 text-[10px] text-gray-500">
            <div className="flex justify-between items-center"><span className="truncate">Growth PR merged</span><span className="text-gray-400">2m</span></div>
            <div className="flex justify-between items-center"><span className="truncate">Backend API alert fired</span><span className="text-gray-400">11m</span></div>
          </div>
        </div>
      </aside>

      {/* ================= NEW TASK MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border border-[#eaecf0] rounded-lg p-5 w-96 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#eaecf0] pb-2">
              <h3 className="text-gray-900 font-bold text-xs tracking-wider uppercase">Create Orbit Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Task Title</label>
                <input 
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Launch marketing brief"
                  required
                  className="w-full bg-gray-50 border border-[#eaecf0] text-xs text-gray-900 p-2 rounded focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Project Swimlane</label>
                <select 
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full bg-gray-50 border border-[#eaecf0] text-xs text-gray-900 p-2 rounded focus:outline-none focus:border-orange-500"
                >
                  <option value="Growth">Growth</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Backend API">Backend API</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Docs">Docs</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Priority</label>
                <select 
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full bg-gray-50 border border-[#eaecf0] text-xs text-gray-900 p-2 rounded focus:outline-none focus:border-orange-500"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-[#eaecf0]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded transition-colors"
                >
                  Launch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, sublabel, active, badge, badgeColor }: any) {
  return (
    <div className={`flex items-center justify-between px-2.5 py-1.5 rounded cursor-pointer transition-colors ${active ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}>
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      {badge && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${badgeColor || 'bg-orange-100 text-orange-600'}`}>{badge}</span>}
      {sublabel && <span className="text-[9px] text-gray-400">{sublabel}</span>}
    </div>
  );
}

function ProjectItem({ color, name, active }: any) {
  return (
    <div className={`flex items-center space-x-2 px-2.5 py-1 rounded cursor-pointer transition-colors ${active ? 'bg-gray-100 text-gray-900 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
      <div className={`w-2 h-2 rounded-sm ${color}`}></div>
      <span className="text-xs">{name}</span>
    </div>
  );
}

function SwimlaneRow({ title, count, color, children }: any) {
  return (
    <div className="h-20 border-b border-[#eaecf0] flex relative hover:bg-gray-50/50 transition-colors">
      <div className="w-40 bg-white border-r border-[#eaecf0] p-3 flex flex-col justify-center shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-sm ${color}`}></div>
          <span className="text-xs font-bold text-gray-900 tracking-wider">{title}</span>
        </div>
        <span className="text-[10px] text-gray-400 pl-4 mt-0.5">{count}</span>
      </div>
      <div className="flex-1 relative">{children}</div>
    </div>
  );
}

function TriageCard({ title, project, tag, tagColor }: any) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded p-2 hover:border-gray-300 transition-colors cursor-pointer space-y-1 shadow-xs">
      <div className="flex items-start space-x-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1"></div>
        <p className="text-xs text-gray-900 font-medium leading-snug">{title}</p>
      </div>
      <div className="flex items-center justify-between text-[10px] text-gray-400 pl-3">
        <span>{project}</span>
        <span className={`px-1 py-0.5 rounded font-bold ${tagColor}`}>{tag}</span>
      </div>
    </div>
  );
}