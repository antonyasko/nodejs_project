const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

const getById = (id) => tasksRepo.getById(id);

const create = (boardId, data) => tasksRepo.create(boardId, data);

const update = (boardId, id, data) => tasksRepo.update(boardId, id, data);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = {
  getAllByBoardId,
  getById,
  create,
  update,
  remove,
};
