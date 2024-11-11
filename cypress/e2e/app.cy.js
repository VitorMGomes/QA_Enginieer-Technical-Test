describe('Cart Checking', () => {

  // Test to add a product to the cart
  describe('Add Product to Cart', () => {

    let maxStock;
    const excessQuantity = 1;
    let N = 1;

    it('Given I am on a product page with available stock', () => {
      cy.visit('http://www.automationpractice.pl/index.php?id_product=7&controller=product#/16-color-yellow/2-size-m');

      // Verify if the product is available in stock
      cy.get('#availability_value').should('have.text', 'In stock');
    });

    it('When I add N units of the product to the cart', () => {
      cy.get('#quantityAvailable').invoke('text').then((text) => {
        const availableStock = parseInt(text.trim(), 10);

        // Create a random value between available stock and 1
        N = Math.floor(Math.random() * availableStock) + 1;
        maxStock = availableStock;

        // Add N units to the cart
        cy.get('#quantity_wanted').clear().type(N);
        cy.get('#add_to_cart button').click();
      });
    });

    it('Then I should see the option to go to cart page', () => {
      // Verify if the options to continue shopping or go to cart are visible
      cy.get('.layer_cart_cart').should('be.visible');
      
      // Check if "Proceed to Checkout" button is visible
      cy.get('.button-container a[title="Proceed to checkout"]').should('be.visible');
    });

    it('And upon going to the cart page', () => {
      // Click on the "Proceed to Checkout" button
      cy.get('.button-container a[title="Proceed to checkout"]').click();
    });

    it('Then the cart should contain N units of the product  ', () => {
      // Check if the cart quantity is correct
      cy.get('.cart_quantity_input').should('have.value', N.toString());
    });
  });

  // Test to reload the cart page and verify product consistency
  describe('Reload the Page and Check Persistence of Items', () => {

    let priceBefore; // Save total price before reload for comparison
    let priceAfter; // Save total price after reload for comparison

    it('Given I am on the cart page with items already added', () => {

      cy.visit('http://www.automationpractice.pl/index.php?controller=order');

      cy.get('#total_price').invoke('text').then((text) => { // Get the total price
        const priceText = text.replace(/[^\d]/g, ''); // Remove all characters except numbers
        priceBefore = parseInt(priceText, 10);
      });
      
    });

    it('When I reload the page', () => {
      cy.reload(); // Reload the page
    });

    it('Then I should see if there is no product missing', () => {
      cy.get('#total_price').invoke('text').then((text) => { // Get the total price after reload
        const priceText = text.replace(/[^\d]/g, ''); // Remove all characters except numbers
        priceAfter = parseInt(priceText, 10);
      });

      // Compare prices before and after reload; if any product or quantity is missing or extra, the prices will change
      expect(priceAfter === priceBefore);

    });

  });

  // Test to remove all products from the cart
  describe('Remove all products from the cart', () => {
  
    it('Given I am on the cart page with items added', () => {
      cy.visit('http://www.automationpractice.pl/index.php?controller=order'); // Cart URL
    });
  
    it('When I click the button to remove all products', () => {
      // While the cart is not empty, click on delete buttons
      cy.get('.cart_quantity_delete').each(($el) => {
        cy.wrap($el).click();
      });
    });
  
    it('Then I should see a message indicating that the cart is empty', () => {
      // Check if the message "Your shopping cart is empty" is visible
      cy.contains('Your shopping cart is empty').should('be.visible');
    });
  
  });

});
