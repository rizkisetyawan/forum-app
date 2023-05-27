/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Your email"]').should('be.visible');
    cy.get('input[placeholder="Your password"]').should('be.visible');
    cy.get('button[data-button="true"]')
      .find('span.mantine-Button-label')
      .should('be.visible')
      .and('contain', 'Sign in');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('button[data-button="true"]')
      .find('span.mantine-Button-label')
      .should('be.visible')
      .and('contain', 'Sign in')
      .click();

    // memverifikasi notifikasi error untuk menampilkan pesan dari API
    cy.get('div.mantine-Notification-description')
      .should('be.visible')
      .and('contain', '"email" is not allowed to be empty');
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Your email"]').type('testuser@gmail.com');

    // klik tombol login tanpa mengisi email
    cy.get('button[data-button="true"]')
      .find('span.mantine-Button-label')
      .should('be.visible')
      .and('contain', 'Sign in')
      .click();

    // memverifikasi notifikasi error untuk menampilkan pesan dari API
    cy.get('div.mantine-Notification-description')
      .should('be.visible')
      .and('contain', '"password" is not allowed to be empty');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Your email"]').type('testuser@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Your password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button[data-button="true"]')
      .find('span.mantine-Button-label')
      .should('be.visible')
      .and('contain', 'Sign in')
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.get('div.mantine-Notification-description')
      .should('be.visible')
      .and('contain', 'email or password is wrong');
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Your email"]').type('rizkisetyawan.dev@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Your password"]').type('rizkisetyawan');

    // menekan tombol Login
    cy.get('button[data-button="true"]')
      .find('span.mantine-Button-label')
      .should('be.visible')
      .and('contain', 'Sign in')
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('img.mantine-Avatar-image')
      .should('be.visible')
      .invoke('attr', 'alt')
      .should('contain', 'rizkisetyawan.dev@gmail.com');
  });
});
