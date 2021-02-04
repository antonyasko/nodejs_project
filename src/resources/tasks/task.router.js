const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await tasksService.getAllByBoardId(boardId);
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for tasks in board: ${boardId}` });
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await tasksService.getById(taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send({ message: `There no task with id: ${taskId}` });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  try {
    const task = await tasksService.create(boardId, req.body);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json(`There is no board with id: ${boardId}`);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const updatedTask = await tasksService.update(boardId, taskId, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(404)
      .send({ message: `Something went wrong for tasks: ${taskId}` });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { taskId } = req.params;
  try {
    const updatedTasks = tasksService.remove(taskId);
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(404).send({ message: 'Something went wrong' });
  }
});

module.exports = router;
