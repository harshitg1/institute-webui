import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon,
  MonitorPlay,
  Layout,
  Globe,
  Settings2,
  ListVideo,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'basics' | 'curriculum' | 'settings'>('basics');
  
  // Basics State
  const [basics, setBasics] = useState({
    title: '',
    category: '',
    price: '',
    thumbnail: '',
    description: '',
    level: 'Beginner'
  });

  // Curriculum State
  const [modules, setModules] = useState<Module[]>([
    { 
      id: 'm1', 
      title: 'Module 1: Getting Started', 
      lessons: [
        { id: 'l1', title: 'Introduction to Strategy', duration: '12:00', videoUrl: 'https://vimeo.com/...', description: 'Overview of what we will cover.' }
      ] 
    }
  ]);

  const addModule = () => {
    const newModule: Module = {
      id: `m${Date.now()}`,
      title: `Module ${modules.length + 1}: New Module`,
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { 
            id: `l${Date.now()}`, 
            title: 'New Lesson', 
            duration: '10:00',
            videoUrl: '',
            description: ''
          }]
        };
      }
      return m;
    }));
  };

  const updateModuleTitle = (id: string, title: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, title } : m));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l)
        };
      }
      return m;
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        };
      }
      return m;
    }));
  };

  const deleteModule = (moduleId: string) => {
    setModules(prev => prev.filter(m => m.id !== moduleId));
  };

  const handleSave = async () => {
    console.log('Publishing Course:', { basics, modules });
    navigate('/dashboard/courses');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans selection:bg-violet-100 selection:text-violet-700">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-xl h-10 w-10 border-slate-100 hover:border-slate-200"
            >
              <ArrowLeft className="w-4.5 h-4.5 text-slate-900" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none mb-1">
                {basics.title || 'New Course Architecture'}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Live Builder Context
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-xl px-5 h-10 font-bold text-xs text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">
              Discard Changes
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 h-10 rounded-xl shadow-xl shadow-violet-200 transition-all active:scale-[0.98]"
            >
              <Save className="w-4 h-4 mr-2" />
              DEPLOY COURSE
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="flex gap-20">
          
          {/* Industrial Navigation Sidebar */}
          <aside className="w-64 shrink-0 flex flex-col gap-2 sticky top-30 h-fit">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-1">Navigation</p>
            {[
              { id: 'basics', label: 'Basic Config', icon: Layout },
              { id: 'curriculum', label: 'Curriculum Builder', icon: ListVideo },
              { id: 'settings', label: 'Global Parameters', icon: Settings2 }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "group w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200",
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-300" 
                    : "bg-white text-slate-400 hover:text-slate-900 border border-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-violet-400" : "text-slate-300 group-hover:text-slate-900")} />
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-3.5 h-3.5 text-violet-400" />}
              </button>
            ))}

            <div className="mt-8 p-6 rounded-2xl bg-violet-600 text-white shadow-xl shadow-violet-200 relative overflow-hidden">
               <Globe className="absolute -right-6 -top-6 w-24 h-24 opacity-10 rotate-12" />
               <p className="font-bold text-sm relative z-10 leading-tight">Need help building your course?</p>
               <Button variant="outline" className="mt-4 w-full rounded-lg border-white/20 bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest text-white border-0 h-9">
                 Read Guides
               </Button>
            </div>
          </aside>

          {/* Canvas Section */}
          <div className="flex-1 max-w-4xl">
            
            {activeTab === 'basics' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Foundation</h2>
                  <p className="text-slate-400 font-semibold text-base">Define the core identity and enrollment details.</p>
                </div>

                <Card className="rounded-2xl border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden p-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Course Title</Label>
                            <Input 
                              value={basics.title}
                              onChange={e => setBasics({...basics, title: e.target.value})}
                              placeholder="e.g. Quantitative Market Analysis"
                              className="h-14 rounded-xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-violet-600/10 font-bold text-base px-6 transition-all"
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Enrollment Price (INR)</Label>
                            <div className="relative">
                               <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">₹</span>
                               <Input 
                                 type="number"
                                 value={basics.price}
                                 onChange={e => setBasics({...basics, price: e.target.value})}
                                 placeholder="9,999"
                                 className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50 focus:bg-white font-bold text-xl transition-all"
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Category</Label>
                              <Select onValueChange={v => setBasics({...basics, category: v})}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50 font-bold px-6">
                                  <SelectValue placeholder="Industry" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl p-2 border-slate-100 shadow-xl">
                                  {["Tech Analysis", "Derivatives", "Crypto", "Stocks"].map(c => (
                                    <SelectItem key={c} value={c} className="rounded-lg font-bold py-3">{c}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Target Level</Label>
                              <Select defaultValue="Beginner" onValueChange={v => setBasics({...basics, level: v})}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50 font-bold px-6">
                                  <SelectValue placeholder="Level" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl p-2 border-slate-100 shadow-xl">
                                  {["Beginner", "Intermediate", "Advanced"].map(l => (
                                    <SelectItem key={l} value={l} className="rounded-lg font-bold py-3">{l}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Thumbnail Cover</Label>
                            <div className="aspect-video rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center group hover:bg-slate-100/50 hover:border-slate-200 transition-all cursor-pointer">
                               <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 mb-3 transition-transform group-hover:scale-105">
                                  <ImageIcon className="w-5 h-5" />
                               </div>
                               <p className="font-bold text-xs text-slate-900 uppercase tracking-widest leading-relaxed">System Dropzone</p>
                               <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-tight">16:9 • High Precision</p>
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-bold tracking-widest text-slate-400 pl-1">Executive Summary</Label>
                            <Textarea 
                               value={basics.description}
                               onChange={e => setBasics({...basics, description: e.target.value})}
                               placeholder="Draft a compelling course description..."
                               className="min-h-[100px] rounded-xl border-slate-100 bg-slate-50 focus:bg-white p-5 font-semibold text-sm leading-relaxed transition-all"
                            />
                         </div>
                      </div>
                   </div>
                </Card>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-end justify-between px-2">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Syllabus Builder</h2>
                    <p className="text-slate-400 font-semibold text-base">Assemble modules and lessons into a logic flow.</p>
                  </div>
                  <Button 
                    onClick={addModule}
                    className="rounded-xl bg-violet-600 text-white hover:bg-violet-700 font-bold text-[10px] uppercase tracking-widest h-12 px-6 shadow-xl shadow-violet-200 border-none transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    NEW MODULE
                  </Button>
                </div>

                <div className="space-y-6">
                  {modules.map((m, mIdx) => (
                    <Card key={m.id} className="rounded-2xl border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
                      <div className="bg-slate-950 px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-5 flex-1">
                          <div className="w-8 h-8 rounded-lg bg-white/10 text-violet-400 flex items-center justify-center font-bold text-xs">
                             {mIdx + 1}
                          </div>
                          <Input 
                            value={m.title}
                            onChange={e => updateModuleTitle(m.id, e.target.value)}
                            className="bg-transparent border-none text-white font-bold text-lg focus:ring-0 p-0 h-auto placeholder:text-slate-700"
                            placeholder="Module Title"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          onClick={() => deleteModule(m.id)}
                          className="h-8 w-8 text-slate-600 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-10 space-y-6">
                        {/* <Accordion type="multiple" className="space-y-4">
                          {m.lessons.map((l, lIdx) => (
                            <AccordionItem key={l.id} value={l.id} className="border-none">
                              <div className="bg-slate-50/80 rounded-[1.5rem] overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-2 pr-4">
                                  <AccordionTrigger className="flex-1 py-4 px-6 hover:no-underline">
                                    <div className="flex items-center gap-6 w-full text-left">
                                      <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:text-violet-600 transition-colors">
                                        {(lIdx + 1).toString().padStart(2, '0')}
                                      </span>
                                      <div className="flex flex-col gap-1">
                                        <p className="font-black text-slate-900 text-sm tracking-tight leading-none group-hover:text-violet-700 transition-colors">
                                          {l.title || 'Untitled Lesson'}
                                        </p>
                                        <div className="flex items-center gap-3">
                                           <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white rounded-md px-2 py-0.5 shadow-sm">
                                              <MonitorPlay className="w-3 h-3 text-violet-500" />
                                              VID
                                           </div>
                                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{l.duration || '00:00'} min</span>
                                        </div>
                                      </div>
                                    </div>
                                  </AccordionTrigger>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteLesson(m.id, l.id);
                                    }}
                                    className="text-slate-300 hover:text-red-500 rounded-xl transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                <AccordionContent className="px-8 pb-8 pt-2">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[2rem] shadow-inner shadow-slate-100 border border-slate-50">
                                      <div className="space-y-5">
                                         <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lesson Headline</Label>
                                            <Input 
                                              value={l.title}
                                              onChange={e => updateLesson(m.id, l.id, { title: e.target.value })}
                                              className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                                            />
                                         </div>
                                         <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Duration Profile</Label>
                                            <Input 
                                              value={l.duration}
                                              onChange={e => updateLesson(m.id, l.id, { duration: e.target.value })}
                                              className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                                            />
                                         </div>
                                      </div>
                                      <div className="space-y-5">
                                         <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Asset URL (Vimeo/YT)</Label>
                                            <Input 
                                              value={l.videoUrl}
                                              onChange={e => updateLesson(m.id, l.id, { videoUrl: e.target.value })}
                                              placeholder="https://cloud.vimeo.com/video/..."
                                              className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                                            />
                                         </div>
                                         <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Intellectual Context</Label>
                                            <Textarea 
                                              value={l.description}
                                              onChange={e => updateLesson(m.id, l.id, { description: e.target.value })}
                                              placeholder="Summarize the core takeaways..."
                                              className="min-h-[80px] rounded-xl bg-slate-50 border-none font-medium text-xs leading-relaxed"
                                            />
                                         </div>
                                      </div>
                                   </div>
                                </AccordionContent>
                              </div>
                            </AccordionItem>
                          ))}
                        </Accordion> */}

                        <Button 
                          variant="ghost" 
                          onClick={() => addLesson(m.id)}
                          className="w-full h-16 border-2 border-dashed border-slate-100 rounded-[1.5rem] hover:bg-slate-50 hover:border-violet-200 hover:text-violet-600 transition-all font-black text-[11px] tracking-[0.2em] text-slate-300 group"
                        >
                          <Plus className="w-4 h-4 mr-2 group-hover:scale-125 transition-transform" />
                          APPEND LESSON UNIT
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Global Parameters</h2>
                  <p className="text-slate-400 font-medium text-lg">System-level configuration for distribution.</p>
                </div>
                <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200 bg-white overflow-hidden p-12">
                   <p className="font-bold text-slate-400">Settings canvas initialized. Additional configurations coming soon.</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
