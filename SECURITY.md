### Política de Segurança – EuGene

### Versões Suportadas
Atualmente, apenas a versão mais recente do EUGENE recebe atualizações de segurança. Recomendamos fortemente que todos os usuários mantenham‑se atualizados.

> Nota: A versão 3.0 é a primeira a incluir todas as melhorias de segurança descritas nas notas de atualização. Versões anteriores contêm vulnerabilidades conhecidas (jQuery 3.3.1, CSP permissiva, falta de validação de entrada) e não devem ser utilizadas em produção.

—

### Reportando uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança no EUGENE, pedimos que nos avise de forma responsável. Siga as instruções abaixo:

1. Envie um e‑mail para bioinfo@iq.ufrj.br com o assunto `[EUGENE] Relato de Vulnerabilidade`.
2. No corpo do e‑mail, inclua:
   - Descrição clara da vulnerabilidade (incluindo versão afetada).
   - Passos para reproduzir o problema (ex.: URL, parâmetros, ações).
   - Impacto potencial (ex.: XSS, injeção, negação de serviço).
   - (Opcional) Sugestão de correção ou referências.
3. Não compartilhe publicamente a vulnerabilidade antes que tenhamos a oportunidade de corrigi‑la.

 O que esperar após o relato

- Confirmação de recebimento em até 48 horas.
- Atualizações periódicas sobre o status da investigação.
- Se a vulnerabilidade for aceita, trabalharemos em uma correção e lançaremos uma nova versão.
- Se a vulnerabilidade for declinada, explicaremos o motivo.

—

### Práticas de Segurança Adotadas

- CSP Restritiva – bloqueia a execução de scripts de origens não confiáveis.
- Validação e Sanitização de Entradas – protegem contra injeção de HTML/scripts.
- Dependências Atualizadas – jQuery 4.0.0, sem bibliotecas obsoletas.
- Clickjacking Prevention – `frame-ancestors 'none'`.
- Auditoría Automática – GitHub Actions verifica vulnerabilidades a cada 3 meses.

—

Última atualização: 11 de agosto de 2026

