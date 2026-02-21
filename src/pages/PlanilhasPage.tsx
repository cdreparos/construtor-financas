import { useState } from "react";
import { ClipboardList, Plus, Search, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockPlanilhas, formatCurrency } from "@/data/mockData";

const PlanilhasPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockPlanilhas.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.obra_nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Planilhas</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockPlanilhas.length} planilhas cadastradas</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou obra..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-none shadow-sm"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((planilha) => (
          <Card
            key={planilha.id}
            className={`border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              planilha.saldo_atual < 0 ? 'ring-1 ring-destructive/30' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    planilha.saldo_atual < 0 ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    {planilha.saldo_atual < 0 ? (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    ) : (
                      <ClipboardList className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{planilha.nome}</p>
                    <p className="text-xs text-muted-foreground">{planilha.obra_nome}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${planilha.saldo_atual < 0 ? 'text-destructive' : 'text-success'}`}>
                    {formatCurrency(planilha.saldo_atual)}
                  </p>
                  <p className="text-xs text-muted-foreground">de {formatCurrency(planilha.saldo_inicial)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <button className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PlanilhasPage;
