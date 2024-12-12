const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const DB = require('./database.js');

const dev = true;

if (dev){
  app.use(cors());
  // app.use(cors({
  //   origin: 'http://localhost:5173' 
  // }));
}

function devLog(message){
  if (dev){
    console.log(message);
  }
}

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let scores = [];
let friendCodes = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = findUser(req.body.username);
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });


  // const user = findUser(req.body.username);
  // if (user) {
  //   if (req.body.password === user.password) {
  //     user.token = uuid.v4();
  //     res.send({ token: user.token });
  //     devLog(users);
  //     return;
  //   }
  // }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  cres.clearCookie(authCookieName);
  res.status(204).end();
  devLog(users);
});

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  devLog(scores);
  res.send(scores);
});

// GetFriendScores
apiRouter.get('/friends/scores', (_req, res) => {
    let friendScores = findFriendHighscores(req.body.username);
    res.send(friendScores);
  });
  
 // GetScores
apiRouter.get('/friends/add', (_req, res) => {
    res.send(scores);
  });
  
  // SubmitScore
  apiRouter.post('/friends/delete', (req, res) => {
    scores = updateScores(req.body, scores);
    res.send(scores);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  const user = findUser(newScore.username);

  if(user) {
    if (newScore.score > user.currentHighScore) {
      user.currentHighScore = newScore.score;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

function findFriendHighscores(username){
    let friendScores = []
    const user = findUser(username);
    user.friends.array.forEach(friendToken => {
        let friend = users.find(e => e.friendCode === friendToken)
        if (friend) {
            friendScores.push({username: friend.username, score: friend.currentHighScore});
        }
    });
    return friendScores;
}

function findUser(username){
  return users.find(e => e.username === username);
}

