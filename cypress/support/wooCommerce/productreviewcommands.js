/// <reference types="cypress"/>

import token from '../../fixtures/token.json'

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

Cypress.Commands.add('getProductReviewWooCommerce', () => {
    cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl') + "/products/reviews" ,
        headers: {
            Authorization: token.token
        },
        
    })
})

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

Cypress.Commands.add('deleteProductReviewWooCommerce', (id) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.config('baseUrl') + `/products/reviews/${id}?force=true`,
        headers: {
            Authorization: token.token
        },
        
    })
})