const express = require("express");
const router = express.Router();
const api = require("../controllers/api");
const { ensureAuth, ensureGuest } = require("../middelware/auth");

router.get("/", ensureAuth, api.getapi);
router.post("/createnote", api.createnote);
router.delete("/deletenote", api.deletenote);
router.put("/updatenote", api.updatedNoteData);
module.exports = router;
