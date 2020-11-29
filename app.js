const express = require ('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
let users = require('./data').users;
let cars = require('./data').cars;
const me = users[0];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: Int!): User

    cars: [Car]
    car(id: Int!): Car
    me: User
  }

  type User {
    id: ID!
    name: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    colour: String!
    owner: User!
  }

  type Mutation {
    makeUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean

    createCar(id: Int!, make: String!, model: String!, colour: String!): Car!
    removeCar(id: Int!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }) => {
      const user = users.filter(user => user.id === id);
      return user[0];
    },
    me: () => me,
    cars: () => cars,
    car: (parent, { id }) => {
      const car = cars.filter(car => car.id === id);
      return car[0];
    },
  },
  Car: {
    owner: parent => users[parent.ownedBy - 1]
  },
  User: {
    cars: parent => {
      return parent.cars.map(carId => cars[carId - 1]);
    }
  },
  Mutation: {
    makeUser: (parent, { id, name }) => {
      const user = {
        id,
        name
      };
      users.push(user);
      return user;
    },
    removeUser: (parent , { id }) => {
      let found = false;
      users = users.filter(user => {
        if (user.id === id) {
          found = true;
        } else {
          return user;
        }
      });
      return found ? true : false;
    },
    createCar: (parent, { id, make, model, colour }) => {
      const car = {
        id,
        make,
        model,
        colour
      };
      cars.push(car);
      return car;
    },
    removeCar: (parent, { id }) => {
      let found = false;
      cars = cars.filter(car => {
        if (car.id === id) {
          found = true;
        } else {
          return car;
        }
      });
      return found ? true : false;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'));