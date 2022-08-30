# MottyZeltzer_BookStoreAPI
# BookStoreAPI

BookStore API made using Node.js, Express.js, and MongoDB.

### API Features:

1. **Books**
   - Show a list of books
   - Show individual book details
2. **Purchase**
   - Books can be purchased only by logged in user
   - Users can see their respective purchase list or individual purchase
   - User can cancel their purchase (or order)
3. **Users**
   - User signup / login feature available
   - User has 2 roles
     - Normal user
     - Admin user
   - A user can signup by _Email_ and _Password_
   - In the request we can specify the role under role property
   - For login, _Email_ and _Password_ is required
   - Authentication is done by JWT tokens 
   - For now only admin can delete a book or an order. but easy and simple to change with restrictTo() function.
4. **Admin features**
   - Only Admin can delete a book
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
4. The database is in the Atlas cloud. it will be connected remotely.

5. Use the API in Postman or any other API testing tool 


