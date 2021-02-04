const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getById(id);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    res.status(404).send({ message: `User with id: ${id} was not found` });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.status(200).json(User.toResponse(newUser));
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  try {
    const newUser = await usersService.update(id, req.body);
    res.status(200).json(User.toResponse(newUser));
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for user with id: ${id}` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    const users = await usersService.remove(id);
    res.status(200).json(users.map(User.toResponse));
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for user with id: ${id}` });
  }
});

module.exports = router;
