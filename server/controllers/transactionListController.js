module.exports = {
  async getList(req, res, next) {
    const { token } = req.body;
    const urlNew = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${token}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`;
    const response = await fetch(urlNew);
    const transactions = await response.json();
    res.locals = transactions;
    return next();
  },
};
