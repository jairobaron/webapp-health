import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Server, AlertTriangle, CheckCircle } from "lucide-react";

interface SystemOverviewProps {
  totalServices: number;
  onlineServices: number;
  warningServices: number;
  offlineServices: number;
  systemHealth: number;
}

export function SystemOverview({
  totalServices,
  onlineServices,
  warningServices,
  offlineServices,
  systemHealth
}: SystemOverviewProps) {
  const healthColor = systemHealth >= 80 ? "success" : systemHealth >= 60 ? "warning" : "danger";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Servicios Totales</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalServices}</div>
          <p className="text-xs text-muted-foreground">
            Sistema de microservicios
          </p>
        </CardContent>
      </Card>

      <Card className="border-status-online/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Servicios Online</CardTitle>
          <CheckCircle className="h-4 w-4 text-status-online" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-status-online">{onlineServices}</div>
          <p className="text-xs text-muted-foreground">
            Funcionando correctamente
          </p>
        </CardContent>
      </Card>

      <Card className="border-status-warning/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Advertencias</CardTitle>
          <AlertTriangle className="h-4 w-4 text-status-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-status-warning">{warningServices}</div>
          <p className="text-xs text-muted-foreground">
            Requieren atención
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Salud del Sistema</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{systemHealth}%</div>
          <Progress 
            value={systemHealth} 
            className={`h-2 ${
              healthColor === "success" ? "[&>div]:bg-gradient-success" :
              healthColor === "warning" ? "[&>div]:bg-gradient-warning" :
              "[&>div]:bg-gradient-danger"
            }`}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Estado general del sistema
          </p>
        </CardContent>
      </Card>
    </div>
  );
}