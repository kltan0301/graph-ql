const resolvers = {
  Query: {
    cars: (parent, args, { models }) => models.cars,
    car: (parent, { id }, { models }) => {
      const car = models.cars.filter(car => car.id === id);
      return car[0];
    },
  },
  Car: {
    owner: (parent, args, { models }) => models.users[parent.ownedBy - 1]
  },
  Mutation: {
    createCar: (parent, { id, make, model, colour }, { models }) => {
      const car = {
        id,
        make,
        model,
        colour
      };
      models.cars.push(car);
      return car;
    },
    removeCar: (parent, { id }, { models }) => {
      let found = false;
      cars = models.cars.filter(car => {
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

module.exports = resolvers;