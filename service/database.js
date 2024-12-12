const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('game');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const friendCodes = getFriendCodes();

  let newUserFriendCode = Math.floor(Math.random() * 100000);
    while (friendCodes.includes(newUserFriendCode)) {
      newUserFriendCode = Math.floor(Math.random() * 100000);
    }
    addFriendCode(newUserFriendCode);
    const user = { username: username, password: passwordHash, token: uuid.v4(), friendCode: newUserFriendCode, friends: [], currentHighScore: 0 };
    
  await userCollection.insertOne(user);

  return user;
}

async function addScore(score) {
    const scoreItem = { name: username, score: score };
  return scoreCollection.insertOne(scoreItem);
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

async function addFriendCode(friendCode) {
    return scoreCollection.insertOne(friendCode);
}

function getFriendCodes() {
    const cursor = scoreCollection.find({});
    return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
};