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
  onActionClick?: (batch: Batch) => void;
}

export function BatchCard({ batch, onActionClick }: BatchCardProps) {
  const statusStyles = {
    active: 'bg-zinc-900 text-white border-zinc-900',
    upcoming: 'bg-zinc-100 text-zinc-600 border-zinc-200'
  };

  const progress = (batch.students / batch.capacity) * 100;

  return (
    <Card className="rounded-lg border-zinc-200 bg-white overflow-hidden group hover:border-zinc-300 transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <Badge className={cn("rounded px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider border", statusStyles[batch.status])}>
            {batch.status}
          </Badge>
          <button className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 mb-5">
          <h3 className="text-base font-semibold text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">
            {batch.name}
          </h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none">
            {batch.course} • {batch.level}
          </p>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2.5 text-xs text-zinc-600">
            <div className="h-7 w-7 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-400">
               <Clock className="w-3.5 h-3.5" />
            </div>
            <span>{batch.time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-600">
            <div className="h-7 w-7 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-400">
               <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>{batch.days}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-600">
            <div className="h-7 w-7 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-400">
               <Users className="w-3.5 h-3.5" />
            </div>
            <span className="tabular-nums">{batch.students} / {batch.capacity} enrolled</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-5">
          <div className="flex justify-between items-end text-[10px] text-zinc-500">
             <span>Capacity</span>
             <span className="text-zinc-900 font-medium tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-lg h-9 border-zinc-200 text-xs font-medium hover:bg-zinc-100 hover:text-zinc-900">
            Manage
          </Button>
          <Button 
            onClick={() => onActionClick?.(batch)}
            className="flex-1 rounded-lg h-9 bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800"
          >
            {batch.actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
