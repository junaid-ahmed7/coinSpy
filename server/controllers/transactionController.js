module.exports = {
  async getValue(req, res, next) {
    const url = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
    for (let i = 0; i < 10; i++) {
      const transaction = res.locals.result[i];
      const data = {
        jsonrpc: "2.0",
        method: "eth_getTransactionByHash",
        params: [transaction.hash],
        id: 1,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    return next();
  },
};
