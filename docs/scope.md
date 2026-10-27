S.C.O.P.E. — Achados e Perdidos Escolar
EQUIPE
Ana Clara Silva Vila Nova
Bruna Ferreira da Silva
Júlia Gomes Teixeira


Nome do Projeto: Achados e Perdidos Escolar

Visão Geral

Desenvolver uma aplicação web de gerenciamento e consulta de objetos perdidos e encontrados no ambiente escolar, denominada Achados e Perdidos Escolar.

O sistema terá como finalidade facilitar a localização de objetos perdidos pelos alunos, permitindo que consultem, diretamente pelo navegador, os itens encontrados e cadastrados na plataforma, sem precisar se deslocar até o espaço físico de Achados e Perdidos apenas para verificar se seus objetos estão disponíveis.

A aplicação permitirá visualizar informações como nome, tipo, características, foto, local onde o objeto foi encontrado, data do achado e situação atual do item.

O sistema também contará com cadastro de usuários autorizados, login e controle de acesso por níveis de permissão, diferenciando as funcionalidades disponíveis para Alunos e Responsáveis.

A navegação contará também com uma página “Nossa equipe”, apresentando os integrantes do projeto e seu propósito para a comunidade escolar.

A página “Nossa equipe” estará disponível na rota `/participantes`. A identidade visual da aplicação utilizará uma paleta predominantemente azul, com elementos de destaque em azul perceptível inclusive no estado desabilitado do botão de login, mantendo contraste legível, fundos claros e adaptação responsiva.

O projeto será desenvolvido exclusivamente Front-end, com finalidade didática, utilizando Next.js, React, TypeScript, JavaScript, Tailwind CSS e LocalStorage.

A aplicação funcionará somente pelo navegador, sem a utilização de backend, APIs ou banco de dados externo.

As informações armazenadas deverão permanecer disponíveis mesmo após:

Atualizar a página.
Fechar o navegador.
Abrir novamente o navegador.

Para isso, o projeto utilizará o LocalStorage como mecanismo de armazenamento local.

O sistema deverá permitir que os alunos consultem os objetos cadastrados, enquanto os responsáveis poderão gerenciar os itens encontrados e os usuários autorizados.

A aplicação iniciará sem objetos de demonstração; os contadores de itens disponíveis e devolvidos começarão em zero até que um responsável cadastre objetos reais.

S — Situation | Situação
Problema

A escola já possui um espaço físico destinado ao armazenamento de objetos perdidos e encontrados. Entretanto, os alunos precisam se deslocar até esse local para verificar se algum objeto que perderam foi encontrado.

Esse processo pode gerar deslocamentos desnecessários, dificultar a localização dos itens e tornar a consulta menos prática.

O sistema Achados e Perdidos Escolar deverá centralizar as informações dos objetos encontrados em uma plataforma digital, permitindo que os alunos consultem os itens disponíveis antes de comparecer presencialmente ao local.

Solução proposta

A aplicação permitirá que um responsável registre os objetos encontrados, preenchendo as informações necessárias para sua identificação.

Após o cadastro, os objetos poderão ser consultados pelos alunos autorizados, que terão acesso às informações disponibilizadas na plataforma.

O sistema deverá apresentar uma interface simples, organizada e intuitiva, facilitando a pesquisa e a visualização dos objetos.

Funcionalidades principais
Consulta de objetos

O aluno poderá visualizar os objetos cadastrados e consultar suas informações.

A consulta deverá permitir que o aluno identifique possíveis objetos perdidos por meio de suas características, fotos e demais informações.

Pesquisa

O sistema deverá possuir uma ferramenta de pesquisa para facilitar a localização de um objeto específico.

A pesquisa poderá considerar informações como:

Nome do objeto.
Tipo ou categoria.
Características.
Local onde foi encontrado.
Situação do objeto.
Filtros

O sistema deverá permitir filtrar os objetos cadastrados de acordo com as informações disponíveis.

Exemplos:

Categoria do objeto.
Data em que foi encontrado.
Local do achado.
Situação: disponível ou devolvido.

Os filtros deverão ajudar o aluno a reduzir a quantidade de resultados e encontrar os itens de seu interesse.

