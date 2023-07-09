const { Schema, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
          return timestamp.toLocaleString();
        }
      },
  })


  module.exports = reactionSchema;