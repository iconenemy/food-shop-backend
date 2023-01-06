# Food Shop API

---

## Stack Of Technologies

* NodeJS
* TypeScript
* Expressjs
* MongoDB, 
___

## File System Structure

```
📦src
 ┣ 📂config
 ┃ ┣ 📜default.json
 ┃ ┗ 📜default.json.example
 ┣ 📂controllers
 ┃ ┣ 📜admin.controller.ts
 ┃ ┣ 📜auth.controller.ts
 ┃ ┣ 📜food.controller.ts
 ┃ ┣ 📜food.item.controller.ts
 ┃ ┣ 📜food.section.controller.ts
 ┃ ┗ 📜user.controller.ts
 ┣ 📂middlewares
 ┃ ┣ 📜body.validator.ts
 ┃ ┣ 📜check.is.staff.ts
 ┃ ┣ 📜check.jwt.ts
 ┃ ┣ 📜error.wrapper.ts
 ┃ ┗ 📜param.validator.ts
 ┣ 📂models
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜food.item.type.ts
 ┃ ┃ ┣ 📜food.section.type.ts
 ┃ ┃ ┣ 📜token.type.ts
 ┃ ┃ ┗ 📜user.type.ts
 ┃ ┣ 📂validates
 ┃ ┃ ┣ 📜food.item.joi.ts
 ┃ ┃ ┣ 📜food.section.joi.ts
 ┃ ┃ ┣ 📜token.joi.ts
 ┃ ┃ ┗ 📜user.joi.ts
 ┃ ┣ 📜Food.Item.model.ts
 ┃ ┣ 📜Food.Section.model.ts
 ┃ ┣ 📜Token.model.ts
 ┃ ┗ 📜User.model.ts
 ┃ ┃
 ┣ 📂node_modules
 ┃ ┃
 ┣ 📂routes
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜admin.route.ts
 ┃ ┃ ┣ 📜auth.route.ts
 ┃ ┃ ┣ 📜food.item.route.ts
 ┃ ┃ ┣ 📜food.route.ts
 ┃ ┃ ┣ 📜food.section.route.ts
 ┃ ┃ ┗ 📜user.route.ts
 ┃ ┗ 📜routes.ts
 ┣ 📂services
 ┃ ┣ 📜food.item.service.ts
 ┃ ┣ 📜food.section.service.ts
 ┃ ┣ 📜model.service.ts
 ┃ ┣ 📜password.service.ts
 ┃ ┣ 📜token.service.ts
 ┃ ┗ 📜user.service.ts
 ┣ 📂utils
 ┃ ┣ 📜connect.db.ts
 ┃ ┣ 📜req.body.params.types.ts
 ┃ ┣ 📜req.body.type.ts
 ┃ ┗ 📜req.query.type.ts
 ┣ 📜app.ts
 ┣ 📜package.json
 ┣ 📜swagger.ts
 ┣ 📜swagger_output.json
 ┣ 📜yarn-error.log
 ┗ 📜yarn.lock
 ```
 ___

## Quick Start

### Prerequisites

* ##### Download the [Node.js](https://nodejs.org/en/download/current/) source code for your platform

You can determine if Node.js is already installed on your computer by opening a terminal and running this command:

> node --version

* ##### Install [Git](https://github.com/) on your platform

Step 1. You can determine if Git is already installed on your computer by opening a terminal and running this command:

> git --version

Step 2. To start using Git from your computer, you must enter your credentials to identify yourself as the author of your work. The username and email address should match the ones you use in GitLab.

1. In your shell, add your user name:

> git config --global user.name "your_username"


2. Add your email address:

> git config --global user.email "your_email_address@example.com"

3. To check the configuration, run:

> git config --global --list

You can read more on how Git manages configurations in the [Git configuration documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)


Step 3. Clone with HTTPS. Run the following command. Git automatically creates a folder with the repository name and downloads the files there:

> git clone https://github.com/iconenemy/food-shop-backend.git

* ##### Install yarn via npm

You have npm installed you can run the following both to install and upgrade Yarn:

> npm install --global yarn

Alternative: [download the installer](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) This will give you a .msi file that when run will walk you through installing Yarn on Windows.

* ##### Installing all the dependencies of project

Step 1. You need to open a terminal and go to the root folder of the project. Then go to the src folder with the command:

> cd ./src

Step 2. Installing all the dependencies, using the command:

> yarn

or

> yarn install

* #####  Сonfig settings

Step 1. You should copy this file:

> _default.json.example_ 

and delete **.example** from the name to get:

> _default.json_

and set its values according to your needs:

```

📦src
 ┣ 📂config
 ┃ ┣📜default.json.exaple
 ┃ ┣📜default.json
 ```

Step 2. Create a custom definition, for using a feature in TypeScript. Go to file:

> _index.d.ts_

which is in the file system

```

📦src
 ┣ 📂node_modules
 ┃ ┣ 📂@types
 ┃ ┃ ┣ 📂express
 ┃ ┃ ┃ ┣📜index.d.ts 
 ```

And insert this part of the code into the file:

```javascript

declare global {
    namespace Express {
      interface Request {
        access: any
      }
    }
} 
```

* ##### MongoDB preparation

To create a database on MongoDB Atlas, you will need to register an Atlas account and create your first forever-free cluster:

Step 1. [Register a free Atlas account](https://account.mongodb.com/account/register) with your email address (no credit card required)

Step 2. [Deploy](https://www.mongodb.com/basics/create-database) your first cluster in less than 10 minutes


Step 3. You'll need to get your cluster's connection string from Atlas to connect to the cluster using the Node.js driver. Аfter getting the link go to path: 

```
📦src
 ┣ 📂config
 ┃ ┣📜default.json
 ```

paste link in file insted of field _url_:

> _"mongoURL": "url"_

More information about connection Atlas Cluster is [here](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)
___

## Run The Project

Use the command in terminal:

> yarn start 

* Default server start on http://localhost:5000

* All available endpoints can be found http://localhost:5000/doc/#

