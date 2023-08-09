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
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("notes", quoteSchema);

module.exports = Notes;
