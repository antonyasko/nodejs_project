const cloneDeep = require('lodash/cloneDeep');

const DATABASE = require('../../common/database');
const Task = require('./task.model');

const getAllByBoardId = (boardId) =>
  cloneDeep(DATABASE.tasks).filter((task) => boardId === task.boardId);

const getById = (id) =>
  cloneDeep(DATABASE.tasks).find((task) => task.id === id);

const create = (boardId, data) => {
  if (data) {
    const newTask = new Task({
      ...data,
      boardId,
    });
    DATABASE.tasks.push(newTask);
    return newTask;
  }
  return null;
};

const update = (boardId, id, data) => {
  const index = DATABASE.tasks.findIndex(
    (el) => el.id === id && el.boardId === boardId
  );
  if (index === -1) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  } else {
    DATABASE.tasks[index] = { ...data };
  }
};

const remove = (id) => {
  const tasks = DATABASE.tasks.filter((task) => id !== task.id);
  DATABASE.tasks = [...tasks];
  return tasks;
};

module.exports = {
  getAllByBoardId,
  getById,
  create,
  update,
  remove,
};