Visualização de detalhes

Cada objeto deverá possuir informações suficientes para auxiliar o aluno a reconhecer o item.

A página ou área de detalhes poderá apresentar:

Foto do objeto.
Nome.
Categoria.
Descrição e características.
Local onde foi encontrado.
Data do achado.
Situação atual.
Cadastro de objetos

O responsável poderá cadastrar novos objetos encontrados na escola.

O cadastro deverá permitir o preenchimento das informações do item e o registro de uma foto, quando disponível.

Atualização de objetos

O responsável poderá editar as informações dos objetos já cadastrados e atualizar sua situação.

Os estados previstos inicialmente serão:

Disponível: o objeto foi encontrado e ainda não foi devolvido.
Devolvido: o objeto já foi retirado pelo seu proprietário.
Cadastro e gerenciamento de usuários

O sistema deverá permitir que o responsável cadastre usuários autorizados a utilizar a plataforma.

Cada usuário terá um nível de acesso, que determinará quais funcionalidades poderá utilizar.

O acesso às funcionalidades deverá ser diferenciado entre Aluno e Responsável.

C — Context | Contexto
Tecnologias obrigatórias

O projeto utilizará as seguintes tecnologias:

Next.js.
React.
TypeScript.
JavaScript.
Tailwind CSS.
LocalStorage.

O Next.js deverá ser utilizado com App Router para organizar as páginas e a navegação da aplicação.

O React será utilizado para desenvolver os componentes e controlar os estados da interface.

O TypeScript será utilizado para definir os tipos de dados dos usuários, objetos encontrados e demais informações do sistema.

O Tailwind CSS será utilizado para estilizar a interface e permitir a criação de um layout organizado e responsivo.

O LocalStorage será responsável por manter os dados salvos localmente no navegador.

Poderão ser utilizados recursos do React, como:

useState
useEffect

Também poderão ser utilizados os recursos de navegação do Next.js quando necessários.

Não deverão ser adicionadas bibliotecas externas sem necessidade.

Arquitetura do projeto

O projeto será exclusivamente Front-end, sem comunicação com um servidor próprio.

Não utilizar:

Backend.
API própria.
Rotas de API.
Banco de dados.
Express.
MySQL.
MongoDB.
Spring Boot.
JWT.
OAuth.
Serviços externos obrigatórios.
Sistemas externos de autenticação.

O funcionamento principal da aplicação deverá ocorrer no navegador.

O Next.js será utilizado para estruturar a aplicação web, mas não deverão ser criados serviços de backend para executar as funcionalidades do projeto.

Armazenamento dos dados

As informações deverão ser armazenadas no LocalStorage.

O sistema poderá utilizar o armazenamento local para guardar:

Usuários cadastrados.
Identificadores dos usuários.
Nomes.
Matrículas.
E-mails.
Telefones.
Senhas, exclusivamente como parte da simulação didática de autenticação.
Níveis de acesso.
Objetos cadastrados.
Descrições e características dos objetos.
Referências às fotos dos objetos.
Locais dos achados.
Datas dos achados.
Situações dos objetos.

Os dados deverão continuar disponíveis após atualizar a página ou fechar e abrir novamente o navegador, desde que o armazenamento do site não seja apagado e o acesso ocorra no mesmo navegador e perfil.

O sistema deverá utilizar funções organizadas para salvar, consultar, atualizar e remover os dados quando necessário.

As operações com LocalStorage deverão ser executadas no navegador, evitando acessos durante a renderização inicial no servidor do Next.js.

Cadastro de usuários

O sistema deverá possuir uma estrutura de cadastro para usuários autorizados.

Cada usuário deverá conter:

ID do usuário.
Nome completo.
Matrícula do aluno.
E-mail.
Telefone.
Senha.
Nível de acesso.

A matrícula será utilizada como identificador de acesso do aluno, conforme definido na proposta do projeto.

O sistema deverá permitir que o responsável cadastre os usuários autorizados e defina seu nível de acesso.

Não haverá cadastro público irrestrito. O cadastro de usuários deverá ser realizado pelo responsável, conforme as regras estabelecidas para a aplicação.

