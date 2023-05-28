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
  
      const params = { screen_name: targetAccount, count: 200, skip_status: true };
      const followers = await getAllFollowers(params);
  
      const isFollowing = followers.includes(username);
  
      res.json({ isFollowing });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  
  async function getAllFollowers(params) {
    let followers = [];
  
    let cursor = -1;
    do {
      const response = await client.get('followers/list', { ...params, cursor });
      const users = response.users || [];
  
      followers = followers.concat(users.map(user => user.screen_name));
      cursor = response.next_cursor;
    } while (cursor !== 0);
  
    return followers;
  }
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on port ${port}`));