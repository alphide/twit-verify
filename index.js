const needle = require('needle');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Fetch the followers of a user account, by ID
// https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start

const userId = 1542237757065633792;
const url = `https://api.twitter.com/2/users/${userId}/followers`;
const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAO%2B%2FeQEAAAAAXnPxa6jDchltEbuGFTd9qECTeUU%3Dis1NDa7RJsVwYBtWjgVxRfuRelE4dVN0yJyu7CmwVOPA8i5yYF';

const getFollowers = async () => {
    let users = [];
    let params = {
        "max_results": 1000,
        "user.fields": "created_at"
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowersJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving followers...");
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                users.push.apply(users, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    console.log(users);
    console.log(`Got ${users.length} users.`);

};

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
};

app.post('/', async (req, res) => {
    try {
      const username = req.body.username;
      console.log('Username:', username);
  
      const followers = await getFollowers();
  
      console.log(`Got ${followers.length} followers.`);
  
      const isFollowing = followers.some(user => user.username === username);
      res.json({ isFollowing });
    } catch (error) {
      console.error('Error retrieving followers:', error);
      res.json({ error: error.message });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
