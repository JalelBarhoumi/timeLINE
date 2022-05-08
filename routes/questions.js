const router = require("express").Router();
const User = require("../models/User");
const Question = require("../models/Question");

//CREATE QUESTION
router.post("/", async (req, res) => {
  const newQuestion = new Question(req.body);
  
    const savedQuestion = await newQuestion.save();
  
});

//UPDATE QUESTION
router.put("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.username === req.body.username) {
      try {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedQuestion);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE QUESTION
router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Question has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Question!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET QUESTION
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL QUESTIONS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let questions;
    if (username) {
        questions = await Question.find({ username });
    } else if (catName) {
        questions = await Question.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
        questions = await Question.find();
    }
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
