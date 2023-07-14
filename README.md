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
- [X] Deve ser possível cadastrar um colaborador
- [X] Deve ser possível cadastrar um paciente
- [X] Deve ser possível se autenticar
- [X] Deve ser possível verificar as solicitações de cadastro
- [X] Deve ser possível requisitar um leito
- [X] Deve ser possível visualizar a lista de leitos (mapa)
- [X] Deve ser possível visualizar as requisições de leitos
- [X] Deve ser possível aprovar uma requisição de leito

- [ ] Deve ser possível visualizar dados de um leito
- [ ] Deve ser possível alterar dados de um leito

- [ ] Deve ser possível listar todos os usuários do sistema
- [ ] Deve ser possível alterar cargo do médico ( Geral <=> UTI )
- [ ] Deve ser possível visualizar os dados do usuário
- [ ] Deve ser possível alterar a senha

### Regras de Negócios
- [X] O usuário não deve poder se cadastrar com um e-mail e/ou CRM/COREN duplicado;
- [X] COREM => seis números + a categoria + a sigla COREN acompanhada do estado, exemplo: CRM-SP-000.000-XXX
- [X] CRM =>  seis números + a sigla CRM acompanhada do estado, exemplo: CRM/SP 123456
- [X] O usuário deve cadastrar uma senha com mais de 8 digitos
- [X] O usuário colaborador só poderá se autenticar caso ele seja aceito o pelo admin
- [X] Os usuários colaboradores não aceitos devem ser excluidos do Banco de Dados e os aceitos devem receber true no atributo 'approved'
- [X] Não deve ser possível alocar pacientes a leitos já ocupados
- [X] Leitos devem possuir apenas 3 status: 1 - Livre; 2 - Ocupado; 3 - Preparação

- [ ] Apenas "Medicos UTI" poderão aceitar solicitações e designar leitos
- [ ] Alterações referentes aos dados dos leitos, devem ser possível apenas para "Médico UTI"

- [ ] Solicitações de leitos possuêm o prazo de 48 horas
- [ ] Enfermeiros apenas poderão visualizar os dados
- [ ] Alterações de Cargo apenas para usuário admin

### Requisitos Não Funcionais
- [X] A senha do usuário precisa estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [X] Todas listas de dados precisam estar paginadas com 30 itens por página

## Como inicializar

### Passo 1 -- Inicialização

