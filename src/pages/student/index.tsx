import { useState } from "react";
import { Plus, Users, Layers } from "lucide-react";
import { StudentTable } from "./components/users/table";
import AddStudentModal, { type StudentFormData } from "./components/users/AddStudentModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatchManagement } from "./components/batches/BatchManagement";
import { PageHeader, PageContainer, PageContent } from "@/components/ui/page-header";
import { useGetStudentsQuery, useCreateStudentMutation } from "@/api/apiSlice";
import type { PaginationState } from "@tanstack/react-table";

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const { data: response, isLoading } = useGetStudentsQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize
  });
  
  const students = response?.data || [];
  const pageCount = (response as any)?.totalPages || 1; // Fallback since ApiResponse might not have totalPages if it's not a Page

  const [createStudent] = useCreateStudentMutation();

  const handleAddStudent = async (data: StudentFormData) => {
    try {
      const names = data.fullName.split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      await createStudent({
        email: data.email,
        firstName: firstName || 'Unknown',
        lastName: lastName || '',
        courseIds: data.course ? [data.course] : []
        // Optional: Add batchId if provided
      }).unwrap();
      
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create student", err);
      alert("Failed to create student.");
    }
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
        <TabsList className="bg-slate-100 p-1 gap-1 h-auto rounded-xl w-fit">
          <TabsTrigger 
            value="batches" 
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            Batches
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all gap-1.5"
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
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 rounded-xl text-sm">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </div>
          
          <PageContent>
            <div className="h-full overflow-y-auto rounded-xl border border-slate-200 bg-white">
              {isLoading ? (
                <div className="p-8 text-center text-zinc-500">Loading students...</div>
              ) : (
                <StudentTable 
                  students={students} 
                  pagination={pagination}
                  onPaginationChange={setPagination}
                  pageCount={pageCount}
                />
              )}
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
