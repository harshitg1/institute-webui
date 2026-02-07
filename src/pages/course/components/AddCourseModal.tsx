import { useState } from 'react';
import { X, IndianRupee, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface CourseFormData {
  title: string;
  category: string;
  price: string;
  duration: string;
  lessonsCount: string;
  thumbnail?: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
}

export default function AddCourseModal({ isOpen, onClose, onSubmit }: AddCourseModalProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    category: '',
    price: '',
    duration: '',
    lessonsCount: '',
    thumbnail: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Technical Analysis",
    "Options Trading",
    "Fundamentals",
    "Blockchain",
    "Investment",
    "Psychology"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[700px] rounded-3xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-violet-600/5">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create New Course</h2>
            <p className="text-slate-500 text-sm font-medium">Design your curriculum and pricing.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Course Title</Label>
              <Input 
                placeholder="e.g. Price Action Strategies"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="h-12 rounded-xl border-slate-200 focus:ring-violet-500 focus:border-violet-500 font-bold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Category</Label>
                <Select onValueChange={v => setFormData({...formData, category: v})} required>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl p-2">
                    {categories.map(c => (
                      <SelectItem key={c} value={c} className="rounded-lg font-bold text-xs p-3">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Price (INR)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="number"
                    placeholder="4999"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-200 font-bold"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Duration</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="12h 45m"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-200 font-bold"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Lessons count</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="number"
                    placeholder="24"
                    value={formData.lessonsCount}
                    onChange={e => setFormData({...formData, lessonsCount: e.target.value})}
                    className="h-12 pl-10 rounded-xl border-slate-200 font-bold"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Thumbnail URL</Label>
              <Input 
                placeholder="https://..."
                value={formData.thumbnail}
                onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                className="h-12 rounded-xl border-slate-200 font-bold"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button variant="ghost" type="button" onClick={onClose} className="flex-1 h-12 rounded-xl font-bold text-slate-400">
              CANCEL
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-600/20">
              {loading ? 'CREATING...' : 'CREATE COURSE'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
