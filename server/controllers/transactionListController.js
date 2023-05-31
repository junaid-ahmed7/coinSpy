module.exports = {
    async getList(req, res, next){
        const { token } = req.body;
        const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${token}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`;
        const response = await fetch(url);
        const transactions = await response.json();
        console.log(transactions.result.length)
        res.locals = transactions;
        return next();
    }
};