Login e controle de acesso

O sistema deverá possuir uma tela de login.

O login deverá solicitar as informações necessárias para identificar o usuário e verificar se os dados correspondem a um cadastro existente.

Após a verificação, o sistema deverá identificar o nível de acesso do usuário e liberar apenas as funcionalidades correspondentes.

As contas iniciais de demonstração deverão ser definidas no código e separadas dos usuários cadastrados localmente pelo responsável. Ao abrir ou atualizar a aplicação, uma sessão anterior não deverá dispensar a tela de login: o acesso só será concedido após o preenchimento das credenciais e o envio explícito do formulário. As credenciais de demonstração não deverão ser exibidas na tela de login.

Aluno

O aluno poderá:

Fazer login.
Consultar os objetos cadastrados.
Pesquisar objetos.
Utilizar filtros.
Visualizar fotos e detalhes dos objetos.
Consultar a situação dos itens.

O aluno não poderá:

Cadastrar objetos.
Editar objetos.
Excluir objetos.
Cadastrar usuários.
Editar usuários.
Excluir usuários.
Alterar o próprio nível de acesso.
Responsável

O responsável poderá:

Fazer login.
Consultar os objetos cadastrados.
Pesquisar e filtrar objetos.
Cadastrar objetos encontrados.
Editar informações dos objetos.
Atualizar a situação dos objetos.
Cadastrar usuários autorizados.
Consultar os usuários cadastrados.
Gerenciar os dados dos usuários.

O sistema deverá verificar as permissões antes de disponibilizar as ações de gerenciamento.

Limitação de segurança: como o projeto não terá backend, o controle de acesso será uma simulação didática no navegador. Os dados do LocalStorage podem ser modificados pelo usuário do dispositivo, portanto esse mecanismo não garante autenticação segura nem impede tecnicamente o acesso de pessoas externas. O sistema não deverá armazenar senhas reais ou informações sensíveis.

Informações dos objetos

Cada objeto encontrado poderá conter os seguintes campos:

ID do objeto.
Nome do objeto.
Tipo ou categoria.
Descrição.
Características.
Foto.
Local onde foi encontrado.
Data do achado.
Situação atual.

O identificador deverá ser único para cada objeto, permitindo que o sistema encontre e atualize o registro correto.

A foto deverá ser armazenada ou referenciada de maneira compatível com o armazenamento local do navegador. Caso sejam utilizadas imagens em formato de dados, o sistema deverá considerar os limites de armazenamento do LocalStorage.

Categorias dos objetos

O sistema poderá trabalhar com categorias como:

Material escolar.
Documentos e cartões.
Roupas e acessórios.
Garrafas e recipientes.
Eletrônicos.
Chaves.
Outros objetos.

As categorias poderão ser ajustadas de acordo com os tipos de itens normalmente encontrados na escola.

Situação dos objetos

Cada objeto deverá possuir uma situação que indique se ainda está disponível para retirada.

As situações iniciais serão:

Disponível.
Devolvido.

Os objetos devolvidos poderão continuar registrados no sistema para manter o histórico visual dos itens cadastrados, caso essa opção seja adotada na interface.

Por padrão, a pesquisa poderá priorizar os objetos disponíveis, com a possibilidade de consultar os devolvidos por meio de filtro.

Fotos dos objetos

O sistema deverá permitir que o responsável associe uma foto ao objeto cadastrado.

A imagem deverá ajudar o aluno a reconhecer visualmente o item perdido.

Quando um objeto não possuir foto, a interface deverá apresentar uma imagem padrão ou uma indicação visual de que não há foto disponível.

Local e data do achado

O sistema deverá registrar o local onde o objeto foi encontrado e a data correspondente.

Essas informações ajudarão o aluno a avaliar se o objeto cadastrado pode ser aquele que perdeu.

O local poderá ser informado por meio de um campo de texto ou de opções previamente definidas pela escola.

A data deverá ser registrada em um formato consistente, para permitir a exibição e a aplicação de filtros.

Interface e responsividade

A aplicação deverá possuir uma interface clara, organizada e responsiva.

As páginas deverão funcionar adequadamente em computadores, tablets e celulares.

