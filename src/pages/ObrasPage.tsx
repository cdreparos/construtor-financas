import { useState } from "react";
import { HardHat, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockObras, formatCurrency } from "@/data/mockData";

const ObrasPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockObras.filter(
    (o) =>
      o.nome.toLowerCase().includes(search.toLowerCase()) ||
      o.empresa_contratante_nome.toLowerCase().includes(search.toLowerCase()) ||
      o.numero_acao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Obras</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockObras.length} obras cadastradas</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, contratante ou ação..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-none shadow-sm"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((obra) => {
          const percentUsed = ((obra.saldo_inicial - obra.saldo_atual) / obra.saldo_inicial) * 100;
          return (
            <Card key={obra.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <HardHat className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{obra.nome}</p>
                      <p className="text-xs text-muted-foreground">{obra.empresa_contratante_nome}</p>
                    </div>
                  </div>
                  <Badge
                    variant={obra.status === 'ativa' ? 'default' : 'secondary'}
                    className={obra.status === 'ativa' ? 'bg-success/10 text-success border-none text-[10px]' : 'text-[10px]'}
                  >
                    {obra.status === 'ativa' ? 'Ativa' : 'Encerrada'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                  <span>Ação: {obra.numero_acao}</span>
                  <span className={`font-bold text-sm ${obra.saldo_atual < 50000 ? 'text-warning' : 'text-success'}`}>
                    {formatCurrency(obra.saldo_atual)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${percentUsed > 90 ? 'bg-destructive' : percentUsed > 70 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <button className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ObrasPage;
