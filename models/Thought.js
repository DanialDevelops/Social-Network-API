const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction.js'); 

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return timestamp.toLocaleString();
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  });
  

  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
  const Thought = mongoose.model('Thought', thoughtSchema);

  module.exports = Thought;
  