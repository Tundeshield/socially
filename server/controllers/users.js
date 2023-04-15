import User from "../models/User.js";

//Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status.json(400)({
      message: error.message,
    });
  }
};

export const getUserFriends = async () => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map({
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picturePath,
    });
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addRemoveFriend = async () => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(id);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends(filter((id) => id !== friendId));
      friend.friends = user.friends(filter((id) => id !== id));
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map({
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picturePath,
    });
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
