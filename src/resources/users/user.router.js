const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getById(id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send({ message: `There no user with id: ${id}` });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = await usersService.create(new User({ ...req.body }));
    res.json(User.toResponse(newUser));
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for user with id: ${id}` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.remove(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for user with id: ${id}` });
  }
});

module.exports = router;
