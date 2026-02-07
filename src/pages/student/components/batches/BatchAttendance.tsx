import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Save, Search, ChevronRight, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { Batch } from './BatchCard';
import { AttendanceTable, type Student, type AttendanceStatus } from './AttendanceTable';

interface BatchAttendanceProps {
  batch: Batch;
  onBack: () => void;
}

interface AttendanceRecord {
  date: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  status: 'completed' | 'pending';
}

const MOCK_HISTORY: AttendanceRecord[] = [
  { date: '2024-02-07', present: 23, absent: 1, late: 0, total: 24, status: 'completed' },
  { date: '2024-02-06', present: 22, absent: 2, late: 0, total: 24, status: 'completed' },
  { date: '2024-02-05', present: 21, absent: 2, late: 1, total: 24, status: 'completed' },
  { date: '2024-02-04', present: 20, absent: 3, late: 1, total: 24, status: 'completed' },
  { date: '2024-02-03', present: 19, absent: 4, late: 1, total: 24, status: 'completed' },
  { date: '2024-02-02', present: 24, absent: 0, late: 0, total: 24, status: 'completed' },
  { date: '2024-02-01', present: 22, absent: 1, late: 1, total: 24, status: 'completed' },
  { date: '2024-01-31', present: 18, absent: 4, late: 2, total: 24, status: 'completed' },
  { date: '2024-01-30', present: 20, absent: 3, late: 1, total: 24, status: 'completed' },
  { date: '2024-01-29', present: 23, absent: 1, late: 0, total: 24, status: 'completed' },
];

const generateMockStudents = (count: number): Student[] => {
  const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Pranav', 'Advait', 'Dhruv', 'Kabir', 
                      'Ananya', 'Diya', 'Aadhya', 'Ishaan', 'Kavya', 'Myra', 'Aryan', 'Reyansh', 'Atharv', 'Krishna'];
  const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Reddy', 'Agarwal', 'Joshi', 'Mehta', 'Gupta', 'Verma'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `STU-${String(i + 1001).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  }));
};

