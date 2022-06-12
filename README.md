# CDN Graphs explorer

## Run the project

You need to set environement variables to run the project.
If you run this project on local enviromenm you can create a `.env` file at the root of the project.
See this [example](./.env.example):

```config
REACT_APP_BACKEND_ENDPOINT=http://localhost:3000
```

Install dependencies:

```sh
yarn
# or
npm i
```

Then start the project with

```sh
yarn start
# or
npm start
```

It will run on port `3001`.

## Features

- [x] Authentification
  - [x] Login
  - [x] Logout
  - [x] Restricted routes
- [] Graphs
  - [x] Display capacity offoad graph with data
  - [x] Display concurrent viewers graph with data
  - [] Brush graphs
