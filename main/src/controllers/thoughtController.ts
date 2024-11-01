import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

/**
 * GET All thoughts /api/thoughts
 * @returns  an array of Thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(404).json({ message: 'Thought not found' });
  }
};

/**
 * GET a thought by id /api/thoughts/:id
 * @param string id
 * @returns  a single Thought
 */
export const getThoughtById = async (req: Request, res: Response) => {
  const { id: thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      res.status(200).json(thought);
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Thought not found' });
  }
};

/**
 * POST a thought /api/thoughts
 * @param object thought
 * @returns  a single Thought
 */
export const createThought = async (req: Request, res: Response) => {
    const thought = req.body;
    const newThought = new Thought(thought);
    try {
        await newThought.save();
        if (thought.userId) {
            await User.findByIdAndUpdate(thought.userId, { $push: { thoughts: newThought._id } });
        }
        res.status(201).json(newThought);
    } catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(409).json({ message: 'An unknown error occurred' });
        }
    }
};

/**
 * PUT a thought by id /api/thoughts/:id
 * @param string id, object thought
 * @returns  a single Thought
 */
export const updateThought = async (req: Request, res: Response) => {
  const { id } = req.params;
  const thought = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(id, thought, { new: true });
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(404).json({ message: 'Thought not found' });
  }
};

/**
 * DELETE a thought by id /api/thoughts/:id
 * @param string id
 * @returns  a single Thought
 */
export const deleteThought = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(id);
    res.status(200).json(thought);
  } catch (error) {
    res.status(404).json({ message: 'Thought not found' });
  }
};

/**
 * POST a reaction to a thought /api/thoughts/:thoughtId/reactions
 * @param string id, object reaction
 * @returns  a single Thought
 */
export const createReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const reaction = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate
        (thoughtId, { $push: { reactions: reaction } }, { new: true });
    res.status(200).json(updatedThought);
    } catch (error) {
        res.status(404).json({ message: 'Thought not found' });
        }
};

/**
 * DELETE a reaction from a thought /api/thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId, string reactionId
 * @returns  a single Thought
 */
export const deleteReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate
        (thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true });
    res.status(200).json(updatedThought);
    } catch (error) {
        res.status(404).json({ message: 'Thought not found' });
        }
};

export default { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction };