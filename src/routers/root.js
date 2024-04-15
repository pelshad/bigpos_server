const express = require("express");
const router = express.Router();

const board = require('./board').router;
const user = require('./user').router;

router.use(board);
router.use(user);

exports.router = router;