# App de Gestão de Despesas e Receitas

Este aplicativo móvel é uma solução para a gestão financeira pessoal, permitindo visualizar e organizar despesas e receitas de forma semanal e mensal. Desenvolvido em React Native, ele proporciona uma interface intuitiva para acompanhar o fluxo de caixa, calcular lucros e gerenciar registros financeiros de maneira prática e acessível.

## Funcionalidades Principais

- **Resumo Semanal e Mensal**: Visualize o lucro, despesas e receitas, tanto para a semana quanto para o mês.
- **Detalhamento de Transações**: Acesse a página de detalhes semanais ou mensais para ver todas as despesas e receitas.
- **Edição e Exclusão de Transações**: Modifique ou exclua uma despesa ou receita existente de forma prática.
- **Alertas de Confirmação**: Confirmações antes de exclusões de dados, evitando perda acidental.
- **Design Responsivo**: Layout organizado e estilizado para facilitar a navegação e visualização dos dados.

## Estrutura dos Principais Componentes

### HomePage
A tela inicial do aplicativo apresenta:

- **Lucro Semanal**: Lista de semanas com os respectivos lucros. O usuário pode tocar em qualquer semana para navegar aos detalhes da mesma.
- **Receita Mensal**: Lista de meses com a receita total. Ao tocar em um mês, o usuário é direcionado para a visão mensal de suas despesas e receitas.

### InspectPage
Tela de detalhes que exibe as transações financeiras da semana ou do mês selecionado. Inclui:

- **Listagem de Despesas e Receitas**: Exibe cada categoria e valor, com botões de edição e exclusão.
- **Cálculo Total**: Mostra o total de despesas e receitas, além do lucro calculado.
- **Funções de Edição e Exclusão**: Permite editar ou excluir uma despesa ou receita com confirmação.

## Principais Funções Utilizadas

- `getExpensesByDate` e `getRevenuesByDate`: Funções assíncronas que consultam despesas e receitas no banco de dados, filtradas por data.
- `deleteExpense` e `deleteRevenue`: Removem uma transação específica do banco de dados.
- `updateExpense` e `updateRevenue`: Atualizam uma transação específica com um novo valor.
- `groupByWeek` e `groupByMonth`: Utilizadas para agrupar as transações financeiras de acordo com o período semanal ou mensal.
