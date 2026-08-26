#language: pt

@cadastro
Funcionalidade: Cadastro de novo usuário
  Como um visitante do Seu Barriga
  Quero me cadastrar informando nome, e-mail e senha
  Para acessar a aplicação com uma conta própria

  Contexto:
    Dado que o usuário acessa a tela de cadastro

  @CT01 @positivo @smoke @regressivo
  Cenário: Exibir os elementos da tela de cadastro
    Então o título da página deve ser "Seu Barriga - Novo Usuário"
    E o menu deve exibir os links "Seu Barriga", "Login" e "Novo usuário?"
    E a aba "Novo usuário?" deve estar destacada como ativa
    E o formulário deve exibir os campos "Nome", "Email" e "Senha"
    E o botão "Cadastrar" deve estar visível e habilitado

  @positivo @smoke @regressivo
  Esquema do Cenário: Cadastrar usuário com dados válidos
    Quando o usuário preenche o cadastro com nome "<nome>", email "novo" e senha "<senha>"
    E aciona o botão "Cadastrar"
    Então o sistema deve exibir a mensagem "Usuário inserido com sucesso"

    @CT02 @smoke
    Exemplos: nome simples
      | nome        | senha    |
      | Maria Silva | Senha123 |

    @CT14
    Exemplos: nome com acentos e espaços
      | nome              | senha    |
      | José da Conceição | Senha123 |

  @CT03 @negativo @obrigatoriedade @regressivo
  Cenário: Tentar cadastrar com todos os campos vazios
    Quando o usuário deixa os campos "Nome", "Email" e "Senha" em branco
    E aciona o botão "Cadastrar"
    Então o sistema deve exibir a mensagem "Nome é um campo obrigatório"
    E deve exibir a mensagem "Email é um campo obrigatório"
    E deve exibir a mensagem "Senha é um campo obrigatório"
    E o cadastro não deve ser concluído

  @negativo @obrigatoriedade @regressivo
  Esquema do Cenário: Tentar cadastrar com um campo obrigatório em branco
    Quando o usuário preenche o cadastro com nome "<nome>", email "<email>" e senha "<senha>"
    E aciona o botão "Cadastrar"
    Então o sistema deve exibir a mensagem "<mensagem>"
    E o cadastro não deve ser concluído

    @CT04
    Exemplos: nome em branco
      | nome | email | senha    | mensagem                    |
      |      | novo  | Senha123 | Nome é um campo obrigatório |

    @CT05
    Exemplos: email em branco
      | nome        | email | senha    | mensagem                     |
      | Maria Silva |       | Senha123 | Email é um campo obrigatório |

    @CT06
    Exemplos: senha em branco
      | nome        | email | senha | mensagem                     |
      | Maria Silva | novo  |       | Senha é um campo obrigatório |

  @CT07 @negativo @duplicidade @regressivo
  Cenário: Tentar cadastrar com e-mail já utilizado
    Dado que já existe um usuário cadastrado com o e-mail "usuario.existente@teste.com"
    Quando o usuário preenche o cadastro com nome "Outro Nome", email "usuario.existente@teste.com" e senha "Senha123"
    E aciona o botão "Cadastrar"
    Então o sistema deve exibir a mensagem "Endereço de email já utilizado"
    E o cadastro não deve ser concluído

  @CT08 @negativo @formato @regressivo
  Cenário: Tentar cadastrar com e-mail em formato inválido
    Quando o usuário preenche o cadastro com nome "Maria Silva", email "emailinvalido" e senha "Senha123"
    E aciona o botão "Cadastrar"
    Então o cadastro não deve ser concluído
    E o sistema deve impedir o envio por formato de e-mail inválido

  @CT09 @positivo @seguranca @regressivo
  Cenário: Mascarar o valor digitado no campo Senha
    Quando o usuário preenche o campo "Senha" com "Senha123"
    Então os caracteres digitados devem ser exibidos de forma mascarada
    E o valor em texto puro não deve ficar visível na tela

  @positivo @navegacao @regressivo
  Esquema do Cenário: Navegar pelos links do menu
    Quando o usuário aciona o link "<link>"
    Então o sistema deve redirecionar para a rota "<rota>"

    @CT10
    Exemplos: login
      | link  | rota   |
      | Login | /login |

    @CT11
    Exemplos: pagina inicial
      | link        | rota   |
      | Seu Barriga | /login |

  @CT12 @positivo @ui @regressivo
  Esquema do Cenário: Exibir placeholders dos campos do formulário
    Então o campo "<campo>" deve exibir o placeholder "<placeholder>"

    Exemplos:
      | campo | placeholder |
      | Nome  | Nome        |
      | Email | Email       |
      | Senha | Password    |

  @CT13 @positivo @ui @regressivo
  Cenário: Manter a aba Novo usuário destacada na tela de cadastro
    Então o item de menu "Novo usuário?" deve permanecer visível
    E deve estar destacado como a opção ativa da navegação
    E o usuário deve permanecer na rota "/cadastro"

  @CT15 @positivo @integracao @regressivo
  Cenário: Autenticar com o usuário recém-cadastrado
    Dado que o usuário concluiu um cadastro válido com e-mail e senha conhecidos
    Quando o usuário acessa a tela de login
    E informa o mesmo e-mail e a mesma senha utilizados no cadastro
    E aciona o botão de entrar
    Então o acesso deve ser concedido
    E a área logada da aplicação deve ser exibida

  @CT16 @negativo @ui @regressivo
  Cenário: Manter o formulário visível após erro de validação
    Quando o usuário deixa os campos "Nome", "Email" e "Senha" em branco
    E aciona o botão "Cadastrar"
    Então as mensagens de campo obrigatório devem ser exibidas
    E os campos "Nome", "Email" e "Senha" devem permanecer visíveis
    E o botão "Cadastrar" deve permanecer disponível para nova tentativa

  @CT17 @positivo @ui @regressivo
  Cenário: Conferir rótulos do campo de senha
    Então o rótulo do campo deve ser "Senha"
    E o placeholder do mesmo campo deve ser "Password"
    E o botão de envio deve estar rotulado como "Cadastrar"
