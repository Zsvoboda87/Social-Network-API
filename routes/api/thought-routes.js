const router = require("express").Router();

const { User, Thought } = require("../../models");

// get all Thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
});

// get single Thought with ID


module.exports = router;
