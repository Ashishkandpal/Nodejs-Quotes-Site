const { result } = require("lodash");
const Quote = require("../models/quote");

const quote_index = (req, res) => {
  Quote.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("quotes/index", { title: "All Quotes", quotes: result });
    })
    .catch((err) => {
      console.log(err);
    });
};


const quote_category = async (req, res) => {
  const category = req.params.category;

  // finding a random quotes
  const Documentcount = await Quote.where({category: category}).countDocuments();
  const randomNumber = Math.floor(Math.random() * Documentcount);
  const randomQuote = await Quote.findOne()
    .where({ category: category })
    .skip(randomNumber)
    .then((randomQuote) => randomQuote);

  // finding all quotes
  const quotes = await Quote.find()
    .where({ category: category })
    .sort({ createdAt: -1 })
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });

  res.render("quotes/category", {
    title: "All Quotes",
    category: category,
    randomQuote: randomQuote,
    quotes: quotes,
  });
};

const quote_details = (req, res) => {
  const id = req.params.id;
  Quote.findById(id)
    .then((result) => {
      res.render("quotes/details", { quote: result, title: "Quote Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Quote not found" });
    });
};

const quote_create_get = (req, res) => {
  res.render("quotes/create", { title: "Create the new Quote" });
};

const quote_create_post = (req, res) => {
  const quote = new Quote(req.body);

  quote
    .save()
    .then((result) => {
      res.redirect("/quotes");
    })
    .catch((err) => {
      console.log(err);
    });
};

const quote_delete = (req, res) => {
  const id = req.params.id;

  Quote.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/quotes" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  quote_index,
  quote_details,
  quote_create_get,
  quote_create_post,
  quote_category,
  quote_delete,
};
