# Sheets Subordinate

## Index

- [About](#about)
- [Note](#note)
- [Running Project Locally](#run-locally)
- [Project Status](#status)

## About <a name = "about"></a>

A few clicks and you will be able to count the number of columns or tabs in your Google Sheets


### Note <a name="note"></a>

The project is hosted but it is not production ready kindly test the project locally, apologies for the inconvenience


### Running Project Locally <a name="run-locally"></a>
- Fork the repo
- Clone the forked repo in your local machine 
- Switch to dev branch (Recommended step)
   ```
   git checkout dev 
   ```
- Install Backend packages
  ```
  npm install 
  ```
- Start the server locally (Configured Port:3000)
   ```
   npm start
   ```
- Go to the client folder (Open a new terminal to avoid the hassle )
  ```
  cd client
  ```
  
- Install frontend packages
  ```
  npm install
  ```
 - Run the site locally (Port :5173)
   ```
    npm run dev
    ```
 - Replace the url from `127.0.1` to `localhost` on your browser (IMPORTANT step for Oauth2 authentication)
---

### Project Status <a name="status"></a>
   - Currently in the development phase (Facing issues in authenticating users via G Oauth2 on the hosted site)
- Tasks Completed
  1.  jwt authentication + userData stored in the backend (used bcrypt for password hashing and salting)
  2.  Added Subscriptions, and Dashboard in the frontend
- Tasks Pending
  1. Persisting user's credentials/access after Outh2 authentication for more than an hour 
  2. Saving dashboard state in the database
  3. Refactoring code as used unnecessary Context Providers to transfer state along with some repetitive code 
  4. An attractive User Interface
