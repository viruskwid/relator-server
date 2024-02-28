const posts = require('../Models/postModel');
const users = require('../Models/userModel');

exports.getAllCounts = async (req, res) => {
  try {
    const usersCount = await users.find().count();
    const postCount = await posts.find().count();
    const userList = await users.find({}, 'email username phone');

    const formattedUserList = userList.map(user => ({
      email: user.email,
      username: user.username,
      phone: user.phone
    }));

    res.status(200).json({ usersCount, postCount, userList: formattedUserList });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(401).json(error);
  }
};
