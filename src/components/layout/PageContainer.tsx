import type{ ReactNode } from "react";

interface Props {
  title: string;

  subtitle?: string;

  children: ReactNode;
}

export default function PageContainer({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}