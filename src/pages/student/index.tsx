import { useState } from "react";
import { Plus, Users, Layers, ShieldCheck } from "lucide-react";
import { StudentTable } from "./components/users/table";
import AddStudentModal, { type StudentFormData } from "./components/users/AddStudentModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatchManagement } from "./components/batches/BatchManagement";

export type StudentStatus = 'Active' | 'Warning' | 'Suspended';

export interface Student {
  id: string;
  name: string;
  email: string;
  initials: string;
  rank: string;
  courses: string[];
  status: StudentStatus;
}

const MOCK_DATA: Student[] = [
  {
    id: "#921-F88",
    name: "Jonathan Silver",
    email: "jon@lavender.com",
    initials: "JS",
    rank: "Pro Elite",
    courses: ["FX MASTERY", "CRYPTO LOGIC"],
    status: "Active",
  },
  {
    id: "#12A-744",
    name: "Sarah Raines",
    email: "sarah@lavender.com",
    initials: "SR",
    rank: "Intermediate",
    courses: ["OPTIONS BETA"],
    status: "Warning",
  },
  {
    id: "#77E-092",
    name: "Marcus Kael",
    email: "marcus@lavender.com",
    initials: "MK",
    rank: "Novice",
    courses: ["CHARTING 101", "PSYCHOLOGY"],
    status: "Active",
  }
];

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>(MOCK_DATA);

  const handleAddStudent = async (data: StudentFormData) => {
    console.log('Adding student:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStudent: Student = {
      id: `#${Math.random().toString(36).substring(2, 5).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: data.fullName,
      email: data.email,
      initials: data.fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
      rank: data.accessLevel === 'premium' ? 'Premium' : 'Standard',
      courses: [data.course.toUpperCase()],
      status: 'Active'
    };

    setStudents(prev => [newStudent, ...prev]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">

      <Tabs defaultValue="batches" className="w-full space-y-6">
        <div className="flex justify-center sticky top-4 z-30">
          <TabsList className="bg-white/90 backdrop-blur-xl p-1 gap-1 h-auto rounded-xl border border-slate-200 shadow-sm inline-flex items-center">
            <TabsTrigger 
              value="batches" 
              className="rounded-lg px-5 py-2 font-bold text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md border border-transparent transition-all duration-200 gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              Batch Protocols
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="rounded-lg px-5 py-2 font-bold text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md border border-transparent transition-all duration-200 gap-2"
            >
              <Users className="w-3.5 h-3.5" />
              User Identities
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="batches" className="mt-0 outline-none animate-in slide-in-from-bottom-2 duration-300">
          <BatchManagement />
        </TabsContent>

        <TabsContent value="users" className="mt-0 outline-none animate-in slide-in-from-bottom-2 duration-300 space-y-8">
          <div className="flex justify-between items-end mb-4">
             <div>
               <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Active Identities</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Monitoring access levels and performance metrics.</p>
             </div>
             <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold h-11 px-6 rounded-xl shadow-xl shadow-violet-200 transition-all active:scale-95 border-none text-[10px] tracking-widest uppercase gap-2.5"
                >
                <Plus className="w-4 h-4" />
                Enroll Identity
             </Button>
          </div>
          
          <StudentTable students={students} />

          <AddStudentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleAddStudent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
