# Projeto Final NodeJs
Projeto final da disciplina COM222 - Desenvolvimento de Sistemas Web da Universidade Federal de Itajubá.

Esse projeto visa a criação de um sistema web para gerenciamento de leitos de UTI.

## Desenvoledores
[Matheus Robusti Henriques Marqui](https://github.com/Mathenriques)

[Camila]()

[Isaac]()

[Marcelo]()

## Requisitos & Regras de Negócios
### Requisitos Funcionais
- [ ] Deve ser possível se cadastrar
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível verificar as solicitações de cadastro
- [ ] Deve ser possível visualizar os dados do usuário
- [ ] Deve ser possível alterar a senha
- [ ] Deve ser possível requisitar um leito
- [ ] Deve ser possível aprovar uma requisição de leito
- [ ] Deve ser possível visualizar a lista de leitos (mapa)
- [ ] Deve ser possível visualizar dados de um leito
- [ ] Deve ser possível alterar dados de um leito
- [ ] Deve ser possível alterar cargo do médico ( Solicitante <=> Intensivista )
- [ ] Deve ser possível listar todos os usuários do sistema

### Regras de Negócios
- [ ] O usuário não deve poder se cadastrar com um e-mail e/ou CRM/COREN duplicado;
- [ ] COREM => seis números + a categoria + a sigla COREN acompanhada do estado, exemplo: CRM-SP-000.000-XXX
- [ ] CRM =>  seis números + a sigla CRM acompanhada do estado, exemplo: CRM/SP 123456
- [ ] O usuário deve cadastrar uma senha com mais de 8 digitos
- [ ] O usuário só poderá se autenticar caso ele seja aceito o pelo admin
- [ ] Os usuários não aceitos devem ser excluidos do Banco de Dados e os aceitos devem receber a flag 1 no atributo '....'
- [ ] Enfermeiros apenas poderão visualizar os dados
- [ ] Apenas "Medicos Intensivistas" poderão aceitar solicitações e designar leitos
- [ ] Não deve ser possível alocar pacientes a leitos já ocupados
- [ ] Alterações referentes aos dados dos leitos, devem ser possível apenas para "Médico Intensivista"
- [ ] Leitos possuem apenas 3 status: 1 - Livre; 2 - Ocupado; 3 - Preparação
- [ ] Solicitações de leitos possuêm o prazo de 48 horas
- [ ] Alterações de Cargo apenas para usuário admin

### Requisitos Não Funcionais
- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 30 itens por página

## Como inicializar

...