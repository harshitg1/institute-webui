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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <Card className="w-full max-w-[800px] max-h-[90vh] overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between px-10 py-8 border-b border-slate-100 bg-slate-50/50">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-violet-600 text-white border-none rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase">New Architecture</Badge>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Setup</span>
             </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Initialize New Batch</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              Configure the logical framework for the new student cohort.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-xl h-12 w-12 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-10 py-10">
          <form id="batch-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* General Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                   <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">General Metadata</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Batch Identifier</Label>
                  <Input
                    placeholder="e.g. ALPHA_BETA_2024"
                    value={formData.batchName}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
                    className="border-slate-100 bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 placeholder:text-slate-300 focus:bg-white transition-all outline-none border-none ring-1 ring-slate-100 focus:ring-violet-600/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Logic Category</Label>
                  <Select value={formData.courseCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, courseCategory: value }))}>
                    <SelectTrigger className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20">
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                      <SelectItem value="technical" className="text-xs font-bold uppercase tracking-tight">Technical Analysis</SelectItem>
                      <SelectItem value="advanced" className="text-xs font-bold uppercase tracking-tight">Advanced Derivatives</SelectItem>
                      <SelectItem value="blockchain" className="text-xs font-bold uppercase tracking-tight">Blockchain Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Schedule & Timing */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                   <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Chronological Specs</h3>
              </div>
              <div className="space-y-8 px-2">
                
                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Initialization Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Termination Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20"
                    />
                  </div>
                </div>

                {/* Days Selection */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Operational Nodes (Days)</p>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "h-10 px-5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all",
                          formData.scheduleDays.includes(day)
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                            : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-slate-300'
                        )}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Active Window Start</Label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Active Window End</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Staffing & Capacity */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                   <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Protocol Oversight</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lead Instructor</Label>
                  <Select value={formData.instructor} onValueChange={(value) => setFormData(prev => ({ ...prev, instructor: value }))}>
                    <SelectTrigger className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20">
                      <SelectValue placeholder="Locating Expert..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                      <SelectItem value="1" className="text-xs font-bold uppercase tracking-tight">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="2" className="text-xs font-bold uppercase tracking-tight">Prof. Michael Chen</SelectItem>
                      <SelectItem value="3" className="text-xs font-bold uppercase tracking-tight">Dr. Elena Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Max Node Occupancy</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="e.g. 30"
                      min="1"
                      value={formData.maxCapacity}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: e.target.value }))}
                      className="border-none bg-slate-50/50 rounded-xl h-12 px-5 font-bold text-slate-900 ring-1 ring-slate-100 focus:ring-violet-600/20 pr-16"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400 uppercase">UNITS</span>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-slate-100 flex items-center justify-end gap-4 bg-slate-50/50">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl h-12 px-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"
          >
            Abort Setup
          </Button>
          <Button
            form="batch-form"
            type="submit"
            disabled={loading}
            className="rounded-xl h-12 px-8 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 border-none"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {loading ? 'Processing...' : 'Confirm Initialization'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

const Badge = ({ children, className }: any) => (
    <div className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", className)}>
        {children}
    </div>
)
