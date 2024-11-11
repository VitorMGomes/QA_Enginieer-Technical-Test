##Cart Checking

#Add product to cart
Given I am on a product page with available stock
When I add N units of the product to the cart
Then I should see the option to go to cart page
Then I go to the cart page
Then I the cart should contain N units of the product

#Reload the page and check if everything is still there
Given I am on the cart page and have items added to the cart
When I reload the page
Then I should see if there is no product missing

#Remove all products from the cart
Given I am on the cart page with items added
When I click the button to remove all products
Then I should see a message indicating that the cart is empty