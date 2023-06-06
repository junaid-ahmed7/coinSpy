const express = require("express");
const transactionListController = require("../controllers/transactionListController");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.post(
  "/getData",
  transactionListController.getList,
  transactionController.getValue,
  async (req, res, next) => {
    const txs = res.locals;
    res.send({ txs });
  }
);

module.exports = router;
