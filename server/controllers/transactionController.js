module.exports = {
    async getValue(req, res, next){
        // for (const transaction of res.locals.result){
        //     const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transaction.hash}&apikey=${process.env.ETHERSCAN_KEY}`;
        //     const response = await fetch(url);
        //     const transactionInfo = await response.json();
        //     console.log(transactionInfo);
        // }
        return next();
    }
}