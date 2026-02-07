import { useState, useEffect } from 'react';
import { X, Calendar, Check, XCircle, Clock, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Batch } from './BatchCard';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: Batch | null;
}

interface Student {
  id: string;
  name: string;
  avatar?: string;
}


// Mock students generator
const generateMockStudents = (count: number): Student[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `student-${i+1}`,
    name: `Student ${i+1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
  }));
};

export function AttendanceModal({ isOpen, onClose, batch }: AttendanceModalProps) {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (batch && isOpen) {
      // Simulate fetching students for the batch
      const mockStudents = generateMockStudents(batch.students);
      setStudents(mockStudents);
      
      // Initialize all as present by default
      const initialAttendance: Record<string, 'present' | 'absent' | 'late'> = {};
      mockStudents.forEach(s => {
        initialAttendance[s.id] = 'present';
      });
      setAttendance(initialAttendance);
    }
  }, [batch, isOpen]);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const newAttendance: Record<string, 'present' | 'absent' | 'late'> = {};
    students.forEach(s => {
      newAttendance[s.id] = status;
    });
    setAttendance(newAttendance);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    console.log('Submitting attendance:', {
      batchId: batch?.id,
      date,
      attendance
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onClose();
  };

  if (!isOpen || !batch) return null;

  const stats = {
    present: Object.values(attendance).filter(s => s === 'present').length,
    absent: Object.values(attendance).filter(s => s === 'absent').length,
    late: Object.values(attendance).filter(s => s === 'late').length,
    total: students.length
  };

  const attendanceRate = Math.round((stats.present / stats.total) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Protocol</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{batch.name}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-400">{batch.time}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white sticky top-0 z-10">
           <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <Input 
                 type="date" 
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                 className="pl-9 w-40 h-9 text-xs font-semibold rounded-lg border-slate-200"
               />
             </div>
             
             <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

             <div className="flex gap-2">
               <Button 
                 variant="outline" 
                 size="sm"
                 onClick={() => handleMarkAll('present')}
                 className="h-8 text-[10px] font-bold uppercase tracking-widest border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
               >
                 Mark All Present
               </Button>
               <Button 
                 variant="outline" 
                 size="sm"
                 onClick={() => handleMarkAll('absent')}
                 className="h-8 text-[10px] font-bold uppercase tracking-widest border-slate-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
               >
                 Mark All Absent
               </Button>
             </div>
           </div>

           <div className="flex items-center gap-4">
             <div className="flex flex-col items-center px-4 border-r border-slate-100">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Present</span>
               <span className="text-lg font-bold text-emerald-600 leading-none">{stats.present}</span>
             </div>
             <div className="flex flex-col items-center px-4 border-r border-slate-100">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Absent</span>
               <span className="text-lg font-bold text-rose-500 leading-none">{stats.absent}</span>
             </div>
             <div className="flex flex-col items-center px-4">
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rate</span>
               <span className="text-lg font-bold text-slate-700 leading-none">{attendanceRate}%</span>
             </div>
           </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Card 
                key={student.id} 
                className={`border shadow-sm transition-all duration-200 ${
                  attendance[student.id] === 'absent' 
                    ? 'border-rose-100 bg-rose-50/30' 
                    : attendance[student.id] === 'late'
                    ? 'border-amber-100 bg-amber-50/30'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-slate-400 border-2 ${
                       attendance[student.id] === 'present' ? 'border-emerald-100 bg-emerald-50 text-emerald-500' :
                       attendance[student.id] === 'absent' ? 'border-rose-100 bg-rose-50 text-rose-500' :
                       'border-amber-100 bg-amber-50 text-amber-500'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{student.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">ID: {student.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        attendance[student.id] === 'present' 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' 
                          : 'bg-white border border-slate-100 text-slate-300 hover:border-emerald-200 hover:text-emerald-500'
                      }`}
                      title="Present"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        attendance[student.id] === 'late' 
                          ? 'bg-amber-400 text-white shadow-md shadow-amber-200' 
                          : 'bg-white border border-slate-100 text-slate-300 hover:border-amber-200 hover:text-amber-500'
                      }`}
                      title="Late"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                        attendance[student.id] === 'absent' 
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                          : 'bg-white border border-slate-100 text-slate-300 hover:border-rose-200 hover:text-rose-500'
                      }`}
                      title="Absent"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-11 rounded-xl px-6 border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-white hover:text-slate-900"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
            className="h-11 rounded-xl px-8 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update Roster
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
