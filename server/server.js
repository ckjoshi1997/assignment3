const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// initialize productDB
const productDB = [];

// define resolvers
const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    productAdd,
  },
};

// returns products in database
function productList() {
  return productDB;
}

// adds product and its elements to database
function productAdd(_, { product }) {
  product.id = productDB.length + 1;
  productDB.push(product);
  return product;
}

// apollo server
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
