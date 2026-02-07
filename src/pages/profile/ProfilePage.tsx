import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Save, 
  Key, 
  Bell, 
  Smartphone,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <Avatar className="h-32 w-32 border-4 border-white shadow-2xl relative z-10">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" />
              <AvatarFallback className="bg-violet-100 text-violet-600 text-4xl font-black">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 z-20 h-10 w-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{user?.email?.split('@')[0] || 'Member'}</h1>
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-emerald-200/50">
                 <CheckCircle2 className="w-3 h-3" /> Verified
              </div>
            </div>
            <p className="text-slate-500 font-semibold text-sm tracking-wide">
              {user?.role?.replace('_', ' ') || 'Community Member'} • Joined Oct 2023
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-10 h-14 rounded-xl shadow-xl shadow-violet-200 transition-all active:scale-[0.98]"
        >
          {loading ? 'MODALIZING...' : <><Save className="w-4 h-4 mr-2" /> SAVE PROFILE</>}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <div className="px-4">
          <TabsList className="bg-white/50 backdrop-blur-sm p-2 rounded-2xl mb-12 border border-slate-100 shadow-xl shadow-slate-200/40 w-full md:w-auto h-auto flex flex-wrap gap-2">
            {[
              { id: 'general', label: 'General Identity', icon: User },
              { id: 'security', label: 'Security & Keys', icon: Lock },
              { id: 'notifications', label: 'Alert Center', icon: Bell }
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-lg px-10 py-3 font-bold text-[10px] uppercase tracking-widest transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="general" className="px-4 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-3xl border-none shadow-xl shadow-slate-200 bg-white p-10 overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
                   <User className="w-48 h-48" />
                 </div>
                 <div className="space-y-8 relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personal Details</h3>
                      <p className="text-slate-400 font-medium pb-2 border-b border-slate-50 text-xs">Official identity used across the platform.</p>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Display Name</Label>
                          <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <Input 
                              defaultValue={user?.email?.split('@')[0]}
                              className="h-14 pl-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-violet-600/10 font-bold"
                            />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Primary Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <Input 
                              defaultValue={user?.email || 'member@lavender.com'}
                              disabled
                              className="h-14 pl-14 rounded-xl border-slate-100 bg-slate-50/50 font-bold text-slate-400 cursor-not-allowed"
                            />
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="rounded-3xl border-none shadow-xl shadow-slate-200 bg-white p-10">
                 <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">System Access</h3>
                      <p className="text-slate-400 font-medium pb-2 border-b border-slate-50 text-xs">Privileges linked to this architecture node.</p>
                    </div>

                    <div className="space-y-10">
                       <div className="flex items-start gap-6 p-8 rounded-2xl bg-slate-950 text-white shadow-lg group">
                          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                             <Shield className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="font-bold text-sm uppercase tracking-[0.2em] mb-1">Global Permissions</p>
                             <p className="text-slate-400 text-xs font-medium leading-relaxed">
                               Your node is assigned the <span className="text-white font-bold">{user?.role || 'STUDENT'}</span> protocols. 
                               Access to system primitives is moderated.
                             </p>
                          </div>
                       </div>

                       <div className="flex items-start gap-6 px-8">
                          <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600">
                             <Smartphone className="w-6 h-6" />
                          </div>
                          <div>
                             <p className="font-black text-sm text-slate-800 tracking-tight mb-1 font-sans">Multi-Device Logic</p>
                             <p className="text-slate-400 text-xs font-medium leading-relaxed">
                               Currently active on <span className="font-black text-slate-900 italic">2 sessions</span> across separate environments.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="security" className="px-4 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-3xl border-none shadow-xl shadow-slate-200 bg-white p-10 max-w-2xl">
             <div className="space-y-10">
                <div className="space-y-2 text-center">
                   <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white mb-6 shadow-xl shadow-violet-100">
                      <Key className="w-7 h-7" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase whitespace-normal">Credential Lifecycle</h3>
                   <p className="text-slate-400 font-medium max-w-sm mx-auto text-xs">Cycle your authentication keys regularly to maintain node integrity.</p>
                </div>

                <div className="space-y-5">
                   <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">New Passcode Node</Label>
                      <Input type="password" placeholder="••••••••••••" className="h-14 rounded-xl border-slate-100 bg-slate-50 font-bold px-6" />
                   </div>
                   <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Initialize Verification</Label>
                      <Input type="password" placeholder="••••••••••••" className="h-14 rounded-xl border-slate-100 bg-slate-50 font-bold px-6" />
                   </div>
                   <Button className="w-full h-14 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-300 active:scale-[0.98] transition-all">
                     Update Key Prototype
                   </Button>
                </div>
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
