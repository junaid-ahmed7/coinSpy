const express = require("express");
require('dotenv').config()

const app = express();
const PORT = 3000;

//ROUTER IMPORTS
const tokenRouter = require("./routers/tokenRouter");

app.use(express.json());
app.use("/token", tokenRouter);

//GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//STARTING THE BACKEND SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
