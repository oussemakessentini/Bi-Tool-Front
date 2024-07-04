describe('Dashboard', () => {
  
  it('should load the dashboard page', () => {
    cy.intercept('GET', 'http://localhost:5000/item/getDashboardItems/11').as('getItems');
    cy.intercept('GET', 'http://localhost:4000/cubejs-api/v1/load**').as('cubejsRequest');

    cy.visit('http://localhost:3000/dashboardTwo/11');
    cy.wait('@getItems').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.wait('@cubejsRequest').then(interception => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});

