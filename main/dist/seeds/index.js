import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomUser, getRandomThought, getRandomFriend } from './data.js';
try {
    await db();
    await cleanDB();
    // create an empty array to hold all the users
    const users = [];
    // loop through the username array and create a new user for each username
    for (let i = 0; i < 7; i++) {
        const newUser = new User({
            username: getRandomUser(),
            email: `${getRandomUser()}@email.com`,
        });
        // save the user to the database
        const user = await newUser.save();
        users.push(user);
    }
    // create an empty array to hold all the thoughts
    const thoughts = [];
    // loop through the thought array and create a new thought for each thought
    for (let i = 0; i < 9; i++) {
        const newThought = new Thought({
            thought: getRandomThought(),
            username: getRandomUser(),
        });
        // save the thought to the database
        const thought = await newThought.save();
        thoughts.push(thought);
    }
    // loop through the users array and add a friend to each user
    for (let i = 0; i < users.length; i++) {
        const friend = getRandomFriend();
        users[i].friends.push(friend);
        await users[i].save();
    }
    console.log("Data successfully seeded");
    process.exit(0);
}
catch (error) {
    console.error("Error seeding data", error);
    process.exit(1);
}
