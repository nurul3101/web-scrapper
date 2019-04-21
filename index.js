import express from 'express';
import db from './db';

import { getInstagramCount, getTwitterCount } from './scrapper';
const app = express();

app.get('/', async (req, res, next) => {
  const [twitterFollowers, instaFollowers] = await Promise.all([
    getTwitterCount(),
    getInstagramCount()
  ]);

  console.log(`You have ${twitterFollowers} Twitter Followers`);

  console.log(`You have ${instaFollowers} Instagram Followers`);
  db.get('twitter')
    .push({ date: Date.now(), count: twitterFollowers })
    .write();
  db.get('instagram')
    .push({ date: Date.now(), count: instaFollowers })
    .write();

  res.json({ twitterFollowers, instaFollowers });
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
