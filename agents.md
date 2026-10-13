# Instruções para agentes de desenvolvimento

Objetivo: entregar mudanças corretas com o menor custo total de contexto, execução e manutenção. Prefira soluções simples, código legível e validação proporcional ao risco. Economia de tokens nunca justifica omitir requisitos ou verificações necessárias.

## 1. Contexto do projeto

- Use a stack, arquitetura, organização e ferramentas existentes. Não imponha Next.js, Supabase ou qualquer outra tecnologia.
- Consulte o manifesto, scripts e lockfile para descobrir comandos e gerenciador de pacotes. Não invente comandos nem troque ferramentas.
- Se existirem, consulte sob demanda: `docs/architecture.md`, `docs/database.md`, `docs/conventions.md`, `docs/design-system.md` e `docs/adr/`.
- Mantenha neste arquivo apenas regras permanentes e um mapa curto dos módulos reais. Documentação extensa pertence aos documentos específicos.
- Não crie documentos ou pastas apenas para preencher essa estrutura. Registre informações quando forem úteis ao projeto.

### Mapa dos módulos

- Requisitos do produto: `documentation/doc.md`.
- `frontend/`: React + Vite (JavaScript), CSS Modules, React Router, Axios, Framer Motion. Comandos (npm): `npm run dev`, `npm test`, `npm run lint`, `npm run build`.
- `backend/`: Java 25, Spring Boot 4 (Maven Wrapper), pacote `dev.daviviana.portfolio`; JPA, Flyway, Validation, Actuator, Springdoc. Comandos: `./mvnw test`, `./mvnw spring-boot:run`.
- `docker-compose.yml`: PostgreSQL local (`docker compose up -d db`).

## 2. Escopo e autonomia

- Entenda objetivo e critérios de aceite antes de editar. Reutilize requisitos já informados; não peça que o usuário os repita.
- Execute decisões rotineiras e reversíveis dentro do escopo autorizado. Pergunte quando uma ambiguidade afetar comportamento, arquitetura, dados ou custo de forma relevante.
- Altere somente o necessário. Evite refatorações, funcionalidades e correções sem relação com o pedido.
- Preserve alterações do usuário. Inspecione o estado e o diff antes de editar; não reverta trabalho alheio.
- Não faça operações destrutivas, altere produção, publique ou envie mensagens externas sem autorização aplicável.
- Se descobrir risco maior ou dependência não prevista, ajuste o plano e explique o impacto. Não continue por tentativa e erro.

## 3. Processo proporcional ao risco

Classifique pela consequência da falha e pelo acoplamento, não apenas pelo número de arquivos.

| Nível | Exemplos | Execução e revisão |
| --- | --- | --- |
| Simples | Texto, CSS, ajuste visual, alteração mecânica local | Implementação direta, verificação específica e inspeção do diff. Sem novos documentos ou subagentes. |
| Padrão | Formulário, CRUD, endpoint ou feature com regras conhecidas | Especificação e plano curtos; execução inline como padrão; testes por etapa e uma revisão final do diff. |
| Crítico | Autorização, pagamentos, isolamento de tenants, migração arriscada, sincronização/offline, concorrência ou mudança arquitetural | Especificação e plano explícitos; revisão por tarefa de requisitos e qualidade; integração e revisão final. Use subagentes quando disponíveis, autorizados e úteis. |

- CRUD com dados sensíveis pode ser crítico; uma feature com vários arquivos pode continuar padrão.
- Não abra brainstorming, ADR, worktree, plano formal ou rodada de agentes para todo ajuste pequeno.
- Use worktree quando isolamento ajudar trabalho concorrente ou arriscado. Reutilize isolamento existente.

## 4. Superpowers e documentação

