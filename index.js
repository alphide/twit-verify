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
    const username = req.body.username;
    const targetAccount = 'VirtuosoRBLX';
    console.log('Username:', username);
    const followers = await user.v2.followers(1542237757065633792)

    let next_token = followers.meta.next_token
    let flist = []

    followers.data.map(e => flist.push(e.username))

    while(next_token !== undefined){

        const more = await user.v2.followers(userId, { asPaginator: true, pagination_token: next_token })
        next_token =  more?.meta?.next_token

        more.data.data.map(e => flist.push(e.username))
    }

        // Checking if the user is in the followers list
    const isUserFollower = flist.includes(username);

    res.json({ isUserFollower, flist });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
