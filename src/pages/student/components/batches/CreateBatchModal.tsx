import { useState } from 'react';
import { X, CheckCircle, BookOpen, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface BatchFormData {
  batchName: string;
  courseCategory: string;
  startDate: string;
  endDate: string;
  scheduleDays: string[];
  startTime: string;
  endTime: string;
  instructor: string;
  maxCapacity: string;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CreateBatchModal({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BatchFormData) => void;
}) {
  const [formData, setFormData] = useState<BatchFormData>({
    batchName: '',
    courseCategory: '',
    startDate: '',
    endDate: '',
    scheduleDays: [],
    startTime: '09:00',
    endTime: '11:00',
    instructor: '',
    maxCapacity: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter(d => d !== day)
        : [...prev.scheduleDays, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
      setFormData({
        batchName: '',
        courseCategory: '',
        startDate: '',
        endDate: '',
        scheduleDays: [],
        startTime: '09:00',
        endTime: '11:00',
        instructor: '',
        maxCapacity: ''
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-[720px] max-h-[90vh] overflow-hidden rounded-xl border-zinc-200 shadow-2xl bg-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">Create New Batch</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Set up a new training batch with schedule and capacity
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-lg h-10 w-10 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-8 py-8">
          <form id="batch-form" onSubmit={handleSubmit} className="space-y-10">
            
            {/* General Information */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                   <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-medium text-zinc-900">General Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12">
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500">Batch Name</Label>
                  <Input
                    placeholder="e.g. Web Dev Alpha"
                    value={formData.batchName}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
                    className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500">Course Category</Label>
                  <Select value={formData.courseCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, courseCategory: value }))}>
                    <SelectTrigger className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-zinc-200">
                      <SelectItem value="technical" className="text-sm">Technical Analysis</SelectItem>
                      <SelectItem value="advanced" className="text-sm">Advanced Derivatives</SelectItem>
                      <SelectItem value="blockchain" className="text-sm">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                   <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-medium text-zinc-900">Schedule</h3>
              </div>
              <div className="space-y-6 pl-12">
                
                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500">Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500">End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400"
                    />
                  </div>
                </div>

                {/* Days Selection */}
                <div className="space-y-3">
                  <Label className="text-xs text-zinc-500">Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "h-9 px-4 rounded-lg text-xs font-medium transition-all",
                          formData.scheduleDays.includes(day)
                            ? 'bg-zinc-900 text-white'
                            : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                        )}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500">Start Time</Label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-500">End Time</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Staffing & Capacity */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                   <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-medium text-zinc-900">Capacity</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12">
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500">Instructor</Label>
                  <Select value={formData.instructor} onValueChange={(value) => setFormData(prev => ({ ...prev, instructor: value }))}>
                    <SelectTrigger className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-zinc-200">
                      <SelectItem value="1" className="text-sm">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="2" className="text-sm">Prof. Michael Chen</SelectItem>
                      <SelectItem value="3" className="text-sm">Dr. Elena Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-500">Max Capacity</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="e.g. 30"
                      min="1"
                      value={formData.maxCapacity}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: e.target.value }))}
                      className="border-zinc-200 bg-white rounded-lg h-11 text-sm focus:border-zinc-400 focus:ring-zinc-400 pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">students</span>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-zinc-100 flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg h-10 px-5 text-sm text-zinc-500 hover:text-zinc-900"
          >
            Cancel
          </Button>
          <Button
            form="batch-form"
            type="submit"
            disabled={loading}
            className="rounded-lg h-10 px-6 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 flex items-center gap-2"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {loading ? 'Creating...' : 'Create Batch'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
