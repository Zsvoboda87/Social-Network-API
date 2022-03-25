const router = require("express").Router();

const { User, Thought } = require("../../models");

// get all Thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .then((db) => {
      if (!db) {
        res.status(404).json({ message: "No thought found with this ID!" });
        return;
      }
      res.json(db);
    })
    .catch((err) => res.status(400).json(err));
});

// get single Thought with ID
router.get("/:id", ({ params }, res) => {
  Thought.findOne({ _id: params.id })
    .then((db) => {
      if (!db) {
        res.status(404).json({ message: "No thought found with this ID!" });
        return;
      }
      res.json(db);
    })
    .catch((err) => res.status(400).json(err));
});

// Create new thought
router.post("/:userId", ({ params, body }, res) => {
  Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No User found with this id!" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => res.json(err));
});

router.put("/:id", ({ params, body }, res) => {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then((db) => {
      if (!db) {
        res.json({ message: "No Thought found with this id!" });
        return;
      }
      res.json(db);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", ({ params }, res) => {
  Thought.findOneAndDelete({ _id: params.id })
    .then((db) => {
      if (!db) {
        res.json({ message: "No Thought found with this id!" });
        return;
      }
      res.json(db);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/:thoughtId/reactions", ({ params, body }, res) => {
  console.log(body);
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then((dbThought) => {
      if (!dbThought) {
        res.status(404).json({ message: "No User found with this id!" });
        return;
      }
      res.json(dbThought);
    })
    .catch((err) => res.json(err));
});

router.delete("/:thoughtId/reactions/:reactionId", ({params}, res) => {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId} } },
      { new: true}
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  });




module.exports = router;
