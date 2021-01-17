const resolvers = {
  Query: {
    users: (parent, args, { models }) => models.users,
    user: (parent, { id }, { models }) => {
      const user = models.users.filter(user => user.id === id);
      return user[0];
    },
    me: (parent, args, { me }) => me,
  },
  User: {
    cars: (parent, args, { models }) => {
      return parent.cars.map(carId => models.cars[carId - 1]);
    }
  },
  Mutation: {
    makeUser: (parent, { id, name }, { models }) => {
      const user = {
        id,
        name
      };
      models.users.push(user);
      return user;
    },
    removeUser: (parent, { id }, { models }) => {
      let found = false;
      users = models.users.filter(user => {
        if (user.id === id) {
          found = true;
        } else {
          return user;
        }
      });
      return found ? true : false;
    },
  },
};

module.exports = resolvers;