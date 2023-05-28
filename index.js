const Twitter = require('twitter-lite');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const targetAccount = 'VirtuosoRBLX';
    console.log('Username:', username);
    const followers = await reader.v2.followers(1542237757065633792)

    console.log('VirtuosoRBLX:', followers);
    const isFollowing = followers.ids.includes(username);
  
    res.json({ isFollowing });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
