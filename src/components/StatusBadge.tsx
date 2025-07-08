import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ServiceStatus = "online" | "offline" | "warning" | "loading";

interface StatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const statusConfig = {
  online: {
    label: "Online",
    className: "bg-status-online text-status-online-foreground shadow-success border-status-online/20",
  },
  offline: {
    label: "Offline",
    className: "bg-status-offline text-status-offline-foreground shadow-danger border-status-offline/20",
  },
  warning: {
    label: "Warning",
    className: "bg-status-warning text-status-warning-foreground shadow-warning border-status-warning/20",
  },
  loading: {
    label: "Loading",
    className: "bg-status-loading text-status-loading-foreground shadow-glow border-status-loading/20 animate-pulse",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium transition-all duration-300 shadow-md",
        config.className,
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        <div 
          className={cn(
            "w-2 h-2 rounded-full",
            status === "online" && "bg-status-online-foreground",
            status === "offline" && "bg-status-offline-foreground",
            status === "warning" && "bg-status-warning-foreground",
            status === "loading" && "bg-status-loading-foreground animate-pulse"
          )}
        />
        {config.label}
      </div>
    </Badge>
  );
}