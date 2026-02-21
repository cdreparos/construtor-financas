import { useState } from "react";
import { Users, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockFuncionarios, formatCurrency } from "@/data/mockData";

const tipoLabel: Record<string, string> = {
  mensalista: 'Mensalista',
  diarista: 'Diarista',
  empreita: 'Empreita',
};

const FuncionariosPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockFuncionarios.filter(
    (f) =>
      f.nome.toLowerCase().includes(search.toLowerCase()) ||
      f.funcao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Funcionários</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockFuncionarios.length} cadastrados</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou função..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-none shadow-sm"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((func) => (
          <Card key={func.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">
                      {func.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{func.nome}</p>
                    <p className="text-xs text-muted-foreground">{func.funcao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={func.ativo ? 'default' : 'secondary'}
                    className={func.ativo ? 'bg-success/10 text-success border-none text-[10px]' : 'text-[10px]'}
                  >
                    {func.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-medium">
                    {tipoLabel[func.tipo_contrato]}
                  </Badge>
                  {func.obra_alocada && (
                    <span className="text-muted-foreground">📍 {func.obra_alocada}</span>
                  )}
                </div>
                <span className="font-semibold text-foreground">
                  {formatCurrency(func.valor_base)}
                  {func.tipo_contrato === 'diarista' ? '/dia' : '/mês'}
                </span>
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

export default FuncionariosPage;
