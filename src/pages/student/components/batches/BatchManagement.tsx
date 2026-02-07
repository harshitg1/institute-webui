import { useState } from 'react';
import { Plus, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BatchCard, type Batch } from './BatchCard';
import { CreateBatchModal, type BatchFormData } from './CreateBatchModal';

const MOCK_BATCHES: Batch[] = [
  {
    id: '1',
    name: 'Web Dev Alpha',
    course: 'Full Stack Development',
    level: 'L1: Core',
    time: '09:00 AM - 12:00 PM',
    days: 'Mon, Wed, Fri',
    students: 24,
    capacity: 30,
    status: 'active',
    actionLabel: 'LOG ATTENDANCE',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Data Science Beta',
    course: 'AI & Machine Learning',
    level: 'L3: ADV',
    time: '02:00 PM - 05:00 PM',
    days: 'Tue, Thu, Sat',
    students: 12,
    capacity: 20,
    status: 'upcoming',
    actionLabel: 'VERIFY ROSTER',
    color: 'amber'
  },
  {
    id: '3',
    name: 'UI/UX Design Night',
    course: 'Product Design',
    level: 'L1: Core',
    time: '07:00 PM - 09:00 PM',
    days: 'Mon, Tue, Wed, Thu',
    students: 18,
    capacity: 18,
    status: 'active',
    actionLabel: 'LOG ATTENDANCE',
    color: 'blue'
  }
];

export function BatchManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);

  const handleCreateBatch = (data: BatchFormData) => {
    const newBatch: Batch = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.batchName,
      course: data.courseCategory === 'technical' ? 'Technical Analysis' : 'Advanced Trading',
      level: 'L1: INIT',
      time: `${data.startTime} - ${data.endTime}`,
      days: data.scheduleDays.join(', '),
      students: 0,
      capacity: parseInt(data.maxCapacity) || 30,
      status: 'upcoming',
      actionLabel: 'VERIFY ROSTER',
      color: 'amber'
    };
    setBatches(prev => [newBatch, ...prev]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex justify-between md:items-end  p-6">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 bg-slate-900 hover:bg-black text-white px-6 h-11 rounded-xl shadow-lg shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] border-none font-bold text-[10px] uppercase tracking-widest gap-2"
        >
          <Plus className="w-4 h-4" />
          Initialize New Batch
        </Button>
      </div>

      {/* Control Bar */}
    

      {/* Batch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {batches.map(batch => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
        
        {/* Placeholder for Quick Add */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group min-h-[400px] border-2 border-dashed border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 text-slate-300 hover:border-violet-200 hover:bg-violet-50/30 transition-all cursor-pointer"
        >
          <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-violet-200/50">
             <Plus className="w-10 h-10 group-hover:text-violet-600" />
          </div>
          <div className="text-center space-y-2">
            <span className="block text-xs font-bold uppercase tracking-widest group-hover:text-violet-600">Initialize Node</span>
            <p className="text-[10px] font-semibold text-slate-400 max-w-[160px]">Create an empty placeholder in the structural hierarchy.</p>
          </div>
        </div>
      </div>

      {/* Pagination Protocol */}
      <div className="flex items-center justify-between pt-10 border-t border-slate-100">
        <div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visibility: {batches.length} of 12 Operational Nodes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-10 border-slate-100 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 transition-all disabled:opacity-30" disabled>
            Previous Cycle
          </Button>
          <Button variant="outline" className="rounded-xl h-10 border-slate-100 px-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            Next Cycle
          </Button>
        </div>
      </div>

      <CreateBatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBatch}
      />
    </div>
  );
}
