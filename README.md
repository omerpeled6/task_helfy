Website - https://task-helfy.onrender.com

# Task 1: Stock Management System
Backstory:
You are building a simple stock management system for a salad/veggie vendor. The system uses a mock database to return a set of products and their properties. The vendor offers two types of products:

Salads - Made up of various veggies.
Veggies - Basic vegetable products.
Requirements:


1. Add a simple "Loading..." message that appears while the data is being fetched.
Hover Effect on Salads:

2. In Products.tsx, add a hover effect on products of type "salad" that displays the list of ingredients for that salad.
Stock Status Indicator:

3. Products that are in stock should have a green border.
Products that are out of stock should have a red border.
Veggie Stock Toggle:

4. Add a button next to each veggie product that allows toggling the stock status.
When clicked, it should set the veggie (and all salads that use it) as out of stock.
Clicking again should restore the product(s) to stock.

NOTE *: implement your solution in Server.ts file (feel free to add functions if needed)


Client-Side Pagination:

5. Implement pagination that displays only 10 products per page.
Create Ingredient Page:

6. Implement a page at /create-ingredient with a simple form to create new ingredients.
Create Salad Page:

7. Implement a page at /create-salad with a simple form to create a new salad made of different ingredients.
Stock Dependency Handling:

8. If a product (e.g., a veggie) is marked as out of stock, mark all salads that depend on it as out of stock as well.
Search Filter:

9. Implement the <SearchFilter /> component where users can filter products by name in real-time.

Styling:
see the reference pictures directory that came with the task
Ensure that the app is fully responsive and looks good on mobile devices.

# Task 2: Trivia Game
Backstory:
We are building a simple trivia game, where users are asked a series of questions. The user sees one question at a time with multiple answer choices. At the end, the user's score is displayed.

Requirements:
Implement the trivia game within the same project as the stock management system.

Starting Point:

Use the Trivia.tsx file as a starting point for the trivia game component.
Loading Mechanism:

Use the same loading mechanism from Task 1 to load questions and answers.
* Styling:
Feel free to style this app as you see fit, including adding any components or stylesheets to enhance the user experience.
Good luck with your tasks! Let us know if you have any questions.