A interface deverá priorizar a facilidade de consulta, com destaque para:

Campo de pesquisa.
Filtros.
Fotos dos objetos.
Informações principais.
Situação dos itens.
Ações de gerenciamento disponíveis para o responsável.

O layout deverá ser simples o suficiente para facilitar o desenvolvimento por uma equipe iniciante.

O — Objective | Objetivo

O objetivo do Achados e Perdidos Escolar é facilitar a consulta e o gerenciamento de objetos encontrados na escola, reduzindo a necessidade de deslocamentos presenciais apenas para verificar se um item perdido está disponível.

A plataforma deverá centralizar as informações dos objetos e permitir que os alunos consultem os registros de maneira prática.

O sistema deverá possibilitar:

Consultar objetos encontrados.
Pesquisar itens específicos.
Filtrar os resultados.
Visualizar fotos e características.
Identificar o local e a data do achado.
Consultar a situação do objeto.
Cadastrar objetos por meio do responsável.
Editar informações dos objetos.
Atualizar o estado dos itens.
Cadastrar usuários autorizados.
Diferenciar as permissões de Alunos e Responsáveis.
Manter os dados salvos localmente.
Funcionar exclusivamente pelo navegador.

O projeto também busca desenvolver uma solução simples e funcional para uma necessidade real do ambiente escolar, utilizando tecnologias modernas de desenvolvimento Front-end.

P — Process | Processo

O fluxo principal do sistema deverá funcionar da seguinte maneira:

O responsável acessa a plataforma.
O responsável faz login.
O sistema verifica os dados de acesso e identifica o nível de permissão.
O responsável cadastra os usuários autorizados, quando necessário.
Um objeto é encontrado na escola.
O responsável acessa a área de gerenciamento de objetos.
O responsável registra o nome, a categoria, a descrição, as características, a foto, o local e a data do achado.
O sistema valida as informações preenchidas.
O objeto é salvo no LocalStorage.
O objeto passa a aparecer na consulta de itens cadastrados.
O aluno acessa a plataforma.
O aluno faz login utilizando seus dados cadastrados.
O sistema verifica o usuário e identifica seu nível de acesso.
O sistema apresenta as funcionalidades permitidas para o aluno.
O aluno pesquisa o objeto que perdeu.
O sistema consulta os registros salvos e apresenta os resultados correspondentes.
O aluno utiliza os filtros, se necessário.
O aluno visualiza a foto e as informações dos objetos.
Caso identifique seu objeto, o aluno se dirige ao espaço físico de Achados e Perdidos para retirá-lo.
Após a devolução, o responsável atualiza a situação do objeto para “Devolvido”.
O sistema salva a alteração no LocalStorage.
A nova situação passa a ser exibida nas consultas.
Fluxo resumido
text
Cadastro de usuário autorizado
            ↓
          Login
            ↓
Verificação dos dados de acesso
            ↓
Identificação do nível de acesso
            ↓
      ┌─────┴─────┐
      ↓           ↓
    Aluno     Responsável
      ↓           ↓
 Consultar     Gerenciar
  objetos       objetos
      ↓           ↓
 Pesquisar     Cadastrar
  e filtrar    e editar
      ↓           ↓
 Visualizar    Atualizar
  detalhes      situação
      ↓           ↓
 Identificar    Salvar no
  o objeto     LocalStorage
      ↓
Buscar na escola
      ↓
Atualizar para
   Devolvido

Regras de funcionamento
Regra 1 — Acesso ao sistema

O sistema deverá solicitar login para acessar as funcionalidades destinadas aos usuários cadastrados.

Regra 2 — Cadastro autorizado

Somente o responsável poderá cadastrar novos usuários pela interface do sistema.

Regra 3 — Níveis de permissão

As funcionalidades deverão variar de acordo com o nível de acesso do usuário.

Regra 4 — Cadastro de objetos

Somente o responsável poderá cadastrar novos objetos encontrados.

Regra 5 — Edição de objetos

Somente o responsável poderá editar informações ou atualizar a situação dos objetos.

Regra 6 — Consulta de objetos

