# Cart Checking

This document describes test scenarios to verify the functionality of the shopping cart in an e-commerce setting.

### Scenario 1: Add Product to Cart

**Given** I am on a product page with available stock  
**When** I add N units of the product to the cart  
**Then** I should see the option to go to the cart page  
**And** upon going to the cart page  
**Then** the cart should contain N units of the product  

### Scenario 2: Reload the Page and Check Persistence of Items

**Given** I am on the cart page with items already added  
**When** I reload the page  
**Then** I should see that no products are missing  

### Scenario 3: Remove All Products from the Cart

**Given** I am on the cart page with items added  
**When** I click the button to remove all products  
**Then** I should see a message indicating that the cart is empty  
