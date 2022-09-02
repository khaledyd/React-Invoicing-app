const router = require("express").Router();
const User = require("../models/User");
const Invoice = require("../models/Invoice");

//CREATE POST
router.post("/dashboard", async (req, res) => {
  const newPost = new Invoice(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/invoice", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  const username = req.query.user;

  try {
    let invoices;
    if (username) {
      invoices = await Invoice.find({ username });
    } else {
      invoices = await Invoice.find();
    }
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