export function BatchAttendance({ batch, onBack }: BatchAttendanceProps) {
  const [activeTab, setActiveTab] = useState('daily');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [historyFromDate, setHistoryFromDate] = useState('');
  const [historyToDate, setHistoryToDate] = useState('');
  
  const filteredHistory = MOCK_HISTORY.filter(record => {
    const recordDate = new Date(record.date);
    const from = historyFromDate ? new Date(historyFromDate) : null;
    const to = historyToDate ? new Date(historyToDate) : null;
    
    if (from && recordDate < from) return false;
    if (to && recordDate > to) return false;
    return true;
  });
  
  const resetHistoryFilters = () => {
    setHistoryFromDate('');
    setHistoryToDate('');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const mockStudents = generateMockStudents(batch.students);
    setStudents(mockStudents);
    
    const initialAttendance: Record<string, AttendanceStatus> = {};
    mockStudents.forEach(s => {
      initialAttendance[s.id] = 'present';
    });
    setAttendance(initialAttendance);
  }, [batch]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const newAttendance: Record<string, AttendanceStatus> = {};
    students.forEach(s => {
      newAttendance[s.id] = status;
    });
    setAttendance(newAttendance);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log('Submitting attendance:', { batchId: batch.id, date, attendance });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const stats = {
    present: Object.values(attendance).filter(s => s === 'present').length,
    absent: Object.values(attendance).filter(s => s === 'absent').length,
    late: Object.values(attendance).filter(s => s === 'late').length,
    total: students.length
  };

  const attendanceRate = Math.round((stats.present / stats.total) * 100) || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div className="flex items-center gap-4">
          <Button 
            onClick={onBack}
            variant="ghost" 
            size="icon" 
            className="rounded-lg h-10 w-10 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">{batch.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="border-zinc-200 text-zinc-500 font-medium text-[10px] uppercase tracking-widest">{batch.course}</Badge>
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-500">{batch.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="hidden md:flex items-center px-4 py-2 bg-white rounded-lg border border-zinc-200 gap-4">
              <div className="flex flex-col">
                 <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">Enrollment</span>
                 <span className="text-sm font-semibold text-zinc-900">{batch.students}</span>
              </div>
              <div className="w-px h-6 bg-zinc-200"></div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">Rate</span>
                 <span className="text-sm font-semibold text-zinc-900">{attendanceRate}%</span>
              </div>
           </div>
        </div>
      </div>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-100 p-1 h-auto rounded-lg">
          <TabsTrigger value="daily" className="rounded-md px-6 py-2 font-medium text-xs data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500">
            Daily Log
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-md px-6 py-2 font-medium text-xs data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm text-zinc-500">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 animate-in fade-in duration-200">
          {/* Controls */}
          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg border border-zinc-200">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative">
                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                   <Input 
                     type="date" 
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="pl-9 w-44 text-sm border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400"
                   />
                 </div>
                 
                 <div className="h-8 w-px bg-zinc-200 mx-1 hidden md:block"></div>

                 <div className="flex gap-2">
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => handleMarkAll('present')}
                     className="h-9 text-xs font-medium border-zinc-200 hover:bg-zinc-900 hover:text-white hover:border-zinc-900"
                   >
                     All Present
                   </Button>
                   <Button 
                     variant="outline" 
                     size="sm"
                     onClick={() => handleMarkAll('absent')}
                     className="h-9 text-xs font-medium border-zinc-200 hover:bg-zinc-100"
                   >
                     All Absent
                   </Button>
                 </div>
               </div>

               <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <div className="relative w-full md:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <Input 
                      placeholder="Search student..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-9 text-sm border-zinc-200 bg-zinc-50 focus:bg-white"
                    />
                  </div>
                  <div className="text-right hidden md:block">
                     <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">Present</p>
                     <p className="text-lg font-semibold text-zinc-900">{stats.present}<span className="text-zinc-400 text-sm font-normal">/{stats.total}</span></p>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="h-10 px-6 rounded-lg bg-zinc-900 text-white font-medium text-xs hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save</span>}
                  </Button>
               </div>
             </div>
          </div>

          <AttendanceTable 
            students={filteredStudents}
            attendance={attendance}
            onStatusChange={handleStatusChange}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6 animate-in fade-in duration-200">
          {/* Date Range Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-lg border border-zinc-200">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500">Filter by date</span>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">From</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input 
                    type="date" 
                    value={historyFromDate}
                    onChange={(e) => setHistoryFromDate(e.target.value)}
                    className="pl-9 w-36 h-9 text-xs border-zinc-200"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">To</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input 
                    type="date" 
                    value={historyToDate}
                    onChange={(e) => setHistoryToDate(e.target.value)}
                    className="pl-9 w-36 h-9 text-xs border-zinc-200"
                  />
                </div>
              </div>
              
              {(historyFromDate || historyToDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetHistoryFilters}
                  className="h-9 text-xs text-zinc-500 hover:text-zinc-900"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Reset
                </Button>
              )}
            </div>
            
            <div className="text-right hidden md:block">
              <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">Records</p>
              <p className="text-lg font-semibold text-zinc-900">{filteredHistory.length}</p>
            </div>
          </div>

          {/* History List */}
          <Card className="border-none shadow-none bg-transparent">
             <div className="grid grid-cols-1 gap-3">
                {filteredHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Calendar className="w-10 h-10 text-zinc-200 mb-4" />
                    <p className="text-zinc-500 text-sm mb-1">No records found</p>
                    <p className="text-zinc-400 text-xs">Adjust the date range filter</p>
                  </div>
                ) : (
                  filteredHistory.map((record, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-4 bg-white rounded-lg border border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer">
                      <div className="flex items-center gap-5">
                         <div className="h-11 w-11 rounded-lg bg-zinc-100 flex flex-col items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                            <span className="text-[9px] font-medium uppercase">{new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span className="text-base font-semibold leading-none">{new Date(record.date).getDate()}</span>
                         </div>
                         
                         <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-zinc-900">Regular Session</span>
                              {record.status === 'completed' && <Badge className="bg-zinc-100 text-zinc-600 text-[9px] font-medium border-0">Completed</Badge>}
                            </div>
                            <p className="text-xs text-zinc-400">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })} • {batch.time.split('-')[0]}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-8">
                         <div className="flex flex-col items-center">
                            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400 mb-1">Present</span>
                            <span className="text-sm font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">{record.present}</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400 mb-1">Absent</span>
                            <span className="text-sm font-semibold text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded">{record.absent}</span>
                         </div>
                         <div className="flex flex-col items-center">
                            <span className="text-[9px] font-medium uppercase tracking-widest text-zinc-400 mb-1">Rate</span>
                            <span className="text-sm font-semibold text-zinc-900">{Math.round((record.present / record.total) * 100)}%</span>
                         </div>
                         <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                )}
             </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
