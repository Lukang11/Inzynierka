import React from 'react'
import Login from './Login'
import TestWrapper from '../../test/TestWrapper'
describe('Login Component', () => {
  it('Should log in successfully', () => {
    cy.mount(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    // Your test assertions here
  });
});