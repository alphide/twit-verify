const Twitter = require('twitter-lite');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const user = new Twitter({
  consumer_key: 'zlyG2FOaW4229TdqadJleKlxt',
  consumer_secret: '0xahOMCJS9srUZZUqrqCu31Z72ot5BgYBPh6DLoQaS2qG8utx3',
  access_token_key: '1542237757065633792-escQY4VCgckGXvLrsSkscFTjAtMlCj',
  access_token_secret: 'H5LNqegV8Wcxsml6QsmbRRoPgzNQZpl2rh3Xz7dEqPCZS',
});

app.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const targetAccount = 'VirtuosoRBLX';
    console.log('Username:', username);
    const followers = await user.get('followers/ids', { screen_name: targetAccount });
    const isFollowing = followers.ids.includes(username);
  
    res.json({ isFollowing });
  } catch (error) {
    res.json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
