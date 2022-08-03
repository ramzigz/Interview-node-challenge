aventique-test-app
=======================

A node-express application


Prerequisites
-------------

- [Node.js 10+](http://nodejs.org)


Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot


# Change directory
cd aventique-node-test

# Install NPM dependencies
npm install

# Then simply start your app
npm run start:local
```

**Warning:** If you want to use some API that need https to work (for example Pinterest or facebook),
you will need to download [ngrok](https://ngrok.com/).
You must start ngrok after starting the project.

```bash
# start ngrok to intercept the data exchanged on port 3000
./ngrok http 3000
```
Project Structure 
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **src/controllers**/               | Logic of the app.                                            |
| **src/app.js**/                    | The main application file.                                   |
| server.js                          | The main entry file.                                         |
| .env                               | Your API keys, tokens, passwords and database URI.           |
| .eslintrc                          | Rules for eslint linter.                                     |
| .gitignore                         | Folder and files ignored by git.                             |
| package.json                       | NPM dependencies.                                            |
| package-lock.json                  | Contains exact versions of NPM dependencies in package.json. |


License
-------

The MIT License (MIT)
