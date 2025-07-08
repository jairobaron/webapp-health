import { Button } from "@/components/ui/button";
import { RefreshCw, Settings, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
  activeAlerts: number;
}

export function DashboardHeader({
  onRefresh,
  isRefreshing,
  lastUpdated,
  activeAlerts
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard de Salud del Sistema
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitoreo en tiempo real de servicios críticos
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          {activeAlerts > 0 && (
            <Badge variant="destructive" className="text-xs">
              {activeAlerts}
            </Badge>
          )}
        </div>
        
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configurar
        </Button>
        
        <Button 
          onClick={onRefresh}
          disabled={isRefreshing}
          size="sm"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          <RefreshCw 
            className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
          Actualizar
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground sm:absolute sm:top-4 sm:right-4">
        Última actualización: {lastUpdated}
      </div>
    </div>
  );
}