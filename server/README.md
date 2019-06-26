## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run db:create`

**Note: this command will remove any content in the folder logs and drop the database 'mongodb://localhost/user-management'**

Runs server initialization, download content from https://jsonplaceholder.typicode.com,<br>and will create a file for each user and insert all the  tasks and posts that belong to each user.
before you run the server initialization you need to install the node_modules with the command:
- `npm i`