O aluno poderá consultar, pesquisar, filtrar e visualizar os objetos cadastrados.

Regra 7 — Validação

O sistema deverá validar os campos obrigatórios antes de salvar usuários ou objetos.

Regra 8 — Identificadores

Cada usuário e cada objeto deverá possuir um identificador único.

Regra 9 — Persistência

As informações deverão permanecer salvas no LocalStorage após a atualização da página ou o fechamento do navegador, dentro das limitações desse mecanismo.

Regra 10 — Situação dos objetos

O sistema deverá permitir que o responsável altere a situação de um item entre “Disponível” e “Devolvido”.

Regra 11 — Sem backend

O projeto não deverá utilizar servidor próprio, backend ou processamento externo para suas funcionalidades principais.

Regra 12 — Sem banco de dados

Os dados deverão ser armazenados no LocalStorage, sem utilização de banco de dados externo.

Regra 13 — Funcionamento no navegador

A aplicação deverá funcionar por meio de um navegador web.

Regra 14 — Interface responsiva

As páginas deverão se adaptar a diferentes tamanhos de tela.

Regra 15 — Limitações de segurança

O sistema deverá deixar claro que o controle de acesso é didático e local, não sendo adequado para proteger informações sensíveis em um ambiente real.

E — Execution | Execução

Na prática, o sistema deverá executar as seguintes funcionalidades.

1. Login

O usuário acessa a tela de login e informa os dados solicitados.

O sistema verifica se existe um usuário correspondente no armazenamento local.

Se os dados forem válidos, o sistema identifica o nível de acesso e direciona o usuário para a área apropriada.

Se os dados forem inválidos, o sistema apresenta uma mensagem informando que não foi possível realizar o acesso.

O login será uma simulação didática realizada no navegador, sem autenticação segura por servidor.

2. Cadastro de usuários

O responsável acessa a área de gerenciamento de usuários e preenche os campos necessários.

Exemplo de informações:

text
Nome: Ana da Silva
Matrícula: 2026001
E-mail: ana@escola.edu.br
Telefone: (00) 00000-0000
Senha: [campo de senha]
Nível de acesso: Aluno


O sistema verifica os campos obrigatórios e se a matrícula já está cadastrada.

Após a validação, o usuário é salvo no LocalStorage.

Os dados do exemplo são ilustrativos e não representam um cadastro real.

3. Cadastro de objetos

O responsável acessa a área de cadastro de objetos.

Exemplo:

text
Nome: Garrafa azul
Categoria: Garrafas e recipientes
Características: Garrafa azul com tampa preta
Local do achado: Pátio da escola
Data do achado: 20/10/2026
Situação: Disponível
Foto: garrafa-azul


O sistema valida as informações e salva o objeto no LocalStorage.

Após o cadastro, o item deverá aparecer na listagem de objetos.

4. Pesquisa de objetos

O aluno informa o nome ou uma característica do objeto que perdeu.

Exemplo:

"Quero encontrar uma garrafa azul."

O sistema pesquisa os registros disponíveis e apresenta os objetos compatíveis.

A pesquisa deverá ser simples e permitir localizar itens mesmo quando o aluno não souber o nome exato do objeto.

5. Filtros

O aluno poderá combinar filtros para reduzir os resultados.

Exemplo:

text
Categoria: Garrafas e recipientes
Local: Pátio da escola
Situação: Disponível


O sistema deverá apresentar os objetos que correspondam aos critérios selecionados.

Quando nenhum item corresponder à pesquisa, deverá ser exibida uma mensagem informando que nenhum resultado foi encontrado.

6. Visualização de detalhes

Ao selecionar um objeto, o aluno poderá visualizar suas informações completas.

Exemplo:

Garrafa azul

Categoria: Garrafas e recipientes
Características: Garrafa azul com tampa preta
Local do achado: Pátio da escola
Data do achado: 20/10/2026
Situação: Disponível

A foto deverá ser apresentada quando estiver disponível.

7. Atualização da situação

Quando o aluno identificar o objeto e realizar sua retirada presencial, o responsável poderá atualizar o registro.

Exemplo:

text
Situação anterior: Disponível
Situação atual: Devolvido


