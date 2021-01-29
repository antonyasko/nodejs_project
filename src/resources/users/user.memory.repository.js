const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
} = require('../../common/inMemoryDB');

const getAll = async () => getAllUsers();

const getById = async (id) => {
  try {
    const user = await getUserById(id);
    return user[0];
  } catch (error) {
    throw new Error(`User with id: ${id} was not found`);
  }
};

const create = async (data) => {
  const newUser = await createUser(data);
  return newUser[0];
};

const update = async (id, newData) => {
  await updateUser(id, newData);
  return await getById(id);
};

const remove = async (id) => {
  const user = await removeUser(id);
  return user[0];
};

module.exports = { getAll, getById, create, update, remove };
