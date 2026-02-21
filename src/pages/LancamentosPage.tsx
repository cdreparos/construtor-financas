import { useState } from "react";
import { DollarSign, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockLancamentos, formatCurrency } from "@/data/mockData";

const origemLabel: Record<string, string> = {
  manual: 'Manual',
  funcionarios: 'Funcionários',
  ordem_compra: 'OC',
  repasse: 'Repasse',
};

const LancamentosPage = () => {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');

  const filtered = mockLancamentos
    .filter(
      (l) =>
        l.descricao.toLowerCase().includes(search.toLowerCase()) ||
        l.obra_nome.toLowerCase().includes(search.toLowerCase()) ||
        l.categoria.toLowerCase().includes(search.toLowerCase())
    )
    .filter((l) => filterTipo === 'todos' || l.tipo === filterTipo)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lançamentos</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockLancamentos.length} lançamentos</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar lançamento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-none shadow-sm"
        />
      </div>

      <div className="flex gap-2">
        {(['todos', 'receita', 'despesa'] as const).map((tipo) => (
          <Button
            key={tipo}
            size="sm"
            variant={filterTipo === tipo ? 'default' : 'outline'}
            onClick={() => setFilterTipo(tipo)}
            className="text-xs capitalize"
          >
            {tipo === 'todos' ? 'Todos' : tipo === 'receita' ? 'Receitas' : 'Despesas'}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((lancamento) => (
          <Card key={lancamento.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{lancamento.descricao}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{lancamento.obra_nome}</span>
                    {lancamento.planilha_nome && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{lancamento.planilha_nome}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p
                    className={`text-sm font-bold ${
                      lancamento.status === 'estornado'
                        ? 'text-muted-foreground line-through'
                        : lancamento.tipo === 'receita'
                        ? 'text-success'
                        : 'text-foreground'
                    }`}
                  >
                    {lancamento.tipo === 'receita' ? '+' : '-'}{formatCurrency(lancamento.valor)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-[10px]">{lancamento.categoria}</Badge>
                <Badge variant="outline" className="text-[10px]">{origemLabel[lancamento.origem]}</Badge>
                <Badge variant="outline" className="text-[10px]">{lancamento.forma_pagamento}</Badge>
                {lancamento.status === 'estornado' && (
                  <Badge variant="destructive" className="text-[10px]">Estornado</Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                {new Date(lancamento.created_at).toLocaleDateString('pt-BR')}
              </p>
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

export default LancamentosPage;
