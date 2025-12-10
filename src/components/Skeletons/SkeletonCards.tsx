'use client';

const SkeletonBlock = ({
  className,
}: {
  className?: string;
}) => (
  <div
    className={`animate-pulse rounded-lg bg-white/20 ${className ?? ""}`}
    aria-hidden="true"
  />
);

export function WeatherSkeleton() {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-inner min-h-[320px]">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="space-y-2 flex-1">
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="h-4 w-32" />
        </div>
        <SkeletonBlock className="h-20 w-20 rounded-full" />
      </div>

      <div className="mb-6 space-y-2">
        <SkeletonBlock className="h-12 w-32" />
        <SkeletonBlock className="h-4 w-28" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white/10 rounded-lg p-3 space-y-3"
          >
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ForecastSkeleton() {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-inner min-h-[280px]">
      <SkeletonBlock className="h-5 w-32 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between bg-white/10 rounded-lg p-3"
          >
            <div className="space-y-2 w-1/3">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-3 w-1/3 justify-center">
              <SkeletonBlock className="h-10 w-10 rounded-full" />
              <SkeletonBlock className="h-4 w-16" />
            </div>
            <div className="w-1/3 space-y-2 text-right">
              <SkeletonBlock className="h-5 w-10 ml-auto" />
              <SkeletonBlock className="h-3 w-6 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

