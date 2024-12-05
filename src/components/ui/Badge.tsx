import { cn } from '../../lib/utils';

interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className }: BadgeProps) {
  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1',
        'flex items-center justify-center',
        'bg-red-500 text-white text-xs font-medium',
        'rounded-full',
        className
      )}
    >
      {count}
    </div>
  );
}