const express = require("express");

const router = express.Router();

const {
  summarize,
  generateTasks,
  rewrite,
} = require("./aiController");


router.post("/summarize", summarize);

router.post(
  "/generate-tasks",
  generateTasks
);

router.post("/rewrite", rewrite);


module.exports = router;