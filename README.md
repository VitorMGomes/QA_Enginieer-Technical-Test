
# Automation Practice

**Framework:** Cypress

**Language:** JavaScript

**Code Path:** cypress/e2e/app.cy.js

# Login System

### Signing-in with an Empty Email

**Given** the user is on the login page  
**When** the user leaves the email box empty  
**And** clicks on submit  
**Then** the user should see an error message  

### Signing-in with an Already Used Email

**Given** the user is on the login page  
**When** the user enters an already used email  
**And** clicks on submit  
**Then** the user should see an error message  

### Login with an Existing Email and Blank Password

**Given** the user is on the login page  
**When** the user enters an already registered email  
**And** leaves the password blank  
**And** clicks on Sign in  
**Then** the user should see an error message  

---

# Cart Checking

### Scenario 1: Add Product to Cart

**Given** the user is on a product page with available stock  
**When** the user adds N units of the product to the cart  
**Then** the user should see the option to go to the cart page  
**And** upon going to the cart page  
**Then** the cart should contain N units of the product  

### Scenario 2: Reload the Page and Check Persistence of Items

**Given** the user is on the cart page with items already added  
**When** the user reloads the page  
**Then** no products should be missing or changed  

### Scenario 3: Remove All Products from the Cart

**Given** the user is on the cart page with items added  
**When** the user clicks the button to remove all products  
**Then** the user should see a message indicating that the cart is empty  
