const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const detailsApi = require('./api/details.js');
const searchApi = require('./api/search.js');
const forumApi = require('./api/forum.js');
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

//used to login a user
app.get('/api/user', (req, res) => {
  const { userName, password } = req.query;
  connectionPool.query(
    'select password from user where username = ?',
    [userName],
    (err, result, fields) => {
      if (err) {
        res.status(500).send({ error: 'Unable to query for user' });
      }
      bcrypt.compare(password, result[0].password, function (err, compRes) {
        if (compRes === true) {
          res.send(compRes);
        } else {
          res.status(404).send({ error: 'Unable to login: username or password incorrect' });
        }
      });
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
      (err, res, fields) => {
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

// returns search results for a forum
app.get('/api/forum/:query', (req, res) => {
  forumApi.forumSearch(req.params.query).then(results => {
    res.json(results);
  })
});

//Get Posts joined on user_id for username.
app.get('/api/posts', (req, res) => {
  connectionPool.query(
    'select u.username, u.user_id,content,spotify_uri,post_id,title,subject,ts from post left join user u on post.user_id = u.user_id;',
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Error querying Posts databse' });
      }
      res.send(result);
    });
});

//Get a post for a given ID
app.get('/api/posts/:postID', (req, res) => {
  connectionPool.query(
    'select u.username, content,spotify_uri from post left join user u on post.user_id = u.user_id where post_id = ?;',
    [req.params.postID], (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send(`Error retrieving post ${req.params.postID}`)
      }
      res.send(result);
    });
});

//Get replies to a post
app.get('/api/posts/:postID/replies', (req, res) => {
  connectionPool.query(
    'select u.username, content from reply left join user u on reply.user_id = u.user_id where parent_id = ?;',
    [req.params.postID], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(
          `Error retrieving replies to post ${req.params.postID}`)
      }
      res.send(result);
    });
});

//Get a reply by ID
app.get('/api/replies/:replyID', (request, response) => {
  connectionPool.query(
    'select u.username, content,reply_id from reply left join user u on reply.user_id = u.user_id where reply_id = ?;',
    [request.params.replyID], (error, result) => {
      if (error) {
        console.log(error);
        response.status(500).send(
          `Error retriving reply ${request.params.replyID}`);
      }
      response.send(result);
    });
});

//Find all replies
app.get('/api/replies', (req, res) => {
  connectionPool.query(`select u.username, content, parent_id from reply left join user u on reply.user_id = u.user_id;`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error retrieving replies')
      }
      res.send(result);
    });
});

//Get all users
app.get('/api/users', (req, res) => {
  connectionPool.query('select username, user_id from user;',
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error retrieving users');
      }
      res.send(result);
    });
});

//Get user by id
app.get('/api/users/:userID', (req, res) => {
  connectionPool.query('select username,user_id from user where user_id = ?',
    [req.params.userID],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(`Error retrieving user ${req.params.userID}`);
      }
      res.send(result);
    }
  );
});

//Add a user
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  connectionPool.query(
    'insert into user (username) value (?);',
    [username],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error adding user');
      } else {
        connectionPool.query(
          'select username, user_id from user where username = ?', [username],
          (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).send(error);
            }
            res.send(result);
          });
      }
    });
});

//Add a reply to a post
app.post('/api/posts/:postID/replies', (req, res) => {
  const { parent_id, content, user_id } = req.body;
  connectionPool.query(
    'insert into reply (parent_id, content, user_id) values (?,?,?)',
    [parent_id, content, user_id], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(`Error replying to post ${parent_id}`);
      }
      connectionPool.query(
        'select reply_id,parent_id,content, u.username from reply left join user u on reply.user_id = u.user_id',
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).send('Error retriving new reply');
          }
          res.send(result);
        });
    });
});

//Add a post
app.post('/api/posts', (req, res) => {
  let { user_id, spotify_uri, content, title, subject, postImg } = req.body;
  const img_src = postImg;
  spotify_uri = '';
  connectionPool.query(
    'insert into post (spotify_uri, user_id, content, title, subject, img_src) values(?,?,?,?,?,?)',
    [spotify_uri, 1, content, title, subject, img_src], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error Creating a new post');
      } else {
        connectionPool.query(
          'select u.username, content, spotify_uri, post_id, title, subject, img_src, ts from post left join user u on post.user_id = u.user_id',
          [spotify_uri, user_id, content], (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).send('Error retrieving new post');
            }
            res.send(result);
          });
      }
    });
});

//Delete a user
app.delete('/api/users/:userID', (req, res) => {
  const { userID } = req.params;
  connectionPool.query('update user set username = ? where user_id = ?',
    ['DELETED', userID], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Unable to delete user');
      }
      res.send('Successufully deleted user');
    });
});

//Delete a post
app.delete('/api/posts/:postID', (req, res) => {
  const { postID } = req.params;
  connectionPool.query('delete from post where post_id = ?', [postID],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error deleting post');
      }
      res.send('Successfully deleted post');
    });
});

//Delete a reply
app.delete('/api/replies/:replyID', (req, res) => {
  const { replyID } = req.params;
  connectionPool.query('delete from reply where reply_id =?', [replyID],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error deleting reply');
      }
      res.send('Successfully deleted reply');
    });
});


// handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

