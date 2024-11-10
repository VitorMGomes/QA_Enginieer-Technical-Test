describe('Cart Checking', () => {

  describe('Add product to cart', () => {

    let maxStock;
    const excessQuantity = 1;
    let N = 1;

    it('Given I am on a product page with available stock', () => {
      cy.visit('http://www.automationpractice.pl/index.php?id_product=7&controller=product#/16-color-yellow/2-size-m');

      // Verifica se o produto está disponível em estoque
      cy.get('#availability_value').should('have.text', 'In stock');
    });

    it('When I add N units of the product to the cart', () => {
      cy.get('#quantityAvailable').invoke('text').then((text) => {
        const availableStock = parseInt(text.trim(), 10);

        // Gera um valor aleatório para N entre 1 e o valor máximo de estoque disponível
        N = Math.floor(Math.random() * availableStock) + 1;
        maxStock = availableStock;

        // Adiciona N unidades ao carrinho
        cy.get('#quantity_wanted').clear().type(N);
        cy.get('#add_to_cart button').click();
      });
    });

    it('Then I should see the option to go to cart page', () => {
      // Verifica se as opções de continuar comprando ou ir para o carrinho aparecem
      cy.get('.layer_cart_cart').should('be.visible');
      
      // Verifica se a opção "Proceed to Checkout" está visível
      cy.get('.button-container a[title="Proceed to checkout"]').should('be.visible');
    });

    it('Then I go to the cart page', () => {
      // Clica no botão "Proceed to Checkout"
      cy.get('.button-container a[title="Proceed to checkout"]').click();
    });

    it('And I verify that the cart contains N units of the product', () => {
      // Check if cart quantity is correct
      cy.get('.cart_quantity_input').should('have.value', N.toString());
    });
  });

  describe('Reload the page and check if everything is still there', () => {

    let priceBefore; //save to compare the prices before
    let priceAfter; // and after reloading the page

    it('Given Im in the cart page and have items added to the cart', () => {
      
      cy.get('#total_price').invoke('text').then((text) => { //get the total price
        const priceText = text.replace(/[^\d]/g, ''); //Remove every character except from numbers
        priceBefore = parseInt(priceText, 10);
      });
      
      
    });

    it('When I reload the page', () => {
      cy.reload(); //reload the page
    });

    it('Then I should see if there is no product missing', () => {
      cy.get('#total_price').invoke('text').then((text) => { //get the total price
        const priceText = text.replace(/[^\d]/g, ''); //Remove every character except from numbers
        priceAfter = parseInt(priceText, 10);

        
      });

      expect(priceAfter === priceBefore);

    });
    

  });

  
  
});
