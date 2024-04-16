// Create a web server.
// Create a web server that listens on port 3000 and serves the following responses:
// - GET /comments - returns a list of comments
// - POST /comments - creates a new comment
// - PUT /comments/:id - updates a comment by its id
// - DELETE /comments/:id - deletes a comment by its id
// The comments are stored in a file comments.json.

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Error writing comments.json');
        } else {
          res.send('Comment created');
        }
      });
    }
  });
});

app.put('/comments/:id', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      comments[req.params.id] = req.body;
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Error writing comments.json');
        } else {
          res.send('Comment updated');
        }
      });
    }
  });
});

app.delete('/comments/:id', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      comments.splice(req.params.id, 1);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Error writing comments.json');
        } else {
          res.send('Comment deleted');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

