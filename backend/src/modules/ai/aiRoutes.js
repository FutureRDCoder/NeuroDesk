const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const {
  summarize,
  generateTasks,
  rewrite, chat,
} = require("./aiController");


router.post(
  "/summarize",
  authMiddleware,
  summarize
);

router.post(
  "/generate-tasks",
  authMiddleware,
  generateTasks
);

router.post(
  "/rewrite",
  authMiddleware,
  rewrite
);

router.post( "/chat", authMiddleware, chat);

module.exports = router;