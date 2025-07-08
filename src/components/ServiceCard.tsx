import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, ServiceStatus } from "./StatusBadge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
}

interface ServiceCardProps {
  title: string;
  status: ServiceStatus;
  icon: LucideIcon;
  description: string;
  metrics: Metric[];
  lastChecked: string;
  className?: string;
}

export function ServiceCard({
  title,
  status,
  icon: Icon,
  description,
  metrics,
  lastChecked,
  className
}: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1",
        "border-border/50 bg-card/80 backdrop-blur-sm",
        status === "online" && "border-status-online/30 hover:shadow-success",
        status === "warning" && "border-status-warning/30 hover:shadow-warning",
        status === "offline" && "border-status-offline/30 hover:shadow-danger",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className={cn(
                "p-2 rounded-lg transition-colors",
                status === "online" && "bg-status-online/20 text-status-online",
                status === "warning" && "bg-status-warning/20 text-status-warning",
                status === "offline" && "bg-status-offline/20 text-status-offline",
                status === "loading" && "bg-status-loading/20 text-status-loading"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">
                {metric.label}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono font-semibold">
                  {metric.value}
                </p>
                {metric.trend && (
                  <div 
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      metric.trend === "up" && "bg-status-online",
                      metric.trend === "down" && "bg-status-offline",
                      metric.trend === "stable" && "bg-status-warning"
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground border-t border-border/50 pt-3">
          Última verificación: {lastChecked}
        </div>
      </CardContent>
    </Card>
  );
}