# Uerj-PASS Frontend

O **Uerj-PASS Frontend** é a interface web para gestão de participantes em eventos presenciais. Esta aplicação permite que organizadores visualizem, busquem e gerenciem participantes de seus eventos de forma intuitiva e eficiente.

A interface oferece uma experiência moderna e responsiva para o gerenciamento de listas de participantes, com funcionalidades avançadas de busca, paginação e seleção múltipla.

## Requisitos

### Requisitos funcionais

- [x] O sistema deve exibir uma lista paginada de participantes do evento
- [x] O organizador deve poder buscar participantes por nome ou email
- [x] O sistema deve mostrar informações detalhadas de cada participante (código, nome, email, data de inscrição)
- [x] O organizador deve poder visualizar o status de check-in de cada participante
- [x] O sistema deve permitir seleção individual de participantes através de checkboxes
- [x] O sistema deve permitir seleção múltipla (selecionar todos) de participantes
- [x] O organizador deve poder navegar entre páginas da lista de participantes
- [x] O sistema deve exibir contadores de itens selecionados e totais
- [x] O sistema deve mostrar datas relativas (ex: "há 2 dias") para inscrições e check-ins
- [x] O sistema deve ter indicadores visuais de carregamento durante operações

### Regras de negócio

- [x] A busca deve ter debounce de 500ms para otimizar performance
- [x] Participantes sem check-in devem ser claramente identificados
- [x] A paginação deve manter o estado na URL para permitir bookmarks
- [x] A seleção de participantes deve ser resetada ao mudar de página
- [x] O foco deve retornar ao campo de busca após operações de pesquisa
- [x] A página deve ser resetada para 1 quando uma nova busca é realizada

### Requisitos não-funcionais

- [x] **Performance**: Debounce na busca para evitar requisições excessivas
- [x] **Usabilidade**: Interface responsiva e intuitiva com feedback visual
- [x] **Acessibilidade**: Uso de checkboxes com estados intermediários (indeterminate)
- [x] **Experiência do usuário**: Loading states e tratamento de erros
- [x] **Internacionalização**: Datas e horários em português brasileiro
- [x] **SEO/Navegabilidade**: Estado da paginação mantido na URL
- [x] **Responsividade**: Layout adaptável para diferentes tamanhos de tela
- [x] **Feedback visual**: Indicadores de carregamento e estados vazios
- [x] **Tratamento de erros**: Mensagens de erro claras com opção de retry

## Funcionalidades Técnicas

### Componentes principais

- **AttendeeList**: Componente principal que gerencia toda a lista de participantes
- **Table Components**: Sistema modular de tabelas (Table, TableHeader, TableRow, etc.)
- **Checkbox**: Componente de seleção com suporte a estado intermediário
- **IconButton**: Botões de ação com ícones da biblioteca Lucide React

### Tecnologias utilizadas

- **React 18+** com Hooks (useState, useEffect, useCallback, useRef)
- **TypeScript** para tipagem estática
- **Day.js** para manipulação e formatação de datas
- **Lucide React** para ícones
- **Tailwind CSS** para estilização

### Estados gerenciados

- **Busca**: Campo de busca com debounce automático
- **Paginação**: Controle de páginas com sincronização na URL
- **Seleção**: Gerenciamento de itens selecionados com suporte a seleção múltipla
- **Loading**: Estados de carregamento para melhor UX
- **Dados**: Cache de participantes e informações de paginação

## API Integration

O frontend consome uma API REST com os seguintes endpoints:

```
GET /events/{eventId}/attendees?pageIndex={page}&limit={limit}&query={search}
```

### Estrutura de resposta da API

```typescript
interface ApiResponse {
  attendees: Attendee[];
  pagination: PaginationInfo;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

interface PaginationInfo {
  pageIndex: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

## Configuração e execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- API backend rodando em `http://localhost:3333`

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Variáveis de ambiente

```env
VITE_API_BASE_URL=http://localhost:3333
```

## Melhorias futuras

- [ ] Implementar cache de busca para melhor performance
- [ ] Adicionar export de dados selecionados (CSV, Excel)
- [ ] Implementar filtros avançados (por data, status de check-in)
- [ ] Adicionar ordenação por colunas
- [ ] Implementar modo offline com sincronização
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar lazy loading para listas muito grandes
- [ ] Adicionar animações e transições suaves
