const { Thought, User, } = require('../models');
const Reaction = require('../models/Reaction.js');

module.exports = {
 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: thought.User } });
      res.json({ message: 'thought and user deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
 
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
  
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      const reaction = await Reaction.create({ reactionBody, username });
      thought.reactions.push(reaction);
      await thought.save();
  
      res.status(201).json(reaction);
    } catch (err) {
      res.status(500).json({ message: 'Error creating reaction', error: err.message });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const reaction = thought.reactions.id(reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found' });
      }

      reaction.remove();
      await thought.save();

      res.json({ message: 'Reaction deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};