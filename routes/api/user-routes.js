const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get All Users
router.get("/", (req, res) => {
  User.find({})
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
});

// Get User by ID
router.get("/:id", ({ params }, res) => {
  User.findOne({ _id: params.id })
    .populate({ path: "thoughts" })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this ID!" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => res.status(400).json(err));
});

// Post New User
router.post("/", ({ body }, res) => {
  // Use the `create()` method to create a new note using the data in `body`
  User.create(body)
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
  //
});

router.put('/update/:id', ({ params, body }, res) => {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/delete/:id', ({params}, res) => {
  User.findOneAndDelete({_id: params.id})
  .then(dbUser => {
    if (!dbUser) {
      res.json({message: "No user found with this id!"});
      return;
    }
    res.json(dbUser);
  })
  .catch(err => {
    res.json(err);
  })
});


module.exports = router;
