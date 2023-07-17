const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const user1 = await User.create({ username: 'JohnDoe', email: 'john@example.com' });
    const user2 = await User.create({ username: 'JaneSmith', email: 'jane@example.com' });

    const thought1 = await Thought.create({ thoughtText: 'Hello world!', username: user1.username });
    const thought2 = await Thought.create({ thoughtText: 'I love coding!', username: user1.username });

    const thought3 = await Thought.create({ thoughtText: 'Having a great day!', username: user2.username });
    const thought4 = await Thought.create({ thoughtText: 'Feeling inspired!', username: user2.username });

    user1.thoughts.push(thought1, thought2);
    user2.thoughts.push(thought3, thought4);
    await user1.save();
    await user2.save();

    console.log('Seed data created successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seedData();