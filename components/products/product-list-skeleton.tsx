import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="group relative overflow-hidden rounded-lg border bg-card">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/3" />
              <div className="mt-2 flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}