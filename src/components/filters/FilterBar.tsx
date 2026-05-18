import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function FilterBar({
  children,
}: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {children}
    </div>
  );
}