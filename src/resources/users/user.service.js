const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (data) => usersRepo.create(data);

const update = (id, newData) => usersRepo.update(id, newData);

const remove = (id) => usersRepo.remove(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
