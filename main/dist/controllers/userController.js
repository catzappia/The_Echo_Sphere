import User from '../models/user';
/**
 * GET All users /api/users
 * @returns  an array of Users
 */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};
/**
 * GET a user by id /api/users/:id
 * @param string id
 * @returns  a single User
 */
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};
/**
 * POST a user /api/users
 * @param object user
 * @returns  a single User
 */
export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.validate();
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof Error && error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        }
        else if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};
/**
 * PUT a user by id /api/users/:id
 * @param string id, object user
 * @returns  a single User
 */
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    try {
        const updated = await User
            .findByIdAndUpdate(id, user, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};
/**
 * DELETE a user by id /api/users/:id
 * @param string id
 * @returns  a single User
 */
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.findByIdAndDelete(id);
        res.status(200).json(deleted);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};
/**
 * POST a add a friend to a user /api/users/:userId/friends/friendId
 * @param string userId, string friendId
 * @returns  a single User
 */
export const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User
            .findByIdAndUpdate(userId, { $push: { friends: friendId } }, { new: true });
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};
/**
 * DELETE a friend from a user /api/users/:userId/friends/friendId
 * @param string userId, string friendId
 * @returns  a single User
 */
export const removeFriend = async (req, res) => {
    const { id: userId, friendId } = req.params;
    try {
        const user = await User
            .findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};
export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend };
