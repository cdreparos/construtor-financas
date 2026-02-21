// Mock data for the construction management system

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
}

export interface EmpresaContratante {
  id: string;
  empresa_id: string;
  nome: string;
  cnpj: string;
}

export interface Obra {
  id: string;
  empresa_id: string;
  empresa_contratante_id: string;
  empresa_contratante_nome: string;
  nome: string;
  numero_acao: string;
  saldo_inicial: number;
  saldo_atual: number;
  status: 'ativa' | 'encerrada';
}

export interface Planilha {
  id: string;
  empresa_id: string;
  obra_id: string;
  obra_nome: string;
  nome: string;
  saldo_inicial: number;
  saldo_atual: number;
  status: 'ativa' | 'encerrada';
}

export interface Funcionario {
  id: string;
  empresa_id: string;
  nome: string;
  funcao: string;
  tipo_contrato: 'mensalista' | 'diarista' | 'empreita';
  valor_base: number;
  ativo: boolean;
  obra_alocada?: string;
}

export interface OrdemCompra {
  id: string;
  empresa_id: string;
  obra_id: string;
  obra_nome: string;
  planilha_id: string;
  planilha_nome: string;
  numero_oc: string;
  numero_acao: string;
  fornecedor: string;
  cnpj_fornecedor: string;
  valor_total: number;
  data_emissao: string;
  status: 'ativa' | 'cancelada';
}

export interface LancamentoFinanceiro {
  id: string;
  empresa_id: string;
  obra_id: string;
  obra_nome: string;
  planilha_id?: string;
  planilha_nome?: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  valor: number;
  forma_pagamento: string;
  descricao: string;
  origem: 'manual' | 'funcionarios' | 'ordem_compra' | 'repasse';
  status: 'ativo' | 'estornado';
  created_at: string;
}

export const mockEmpresa: Empresa = {
  id: '1',
  nome: 'Marques Caetano Engenharia',
  cnpj: '12.345.678/0001-90',
};

export const mockContratantes: EmpresaContratante[] = [
  { id: '1', empresa_id: '1', nome: 'ENGIX Construtora', cnpj: '11.111.111/0001-11' },
  { id: '2', empresa_id: '1', nome: 'Ferreira Santos', cnpj: '22.222.222/0001-22' },
  { id: '3', empresa_id: '1', nome: 'Murano Empreendimentos', cnpj: '33.333.333/0001-33' },
];

export const mockObras: Obra[] = [
  { id: '1', empresa_id: '1', empresa_contratante_id: '1', empresa_contratante_nome: 'ENGIX Construtora', nome: 'Edifício Aurora', numero_acao: 'ACO-2024-001', saldo_inicial: 850000, saldo_atual: 623450, status: 'ativa' },
  { id: '2', empresa_id: '1', empresa_contratante_id: '2', empresa_contratante_nome: 'Ferreira Santos', nome: 'Residencial Parque Verde', numero_acao: 'ACO-2024-002', saldo_inicial: 1200000, saldo_atual: 980200, status: 'ativa' },
  { id: '3', empresa_id: '1', empresa_contratante_id: '3', empresa_contratante_nome: 'Murano Empreendimentos', nome: 'Shopping Center Norte', numero_acao: 'ACO-2024-003', saldo_inicial: 2500000, saldo_atual: 1875000, status: 'ativa' },
  { id: '4', empresa_id: '1', empresa_contratante_id: '1', empresa_contratante_nome: 'ENGIX Construtora', nome: 'Galpão Industrial B7', numero_acao: 'ACO-2023-015', saldo_inicial: 450000, saldo_atual: 12500, status: 'ativa' },
];

