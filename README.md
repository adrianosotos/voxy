# 🚀 Voxy Chanllenge 🚀


### Overview

This project is a challenge to Voxy, which consists in an user responsive table with sort and search functionalities.

### Project Pre requisites

Backend mocks runs with [json-server](https://www.npmjs.com/package/json-server), so you need to install it on your machine 🤓

Installation:

```
npm install -g json-server
```

You will also need <s>yarn</s> [npm](https://www.npmjs.com/) as matter to install ui packages. If you still don't have it follow the [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

Just clone the repo and install package dependencies:

```bash
git clone https://github.com/adrianosotos/voxy.git
cd voxy
npm install
```

### Development

To run ui development server with hot reload concurrently with json-server just run the following command and access [here](http://localhost:8081/)

``` bash
npm run start
```

### Project development comments

This challenge was a quite simple, but due to lack of time to development, it became a bit trickier. I decided to use VueJs with typescript and class components as matter to learn
a new way to code with Vue, that made it a bit more challenger to develop because I had to consult documentations to figure out how to do the same thing that I would do in classic Vue app, but on this
new format.

Some of the things that I would consider to do on future releases of this app would be:

- Pagination component.
- Dockerize frontend and backend to make it simpler to run app with one command.
- Unit tests.