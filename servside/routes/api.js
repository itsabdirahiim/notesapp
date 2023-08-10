const express = require("express");
const router = express.Router();
const api = require("../controllers/api");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middelware/auth");

router.get("/", ensureAuth, api.getapi);
router.post("/createnote", api.createnote);
router.delete("/deletenote", api.deletenote);
router.put("/updatenote", api.updatedNoteData);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
module.exports = router;
