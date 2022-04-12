/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Requisitos de la App', () => {
  beforeEach(() => {
    // Visit URL before running test suite
    cy.visit('http://localhost:3000/');
  });

  it.only('Inicialmente el botton de submit se encuentra deshabilitado', () => {
    cy.get('[type="submit"]').should('be.disabled');
  });

  it.only('La Mock Data del server para Cosme Fulanito se carga correctamente en el estado inicial', () => {
    cy.get('.lista-container > :nth-child(3)').should('contains.text', 'Cosme');
    cy.get('.lista-container > :nth-child(3)').should(
      'contains.text',
      'Fulanito'
    );
    cy.get('.lista-container > :nth-child(3)').should(
      'contains.text',
      '742 Evergreen Terrance'
    );
    cy.get('.lista-container > :nth-child(3)').should(
      'contains.text',
      '333-22-4444'
    );
  });

  it.only('El botton de submit se habilita sólo cuando el form se llena con información correcta', () => {
    const newPersonaItem = {
      firstName: 'AA',
      lastName: 'BB',
      address: 'CC',
      ssn: '000-11-2222',
    };
    cy.get('[type="submit"]').should('be.disabled');
    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('[type="submit"]').should('be.disabled');
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('[type="submit"]').should('be.disabled');
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('[type="submit"]').should('be.disabled');
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    cy.get('[type="submit"]').should('be.enabled');
  });

  it.only('Se puede agregar una nueva persona correctamente a la lista', () => {
    // We'll store our item text in a variable so we can reuse it
    const newPersonaItem = {
      firstName: 'Pedro',
      lastName: 'Gomez',
      address: 'CalleFalsa 123',
      ssn: '123-12-1234',
    };

    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    // Submit Form
    cy.get('form').submit();
    // Check that the item has been created and is now displayed
    cy.get('.lista-container > :nth-child(4)').should('contain.text', 'Pedro');
    cy.get('.lista-container > :nth-child(4)').should('contain.text', 'Gomez');
    cy.get('.lista-container > :nth-child(4)').should(
      'contain.text',
      'CalleFalsa 123'
    );
    cy.get('.lista-container > :nth-child(4)').should(
      'contain.text',
      '123-12-1234'
    );
  });

  it.only('Aviso de carga exitosa con popup', () => {
    const newPersonaItem = {
      firstName: 'NewGuy',
      lastName: 'NewLast',
      address: 'CalleFalsa 789',
      ssn: '321-12-4321',
    };

    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    // Submit Form
    cy.get('form').submit();
    // A toastify pop-up with the correct error message shows up
    cy.get('.Toastify__toast-body').should(
      'contains.text',
      'Persona agregada exitosamente'
    );
  });

  it.only('El boton reset debe vaciar los campos del formulario', () => {
    // cargamos el estado del form con data
    const newPersonaItem = {
      firstName: 'MismoSSN',
      lastName: 'QueCosmeFulanito',
      address: 'CalleFalsa 456',
      ssn: '333-22-4444',
    };

    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    // apretamos el boton Reset
    cy.get('.btn-reverse').click();

    // todos los campos del form deben estar vacíos
    cy.get('#firstName').should('have.value', '');
    cy.get('#lastName').should('have.value', '');
    cy.get('#address').should('have.value', '');
    cy.get('#ssn').should('have.value', '');
  });

  it.only('Navegar a la pagina About funciona correctamente', () => {
    // Clickear About en la Navbar
    cy.get(':nth-child(2) > a').click();
    cy.location('pathname').should('match', /\/about$/);
  });

  it.only('No se puede agregar a una persona que tenga un SSN ya existente a la lista', () => {
    const newPersonaItem = {
      firstName: 'MismoSSN',
      lastName: 'QueCosmeFulanito',
      address: 'CalleFalsa 456',
      ssn: '333-22-4444',
    };

    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    // Submit Form
    cy.get('form').submit();
    // A toastify pop-up with the correct error message shows up
    cy.get('.Toastify__toast-body').should('contains.text', 'Duplicate SSN');
  });

  it.only('Aviso de errores con popup', () => {
    const newPersonaItem = {
      firstName: 'MismoSSN',
      lastName: 'QueCosmeFulanito',
      address: 'CalleFalsa 456',
      ssn: '333-22-4444',
    };

    // Input data into corresponding form fields
    // https://on.cypress.io/selecting-elements
    cy.get('#firstName').type(`${newPersonaItem.firstName}{enter}`);
    cy.get('#lastName').type(`${newPersonaItem.lastName}{enter}`);
    cy.get('#address').type(`${newPersonaItem.address}{enter}`);
    cy.get('#ssn').type(`${newPersonaItem.ssn}{enter}`);
    // Submit Form
    cy.get('form').submit();
    // A toastify pop-up with the correct error message shows up
    cy.get('.Toastify__toast-body').should('contains.text', 'Duplicate SSN');
  });
});
