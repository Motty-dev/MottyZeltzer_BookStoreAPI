# MottyZeltzer_BookStoreAPI

BookStore API made using Node.js, Express.js, and MongoDB.

### API Features:

1. **Users**
   - User signup / login system
   - User has 2 roles
     - Normal user
     - Admin user
   - A user can signup by _Email_ and _Password_
   - In the request we can specify the role under role property
   - For login, _Email_ and _Password_ is required
   - Authentication is done by JWT tokens 
2. **Books**
   - Show a list of books
   - Show individual book details
   - Update & Delete
3. **Orders**
   - Books can be orderd only by logged in user
   - Users can see their respective orders list or individual order
4. **Admin features**
   - For now only admin can delete a book or an order.
   - Its super easy and simple to change roles permissions (in code) with restrictTo() middleware function.

### Guide to local setup

1. Clone this repository
   ```bash
   git clone https://github.com/Motty-dev/MottyZeltzer_BookStoreAPI.git
   ```
3. Copy config.env file to the root directory 
2. Install node packages (from root directory)
   ```bash
   npm install
   ```
3. Run the server by
```bash
   npm start
   ```
which will run the server and connect to mongodb.

4. The database is in the Atlas cloud. it will be connected remotely.

5. You can click the button and fork the postman's collection and its testing enevironment.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16110378-09602018-bb92-448d-811b-60ebfa9e7332?action=collection%2Ffork&collection-url=entityId%3D16110378-09602018-bb92-448d-811b-60ebfa9e7332%26entityType%3Dcollection%26workspaceId%3D8a4445f3-3425-42bd-a8bf-459af8b49e69#?env%5BBookSotreAPI%5D=W3sia2V5IjoiVVJMIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQifSx7ImtleSI6IkpXVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQifV0=)

- All you need to do is to fork this into a workspace of your choice,
then choose the BookStoreAPI enevironment under enevironments tab and you ready to use the collection.
start by creating a user.