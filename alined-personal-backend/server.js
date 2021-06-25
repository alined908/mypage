require('dotenv').config()
const express = require("express");
const http = require("http");
const request = require("request");
const util = require("util");
const cors = require('cors');

const app = express();
app.use(cors());
let port = process.env.PORT || 8000;
const get = util.promisify(request.get);
const server = http.createServer(app);

const BEARER_TOKEN = process.env.TWITTER_TOKEN;
const twitterUsername = '_alined_'
const avatarURL = new URL(`https://api.twitter.com/2/users/by/username/${twitterUsername}?expansions=pinned_tweet_id&user.fields=profile_image_url`)

app.get("/api/avatar", async (req, res) => {
  
    const token = BEARER_TOKEN;
    const requestConfig = {
      url: avatarURL,
      auth: {
        bearer: token,
      },
      json: true,
    };
  
    try {
      const response = await get(requestConfig);
  
      if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
          res.status(403).send(response.body);
        } else {
          throw new Error(response.body.error.message);
        }
      }
  
      res.send(response);
    } catch (e) {
      res.send(e);
    }
});

server.listen(port, () => console.log(`Listening on port ${port}`));