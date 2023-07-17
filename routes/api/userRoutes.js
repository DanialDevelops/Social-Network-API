const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addThought,
  removeThought,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:userId/thoughts')
  .post(addThought);

router.route('/:userId/thoughts/:thoughtId')
  .delete(removeThought);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;