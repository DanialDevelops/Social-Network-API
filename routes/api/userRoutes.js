const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:studentId').get(getSingleUser).delete(deleteUser);

router.route('/:studentId/assignments').post(addThought);

router.route('/:studentId/assignments/:assignmentId').delete(removeThought);

module.exports = router;