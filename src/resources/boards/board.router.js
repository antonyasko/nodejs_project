const router = require('express').Router();

const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards);
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const board = await boardsService.getById(id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).send({ message: `There no board with id: ${id}` });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = boardsService.create(req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).send({ message: 'Something went wrong' });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const updatedBoard = boardsService.update(id, req.body);
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(200).send({ message: `There is no board with id: ${id}` });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const boards = boardsService.remove(id);
    res.json(boards);
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for board with id: ${id}` });
  }
});

module.exports = router;
