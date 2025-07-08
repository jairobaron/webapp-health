import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SystemOverview } from "@/components/SystemOverview";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceStatus } from "@/components/StatusBadge";
import { Database, Router, Container, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceData {
  id: string;
  title: string;
  status: ServiceStatus;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
    trend?: "up" | "down" | "stable";
  }>;
  lastChecked: string;
}

const Index = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  
  // Simulación de datos de servicios
  const [services, setServices] = useState<ServiceData[]>([
    {
      id: "postgresql",
      title: "PostgreSQL",
      status: "online",
      description: "Base de datos principal del sistema",
      metrics: [
        { label: "Conexiones", value: "45/100", trend: "stable" },
        { label: "Tiempo respuesta", value: "12ms", trend: "up" },
        { label: "CPU", value: "23%", trend: "stable" },
        { label: "Memoria", value: "1.2GB", trend: "up" }
      ],
      lastChecked: "hace 30 segundos"
    },
    {
      id: "opc-router",
      title: "OPC Router",
      status: "warning",
      description: "Servidor de adquisición de datos industriales",
      metrics: [
        { label: "Tags activos", value: "1,247", trend: "stable" },
        { label: "Tasa de error", value: "0.3%", trend: "down" },
        { label: "Throughput", value: "850/s", trend: "stable" },
        { label: "Buffer", value: "78%", trend: "up" }
      ],
      lastChecked: "hace 1 minuto"
    },
    {
      id: "docker-services",
      title: "Docker Microservicios",
      status: "online",
      description: "Contenedores de aplicaciones en Docker",
      metrics: [
        { label: "Contenedores", value: "12/15", trend: "stable" },
        { label: "CPU Total", value: "45%", trend: "stable" },
        { label: "RAM Total", value: "8.2GB", trend: "up" },
        { label: "Uptime", value: "99.9%", trend: "up" }
      ],
      lastChecked: "hace 15 segundos"
    },
    {
      id: "kafka",
      title: "Apache Kafka",
      status: "online",
      description: "Plataforma de streaming de eventos",
      metrics: [
        { label: "Topics", value: "24", trend: "stable" },
        { label: "Mensajes/seg", value: "2.3K", trend: "up" },
        { label: "Lag consumer", value: "0ms", trend: "stable" },
        { label: "Particiones", value: "96", trend: "stable" }
      ],
      lastChecked: "hace 45 segundos"
    }
  ]);

  const serviceIcons = {
    "postgresql": Database,
    "opc-router": Router,
    "docker-services": Container,
    "kafka": Zap
  };

  // Cálculos de estado del sistema
  const totalServices = services.length;
  const onlineServices = services.filter(s => s.status === "online").length;
  const warningServices = services.filter(s => s.status === "warning").length;
  const offlineServices = services.filter(s => s.status === "offline").length;
  const activeAlerts = warningServices + offlineServices;
  const systemHealth = Math.round((onlineServices / totalServices) * 100);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simular actualización de datos
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular cambios aleatorios en el estado
    setServices(currentServices => 
      currentServices.map(service => {
        const random = Math.random();
        let newStatus: ServiceStatus = service.status;
        
        // Pequeña probabilidad de cambio de estado
        if (random < 0.1) {
          const statuses: ServiceStatus[] = ["online", "warning", "offline"];
          newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        }
        
        return {
          ...service,
          status: newStatus,
          lastChecked: "hace unos segundos"
        };
      })
    );
    
    setLastUpdated(new Date().toLocaleTimeString());
    setIsRefreshing(false);
    
    toast({
      title: "Dashboard actualizado",
      description: "Los datos del sistema han sido refrescados",
    });
  };

  // Auto-refresh cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <DashboardHeader
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          activeAlerts={activeAlerts}
        />

        <SystemOverview
          totalServices={totalServices}
          onlineServices={onlineServices}
          warningServices={warningServices}
          offlineServices={offlineServices}
          systemHealth={systemHealth}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              status={service.status}
              icon={serviceIcons[service.id as keyof typeof serviceIcons]}
              description={service.description}
              metrics={service.metrics}
              lastChecked={service.lastChecked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