O sistema deverá salvar a alteração e atualizar a interface.

8. Gerenciamento de usuários

O responsável poderá consultar os usuários cadastrados e realizar as ações de gerenciamento previstas no projeto.

Essas ações poderão incluir:

Visualizar os dados dos usuários.
Editar informações cadastrais.
Alterar o nível de acesso.
Excluir usuários, quando necessário.

O sistema deverá impedir que alunos executem essas ações pela interface.

9. Persistência dos dados

As informações deverão ser salvas localmente sempre que houver uma operação de cadastro, edição ou exclusão.

Ao atualizar a página, os dados deverão ser recuperados do LocalStorage.

Ao fechar e abrir novamente o navegador, os dados deverão continuar disponíveis no mesmo navegador e perfil, desde que não tenham sido apagados.

10. Tratamento de situações inesperadas

O sistema deverá apresentar mensagens claras quando ocorrerem situações como:

Campos obrigatórios não preenchidos.
Matrícula já cadastrada.
Usuário não encontrado.
Dados de login inválidos.
Nenhum objeto encontrado na pesquisa.
Falha ao salvar dados.
Foto ausente.
Objeto já marcado como devolvido.

Essas mensagens deverão ajudar o usuário a compreender o que aconteceu e como prosseguir.

Estrutura conceitual do projeto

A aplicação poderá possuir as seguintes páginas e áreas:

text
Achados e Perdidos Escolar
│
├── Login
│
├── Página inicial
│
├── Consulta de objetos
│   ├── Pesquisa
│   ├── Filtros
│   └── Detalhes do objeto
│
├── Área do responsável
│   ├── Painel de gerenciamento
│   ├── Cadastro de objetos
│   ├── Edição de objetos
│   ├── Atualização de situação
│   └── Gerenciamento de usuários
│
└── Armazenamento local
    ├── Usuários
    ├── Objetos
    └── Dados de acesso da sessão


A estrutura poderá ser adaptada durante o desenvolvimento, desde que respeite as funcionalidades e as regras estabelecidas neste documento.

Limitações do projeto

O Achados e Perdidos Escolar terá finalidade didática e será desenvolvido exclusivamente no Front-end.

Por isso, algumas limitações deverão ser consideradas:

Não haverá backend.
Não haverá banco de dados externo.
Não haverá API própria.
Não haverá integração com sistemas institucionais.
O controle de acesso será simulado localmente.
Não haverá garantia de segurança real das contas.
Os dados serão armazenados no navegador.
Os dados não serão sincronizados automaticamente entre dispositivos ou navegadores.
A limpeza dos dados do navegador poderá apagar as informações armazenadas.
O LocalStorage possui limites de armazenamento, especialmente para fotos.
O funcionamento dependerá do navegador e do dispositivo utilizados.

A aplicação não deverá ser apresentada como um sistema de autenticação seguro para uso institucional real.

Resultado esperado

Ao final do desenvolvimento, o Achados e Perdidos Escolar deverá ser uma aplicação web capaz de:

Permitir login de usuários cadastrados.
Diferenciar as permissões de Alunos e Responsáveis.
Cadastrar usuários autorizados.
Consultar usuários cadastrados.
Gerenciar informações de usuários por meio do responsável.
Cadastrar objetos encontrados.
Editar os dados dos objetos.
Registrar fotos dos objetos.
Informar o local e a data do achado.
Pesquisar objetos.
Filtrar resultados.
Exibir informações detalhadas.
Indicar se um objeto está disponível ou foi devolvido.
Manter os dados salvos no LocalStorage.
Recuperar os dados após atualizar a página.
Preservar os dados após fechar e abrir novamente o navegador, dentro das limitações do armazenamento local.
Funcionar por meio do navegador.
Apresentar uma interface organizada e responsiva.

O princípio central do projeto será facilitar a localização de objetos perdidos no ambiente escolar, permitindo que os alunos consultem as informações on-line antes de se dirigirem ao espaço físico de Achados e Perdidos.

A solução deverá manter o desenvolvimento simples, progressivo e organizado, respeitando as limitações técnicas do projeto e o nível de experiência da equipe.