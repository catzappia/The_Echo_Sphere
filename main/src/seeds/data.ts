const username = [
    'thisgirlcodes',
    'thisguycodes',
    'thispersoncodes',
    'thisdeveloper',
    'thisprogrammer',
    'thiscoder',
    'thisdev',
];
const thought = [
    'I love coding',
    'I love programming',
    'I love developing',
    'I love coding',
    'I love programming',
    'I love developing',
    'I love coding',
    'I love programming',
    'I love developing',
];

const friends = [
    'thisgirlcodes',
    'thisguycodes',
    'thispersoncodes',
    'thisdeveloper',
    'thisprogrammer',
    'thiscoder',
    'thisdev',
];

// get a random user from the list
export const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * username.length);
    return username[randomIndex];
};

// get a random thought from the list
export const getRandomThought = () => {
    const randomIndex = Math.floor(Math.random() * thought.length);
    return thought[randomIndex];
};

// get a random friend from the list
export const getRandomFriend = () => {
    const randomIndex = Math.floor(Math.random() * friends.length);
    return friends[randomIndex];
};