- Este arquivo define regras do projeto e preferências do usuário; Superpowers fornece metodologia quando instalado. Não replique suas skills aqui.
- Aplique apenas workflows relevantes. Prefira `executing-plans` para execução padrão; considere `subagent-driven-development` para trabalho crítico ou grande.
- Siga a precedência de instruções da ferramenta. As preferências deste arquivo não dispensam requisitos superiores nem configuram automaticamente plugins, modelos ou permissões.
- Sem Superpowers ou subagentes, siga os mesmos critérios de escopo, validação e revisão diretamente.
- Para features que precisem de documentos, use os locais existentes ou `docs/superpowers/specs/` e `docs/superpowers/plans/`.
- Spec: objetivo, comportamento, limites, critérios de aceite e riscos. Plano: tarefas, arquivos, dependências e validação. Não copie grandes blocos de código para o plano.
- ADR em `docs/adr/`: contexto, decisão, consequências e alternativas relevantes. Registre decisões duradouras, não detalhes triviais.
- Atualize a fonte existente em vez de duplicar documentação. Conhecimento específico fica no projeto; skills personalizadas devem ser reutilizáveis entre projetos.

## 5. Economia de contexto e ferramentas

- Leia este arquivo e as instruções aplicáveis ao diretório alterado; depois leia somente o contexto necessário à tarefa.
- Use `rg` e `rg --files` com caminhos e padrões específicos. Exclua dependências, builds e arquivos gerados das buscas.
- Comece pelo módulo afetado e expanda para consumidores e dependências quando necessário. Evite explorar todo o repositório repetidamente.
- Reutilize descobertas atuais. Releia arquivos quando houver mudança ou dúvida, não por hábito.
- Agrupe leituras e buscas independentes. Mantenha etapas dependentes e alterações em sequência.
- Limite logs à evidência relevante. Investigue a primeira falha útil antes de imprimir saídas enormes.
- Não reproduza arquivos, histórico ou planos inteiros em respostas e handoffs. Use caminhos, trechos e resumos curtos.
- Em trabalho longo, mantenha um checkpoint compacto: decisões, estado, pendências e verificações. Não transcreva a conversa.

## 6. Modelos, executores e revisão

- Se a ferramenta permitir escolha, use modelo rápido para tarefas locais bem definidas; reserve modelo mais capaz para arquitetura, segurança, concorrência, investigação difícil e revisão crítica.
- Não fixe nomes ou versões de modelos aqui. Não alegue trocar modelo quando a ferramenta não oferecer esse controle.
- Evite alternar orquestrador e executor a cada pequena alteração. Agrupe tarefas relacionadas e revise por checkpoint ou no final, conforme o risco.
- Delegue apenas trabalho com fronteiras claras. Não paralelize tarefas dependentes ou edições concorrentes nos mesmos arquivos.
- Passe ao executor: objetivo, tarefa, arquivos relevantes, regras aplicáveis, dependências, critérios de aceite e comandos de validação.
- Inclua invariantes globais necessários, como autorização e isolamento de dados. Contexto mínimo deve continuar suficiente.
- O executor segue decisões estabelecidas. Diante de lacuna arquitetural, reporta a dúvida; não inventa uma arquitetura nova.
- Peça retorno compacto: arquivos alterados, resultado, validação e bloqueios. Reutilize o executor para correções da mesma tarefa quando possível.
- Revisores avaliam o diff e contexto necessário; evitam revisar todo o projeto sem motivo. Prefira contexto independente para revisão crítica quando disponível.

## 7. Simplicidade e boas práticas

- Aplique KISS e YAGNI: implemente o necessário agora. Não prepare funcionalidades hipotéticas.
- Aplique DRY ao conhecimento e às regras de negócio. Extraia duplicação real; não una comportamentos diferentes só porque têm código parecido.
- Reutilize componentes e utilitários existentes. Crie abstrações quando reduzirem complexidade ou representarem uma responsabilidade clara.
- Use SOLID de forma pragmática. Não crie interfaces, fábricas, repositórios ou camadas para toda função.
- Prefira nomes claros, funções focadas, retornos antecipados e contratos explícitos. Comente motivos e restrições, não o óbvio.
- Respeite a separação existente entre apresentação, aplicação, domínio e infraestrutura. Não introduza uma arquitetura nova para organizar uma alteração pequena.
- Evite regra de negócio complexa em componentes de UI. Valide entradas externas e trate erros nas fronteiras adequadas.
- Em TypeScript, preserve tipagem estrita; evite `any`, casts que escondem falhas e supressões sem justificativa.
- Adicione dependências somente com benefício concreto que compense manutenção e tamanho. Não reimplemente soluções críticas de segurança para evitar uma biblioteca adequada.
- Evite otimização de desempenho sem evidência. Use medições quando o pedido envolver lentidão.

