import React, { useState } from 'react';
import { Shield, Users, Award, Cpu, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('hr_role') || 'manager');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notification, setNotification] = useState('');

  const handleLoginChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('hr_role', newRole);
    setNotification(`Switched role to: ${newRole.toUpperCase()}`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Cpu className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold tracking-wider">Meta Geeks HR</span>
          </div>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
              <Shield className="h-5 w-5" /> <span>Dashboard</span>
            </button>
            {role === 'manager' && (
              <button 
                onClick={() => setActiveTab('assignments')} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'assignments' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
                <Users className="h-5 w-5" /> <span>Mentor Assignments</span>
              </button>
            )}
            {role === 'mentor' && (
              <button 
                onClick={() => setActiveTab('reviews')} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'reviews' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
                <Award className="h-5 w-5" /> <span>Sprint Reviews</span>
              </button>
            )}
            <button 
              onClick={() => setActiveTab('ai-report')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'ai-report' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
              <Cpu className="h-5 w-5" /> <span>AI Performance</span>
            </button>
          </nav>
        </div>

        {/* Role Switcher for Demo */}
        <div className="border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-400 mb-2">Simulate User Role:</p>
          <div className="flex space-x-1">
            <button onClick={() => handleLoginChange('manager')} className={`px-2 py-1 text-xs rounded ${role === 'manager' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800'}`}>Mgr</button>
            <button onClick={() => handleLoginChange('mentor')} className={`px-2 py-1 text-xs rounded ${role === 'mentor' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800'}`}>Mnt</button>
            <button onClick={() => handleLoginChange('intern')} className={`px-2 py-1 text-xs rounded ${role === 'intern' ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800'}`}>Int</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {notification && (
          <div className="mb-6 p-4 bg-emerald-900 border border-emerald-600 rounded-lg text-emerald-200 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>{notification}</span>
          </div>
        )}

        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="bg-slate-800 px-4 py-2 rounded-full text-sm border border-slate-700">
            Active Role: <span className="text-cyan-400 uppercase font-bold">{role}</span>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow">
              <h3 className="text-slate-400 text-sm">Active Interns</h3>
              <p className="text-4xl font-bold mt-2 text-cyan-400">24</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow">
              <h3 className="text-slate-400 text-sm">Pending Reviews</h3>
              <p className="text-4xl font-bold mt-2 text-amber-400">3</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow">
              <h3 className="text-slate-400 text-sm">AI Reports Generated</h3>
              <p className="text-4xl font-bold mt-2 text-emerald-400">18</p>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && role === 'manager' && (
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Assign Mentor to Intern</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Select Mentor</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white">
                  <option>Akshay (Senior Backend)</option>
                  <option>Priya (Lead Frontend)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Select Junior Intern</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white">
                  <option>Dhanush (Full-Stack)</option>
                  <option>Rahul (DevOps)</option>
                </select>
              </div>
              <button onClick={() => setNotification('Mentorship Assigned Successfully & Teams Webhook Fired!')} className="w-full bg-cyan-600 hover:bg-cyan-500 font-bold py-3 rounded-lg transition">
                Confirm Assignment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ai-report' && (
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold mb-2">Amazon Bedrock AI Performance Synthesis</h2>
            <p className="text-slate-400 text-sm mb-6">Generated from latest sprint review metrics via AWS Lambda.</p>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 text-slate-300 leading-relaxed space-y-4">
              <p>🚀 <strong>Executive Summary:</strong> Dhanush has demonstrated exceptional technical aptitude this sprint, scoring consistently high in Code Quality (5/5) and Task Completion. Code reviews indicate clean architecture design and adherence to AWS serverless best practices.</p>
              <p>📈 <strong>Areas for Growth:</strong> Proactive communication during daily async syncs can be improved. Increasing engagement in cross-team code discussions will accelerate technical leadership capabilities.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
