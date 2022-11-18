/// <reference types="cypress"/>

import { faker } from '@faker-js/faker'
import productreviewSchema from '../../contratos/productreview'
import productDeleteSchema from '../../contratos/productdelete'
import statusFixtures from '../../fixtures/status.json'

describe('Product Review - WooCommerce', () => {
    const product_id = 22
    const reviewer = "John Doe"
    const reviewer_email = "john.doe@example.com"
    const rating = 5
    
    
/** Primeiro teste, utilizado para validar o metodo do tipo POST:
 * recebe alguns paramentros fixos como, product_id, reviewer, reviewer_email e rating
 * e um paramentro altera a cada vez utilizando faker, o review
 * Retorna status 201 se for criado com sucesso
 */
    it('Create Product Review - Aceitação', () => {
        const review = faker.word.adjective()
            cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((postProductReviewResponse) => {
                const id = postProductReviewResponse.body.id;
                    expect(postProductReviewResponse.status).to.be.eq(statusFixtures.created)
                    expect(postProductReviewResponse.body.product_id).to.be.eq(product_id)
                        cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                            return productDeleteSchema.validateAsync(deleteProductReviewResponse.body)
            })
            
            })
    })
/** Segundo teste, feito para validar se o contrato está sendo cumprido e retornando os campos obrigatórios
 */
    it('Cadastro de Product Review - Contrato', () => {
        const review = faker.word.adjective()
            cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((postProductReviewResponse) => {
                const id = postProductReviewResponse.body.id;
                return productreviewSchema.validateAsync(postProductReviewResponse.body).then(
                    cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                        return productDeleteSchema.validateAsync(deleteProductReviewResponse.body)       
            }))
        })
    })
/** Terceiro teste, utilizado para validar o metodo do tipo PUT:
 * recebe por parametro o id do review a ser editado e a nova nota
 * Retorna status 200 se for editado com sucesso
 */
    it('Update Product Review - Aceitação', () => {
        const review = faker.word.adjective()
        const newrating = Math.floor(Math.random()*10);
            cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((response) => {
                const id = response.body.id
                    cy.putProductReviewWooCommerce(newrating, id).should((putProductReviewResponse) => {
                        expect(putProductReviewResponse.status).to.be.eq(statusFixtures.ok)
                        expect(putProductReviewResponse.body.id).to.be.eq(id)
                        expect(putProductReviewResponse.body.rating).to.be.eq(newrating)
                            cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                                return productDeleteSchema.validateAsync(deleteProductReviewResponse.body)           
            })
        })
    })
    })

/** TQuarto teste, utilizado para validar o metodo do tipo DELETE:
 * recebe por parametro o id do review a ser deletado
 * Retorna status 200 se for deletado com sucesso
 */
    it.only('Delete shipping zone - Aceitação', () => {
        const review = faker.word.adjective()
            cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((response) => {
                cy.deleteProductReviewWooCommerce(response.body.id).should((deleteProductReviewResponse) => {
                    expect(deleteProductReviewResponse.status).to.be.eq(statusFixtures.ok)
                    expect(deleteProductReviewResponse.body.deleted).to.be.eq(true) 
                    return productDeleteSchema.validateAsync(deleteProductReviewResponse.body)   
            })
        })
    })

    
})