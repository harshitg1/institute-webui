import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Layout,
  Settings2,
  ListVideo,
  GripVertical,
  Clock,
  ChevronDown,
  ChevronUp,
  Upload,
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCreateCourseMutation } from '@/api/apiSlice';

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
  expanded: boolean;
}

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [createCourse, { isLoading: isPublishing }] = useCreateCourseMutation();
  const [activeTab, setActiveTab] = useState<'basics' | 'curriculum' | 'settings'>('basics');

  const [basics, setBasics] = useState({
    title: '',
    category: '',
    price: '',
    thumbnail: '',
    description: '',
    level: 'Beginner',
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: 'm1',
      title: 'Module 1: Getting Started',
      expanded: true,
      lessons: [
        { id: 'l1', title: 'Introduction to the Course', duration: '12:00', videoUrl: '', description: '' },
      ],
    },
  ]);

  const addModule = () => {
    const newModule: Module = {
      id: `m${Date.now()}`,
      title: `Module ${modules.length + 1}: New Module`,
      expanded: true,
      lessons: [],
    };
    setModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            expanded: true,
            lessons: [
              ...m.lessons,
              {
                id: `l${Date.now()}`,
                title: 'New Lesson',
                duration: '10:00',
                videoUrl: '',
                description: '',
              },
            ],
          };
        }
        return m;
      })
    );
  };

  const updateModuleTitle = (id: string, title: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const toggleModuleExpand = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m)));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l)),
          };
        }
        return m;
      })
    );
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) };
        }
        return m;
      })
    );
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  };

  const handleSave = async () => {
    if (!basics.title || !basics.price) {
      alert("Title and Price are required.");
      return;
    }
    
    try {
      await createCourse({
        title: basics.title,
        description: basics.description,
        price: Number(basics.price) || 0,
        thumbnailUrl: basics.thumbnail,
        published: true, // Auto-publish for now
      }).unwrap();
      
      navigate('/dashboard/courses');
    } catch (err) {
      console.error('Failed to create course:', err);
      alert('Failed to publish course.');
    }
  };

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);

  const tabs = [
    { id: 'basics' as const, label: 'Basic Details', icon: Layout },
    { id: 'curriculum' as const, label: 'Curriculum', icon: ListVideo },
    { id: 'settings' as const, label: 'Settings', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-xl h-9 w-9 text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-none">
                {basics.title || 'Create New Course'}
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Draft • {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="rounded-xl text-sm text-slate-500 hover:text-slate-700 font-medium"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPublishing}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 h-9 rounded-xl text-sm gap-2 shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              {isPublishing ? "Publishing..." : "Publish Course"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar nav */}
          <aside className="w-56 shrink-0 hidden md:block">
            <div className="sticky top-20 space-y-1.5">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Steps
              </p>
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  <div
                    className={cn(
                      'h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold',
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                    )}
                  >
                    {i + 1}
                  </div>
                  {tab.label}
                </button>
              ))}

              {/* Progress indicator */}
              <div className="mt-6 p-4 rounded-xl bg-slate-100/80">
                <p className="text-xs font-semibold text-slate-700 mb-2">Completion</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'Title', done: !!basics.title },
                    { label: 'Category', done: !!basics.category },
                    { label: 'Price', done: !!basics.price },
                    { label: 'Description', done: !!basics.description },
                    { label: 'Modules', done: modules.length > 0 },
                    { label: 'Lessons', done: totalLessons > 0 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-[11px]">
                      <div
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          item.done ? 'bg-emerald-500' : 'bg-slate-300'
                        )}
                      />
                      <span className={item.done ? 'text-slate-700' : 'text-slate-400'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main canvas */}
          <div className="flex-1 min-w-0">
            {/* Mobile tab bar */}
            <div className="flex md:hidden mb-6 bg-slate-100 rounded-xl p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-semibold transition-all',
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* BASICS TAB */}
            {activeTab === 'basics' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Basic Details</h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Set up the core information for your course.
                  </p>
                </div>

                <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">Course Title</Label>
                      <Input
                        value={basics.title}
                        onChange={(e) => setBasics({ ...basics, title: e.target.value })}
                        placeholder="e.g. Options Trading Masterclass"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-700">Category</Label>
                        <Select onValueChange={(v) => setBasics({ ...basics, category: v })}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {['Technical Analysis', 'Options & Derivatives', 'Crypto', 'Price Action', 'Day Trading', 'Risk Management'].map(
                              (c) => (
                                <SelectItem key={c} value={c} className="rounded-lg">
                                  {c}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-700">Difficulty Level</Label>
                        <Select
                          defaultValue="Beginner"
                          onValueChange={(v) => setBasics({ ...basics, level: v })}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                              <SelectItem key={l} value={l} className="rounded-lg">
                                {l}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-slate-700">Price (₹)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                            ₹
                          </span>
                          <Input
                            type="number"
                            value={basics.price}
                            onChange={(e) => setBasics({ ...basics, price: e.target.value })}
                            placeholder="4,999"
                            className="h-11 pl-7 rounded-xl border-slate-200 bg-slate-50/50 text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">Course Description</Label>
                      <Textarea
                        value={basics.description}
                        onChange={(e) => setBasics({ ...basics, description: e.target.value })}
                        placeholder="Describe what students will learn, the target audience, and key outcomes..."
                        className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white text-sm leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">Thumbnail Image</Label>
                      <div className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 transition-all group">
                        <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-violet-500 group-hover:scale-105 transition-all mb-3">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Recommended: 1280×720px (16:9 ratio)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setActiveTab('curriculum')}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold px-5 gap-2"
                  >
                    Next: Add Curriculum
                    <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* CURRICULUM TAB */}
            {activeTab === 'curriculum' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Curriculum Builder</h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Organize your content into modules and lessons.
                    </p>
                  </div>
                  <Button
                    onClick={addModule}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold h-9 px-4 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Module
                  </Button>
                </div>

                <div className="space-y-4">
                  {modules.map((m, mIdx) => (
                    <Card
                      key={m.id}
                      className="rounded-2xl border-slate-200/80 bg-white shadow-sm overflow-hidden"
                    >
                      {/* Module header */}
                      <div
                        className="flex items-center gap-3 px-5 py-4 bg-slate-50/80 border-b border-slate-100 cursor-pointer"
                        onClick={() => toggleModuleExpand(m.id)}
                      >
                        <GripVertical className="w-4 h-4 text-slate-300" />
                        <div className="h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                          {mIdx + 1}
                        </div>
                        <Input
                          value={m.title}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateModuleTitle(m.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-transparent border-none shadow-none font-semibold text-sm text-slate-900 p-0 h-auto focus-visible:ring-0"
                          placeholder="Module Title"
                        />
                        <Badge variant="secondary" className="rounded-lg text-[10px] font-semibold">
                          {m.lessons.length} lesson{m.lessons.length !== 1 ? 's' : ''}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteModule(m.id);
                          }}
                          className="h-7 w-7 rounded-lg text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                        {m.expanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      {/* Lessons */}
                      {m.expanded && (
                        <CardContent className="p-5 space-y-3">
                          {m.lessons.map((l, lIdx) => (
                            <div
                              key={l.id}
                              className="rounded-xl bg-slate-50/70 border border-slate-100 p-4 space-y-3"
                            >
                              <div className="flex items-center gap-3">
                                <span className="h-6 w-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">
                                  {lIdx + 1}
                                </span>
                                <Input
                                  value={l.title}
                                  onChange={(e) =>
                                    updateLesson(m.id, l.id, { title: e.target.value })
                                  }
                                  className="flex-1 bg-white border-slate-200 rounded-lg h-9 text-sm font-medium"
                                  placeholder="Lesson title"
                                />
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                  <Input
                                    value={l.duration}
                                    onChange={(e) =>
                                      updateLesson(m.id, l.id, { duration: e.target.value })
                                    }
                                    className="w-20 bg-white border-slate-200 rounded-lg h-9 text-xs text-center"
                                    placeholder="mm:ss"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteLesson(m.id, l.id)}
                                  className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-500 shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-9">
                                <div className="space-y-1">
                                  <Label className="text-[10px] font-medium text-slate-500">
                                    Video URL
                                  </Label>
                                  <Input
                                    value={l.videoUrl}
                                    onChange={(e) =>
                                      updateLesson(m.id, l.id, { videoUrl: e.target.value })
                                    }
                                    placeholder="https://vimeo.com/..."
                                    className="bg-white border-slate-200 rounded-lg h-8 text-xs"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] font-medium text-slate-500">
                                    Description
                                  </Label>
                                  <Input
                                    value={l.description}
                                    onChange={(e) =>
                                      updateLesson(m.id, l.id, { description: e.target.value })
                                    }
                                    placeholder="Brief summary of this lesson..."
                                    className="bg-white border-slate-200 rounded-lg h-8 text-xs"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={() => addLesson(m.id)}
                            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-400 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50/30 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Lesson
                          </button>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('basics')}
                    className="rounded-xl text-sm font-medium"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={() => setActiveTab('settings')}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-semibold px-5 gap-2"
                  >
                    Next: Settings
                    <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Course Settings</h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Configure enrollment, visibility, and access settings.
                  </p>
                </div>

                <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Enable Enrollment
                        </p>
                        <p className="text-xs text-slate-500">
                          Allow students to enroll in this course
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-violet-600 rounded bg-slate-100 border-slate-300"
                      />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Certificate on Completion
                        </p>
                        <p className="text-xs text-slate-500">
                          Issue certificates when students finish all lessons
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-violet-600 rounded bg-slate-100 border-slate-300"
                      />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Show in Public Catalog
                        </p>
                        <p className="text-xs text-slate-500">
                          Make this course visible to all visitors
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-violet-600 rounded bg-slate-100 border-slate-300"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">
                      Course Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-xl bg-slate-50">
                        <p className="text-lg font-bold text-slate-900">{modules.length}</p>
                        <p className="text-[11px] text-slate-500">Modules</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-50">
                        <p className="text-lg font-bold text-slate-900">{totalLessons}</p>
                        <p className="text-[11px] text-slate-500">Lessons</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-50">
                        <p className="text-lg font-bold text-slate-900">
                          {basics.price ? `₹${Number(basics.price).toLocaleString('en-IN')}` : '—'}
                        </p>
                        <p className="text-[11px] text-slate-500">Price</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-slate-50">
                        <p className="text-lg font-bold text-slate-900">{basics.level}</p>
                        <p className="text-[11px] text-slate-500">Level</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('curriculum')}
                    className="rounded-xl text-sm font-medium"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isPublishing}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 rounded-xl text-sm gap-2 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isPublishing ? "Publishing..." : "Publish Course"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
