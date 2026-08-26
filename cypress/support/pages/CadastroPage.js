const CAMPOS = {
  Nome: '#nome',
  Email: '#email',
  Senha: '#senha',
}

class CadastroPage {
  seletorCampo(nomeCampo) {
    const seletor = CAMPOS[nomeCampo]

    if (!seletor) {
      throw new Error(`Campo não mapeado: ${nomeCampo}`)
    }

    return seletor
  }

  visitar(url = '/cadastro') {
    cy.visit(url)
  }

  preencherCampo(nomeCampo, valor) {
    cy.get(this.seletorCampo(nomeCampo)).clear().type(valor)
  }

  preencherOuLimpar(nomeCampo, valor) {
    if (!valor || String(valor).trim() === '') {
      this.deixarCampoEmBranco(nomeCampo)
      return
    }

    this.preencherCampo(nomeCampo, valor)
  }

  preencherCadastro(nome, email, senha) {
    this.preencherOuLimpar('Nome', nome)

    if (email === 'novo') {
      const emailGerado = this.gerarEmailUnico()
      cy.wrap(emailGerado).as('emailCadastro')
      this.preencherCampo('Email', emailGerado)
    } else {
      this.preencherOuLimpar('Email', email)
    }

    this.preencherOuLimpar('Senha', senha)
  }

  deixarCampoEmBranco(nomeCampo) {
    cy.get(this.seletorCampo(nomeCampo)).clear()
  }

  deixarCamposEmBranco(...nomes) {
    nomes.forEach((nome) => this.deixarCampoEmBranco(nome))
  }

  acionarBotao(rotulo) {
    cy.get(`input[type="submit"][value="${rotulo}"]`).click()
  }

  acionarLink(texto) {
    cy.contains('a', texto).click()
  }

  gerarEmailUnico() {
    return `qa.${Date.now()}.${Cypress._.random(1000, 9999)}@teste.com`
  }
}

export default new CadastroPage()
