import { Router } from "express";
import models from "../../models/";

const { Feed } = models;
const router = new Router();


router.get("/", (req, res) => {
  const { user } = req;

  user.getFeeds()
    .then(feeds => {
      res.json({ feeds: feeds.map(entity => entity.get({ plain: true })) });
    })
    .catch(res.errorJSON);
});


router.post("/", (req, res) => {
  const { user, body: { url } } = req;

  user.getFeeds({ where: { url }, attributes: ["id"] })
    .then(ids => {
      if (ids.length > 0) throw new Error(`"${url}" is already exists`);
      return Promise.resolve();
    })
    .then(() => Feed.createByURL(url))
    .then(feed => user.addFeed(feed).then(() => feed))
    .then(feed => {
      res.json({ feed: feed.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


router.delete("/", (req, res) => {
  const { user, body: { id } } = req;

  user.getFeeds({ where: { id } })
    .then(feeds => feeds[0])
    .then(feed => user.removeFeed(feed).then(() => feed))
    .then(feed => {
      res.json({ feed: feed.get({ plain: true }) });
    })
    .catch(res.errorJSON);
});


export default router;
