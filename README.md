## FinancialManagerApp ##

[1. Description](#description)

[2. Features](#features)

[3. Stack](#stack)

[4. Setup](#setup)

[5. Testing](#doc)

[6. Additional information](#info)

[7. Contributing](#contributing)

### <a id='description'></a>Description

Financial Manager API
The Financial Manager API is an API server built using Node.js capabilities for a financial manager application that helps users keep track of their finances. It provides endpoints to manage Banks, Transaction Categories, and Transactions. Transactions are received through a separate webhook, and a transaction can have more than one category. Banks and categories can only be deleted if they have no transactions, and transactions can be deleted. The bank balance is recalculated when transactions are added or deleted.

### <a id='features'></a>Features

Add new Banks, Transaction Categories, and Transactions
Create, delete, get one, get all, and edit Banks, Transactions, and Transaction Categories.
Get statistics for Transactions based on categoryIds, fromPeriod, and toPeriod.
Transactions are received through a separate webhook, and a transaction can have more than one category.
Banks and categories can only be deleted if they have no transactions.
The bank balance is recalculated when transactions are added or deleted

### <a id='stack'></a>Stack

+ Node.js
+ Nest.js
+ TypeORM
+ TypeScript
+ PostgreSQL
+ Docker
+ Swagger API docs

### <a id='setup'></a>Setup

1. Install Docker.
2. Clone this repository.
3. Create a .env file in the root directory of the project and set the following environment variables:
```
API_PORT=
API_HOST=

TYPEORM_HOST=
TYPEORM_DB_TYPE=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
TYPEORM_PORT=
```

3. Build the Docker image by running 
```
docker build -t financial-manager-api . in the root directory of the project.
```
4. Start the Docker container by running 
```
docker run -p 3000:3000 --env-file .env financial-manager-api.
```
5. The API should now be available at http://localhost:3000.

### <a id='testing'></a>Testing ###

Install dependencies by running 
```
npm install
```
or
```
yarn add
```
in the root directory of the project.

### <a id='doc'></a>Documentation ###

The API documentation can be found at https://app.swaggerhub.com/apis/therealtoresto/FinManager/1.0.0

### <a id='info'></a>Additional Information ###

1. Were used additional libraries:
- TypeORM <br>
It help to reduce development time and improve the overall quality of my code by providing a more natural way to interact with a database. ORM also allows for greater flexibility, as you can quickly add new features to my database without having to rewrite code.

2. It took approximately two weeks to complete the project.

3. If the project were deployed in production, we would improve the security by implementing more robust authentication and authorization mechanisms.

### <a id='contributing'></a>Contributing ###

Contributions to the Financial Manager API are welcome! To contribute, please fork this repository, create a new branch, make and commit your changes, and then submit a pull request.
