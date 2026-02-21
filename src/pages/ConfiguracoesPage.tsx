import { Building2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmpresa } from "@/data/mockData";

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Dados da empresa</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Building2 className="h-4 w-4 text-accent" />
            Empresa Executora
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Nome</p>
            <p className="text-sm font-medium text-foreground">{mockEmpresa.nome}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">CNPJ</p>
            <p className="text-sm font-medium text-foreground">{mockEmpresa.cnpj}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            Versão 1.0 — Marques Caetano Gestão de Obras
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;
