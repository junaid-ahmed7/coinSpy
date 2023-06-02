const express = require("express");
const transactionListController = require("../controllers/transactionListController");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.post(
  "/getData",
  transactionListController.getList,
  transactionController.getValue,
  async (req, res, next) => {
    for (const transaction of parsed.result) {
      console.log(transaction.hash);
    }
    console.log(parsed.result.length);
    res.send({});
  }
);

module.exports = router;
