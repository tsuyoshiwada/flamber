/* eslint-disable */
import _ from "lodash";
import { Router } from "express";
import multer from "multer";
import Item from "../../models/item";
import Board from "../../models/board";
import {
  uploadItemFile,
  updateItemThumbnail,
  updateItemsThumbnailIfNeeded,
  deleteItemFile
} from "../../utils/drive/items";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/", (req, res) => {
  Item.findAllByUser(req.drive, req.user.id)
    .then(items => {
      res.json({ items });
    })
    .catch(res.errorJSON);
});


router.post("/file", upload.single("file"), (req, res) => {
  const { drive, user, body, file } = req;
  const { boardId } = body;
  const palette = body.palette.split(",");
  const params = {
    file,
    boardId,
    palette
  };

  Item.appendByUserAndFile(drive, user.id, params)
    .then(item => {
      res.json({ item });
    })
    .catch(res.errorJSON);
});


router.put("/", (req, res) => {
  res.errorJSON("TODO");
});


router.delete("/", (req, res) => {
  const { drive, user, body } = req;

  Promise.all(body.map(item => Item.removeByUserAndId(drive, user.id, item.id)))
    .then(() => {
      res.json({});
    })
    .catch(res.errorJSON);
});


export default router;
