import React from 'react'
import { EventInfo } from './EventInfo'

describe('<EventInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EventInfo />)
  })
})