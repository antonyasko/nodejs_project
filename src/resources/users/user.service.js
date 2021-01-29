const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const getById = async (id) => await usersRepo.getById(id);

const create = async (data) => await usersRepo.create(data);

const update = async (id, newData) => await usersRepo.update(id, newData);

const remove = async (id) => await usersRepo.remove(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
