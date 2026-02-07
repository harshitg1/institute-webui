import { useState } from "react";
import { Plus, Users, Layers } from "lucide-react";
import { StudentTable } from "./components/users/table";
import AddStudentModal, { type StudentFormData } from "./components/users/AddStudentModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatchManagement } from "./components/batches/BatchManagement";
import { PageHeader, PageContainer, PageContent } from "@/components/ui/page-header";

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
    <PageContainer>
      {/* Main Page Header */}
      <PageHeader 
        title="Student Management" 
        description="Manage batches, enrollments and student access"
      />

      {/* Tabs Section */}
      <Tabs defaultValue="batches" className="flex flex-col flex-1 min-h-0 mt-4">
        {/* Tab Navigation */}
        <TabsList className="bg-white p-0.5 gap-0.5 h-auto rounded-md border border-zinc-200 w-fit">
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

        {/* Batches Tab */}
        <TabsContent value="batches" className="flex-1 min-h-0 mt-4 outline-none">
          <BatchManagement />
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="users" className="flex-1 min-h-0 mt-4 outline-none flex flex-col">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-[15px] font-medium text-zinc-900">Students</h2>
              <p className="text-zinc-500 text-[12px] mt-0.5">View and manage individual students</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </div>
          
          <PageContent>
            <div className="h-full overflow-y-auto rounded-lg border border-zinc-200 bg-white">
              <StudentTable students={students} />
            </div>
          </PageContent>

          <AddStudentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={handleAddStudent}
          />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
