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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-[520px] rounded-lg bg-white border border-zinc-200 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Create New Course</h2>
            <p className="text-zinc-500 text-[13px]">Design your curriculum and pricing.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 rounded transition-colors -mr-1">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-700 text-[13px] font-medium">Course Title</Label>
              <Input 
                placeholder="e.g. Price Action Strategies"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-700 text-[13px] font-medium">Category</Label>
                <Select onValueChange={v => setFormData({...formData, category: v})} required>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-700 text-[13px] font-medium">Price (INR)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <Input 
                    type="number"
                    placeholder="4999"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-700 text-[13px] font-medium">Duration</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <Input 
                    placeholder="12h 45m"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-zinc-700 text-[13px] font-medium">Lessons count</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                  <Input 
                    type="number"
                    placeholder="24"
                    value={formData.lessonsCount}
                    onChange={e => setFormData({...formData, lessonsCount: e.target.value})}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-zinc-700 text-[13px] font-medium">Thumbnail URL</Label>
              <Input 
                placeholder="https://..."
                value={formData.thumbnail}
                onChange={e => setFormData({...formData, thumbnail: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Button variant="ghost" type="button" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
