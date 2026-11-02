import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse skeleton-shimmer rounded-md bg-slate-200/80 dark:bg-slate-800/80 ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0c1220] p-6 space-y-4">
      <Skeleton className="h-44 w-full rounded-xl" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>
    </div>
  );
}
