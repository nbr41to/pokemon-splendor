import { cn } from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AffixBottom = ({ children, className }: Props) => {
  return (
    <div className="fixed bottom-16 left-0 w-full">
      <div className={cn('mx-auto', className)}>{children}</div>
    </div>
  );
};
