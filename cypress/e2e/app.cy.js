describe('Automation Practice', () => {

  describe('Signing-in with an empty email', () => {

    it('Given the user is on the login page', () => {
      // Navigate to the login page
      cy.visit('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('When the user leaves the email box empty', () => {
      // Clear any pre-filled content in the email input
      cy.get('#email_create').clear();
    });

    it('And clicks Submit', () => {
      // Click the "Create an account" button
      cy.get('#SubmitCreate').click();
    });

    it('Then the user should see the error message', () => {
      // Verify that the error message is visible and contains the expected text
      cy.get('#create_account_error')
        .should('be.visible')
        .and('contain.text', 'Invalid email address.');
    });

  });

  describe('Creating an account with an already used email', () => {

    it('Given the user is on the login page', () => {
      // Navigate to the login page
      cy.visit('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('When the user enters an already used email', () => {
      // Insert a registered email
      cy.get('#email_create').type('pato@gmail.com');
    });

    it('And clicks Submit', () => {
      // Click the "Create an account" button
      cy.get('#SubmitCreate').click();
    });

    it('Then the user should see the error message', () => {
      // Verify that the error message is visible and contains the expected text
      cy.get('#create_account_error').should('be.visible')
        .and('contain.text', 'An account using this email address has already been registered. Please enter a valid password or request a new one.');
    });

  });

  describe('Login with an existing email and blank password', () => {

    it('Given the user is on the login page', () => {
      // Navigate to the login page
      cy.visit('http://www.automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('When the user enters an already registered email', () => {
      // Insert a registered email
      cy.get('#email').type('pato@gmail.com');
    });

    it('And leaves the password blank', () => {
      // Verify that the password field is empty
      cy.get('#passwd').should('have.value', '');
    });

    it('And clicks Sign in', () => {
      // Click the "Sign in" button
      cy.get('#SubmitLogin').click();
    });

    it('Then the user should see the error message', () => {
      // Verify that the error message is visible and contains the expected text
      cy.get('.alert-danger').should('be.visible').and('contain.text', 'Password is required');
    });

  });

});

describe('Cart Checking', () => {

  describe('Add Product to Cart', () => {

    let maxStock;
    const excessQuantity = 1;
    let N = 1;

    it('Given the user is on a product page with available stock', () => {
      // Navigate to a product page
      cy.visit('http://www.automationpractice.pl/index.php?id_product=7&controller=product#/16-color-yellow/2-size-m');

      // Verify if the product is available in stock
      cy.get('#availability_value').should('have.text', 'In stock');
    });

    it('When the user adds N units of the product to the cart', () => {
      // Retrieve available stock, then select a random quantity within stock limits to add
      cy.get('#quantityAvailable').invoke('text').then((text) => {
        const availableStock = parseInt(text.trim(), 10);
        N = Math.floor(Math.random() * availableStock) + 1;
        maxStock = availableStock;

        // Add N units to the cart
        cy.get('#quantity_wanted').clear().type(N);
        cy.get('#add_to_cart button').click();
      });
    });

    it('Then the user should see the option to go to the cart page', () => {
      // Verify that the options to continue shopping or go to cart are visible
      cy.get('.layer_cart_cart').should('be.visible');
      cy.get('.button-container a[title="Proceed to checkout"]').should('be.visible');
    });

    it('And upon going to the cart page', () => {
      // Click on the "Proceed to Checkout" button
      cy.get('.button-container a[title="Proceed to checkout"]').click();
    });

    it('Then the cart should contain N units of the product', () => {
      // Verify that the cart quantity matches the selected quantity
      cy.get('.cart_quantity_input').should('have.value', N.toString());
    });
  });

  describe('Reload the Page and Check Persistence of Items', () => {

    let priceBefore; // Save total price before reload for comparison
    let priceAfter;  // Save total price after reload for comparison

    it('Given the user is on the cart page with items already added', () => {
      // Navigate to the cart page
      cy.visit('http://www.automationpractice.pl/index.php?controller=order');

      // Retrieve the total price for later comparison
      cy.get('#total_price').invoke('text').then((text) => {
        const priceText = text.replace(/[^\d]/g, '');
        priceBefore = parseInt(priceText, 10);
      });
    });

    it('When the user reloads the page', () => {
      // Reload the page
      cy.reload();
    });

    it('Then the cart should still contain all previously added items', () => {
      // Retrieve the total price again and compare to the previous price
      cy.get('#total_price').invoke('text').then((text) => {
        const priceText = text.replace(/[^\d]/g, '');
        priceAfter = parseInt(priceText, 10);
      });

      expect(priceAfter === priceBefore);
    });

  });

  describe('Remove all products from the cart', () => {

    it('Given the user is on the cart page with items added', () => {
      // Navigate to the cart page
      cy.visit('http://www.automationpractice.pl/index.php?controller=order');
    });

    it('When the user clicks the buttons to remove all products', () => {
      // Remove each product from the cart
      cy.get('.cart_quantity_delete').each(($el) => {
        cy.wrap($el).click();
      });
    });

    it('Then the user should see a message indicating that the cart is empty', () => {
      // Verify that the "Your shopping cart is empty" message is visible
      cy.contains('Your shopping cart is empty').should('be.visible');
    });

  });

});
