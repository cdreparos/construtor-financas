import { HardHat, ClipboardList, Users, TrendingDown, TrendingUp, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockObras, mockPlanilhas, mockLancamentos, mockFuncionarios, formatCurrency } from "@/data/mockData";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalObrasAtivas = mockObras.filter(o => o.status === 'ativa').length;
  const totalFuncionariosAtivos = mockFuncionarios.filter(f => f.ativo).length;
  const planilhasNegativas = mockPlanilhas.filter(p => p.saldo_atual < 0);
  const totalSaldoObras = mockObras.reduce((acc, o) => acc + o.saldo_atual, 0);

  const folhaMes = mockLancamentos
    .filter(l => l.origem === 'funcionarios' && l.status === 'ativo')
    .reduce((acc, l) => acc + l.valor, 0);

  const ultimosLancamentos = [...mockLancamentos]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral financeira</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <HardHat className="h-4 w-4" />
              <span className="text-xs font-medium">Obras Ativas</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalObrasAtivas}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Funcionários</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalFuncionariosAtivos}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs font-medium">Saldo Total</span>
            </div>
            <p className={`text-lg font-bold ${totalSaldoObras >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(totalSaldoObras)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingDown className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium">Folha/Mês</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(folhaMes)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas - Planilhas Negativas */}
      {planilhasNegativas.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Planilhas com Saldo Negativo
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {planilhasNegativas.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.nome}</p>
                  <p className="text-xs text-muted-foreground">{p.obra_nome}</p>
                </div>
                <span className="text-sm font-bold text-destructive">{formatCurrency(p.saldo_atual)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Saldo por Obra */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Saldo por Obra</h2>
          <Link to="/obras" className="text-xs text-accent font-medium flex items-center gap-1 hover:underline">
            Ver todas <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {mockObras.filter(o => o.status === 'ativa').map((obra) => {
            const percentUsed = ((obra.saldo_inicial - obra.saldo_atual) / obra.saldo_inicial) * 100;
            return (
              <Card key={obra.id} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{obra.nome}</p>
                      <p className="text-xs text-muted-foreground">{obra.empresa_contratante_nome}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${obra.saldo_atual < 50000 ? 'text-warning' : 'text-success'}`}>
                        {formatCurrency(obra.saldo_atual)}
                      </p>
                      <p className="text-xs text-muted-foreground">de {formatCurrency(obra.saldo_inicial)}</p>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${percentUsed > 90 ? 'bg-destructive' : percentUsed > 70 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${Math.min(percentUsed, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Últimos Lançamentos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Últimos Lançamentos</h2>
          <Link to="/lancamentos" className="text-xs text-accent font-medium flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            {ultimosLancamentos.map((lancamento, idx) => (
              <div
                key={lancamento.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  idx !== ultimosLancamentos.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{lancamento.descricao}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{lancamento.obra_nome}</span>
                    {lancamento.status === 'estornado' && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                        Estornado
                      </Badge>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold whitespace-nowrap ml-3 ${
                    lancamento.status === 'estornado'
                      ? 'text-muted-foreground line-through'
                      : lancamento.tipo === 'receita'
                      ? 'text-success'
                      : 'text-foreground'
                  }`}
                >
                  {lancamento.tipo === 'receita' ? '+' : '-'}{formatCurrency(lancamento.valor)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* FAB */}
      <Link
        to="/lancamentos?novo=true"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Dashboard;
