# Node.js Software Engineer Test Task #

## Objective: ##

Develop an API server using Node.js capabilities (you can choose any framework of your choice to implement the specifications).

## Idea: ##

The application being developed is a financial manager that helps the owner keep track of their finances.

## Task: ##

Develop an API for building web and mobile applications.

1. The application has Banks, Transactions, and Transaction Categories.
2. New banks and transaction categories can be added to the application.
3. Transactions are received through a separate webhook.
4. A transaction can have more than one category.
5. Banks and categories can only be deleted if they have no transactions.
6. Transactions can be deleted.
7. The bank balance should be recalculated when transactions are added or deleted (or be calculated based on available transactions).

### Output Data Schema: ###

***Bank***
+ id
+ name
+ balance
+ ...

***Transaction***
+ id
+ amount
+ type (profitable | consumable)
+ ...

***Category***
+ id
+ name
+ ...

### The API methods that need to be implemented are as follows: ###

1. Bank: create, delete, get one, get all, edit
2. Transaction: create (webhook), delete, get all
 + To get all transactions, pagination needs to be implemented
 + For webhook, you can add API key authorization if desired
3. Category: create, delete, get one, get all, edit
4. Method for obtaining statistics
 + Accepts categoryIds, fromPeriod, toPeriod
 + Returns an object in the format { category name: balance }, for example: { food: -2500, salary: +12000, gasoline: -700 }

### Technical Requirements: ###'

1. Node.js (framework of your choice)
2. TypeScript
3. PostgreSQL
4. Docker
5. Swagger API docs

The output should be a project on Github.com with instructions for running and documentation for the endpoints. The application should run in Docker. If possible, create a Github Page for Swagger documentation.

## Bonus Tasks: ##

These tasks are not evaluated primarily, but they will have weight if there are similar equivalent implementations:
1. Cover the functionality of the API server with tests (Unit, Request/Integration)
2. Implement Logging
3. Add Global Error Handling

## After Implementation: ##

When submitting the task for verification, you must provide additional information:
+ Did you use any additional libraries? If so, why?
+ How long did it take to complete the test?
+ If you had to deploy this project in production, what would you improve?