import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableActions } from "./actions";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef, PaginationState, OnChangeFn } from "@tanstack/react-table";

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

interface StudentTableProps {
  students: any[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-zinc-900 text-white border-transparent";
    case "Warning":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-zinc-100 text-zinc-500 border-zinc-200";
  }
};

export function StudentTable({ students, pagination, onPaginationChange, pageCount }: StudentTableProps) {

  // Map API elements to Table Data format dynamically
  const mappedStudents = students.map((s: any) => ({
    id: s.id,
    name: `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'Unknown User',
    email: s.email,
    initials: (s.firstName?.[0] || '') + (s.lastName?.[0] || '') || 'U',
    rank: 'Standard',
    courses: s.courses?.map((c: any) => c.title || c) || [],
    status: s.status || 'Active'
  }));

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Student",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700 font-medium text-[11px]">
              {student.initials}
            </div>
            <div>
              <p className="text-zinc-900 font-medium text-[13px]">{student.name}</p>
              <p className="text-zinc-400 text-[11px]">{student.id.split('-')[0]}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-zinc-600 font-medium text-[11px] uppercase tracking-wide">
            {row.getValue("rank")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "courses",
      header: "Courses",
      cell: ({ row }) => {
        const courses = row.getValue("courses") as string[];
        if (!courses || courses.length === 0) return <span className="text-zinc-400 text-xs">No courses</span>;
        return (
          <div className="flex flex-wrap gap-1">
            {courses.slice(0, 2).map((course: string) => (
              <Badge 
                key={course} 
                variant="secondary" 
                className="bg-zinc-100 text-zinc-600 border-transparent text-[10px] font-medium px-1.5 py-0"
              >
                {course}
              </Badge>
            ))}
            {courses.length > 2 && (
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-transparent text-[10px] font-medium px-1.5 py-0">
                +{courses.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(getStatusStyles(status), "border rounded-md px-2 py-0.5 text-[10px] font-medium shadow-none")}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <TableActions 
            studentId={row.original.id}
            onEdit={(id) => console.log('Edit', id)}
            onQuickAction={(id) => console.log('Quick', id)}
            onBlock={(id) => console.log('Block', id)}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable 
      data={mappedStudents}
      columns={columns}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
}