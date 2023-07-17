const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
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
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction'
  }]
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);