export const mockPlanilhas: Planilha[] = [
  { id: '1', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', nome: 'Estrutura', saldo_inicial: 350000, saldo_atual: 245800, status: 'ativa' },
  { id: '2', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', nome: 'Elétrica', saldo_inicial: 200000, saldo_atual: 178650, status: 'ativa' },
  { id: '3', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', nome: 'Hidráulica', saldo_inicial: 150000, saldo_atual: -8200, status: 'ativa' },
  { id: '4', empresa_id: '1', obra_id: '2', obra_nome: 'Residencial Parque Verde', nome: 'Fundação', saldo_inicial: 500000, saldo_atual: 412300, status: 'ativa' },
  { id: '5', empresa_id: '1', obra_id: '2', obra_nome: 'Residencial Parque Verde', nome: 'Acabamento', saldo_inicial: 350000, saldo_atual: 298500, status: 'ativa' },
  { id: '6', empresa_id: '1', obra_id: '3', obra_nome: 'Shopping Center Norte', nome: 'Estrutura Metálica', saldo_inicial: 1200000, saldo_atual: 875000, status: 'ativa' },
];

export const mockFuncionarios: Funcionario[] = [
  { id: '1', empresa_id: '1', nome: 'José Silva', funcao: 'Pedreiro', tipo_contrato: 'mensalista', valor_base: 3200, ativo: true, obra_alocada: 'Edifício Aurora' },
  { id: '2', empresa_id: '1', nome: 'Carlos Santos', funcao: 'Eletricista', tipo_contrato: 'mensalista', valor_base: 3800, ativo: true, obra_alocada: 'Edifício Aurora' },
  { id: '3', empresa_id: '1', nome: 'Pedro Oliveira', funcao: 'Encanador', tipo_contrato: 'diarista', valor_base: 180, ativo: true, obra_alocada: 'Residencial Parque Verde' },
  { id: '4', empresa_id: '1', nome: 'Marcos Lima', funcao: 'Mestre de Obras', tipo_contrato: 'mensalista', valor_base: 5500, ativo: true, obra_alocada: 'Shopping Center Norte' },
  { id: '5', empresa_id: '1', nome: 'Roberto Alves', funcao: 'Pintor', tipo_contrato: 'empreita', valor_base: 12000, ativo: true, obra_alocada: 'Galpão Industrial B7' },
  { id: '6', empresa_id: '1', nome: 'Fernando Costa', funcao: 'Servente', tipo_contrato: 'mensalista', valor_base: 2200, ativo: false },
];

export const mockOCs: OrdemCompra[] = [
  { id: '1', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', planilha_id: '1', planilha_nome: 'Estrutura', numero_oc: 'OC-001', numero_acao: 'ACO-2024-001', fornecedor: 'Aço Brasil LTDA', cnpj_fornecedor: '44.444.444/0001-44', valor_total: 45000, data_emissao: '2024-12-15', status: 'ativa' },
  { id: '2', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', planilha_id: '2', planilha_nome: 'Elétrica', numero_oc: 'OC-002', numero_acao: 'ACO-2024-001', fornecedor: 'Eletro Materiais SA', cnpj_fornecedor: '55.555.555/0001-55', valor_total: 18200, data_emissao: '2025-01-10', status: 'ativa' },
  { id: '3', empresa_id: '1', obra_id: '2', obra_nome: 'Residencial Parque Verde', planilha_id: '4', planilha_nome: 'Fundação', numero_oc: 'OC-003', numero_acao: 'ACO-2024-002', fornecedor: 'Concreto Mix', cnpj_fornecedor: '66.666.666/0001-66', valor_total: 87500, data_emissao: '2025-01-22', status: 'cancelada' },
];

export const mockLancamentos: LancamentoFinanceiro[] = [
  { id: '1', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', planilha_id: '1', planilha_nome: 'Estrutura', tipo: 'despesa', categoria: 'Material', valor: 45000, forma_pagamento: 'Boleto', descricao: 'OC-001 - Aço Brasil LTDA', origem: 'ordem_compra', status: 'ativo', created_at: '2025-02-18' },
  { id: '2', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', tipo: 'despesa', categoria: 'Salário', valor: 3200, forma_pagamento: 'Transferência', descricao: 'Salário José Silva - Jan/2025', origem: 'funcionarios', status: 'ativo', created_at: '2025-02-15' },
  { id: '3', empresa_id: '1', obra_id: '2', obra_nome: 'Residencial Parque Verde', planilha_id: '4', planilha_nome: 'Fundação', tipo: 'despesa', categoria: 'Material', valor: 87500, forma_pagamento: 'Boleto', descricao: 'OC-003 - Concreto Mix (ESTORNADO)', origem: 'ordem_compra', status: 'estornado', created_at: '2025-02-12' },
  { id: '4', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', tipo: 'receita', categoria: 'Repasse', valor: 200000, forma_pagamento: 'Transferência', descricao: 'Repasse ENGIX - Fev/2025', origem: 'repasse', status: 'ativo', created_at: '2025-02-10' },
  { id: '5', empresa_id: '1', obra_id: '3', obra_nome: 'Shopping Center Norte', planilha_id: '6', planilha_nome: 'Estrutura Metálica', tipo: 'despesa', categoria: 'Material', valor: 125000, forma_pagamento: 'Boleto', descricao: 'Perfis metálicos - Estrutura principal', origem: 'manual', status: 'ativo', created_at: '2025-02-08' },
  { id: '6', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', planilha_id: '2', planilha_nome: 'Elétrica', tipo: 'despesa', categoria: 'Material', valor: 18200, forma_pagamento: 'Cartão', descricao: 'OC-002 - Eletro Materiais SA', origem: 'ordem_compra', status: 'ativo', created_at: '2025-02-05' },
  { id: '7', empresa_id: '1', obra_id: '4', obra_nome: 'Galpão Industrial B7', tipo: 'despesa', categoria: 'Empreita', valor: 12000, forma_pagamento: 'PIX', descricao: 'Pintura Galpão - Roberto Alves', origem: 'funcionarios', status: 'ativo', created_at: '2025-02-03' },
  { id: '8', empresa_id: '1', obra_id: '1', obra_nome: 'Edifício Aurora', planilha_id: '3', planilha_nome: 'Hidráulica', tipo: 'despesa', categoria: 'Material', valor: 32500, forma_pagamento: 'Boleto', descricao: 'Tubulação e conexões hidráulicas', origem: 'manual', status: 'ativo', created_at: '2025-02-01' },
  { id: '9', empresa_id: '1', obra_id: '2', obra_nome: 'Residencial Parque Verde', tipo: 'despesa', categoria: 'Salário', valor: 5500, forma_pagamento: 'Transferência', descricao: 'Salário Marcos Lima - Jan/2025', origem: 'funcionarios', status: 'ativo', created_at: '2025-01-30' },
  { id: '10', empresa_id: '1', obra_id: '3', obra_nome: 'Shopping Center Norte', tipo: 'receita', categoria: 'Repasse', valor: 500000, forma_pagamento: 'Transferência', descricao: 'Repasse Murano - Jan/2025', origem: 'repasse', status: 'ativo', created_at: '2025-01-28' },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const categoriasDespesa = [
  'Material',
  'Salário',
  'Diária',
  'Empreita',
  'Equipamento',
  'Transporte',
  'Alimentação',
  'Outros',
];

export const formasPagamento = [
  'PIX',
  'Transferência',
  'Boleto',
  'Cartão',
  'Dinheiro',
  'Cheque',
];
