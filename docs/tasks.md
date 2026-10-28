# Tarefas — Achados e Perdidos Escolar

Lista de acompanhamento do desenvolvimento. A conclusão abaixo indica que a funcionalidade foi implementada; os testes de uso real continuam separados na seção 8.

Legenda: **Concluída** · **[~] Em andamento** · **Pendente**

## 1. Configuração do projeto

- Concluída — Criar projeto Next.js com TypeScript e App Router.
- Concluída — Configurar Tailwind CSS e estilos globais da aplicação.
- Concluída — Organizar a aplicação e os tipos de usuários e objetos.
- Concluída — Criar a estrutura inicial da interface.

## 2. Interface e navegação

- Concluída — Criar o layout principal da aplicação.
- Concluída — Desenvolver a tela de login.
- Concluída — Criar o painel inicial com resumo dos objetos.
- Concluída — Criar a consulta, pesquisa, filtros e detalhes dos objetos.
- Concluída — Desenvolver a área de gerenciamento do responsável.
- Concluída — Criar a página “Nossa equipe” com os integrantes e o propósito do projeto.
- Concluída — Manter somente “Nossa equipe” na navegação lateral, sem o link duplicado “Participantes”.
- Concluída — Aplicar tema azul à interface, preservando a hierarquia visual e o contraste.
- Concluída — Disponibilizar a página da equipe na rota `/participantes` e manter o botão de login visualmente azul antes do preenchimento.
- Concluída — Adaptar a interface para celulares, tablets e computadores.

## 3. Login e controle de acesso

- Concluída — Exibir login obrigatório ao abrir a aplicação, sem recuperar sessão anterior.
- Concluída — Validar login com contas fixas em código e usuários cadastrados pelo responsável.
- Concluída — Manter as contas iniciais fora do CRUD local e protegidas contra edição e exclusão.
- Concluída — Habilitar o botão “Entrar” somente após preencher matrícula e senha.
- Concluída — Diferenciar os níveis de acesso Aluno e Responsável.
- Concluída — Restringir as ações administrativas aos responsáveis.
- Concluída — Revalidar sessão e permissão antes de executar operações administrativas.
- Concluída — Implementar a opção de logout.
- Concluída — Exibir mensagens para dados de login inválidos.

## 4. Cadastro e gerenciamento de objetos

- Concluída — Criar formulário de cadastro de objetos.
- Concluída — Registrar nome, categoria, descrição, características, local e data.
- Concluída — Permitir adicionar e remover foto do objeto, com limite de tamanho.
- Concluída — Implementar edição e exclusão de objetos cadastrados.
- Concluída — Atualizar a situação para Disponível ou Devolvido.
- Concluída — Validar os campos obrigatórios.
- Concluída — Salvar as informações no LocalStorage.
- Concluída — Iniciar sem objetos de demonstração e remover do LocalStorage os registros de exemplo da versão anterior, preservando objetos cadastrados pelo responsável.

## 5. Consulta, pesquisa e filtros

- Concluída — Exibir os objetos cadastrados em uma listagem responsiva.
- Concluída — Implementar pesquisa por nome, categoria, características, local e situação.
- Concluída — Criar filtros por categoria, data, local e situação.
- Concluída — Desenvolver a visualização detalhada dos objetos.
- Concluída — Exibir fotos e uma ilustração quando não houver foto.
- Concluída — Mostrar mensagem quando nenhum resultado for encontrado.
- Concluída — Priorizar a exibição dos objetos disponíveis.

## 6. Cadastro e gerenciamento de usuários

- Concluída — Criar formulário para usuários autorizados.
- Concluída — Registrar nome, matrícula, e-mail, telefone, senha e nível de acesso.
- Concluída — Validar os campos obrigatórios e impedir matrículas duplicadas.
- Concluída — Salvar, consultar, editar e excluir usuários no LocalStorage.
- Concluída — Permitir alterar o nível de acesso.
- Concluída — Proteger o último responsável contra exclusão ou perda da permissão e impedir a exclusão do usuário em uso.

## 7. Armazenamento e validações

- Concluída — Organizar operações para carregar e salvar usuários e objetos.
- Concluída — Acessar o LocalStorage somente no navegador.
- Concluída — Exibir erros de dados locais inválidos e de falha ao salvar.
- Concluída — Validar imagens e considerar os limites de armazenamento.
- Concluída — Manter os dados após atualizar a página, no mesmo navegador e perfil.
- Concluída — Informar que usuários e objetos permanecem salvos no mesmo navegador e perfil, sem sincronização entre dispositivos.

## 8. Testes e finalização

- Concluída — Executar lint do projeto.
- Concluída — Executar verificação de tipos TypeScript.
- Concluída — Executar build de produção do Next.js.
- Concluída — Validar no navegador abertura no login, campos vazios e botão desabilitado antes do preenchimento.
- Concluída — Validar no navegador mensagem para credenciais inválidas e login explícito com contas iniciais.
- Concluída — Validar no navegador permissões de aluno e responsável, logout e atualização sem login automático.
- Concluída — Validar no navegador que uma sessão antiga é descartada e as credenciais fixas não são exibidas no login.
- Concluída — Validar no navegador login de demonstração de responsável e aluno, criação de objeto e de usuário.
- Concluída — Verificar no navegador que o aluno não vê ações nem navegação administrativa.
- Concluída — Verificar no navegador pesquisa por texto, persistência após recarregar e validação de matrícula duplicada.
- Concluída — Verificar no navegador que uma sessão incompatível encerra o acesso às ações administrativas e retorna ao login.
- Concluída — Verificar no navegador que a permissão do último responsável não pode ser removida.
- Concluída — Verificar no navegador a página da equipe e a exibição dos três integrantes.
- Concluída — Verificar no navegador a rota `/participantes` e confirmar que o CTA desabilitado mantém a identidade azul.
- Concluída — Confirmar que o sistema inicia com zero objetos cadastrados, disponíveis e devolvidos.
- Concluída — Confirmar persistência de objetos e usuários após recarregar e fazer login manual novamente no mesmo navegador.
- Concluída — Testar no navegador o CRUD completo de objetos e usuários.
- Pendente — Testar manualmente mensagens de login inválido.
- Pendente — Testar edição, exclusão e mudança de situação dos objetos.
- Pendente — Testar edição, exclusão, alteração de permissão e proteção do último responsável.
- Pendente — Testar combinações de filtros, filtro por data e estado sem resultados.
- Pendente — Testar upload de imagens, limite de tamanho e erro de quota do navegador.
- Pendente — Verificar persistência após fechar completamente e reabrir o navegador.
- Pendente — Conferir responsividade em dispositivos e tamanhos de tela reais.
- Pendente — Corrigir eventuais problemas encontrados nos testes manuais.
- Pendente — Preparar a apresentação e a entrega do projeto.

## Equipe

- Ana Clara Silva Vila Nova
- Bruna Ferreira da Silva
- Júlia Gomes Teixeira

## Tecnologias utilizadas

- Next.js, React e TypeScript
- Tailwind CSS e CSS responsivo
- LocalStorage

## Observações

- O projeto é exclusivamente Front-end, sem backend, APIs próprias ou banco de dados externo.
- A autenticação é uma simulação didática no navegador e não oferece segurança real.
- Não usar senhas reais nem informações pessoais sensíveis; os dados locais podem ser inspecionados e alterados pelo usuário do dispositivo.
- Os dados permanecem no mesmo navegador e perfil enquanto o armazenamento do site não for apagado.
