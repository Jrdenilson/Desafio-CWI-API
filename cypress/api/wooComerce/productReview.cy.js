/// <reference types="cypress"/>

import { faker } from '@faker-js/faker'
import productreviewSchema from '../../contratos/productreview'

describe('Product Review ', () => {
    const product_id = 22
    const reviewer = "John Doe"
    const reviewer_email = faker.internet.email()
    const rating = 5
    
    

    it('Create Product Review - Aceitação', () => {
        const review = faker.word.adjective()
        cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((postProductReviewResponse) => {
            const id = postProductReviewResponse.body.id;
            expect(postProductReviewResponse.status).to.be.eq(201)
            expect(postProductReviewResponse.body.product_id).to.be.eq(product_id)
            cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.be.eq(200)
                expect(deleteProductReviewResponse.body.deleted).to.be.eq(true)           
            })
            
            })
    })

    it('Cadastro de Product Review - Contrato', () => {
        const review = faker.word.adjective()
        cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((postProductReviewResponse) => {
            const id = postProductReviewResponse.body.id;
            return productreviewSchema.validateAsync(postProductReviewResponse.body).then(
            cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.be.eq(200)
                expect(deleteProductReviewResponse.body.deleted).to.be.eq(true)           
            }))
        })
    })

    it('Update Product Review - Aceitação', () => {
        const review = faker.word.adjective()
        const newrating = Math.floor(Math.random()*100);
        cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((response) => {
        const id = response.body.id
        cy.putProductReviewWooCommerce(newrating, id).should((putProductReviewResponse) => {
            expect(putProductReviewResponse.status).to.be.eq(200)
            expect(putProductReviewResponse.body.id).to.be.eq(id)
            expect(putProductReviewResponse.body.rating).to.be.eq(newrating)
            cy.deleteProductReviewWooCommerce(id).should((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.be.eq(200)
                expect(deleteProductReviewResponse.body.deleted).to.be.eq(true)           
            })
        })
    })
    })

    it('Delete shipping zone - Aceitação', () => {
        const review = faker.word.adjective()
        cy.postProductReviewWooCommerce(product_id, review, reviewer, reviewer_email, rating).should((response) => {
            cy.deleteProductReviewWooCommerce(response.body.id).should((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.be.eq(200)
                expect(deleteProductReviewResponse.body.deleted).to.be.eq(true)          
            })
        })
    })

    
})