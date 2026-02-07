import { useState } from 'react';
import { Check, XCircle, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Student {
  id: string;
  name: string;
  avatar?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late';

interface AttendanceTableProps {
  students: Student[];
  attendance: Record<string, AttendanceStatus>;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function AttendanceTable({ students, attendance, onStatusChange }: AttendanceTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pagination calculations
  const totalPages = Math.ceil(students.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStudents = students.slice(startIndex, endIndex);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="max-h-[480px] overflow-y-auto">
          <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="hover:bg-transparent border-zinc-200">
              <TableHead className="w-10 pl-3">#</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Student</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">ID</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Status</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-widest font-semibold text-zinc-500 pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map((student, index) => (
              <TableRow key={student.id} className="group border-zinc-100 hover:bg-zinc-50/50">
                <TableCell className="font-mono text-xs text-zinc-400 pl-4">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border transition-all ${
                       attendance[student.id] === 'present' ? 'border-zinc-300 bg-zinc-900 text-white' :
                       attendance[student.id] === 'absent' ? 'border-zinc-300 bg-white text-zinc-400' :
                       attendance[student.id] === 'late' ? 'border-zinc-300 bg-zinc-200 text-zinc-600' :
                       'border-zinc-200 bg-zinc-100 text-zinc-400'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {student.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                    {student.id}
                  </span>
                </TableCell>
                <TableCell>
                  {attendance[student.id] === 'present' && (
                    <Badge className="bg-zinc-900 text-white hover:bg-zinc-800 font-medium text-[10px] uppercase tracking-wider border-0">
                      Present
                    </Badge>
                  )}
                  {attendance[student.id] === 'absent' && (
                    <Badge className="bg-zinc-100 text-zinc-500 hover:bg-zinc-200 font-medium text-[10px] uppercase tracking-wider border border-zinc-200">
                      Absent
                    </Badge>
                  )}
                  {attendance[student.id] === 'late' && (
                    <Badge className="bg-zinc-200 text-zinc-700 hover:bg-zinc-300 font-medium text-[10px] uppercase tracking-wider border-0">
                      Late
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onStatusChange(student.id, 'present')}
                      className={`h-7 w-7 rounded flex items-center justify-center transition-all ${
                        attendance[student.id] === 'present' 
                          ? 'bg-zinc-900 text-white' 
                          : 'bg-white border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-900'
                      }`}
                      title="Mark Present"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onStatusChange(student.id, 'late')}
                      className={`h-7 w-7 rounded flex items-center justify-center transition-all ${
                        attendance[student.id] === 'late' 
                          ? 'bg-zinc-500 text-white' 
                          : 'bg-white border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-900'
                      }`}
                      title="Mark Late"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onStatusChange(student.id, 'absent')}
                      className={`h-7 w-7 rounded flex items-center justify-center transition-all ${
                        attendance[student.id] === 'absent' 
                          ? 'bg-zinc-300 text-zinc-700' 
                          : 'bg-white border border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-900'
                      }`}
                      title="Mark Absent"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginatedStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-8 h-8 text-zinc-300" />
                    <p className="text-zinc-500 text-sm">No students found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Pagination */}
      {students.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-500 text-xs">
              Showing <span className="text-zinc-900 font-medium">{startIndex + 1}</span> to{' '}
              <span className="text-zinc-900 font-medium">{Math.min(endIndex, students.length)}</span> of{' '}
              <span className="text-zinc-900 font-medium">{students.length}</span> students
            </span>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-xs">Rows:</span>
              <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-[70px] h-8 text-xs border-zinc-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={String(size)} className="text-xs">
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-7 w-7 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => goToPage(page)}
                  className={`h-7 w-7 text-[11px] font-medium ${
                    currentPage === page 
                      ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-1 text-zinc-400 text-xs">...</span>
              )
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-7 w-7 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
