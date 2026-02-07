import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  children,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between pb-4 border-b border-zinc-100", className)}>
      <div>
        <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-zinc-500 text-[13px] mt-0.5">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex flex-col h-[calc(100vh-120px)] space-y-4", className)}>
      {children}
    </div>
  );
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={cn("flex-1 min-h-0 overflow-hidden", className)}>
      {children}
    </div>
  );
}
