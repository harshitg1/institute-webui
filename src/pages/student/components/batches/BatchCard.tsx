import { MoreVertical, Clock, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Batch {
  id: string;
  name: string;
  course: string;
  level: string;
  time: string;
  days: string;
  students: number;
  capacity: number;
  status: 'active' | 'upcoming';
  actionLabel: string;
  color: string;
}

interface BatchCardProps {
  batch: Batch;
}

export function BatchCard({ batch }: BatchCardProps) {
  const statusStyles = {
    active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    upcoming: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  const progress = (batch.students / batch.capacity) * 100;

  return (
    <Card className="rounded-xl border-slate-100 bg-white shadow-lg shadow-slate-200/40 overflow-hidden group hover:border-violet-200 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <Badge className={cn("rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border", statusStyles[batch.status])}>
            {batch.status}
          </Badge>
          <button className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 mb-5">
          <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-violet-600 transition-colors uppercase">
            {batch.name}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            {batch.course} • {batch.level}
          </p>
        </div>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600">
            <div className="h-7 w-7 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
               <Clock className="w-3.5 h-3.5" />
            </div>
            <span>{batch.time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600">
            <div className="h-7 w-7 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
               <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>{batch.days}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-600">
            <div className="h-7 w-7 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
               <Users className="w-3.5 h-3.5" />
            </div>
            <span className="tabular-nums">{batch.students} / {batch.capacity} Members Joined</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex justify-between items-end">
             <span>Protocol Load</span>
             <span className="text-slate-900 tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", 
                 batch.status === 'active' ? "bg-violet-600" : "bg-amber-500"
              )}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-lg h-9 border-slate-100 text-[9px] font-bold uppercase tracking-widest hover:bg-slate-50">
            Manage
          </Button>
          <Button className="flex-1 rounded-lg h-9 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest shadow-md shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
            {batch.actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
