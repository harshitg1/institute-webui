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
        return "bg-vibrant-teal/10 text-vibrant-teal border-vibrant-teal/20";
      case "Warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/60 backdrop-blur-xl overflow-hidden shadow-xl shadow-slate-200/40">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="px-8 h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Student Identity</TableHead>
            <TableHead className="px-8 h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Trading Rank</TableHead>
            <TableHead className="px-8 h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Courses</TableHead>
            <TableHead className="px-8 h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Status</TableHead>
            <TableHead className="px-8 h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-right">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow 
              key={student.id} 
              className="group border-slate-100 transition-all hover:bg-slate-50/50"
            >
              <TableCell className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 font-bold text-sm shadow-sm ring-1 ring-slate-100">
                    {student.initials}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">{student.name}</p>
                    <p className="text-slate-400 text-xs font-semibold">ID: {student.id}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-8 py-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <span className="text-amber-700 font-bold text-[10px] uppercase tracking-wide">
                    {student.rank}
                  </span>
                </div>
              </TableCell>

              <TableCell className="px-8 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {student.courses.map((course) => (
                    <Badge 
                      key={course} 
                      variant="secondary" 
                      className="bg-slate-100 text-slate-700 border-none text-[9px] font-bold px-2 py-0.5"
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell className="px-8 py-4">
                <Badge className={cn(getStatusStyles(student.status), "border rounded-full px-2.5 py-0.5 text-[9px] font-bold shadow-none")}>
                  {student.status.toUpperCase()}
                </Badge>
              </TableCell>

              <TableCell className="px-8 py-4">
                <TableActions 
                  studentId={student.id}
                  onEdit={(id) => console.log('Edit', id)}
                  onQuickAction={(id) => console.log('Quick', id)}
                  onBlock={(id) => console.log('Block', id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}