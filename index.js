const TwitterApi = require('twitter-api-v2').TwitterApi;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const twitterClient = new TwitterApi({
    appKey: 'zlyG2FOaW4229TdqadJleKlxt',
    appSecret: '0xahOMCJS9srUZZUqrqCu31Z72ot5BgYBPh6DLoQaS2qG8utx3',
    accessToken: '1542237757065633792-escQY4VCgckGXvLrsSkscFTjAtMlCj',
    accessSecret: 'H5LNqegV8Wcxsml6QsmbRRoPgzNQZpl2rh3Xz7dEqPCZS',
});

app.post('/', async (req, res) => {
    const username = req.body.username;
    const targetAccount = 'VirtuosoRBLX';
    const userId = '1542237757065633792'; // assuming this is the ID of 'VirtuosoRBLX'

    console.log('Username:', username);

    let flist = [];
    let next_token;

    do {
        const response = await twitterClient.v2.getUsersFollowing(userId, {
            pagination_token: next_token,
        });

        response.data.data.forEach(e => flist.push(e.username));
        next_token = response.meta.next_token;

    } while(next_token);

    // Checking if the user is in the followers list
    const isUserFollower = flist.includes(username);

    res.json({ isUserFollower, flist });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
