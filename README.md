### EuGene – Caça‑palavras no genoma

EuGene é uma ferramenta educacional interativa que transforma nomes e palavras em desafios de biologia molecular. O EUGENE permite que alunos explorem os conceitos de DNA, RNA, proteínas e código genético enquanto se divertem caçando palavras em sequências genômicas aleatórias.

O projeto é mantido pelo Laboratório de Bioinformática da Universidade Federal do Rio de Janeiro (UFRJ) e utiliza a estrutura do BLAST (NCBI).

—

 🚀 Funcionalidades principais:
- 5 níveis de dificuldade, que simulam diferentes tipos de alinhamento BLAST:
  - Nível 1: blastn – encontre seu nome no DNA
  - Nível 2: blastp – encontre seu nome na proteína
  - Nível 3: blastx – encontre seu nome ao contrário no DNA
  - Nível 4: tblastn – encontre o gene do seu nome no DNA (traduzido)
  - Nível 5: tblastx – encontre o contrário do gene do seu nome no DNA (traduzido reverso)

- Personalização completa: insira seu nome, idade, e‑mail e até palavras extras para enriquecer o caça‑palavras.

- Geração dinâmica de sequências: cada execução gera uma sequência aleatória de DNA (2000 nucleotídeos) ou proteína (2000 aminoácidos) com as palavras escondidas em posições aleatórias.

—

### Tecnologias utilizadas:
- HTML5 / CSS3 – estrutura e estilização responsiva.
- JavaScript (ES6) – lógica do jogo e manipulação do DOM.
- jQuery 4.0.0 – simplificação de interações (atualizado e seguro).

—

### Como executar localmente:
1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/eugene.git
   cd eugene
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge).

> O projeto é 100% estático – não requer servidor web ou banco de dados. Basta abrir o arquivo HTML para começar a usar.

—
### Como usar
1. Acesse a página inicial – você verá o Eugene (personagem) e Mendel.
2. Escolha um dos 5 níveis clicando nos ícones (DNA, proteína, etc.).
3. Preencha os campos:
   - Seu nome (obrigatório)
   - Idade (opcional)
   - E‑mail (opcional)
   - Título da página (opcional)
   - Palavras extras (opcional, separadas por vírgula)
4. Selecione um banco de palavras (Animais, Plantas, Ciências, etc.) – cada banco contém 4 palavras temáticas.
5. Clique no botão BLAST – uma nova janela será aberta com o seu caça‑palavras personalizado.
6. Encontre as palavras na sequência genômica – use a tabela de códons (nos níveis 4 e 5) para decodificar o código genético.

—

### Estrutura de arquivos
eugene/
├── index.html                  Página principal (formulário)
├── EUGENE.html                 Página de resultados (caça‑palavras)
├── eugene.js                   Lógica da página principal
├── eugene_result.js            Lógica da página de resultados
├── index_files/                Recursos da página principal
│   ├── .css                   Estilos (header, footer, blastn, etc.)
│   ├── .jpg / .png           Imagens (botões, logos, ilustrações)
│   └── jquery-4.0.0.min.js     jQuery 4.0.0
└── EUGENE/                     Recursos da página de resultados
    ├── .png                   Logos, medalha, dna, tabela de códons
    └── jquery-4.0.0.min.js     jQuery 4.0.0

—

### Licença

Este projeto é licenciado sob a MIT License – consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

—

### Contato

Dúvidas, sugestões ou relatos de bugs? Entre em contato:

- E‑mail: bioinfo@iq.ufrj.br

