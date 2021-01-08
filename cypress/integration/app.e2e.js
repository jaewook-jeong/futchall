describe('Action Test', () => {
  it('Click into main', () => {
    cy.visit('/');
    cy.get('.ant-col > .ant-btn').click()
  })
})