import { User, Thought } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        console.log('Users deleted');

        await Thought.deleteMany({});
        console.log('Thoughts deleted');

    } catch (error) {
        console.error('Error cleaning the database: ', error);
        process.exit(1);
    }
};

export default cleanDB;