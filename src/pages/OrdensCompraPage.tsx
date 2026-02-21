import { useState } from "react";
import { FileText, Plus, Search, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockOCs, formatCurrency } from "@/data/mockData";

const OrdensCompraPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockOCs.filter(
    (oc) =>
      oc.numero_oc.toLowerCase().includes(search.toLowerCase()) ||
      oc.fornecedor.toLowerCase().includes(search.toLowerCase()) ||
      oc.obra_nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ordens de Compra</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockOCs.length} ordens</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importar PDF
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por OC, fornecedor ou obra..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-none shadow-sm"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((oc) => (
          <Card key={oc.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    oc.status === 'cancelada' ? 'bg-destructive/10' : 'bg-primary/10'
                  }`}>
                    <FileText className={`h-4 w-4 ${oc.status === 'cancelada' ? 'text-destructive' : 'text-primary'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{oc.numero_oc}</p>
                    <p className="text-xs text-muted-foreground">{oc.fornecedor}</p>
                  </div>
                </div>
                <Badge
                  variant={oc.status === 'ativa' ? 'default' : 'destructive'}
                  className={oc.status === 'ativa' ? 'bg-success/10 text-success border-none text-[10px]' : 'text-[10px]'}
                >
                  {oc.status === 'ativa' ? 'Ativa' : 'Cancelada'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  <span>{oc.obra_nome}</span>
                  <span className="mx-1">·</span>
                  <span>{oc.planilha_nome}</span>
                </div>
                <span className={`text-sm font-bold ${oc.status === 'cancelada' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {formatCurrency(oc.valor_total)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Emissão: {new Date(oc.data_emissao).toLocaleDateString('pt-BR')}
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

export default OrdensCompraPage;
