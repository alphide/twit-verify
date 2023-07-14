const TwitterApi = require('twitter-api-v2').TwitterApi;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Twitter = require('twitter-lite');

const user = new Twitter({
    consumer_key: "zlyG2FOaW4229TdqadJleKlxt",
    consumer_secret: "0xahOMCJS9srUZZUqrqCu31Z72ot5BgYBPh6DLoQaS2qG8utx3",
    access_token_key: "1542237757065633792-escQY4VCgckGXvLrsSkscFTjAtMlCj",
    access_token_secret: "H5LNqegV8Wcxsml6QsmbRRoPgzNQZpl2rh3Xz7dEqPCZS"
});

app.post('/', async (req, res) => {
    const username = req.body.username;
    console.log('Username:', username);

    let flist = [];
    let params = { screen_name: 'VirtuosoRBLX', count: 200 };

    do {
        const followers = await user.get('followers/list', params);
        followers.users.forEach(e => flist.push(e.screen_name));
        params.cursor = followers.next_cursor;
    } while(params.cursor);

    const isUserFollower = flist.includes(username);
    res.json({ isUserFollower, flist });
});

app.get('/:roblox_id', async (req, res) => {
    const roblox_id = req.params.roblox_id;
    // here, use the roblox_id to fetch the twitter name from your database or API
    // then send the twitter name in the response
    res.json({ twitter_name: 'fetched_twitter_name' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
