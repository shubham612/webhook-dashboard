interface StatusBadgeProps {
    status: string;
  }
  
  export default function StatusBadge({
    status,
  }: StatusBadgeProps) {
    const colorMap: Record<string, string> =
      {
        SUCCESS:
          "bg-green-100 text-green-700",
  
        FAILED:
          "bg-red-100 text-red-700",
  
        PENDING:
          "bg-yellow-100 text-yellow-700",
      };
  
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
      >
        {status}
      </span>
    );
  }