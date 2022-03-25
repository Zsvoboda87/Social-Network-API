const router = require("express").Router();

const { User, Thought } = require("../../models");

router.get("/", (req, res) => {
  // Use the `find()` method to get all of the notes in the database's collection
  User.find({})
    .then((dbNote) => res.json(dbNote))
    .catch((err) => res.status(400).json(err));
  //
});

router.get("/:id", ({ params, body }, res) => {
    Note.findOne({ _id: params.id }, body, { new: true,})
    .then((dbNote) => {
      if (!dbNote) {
        res.status(404).json({ message: "No pizza found with this id!" });
        return;
      }
      res.json(dbNote);
    })
    .catch((err) => res.status(400).json(err));
});

});

router.post("/users", ({ body }, res) => {
  // Use the `create()` method to create a new note using the data in `body`
  User.create(body)
    .then((dbNote) => res.json(dbNote))
    .catch((err) => res.status(400).json(err));
  //
});

module.exports = router;
