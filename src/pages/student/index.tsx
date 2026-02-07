import { useState } from "react";
import { Plus, Users, Layers } from "lucide-react";
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
    <div className="max-w-7xl mx-auto space-y-5 animate-in fade-in duration-300">

      <Tabs defaultValue="batches" className="w-full space-y-5">
        <div className="flex justify-center sticky top-4 z-30">
          <TabsList className="bg-white p-0.5 gap-0.5 h-auto rounded-md border border-zinc-200 inline-flex items-center">
            <TabsTrigger 
              value="batches" 
              className="rounded px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white transition-all gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              Batches
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="rounded px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white transition-all gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              Students
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="batches" className="mt-0 outline-none animate-in fade-in duration-200">
          <BatchManagement />
        </TabsContent>

        <TabsContent value="users" className="mt-0 outline-none animate-in fade-in duration-200 space-y-5">
          <div className="flex justify-between items-center">
             <div>
               <h2 className="text-xl font-semibold text-zinc-900">Students</h2>
               <p className="text-[13px] text-zinc-500 mt-0.5">Manage student enrollments and access</p>
             </div>
             <Button 
                onClick={() => setIsModalOpen(true)}
                className="gap-1.5"
                >
                <Plus className="w-4 h-4" />
                Add Student
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