## 8. Código e arquivos pequenos

- Prefira unidades coesas, com uma responsabilidade, que possam ser compreendidas e alteradas isoladamente.
- Separe componente, regra de negócio e integração quando houver responsabilidades distintas. Evite componentes, serviços e utilitários gigantes.
- Como sinais de revisão, considere funções acima de aproximadamente 40–60 linhas e arquivos de código acima de 200–300 linhas. São referências, não limites obrigatórios.
- Divida por responsabilidade e domínio, mantendo dependências claras. Não crie dezenas de arquivos minúsculos ou wrappers sem valor apenas para reduzir linhas.
- Não comprima expressões, remova legibilidade ou esconda lógica para cumprir tamanho. Código declarativo, gerado e migrações podem exigir outra avaliação.
- Se precisar dividir um arquivo existente, limite a extração ao que ajuda a tarefa. Evite reorganizar todo o projeto.

## 9. Testes enxutos e relevantes

- Teste comportamento observável, regras de negócio, contratos, limites e regressões. Não escreva testes que apenas reproduzem a implementação.
- Para bug corrigido, adicione um teste de regressão quando viável e útil. Priorize TDD em regras e caminhos críticos.
- Ajustes de texto ou CSS não exigem automaticamente novos testes unitários. Use inspeção visual, responsividade, acessibilidade ou testes existentes conforme a mudança.
- Não imponha quantidade fixa de testes ou cobertura de 100%. Cubra riscos reais; não economize removendo casos essenciais.
- Mantenha casos curtos e cenários focados. Divida suítes grandes por comportamento; arquivos de testes acima de aproximadamente 200 linhas merecem revisão de coesão.
- Use parametrização para casos semelhantes e fixtures pequenas. Evite dados enormes, mocks excessivos e helpers de teste mais complexos que o comportamento testado.
- Escolha o nível adequado: unitário para regra isolada, integração para interação real e E2E para jornadas relevantes. Evite repetir o mesmo cenário em todas as camadas sem necessidade.
- Autorização, RLS e isolamento de tenants precisam de validação de integração adequada; mocks sozinhos não demonstram essas garantias.

## 10. Validação e conclusão

- Durante cada tarefa, rode verificações direcionadas. Não execute build ou suíte completa após cada arquivo editado.
- Em checkpoints, amplie para os módulos e integrações afetados. No final, execute os checks exigidos pelo projeto e pelo impacto: lint, tipos, testes e build quando aplicáveis.
- Use comandos reais do projeto. Não instale uma infraestrutura de testes inteira para uma alteração pequena sem necessidade.
- Não repita checks que passaram sem nova mudança, falha ou incerteza. Amplie a investigação quando surgir evidência de problema.
- Antes de concluir, revise o diff: requisitos atendidos, escopo correto, ausência de duplicação desnecessária, segredos, código morto e alterações acidentais.
- Mudanças de banco devem seguir migrations e práticas existentes. Preserve autorização, isolamento, integridade, idempotência e compatibilidade quando relevantes.
- Para bugs, investigue a causa, formule uma hipótese e valide uma mudança focada. Não acumule patches especulativos.
- Não declare sucesso de comandos que não executou. Informe validação realizada, limitações e bloqueios materiais.
- Conclua quando os critérios de aceite e checks aplicáveis estiverem satisfeitos. Sem bloqueios, não encerre apenas com um plano ou implementação parcial.

## 11. Comunicação

- Responda em português, salvo pedido contrário. Seja direto e mantenha atualizações curtas e úteis.
- Explique decisões relevantes e mudanças de risco; não narre cada leitura ou comando.
- Entrega final: o que mudou, como foi verificado e eventual pendência. Não cole o código inteiro quando ele já estiver disponível nos arquivos.
- Se preparar PR, descreva problema, comportamento resultante e validação. Só abra ou publique quando autorizado.
