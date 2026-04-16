export function DinnerCardSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Host row */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-12 h-12 rounded-full bg-secondary flex-shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-secondary rounded w-24" />
          <div className="h-3 bg-secondary rounded w-16" />
        </div>
      </div>

      {/* Interest tags */}
      <div className="flex gap-1.5">
        <div className="h-5 bg-secondary rounded-full w-16" />
        <div className="h-5 bg-secondary rounded-full w-20" />
        <div className="h-5 bg-secondary rounded-full w-14" />
      </div>

      {/* Image */}
      <div className="aspect-[4/3] rounded-lg bg-secondary" />

      {/* Text lines */}
      <div className="h-4 bg-secondary rounded w-full" />
      <div className="h-3 bg-secondary rounded w-3/4" />

      {/* Footer */}
      <div className="flex justify-between pt-2 border-t border-border/30">
        <div className="h-3 bg-secondary rounded w-20" />
        <div className="h-3 bg-secondary rounded w-16" />
      </div>
    </div>
  );
}
