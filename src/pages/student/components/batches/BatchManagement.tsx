import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { BatchCard, type Batch } from './BatchCard';
import { CreateBatchModal, type BatchFormData } from './CreateBatchModal';
import { BatchAttendance } from './BatchAttendance';

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
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);
  
  const [viewMode, setViewMode] = useState<'list' | 'attendance'>('list');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const handleActionClick = (batch: Batch) => {
    if (batch.status === 'active') {
      setSelectedBatch(batch);
      setViewMode('attendance');
    } else {
      console.log('Verify roster for:', batch.name);
    }
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedBatch(null);
  };

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

  if (viewMode === 'attendance' && selectedBatch) {
    return <BatchAttendance batch={selectedBatch} onBack={handleBack} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Batches</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your training batches and attendance</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 h-10 rounded-lg font-medium text-xs gap-2"
        >
          <Plus className="w-4 h-4" />
          New Batch
        </Button>
      </div>

      {/* Batch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {batches.map(batch => (
          <BatchCard 
            key={batch.id} 
            batch={batch} 
            onActionClick={handleActionClick}
          />
        ))}
        
        {/* Quick Add Placeholder */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group min-h-[320px] border border-dashed border-zinc-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-zinc-400 hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-pointer"
        >
          <div className="h-14 w-14 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-all">
             <Plus className="w-6 h-6 group-hover:text-zinc-600" />
          </div>
          <div className="text-center space-y-1">
            <span className="block text-xs font-medium group-hover:text-zinc-600">Add Batch</span>
            <p className="text-[10px] text-zinc-400 max-w-[140px]">Create a new training batch</p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-8 border-t border-zinc-100">
        <p className="text-xs text-zinc-500">Showing {batches.length} batches</p>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-lg h-9 border-zinc-200 px-4 text-xs text-zinc-500 disabled:opacity-40" disabled>
            Previous
          </Button>
          <Button variant="outline" className="rounded-lg h-9 border-zinc-200 px-4 text-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
            Next
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
