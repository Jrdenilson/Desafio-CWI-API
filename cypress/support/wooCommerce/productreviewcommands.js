/// <reference types="cypress"/>

import token from '../../fixtures/token.json'
/**Criação de comando de requisição do tipo POST para criar um novo review recebendo como parametros:
 * id do produto, um comentario sobre, nome de quem fez o comentario, email e nota dada
 * Acessa a URL "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3/products/reviews" enviar o corpo da requisição e recebe status 201 se for criado com sucesso
 */
Cypress.Commands.add('postProductReviewWooCommerce', (id, review, reviewer, reviewer_email, rating) => {
    cy.request({
        method: 'POST',
        url: Cypress.config('baseUrl') + '/products/reviews',
        headers: {
            ContentType: "application/json",
            Authorization: token.token
        },
        body: {
            product_id: id,
            review: review,
            reviewer: reviewer,
            reviewer_email: reviewer_email,
            rating: rating
        }
    })
})
/**Criação de comando de requisição do tipo GET para receber informaões de um review existente, recebendo como parametros:
 * id do review
 * Acessa a URL "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3/products/reviews/ + id" não envia corpo na requisição e recebe status 200 se receber o review
 * NÃO FOI USADO NESSA APLICAÇÃO
 */
Cypress.Commands.add('getProductReviewWooCommerce', (id) => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl') + "/products/reviews/" + id ,
        headers: {
            Authorization: token.token
        },
        
    })
})

/**Criação de comando de requisição do tipo PUT para editar um review ja existente recebendo como parametros:
 * id do review e nova nota de avaliação
 * Acessa a URL "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3/products/reviews/ + id" enviar o corpo da requisição e recebe status 200 se for editado com sucesso
 */
Cypress.Commands.add('putProductReviewWooCommerce', (rating, id) => {
    cy.request({
        method: 'PUT',
        url: Cypress.config('baseUrl') + '/products/reviews/' + id,
        headers: {
            Authorization: token.token
        },
        body: {
            rating: rating 
        }
    })
})

/**Criação de comando de requisição do tipo DELETE para deletar um review existente recebendo como parametros:
 * id do review
 * Acessa a URL "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3/products/reviews/ + id + ?force=true" não envia corpo da requisição e recebe status 200 se for deletado com sucesso
 */
Cypress.Commands.add('deleteProductReviewWooCommerce', (id) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.config('baseUrl') + `/products/reviews/${id}?force=true`,
        headers: {
            Authorization: token.token
        },
        
    })
})