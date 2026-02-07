import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

import { TableActions } from "./actions";
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
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
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

  return (
    <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50/80">
          <TableRow className="hover:bg-transparent border-zinc-100">
            <TableHead>Student</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow 
                key={student.id} 
                className="group border-zinc-100"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700 font-medium text-[11px]">
                      {student.initials}
                    </div>
                    <div>
                      <p className="text-zinc-900 font-medium text-[13px]">{student.name}</p>
                      <p className="text-zinc-400 text-[11px]">{student.id}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-zinc-600 font-medium text-[11px] uppercase tracking-wide">
                      {student.rank}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {student.courses.map((course) => (
                      <Badge 
                        key={course} 
                        variant="secondary" 
                        className="bg-zinc-100 text-zinc-600 border-transparent text-[10px] font-medium px-1.5 py-0"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={cn(getStatusStyles(student.status), "border rounded-md px-2 py-0.5 text-[10px] font-medium shadow-none")}>
                    {student.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <TableActions 
                    studentId={student.id}
                    onEdit={(id) => console.log('Edit', id)}
                    onQuickAction={(id) => console.log('Quick', id)}
                    onBlock={(id) => console.log('Block', id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}