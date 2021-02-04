const cloneDeep = require('lodash/cloneDeep');

const DATABASE = require('../../common/database');
const User = require('./user.model');

const getAll = () => cloneDeep(DATABASE.users);

const getById = (id) => getAll().find((user) => user.id === id);

const update = (id, newData) => {
  const index = DATABASE.users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DATABASE.users[index] = { ...newData };
    return DATABASE.users[index];
  }
};

const create = (data) => {
  const newUser = new User(data);
  DATABASE.users.push(newUser);
  return newUser;
};

const remove = (id) => {
  const index = DATABASE.users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DATABASE.tasks = DATABASE.tasks.map((task) => {
      if (task.userId === id) {
        task.userId = null;
      }
      return task;
    });
    return DATABASE.users.splice(index, 1);
  }
};

module.exports = { getAll, getById, create, update, remove };
