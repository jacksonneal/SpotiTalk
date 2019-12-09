const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const detailsApi = require('./api/details.js');
const searchApi = require('./api/search.js');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bbd931118da70c',
  password: '7afd382a',
  database: 'heroku_c3af06e9bc312f4'
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

performQuery = (res, query, variables = []) => {
  connectionPool.query(
    query,
    variables,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
      res.send(result);
    }
  );
}

//used to login a user
app.get('/api/user', (req, res) => {
  const { userName, password } = req.query;
  connectionPool.query(
    'select user_id, password, is_moderator from user where username = ?',
    [userName],
    (err, result, fields) => {
      if (err) {
        res.status(500).send({ error: 'Unable to query for user' });
      }
      try {
        bcrypt.compare(password, result[0].password, function (err, compRes) {
          if (compRes === true) {
            res.send({ userId: result[0].user_id, isModerator: result[0].is_moderator });
          } else {
            res.status(404).send({ error: 'Unable to login: username or password incorrect' });
          }
        });
      } catch (e) {
        res.status(404).send({ error: 'Unable to login: username or password incorrect' });
      }
    });
});

// used to register a user
app.post('/api/user', (req, res) => {
  const { userName, password, isModerator } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Unable to hash password' });
    }
    connectionPool.query(
      'insert into user (username, password, is_moderator) values (?,?,?)',
      [userName, hash, isModerator],
      (err, queryRes, fields) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Error creating user' });
        }
        res.status(200).send("OK");
      });
  });
});

// returns a song
app.get('/api/songs/:id', (req, res) => {
  detailsApi.getSong(req.params.id).then(song => {
    res.json(song);
  });
})

// returns an artist
app.get('/api/artists/:id', (req, res) => {
  detailsApi.getArtist(req.params.id).then(artist => {
    res.json(artist);
  });
})

// returns an album
app.get('/api/albums/:id', (req, res) => {
  detailsApi.getAlbum(req.params.id).then(album => {
    res.json(album);
  });
})

// returns search results for a song
app.get('/api/search/:query', (req, res) => {
  searchApi.search(req.params.query).then(results => {
    res.json(results);
  });
})

//Get Posts joined on user_id for username.
app.get('/api/posts', (req, res) => {
  const { query } = req.query;
  const queryLike = `%${query}%`;
  performQuery(
    res,
    'select u.username, u.user_id,content,spotify_uri,post_id,img_src, title,subject,ts from post left join user u on post.user_id = u.user_id where spotify_uri = ? or subject like ? order by ts desc;',
    [query, queryLike]
  );
});

//Get a post for a given ID
app.get('/api/posts/:postID', (req, res) => {
  performQuery(
    res,
    'select u.username, u.user_id, content, spotify_uri, ts, post_id, img_src, title, subject from post left join user u on post.user_id = u.user_id where post_id = ?;',
    [req.params.postID]
  );
});

//Get replies to a post
app.get('/api/posts/:postID/comments', (req, res) => {
  performQuery(
    res,
    'select u.username, reply_id, content, reply.user_id from reply left join user u on reply.user_id = u.user_id where parent_id = ?;',
    [req.params.postID]
  );
});

//Get user by id
app.get('/api/users/:userID', (req, res) => {
  performQuery(res, 'select username,user_id from user where user_id = ?', [req.params.userID]);
});

//Get posts for a user
app.get('/api/users/:userID/posts', (req, res) => {
  performQuery(
    res,
    'select u.username, u.user_id,content,spotify_uri,post_id,img_src, title,subject,ts from post left join user u on post.user_id = u.user_id where post.user_id = ?;',
    [req.params.userID]
  );
});

//Get posts a user has commented on
app.get('/api/usercomments/:userId/posts', (req, res) => {
  performQuery(
    res,
    'select * from post inner join (select parent_id from reply where user_id = ?) replies on post_id = parent_id group by post_id order by ts desc',
    [req.params.userId]);
});

//Add a reply to a post
app.post('/api/posts/:postID/comments', (req, res) => {
  const { postID } = req.params;
  const { content, userId } = req.body;
  const user_id = userId;
  connectionPool.query(
    'insert into reply (parent_id, content, user_id) values (?,?,?)',
    [postID, content, user_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(`Error replying to post ${parent_id}`);
      }
      performQuery(res, 'select reply_id, parent_id, content, u.username from reply left join user u on reply.user_id = u.user_id')
    }
  );
});

//Add a post
app.post('/api/posts', (req, res) => {
  let { user_id, spotify_uri, content, title, subject, postImg } = req.body;
  performQuery(
    res,
    'insert into post (spotify_uri, user_id, content, title, subject, img_src) values(?,?,?,?,?,?)',
    [spotify_uri, user_id, content, title, subject, postImg]
  );
});

//Delete a post
app.delete('/api/posts/:postID', (req, res) => {
  const { postID } = req.params;
  performQuery(res, 'delete from post where post_id = ?', [postID]);
});

// Get moderation privileges for a user
app.get('/api/user/:userID/moderation', (req, res) => {
  const { userID } = req.params;
  performQuery(res, 'select * from moderation where user_id = ?', [userID]);
});

// Create moderation privileges for a user
app.post('/api/moderation', (req, res) => {
  const { user_id, spotify_uri } = req.body;
  performQuery(res, 'insert into moderation (user_id, spotify_uri) values(?,?)', [user_id, spotify_uri]);
});

// Remove moderation privileges for a user
app.delete('/api/moderation/:moderationID', (req, res) => {
  const { moderationID } = req.params;
  performQuery(res, 'delete from moderation where id = ?', [moderationID]);
});

// handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

