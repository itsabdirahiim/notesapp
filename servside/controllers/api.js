const Notes = require("../module/api");
module.exports = {
  getapi: async (req, res) => {
    try {
      const docs = await Notes.find({ userId: req.user.id });
      const notes = docs.map((doc) => doc);
      res.json({ notes: notes });
    } catch (err) {
      console.log("Error:", err);
    }
  },
  createnote: async (req, res) => {
    try {
      await Notes.create({
        note: req.body.note,
        notes: req.body.notes,
        userId: req.user.id,
        createdtime: req.body.createdTime,
      });
      res.json("created");
    } catch (err) {
      console.log(err);
    }
  },
  deletenote: async (req, res) => {
    try {
      await Notes.findOneAndDelete({ _id: req.body.userid });
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
  updatedNoteData: async (req, res) => {
    try {
      await Notes.findOneAndUpdate(
        { _id: req.body.userid },
        {
          createdtime: req.body.newtime,
          note: req.body.note,
          notes: req.body.notes,
        }
      );
      res.json("updated");
    } catch (err) {
      console.log(err);
    }
  },
};
