"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./service/database/db");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(morgan("tiny"));




const corsOptions = {
  origin: ["http://localhost:5173","http://127.0.0.1:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser(process.env.TOKEN_KEY));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


connectDB();
// App Routes
console.log("requet made")
app.use("/admin", require("./routes/adminAction"));
app.use("/products", require("./routes/productAction"));
app.use("/seller", require("./routes/sellerAction"));
app.use("/auth", require("./routes/userAction"));

app.use("/",(req,res)=> res.send("Welcome to the E-commerce API"));

app.use("*", (req, res) => {
  res.status(404).send({
    ok: false,
    status: 404,
    message: "Resource not found",
  });
})

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
