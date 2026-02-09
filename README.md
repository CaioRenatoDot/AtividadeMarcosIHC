# BancoCaio - Sistema de Internet Banking

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Descrição do Projeto

Este projeto é um sistema de login para um banco fictício chamado BancoCaio, desenvolvido como atividade da disciplina de Interface Humano-Computador. O objetivo foi criar uma interface funcional aplicando conceitos de usabilidade e experiência do usuário.

O sistema simula um ambiente de login bancário onde o usuário pode fazer autenticação usando CPF/usuário e senha. Todo o funcionamento é local, sem necessidade de internet ou banco de dados real.

## Análise das Metas de Usabilidade

**Fácil de lembrar como usar**:
O sistema usa um padrão familiar de login (CPF/usuário + senha) que qualquer pessoa já conhece de outros sites. Incluí também a opção "lembrar meu usuário" para facilitar acessos futuros.

**Fácil de entender**:
A interface é simples e direta. Os campos estão claramente identificados, tem placeholders explicativos e ícones que ajudam a entender o que vai em cada campo. Quando o usuário erra algo, aparece mensagem explicando o problema.

**Útil**:
O sistema cumpre sua função de autenticar usuários de forma prática. Tem validação dos dados, mostra a força da senha e dá feedback sobre o que está acontecendo (se login foi aceito ou negado).

**Seguro (percepção do usuário)**:
Usei visual de banco real com cores profissionais (azul), ícone de cadeado, botão para mostrar/esconder senha e mensagem de "ambiente seguro" no rodapé. Isso passa mais confiança para quem acaba usando.

**Eficiente**:
O login é rápido, só precisa preencher dois campos e clicar em um botão (ou apertar Enter). As validações acontecem na hora e o feedback é imediato. Adicionei navegação por teclado para ser mais ágil ainda.

## Análise das Metas de Experiência

Escolhi trabalhar com 5 metas de experiência:

**Esteticament­e apreciável**
Fiz um design limpo e moderno inspirado em bancos reais, como por exemplo o da Nubank. A tipografia é moderna (fonte Inter do Google Fonts) e o layout é organizado e agradável.

**Agradável**
A experiência de usar é tranquila. As animações são suaves, nada é muito brusco ou irritante. O feedback das ações é discreto mas claro. Procurei fazer algo que não canse o usuário.

**Satisfatório**
Quando o login funciona, tem um feedback positivo claro. Quando tem erro, a mensagem explica o que fazer para corrigir. O medidor de força da senha também ajuda o usuário a se sentir no controle.

**Emocionalment­e adequado**
Mantive um tom sério e profissional, como espera-se de um banco. Não usei elementos muito infantis ou descontraídos demais. As cores transmitem confiança e estabilidade.

**Eficiente** (também como experiência)
Não tem burocracia desnecessária. O usuário consegue fazer o que precisa rapidamente sem ficar perdido ou ter que clicar em muitas coisas.

## Tecnologias Utilizadas

- **HTML5**: estrutura da página
- **CSS3**: estilização e animações
- **JavaScript**: lógica do login, validações e interatividade
- **Google Fonts**: fonte Inter
- **Lucide Icons**: ícones da interface
- **LocalStorage**: para salvar a opção "lembrar usuário"

## Instruções de Execução

1. Baixe ou clone o repositório
2. Abra o arquivo `index.html` no navegador (Chrome, Firefox, Edge, etc)
3. O sistema vai carregar direto, não precisa instalar nada

**Para testar o login:**
- Os usuários válidos estão definidos no arquivo `js/script.js`
- Você pode usar qualquer CPF/usuário e senha cadastrados no código
- Ou testar com dados inválidos para ver as mensagens de erro

**Funcionalidades que você pode estar testando:**
- Validação dos campos vazios
- Feedback de erro quando usuário/senha estão incorretos
- Opção de mostrar/esconder senha (clique no ícone do olho)
- Checkbox "lembrar meu usuário"
- Navegação por teclado (Enter para fazer login, ESC para fechar mensagens)

**Observação:** O sistema funciona totalmente offline. Não precisa de internet nem servidor. É só abrir o HTML e usar.

---

**Link do projeto no GitHub Pages:** https://caiorenatodot.github.io/AtividadeMarcosIHC/

Projeto desenvolvido para a disciplina de Interface Humano-Computador.