const { User, Thought } = require('../models');


module.exports = {
    getUser: async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    getSingleUser: async (req, res) => {
      try {
        const user = await User.findOne({ _id: req.params.userId });
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    updateUser: async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(
          req.params.userId,
          { $set: req.body },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    createUser: async (req, res) => {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    deleteUser: async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    },

    addThought: async (req, res) => {
        try {
          const { thoughtText, username } = req.body;
          const thought = await Thought.create({ thoughtText, username });
    
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
    
          res.json({ user, thought });
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      removeThought: async (req, res) => {
        try {
          const { thoughtId } = req.params;
    
         
          const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: thoughtId } },
            { new: true }
          );
    
          if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
    
          res.json({ user, message: 'Thought deleted successfully' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      addFriend: async (req, res) => {
        try {
          const { userId, friendId } = req.params;
      
          const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
          );
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json(user);
        } catch (err) {
          console.error(err);
      
          res.status(500).json({ message: 'Internal server error', error: err.message });
        }
      },

      removeFriend: async (req, res) => {
        try {
          const { userId, friendId } = req.params;
    
          const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
  };