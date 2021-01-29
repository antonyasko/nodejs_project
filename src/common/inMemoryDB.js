const DB = {
  users: [],
  boards: [],
  tasks: []
};

const getAllUsers = async () => JSON.parse(JSON.stringify(DB.users));

const getUserById = async (id) => DB.users.filter((user) => user.id === id);

const createUser = async (user) => {
  DB.users.push(user);
  return getUserById(user.id);
};

const updateUser = async (id, user) => {
  const index = DB.users.findIndex((item) => item.id === id);
  if (index <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DB.users[index] = { ...user };
  }
};

const removeUser = async (id) => {
  const index = DB.users.findIndex((item) => item.id === id);
  if (index <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DB.tasks = DB.tasks.map((task) => {
      if (task.userId === id) {
        task.userId = null;
      }
      return task;
    });
    return DB.users.splice(index, 1);
  }
};

const getTaskById = async (id) => DB.tasks.filter((task) => task.id === id);

const createTask = async (task) => {
  DB.tasks.push(task);
  return await getTaskById(task.id);
};

const updateTaskInBoard = async (boardId, id, task) => {
  const index = DB.tasks.findIndex(
    (item) => item.id === id && item.boardId === boardId
  );
  if (index <= -1) {
    throw new Error(`Task with id: ${id} in board ${boardId} was not found`);
  } else {
    DB.tasks[index] = { ...task };
  }
};

const removeTask = async (boardId, id) => {
  const index = DB.tasks.findIndex(
    (task) => task.boardId === boardId && task.id === id
  );
  if (index <= -1) {
    throw new Error(`Task with id: ${id} in board ${boardId} was not found`);
  } else {
    return DB.tasks.splice(index, 1);
  }
};

const getAllTasksByBoardId = async (boardId) =>
  DB.tasks.filter((task) => task.boardId === boardId);

const getAllBoards = async () => JSON.parse(JSON.stringify(DB.boards));

const getBoardById = async (id) => DB.boards.filter((board) => board.id === id);

const createBoard = async (board) => {
  DB.boards.push(board);
  return await getBoardById(board.id);
};

const updateBoard = async (id, board) => {
  const index = DB.boards.findIndex((item) => item.id === id);
  if (index <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    DB.boards[index] = { ...board };
  }
};

const removeBoard = async (id) => {
  const index = DB.boards.findIndex((item) => item.id === id);
  if (index <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    const boardTasks = getAllTasksByBoardId(id);
    boardTasks && (await boardTasks).forEach((task) => removeTask(id, task.id));
    return DB.boards.splice(index, 1);
  }
};

module.exports = {
  getAllUsers,

  getUserById,

  createUser,

  updateUser,

  removeUser,

  getTaskById,

  createTask,

  updateTaskInBoard,

  removeTask,

  getAllTasksByBoardId,

  getAllBoards,

  getBoardById,

  createBoard,

  updateBoard,

  removeBoard
};
