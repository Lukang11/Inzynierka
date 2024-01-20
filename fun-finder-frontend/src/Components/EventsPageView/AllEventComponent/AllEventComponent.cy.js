import React from 'react'
import AllEventComponent from './AllEventComponent'

describe('<AllEventComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AllEventComponent />)
  })
})