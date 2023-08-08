const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  notes: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdtime: {
    type: Date,
    required: true,
  },
});

const Notes = mongoose.model("Notes", quoteSchema);

module.exports = Notes;
