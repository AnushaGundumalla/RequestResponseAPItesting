describe('ReqResAPItesting', () => {
    Cypress.config('baseUrl', 'https://reqres.in/')

    it('GET - read', () => {
        cy.request('/api/users/2').then((response) => {
            expect(response).to.have.property('status',200)
            expect(response).to.have.property('statusText','OK')
            expect(response.body).to.not.be.null
            expect(response.duration).to.not.be.null
           // expect(response).to.have.property('duration',47)
        })
    })
    
    it('POST - create', () => {
        const details = {
            "name": "Anusha",
            "job": "Software"
        }
        cy.request('POST', '/api/users', details )//.its('status').should('eq', 201)
        .its('body')
        .should('include', {name:'Anusha'})
    })
   
   it('PUT - update', () => {
    const details = {
        "name": "Venkata"
    }
    cy.request('PUT', '/api/users/2', details )
   })

   it('PATCH - update', () => {
    const details = {
        "job": "Test Engineer"
    }
    cy.request('PATCH', '/api/users/2', details )
   })


   it('DELETE - remove', () => {
    const details = {
        "name": "Anusha",
            "job": "Software"
    }
    cy.request('DELETE', '/api/users/2', details ).its('status').should('eq', 204)
   })

})