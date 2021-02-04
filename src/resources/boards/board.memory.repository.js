const cloneDeep = require('lodash/cloneDeep');

const DATABASE = require('../../common/database');
const Board = require('./board.model');

const getAll = () => cloneDeep(DATABASE.boards);

const getById = (id) => getAll().find((board) => board.id === id);

const create = (data) => {
  const newBoard = new Board(data);
  DATABASE.boards.push(newBoard);
  return newBoard;
};

const update = (id, newData) => {
  const index = DATABASE.boards.findIndex((board) => board.id === id);
  if (index === -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    DATABASE.boards[index] = { ...newData };
  }
};

const remove = (id) => {
  const boardTasks = cloneDeep(DATABASE.tasks).filter(
    (task) => id !== task.boardId
  );
  DATABASE.tasks = [...boardTasks];
  const boards = getAll().filter((board) => board.id !== id);
  DATABASE.boards = [...boards];
  return DATABASE.boards;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
