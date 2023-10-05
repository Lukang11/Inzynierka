const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get("/test", (req, res) => {
  res.json({ working: "true" });
});

app.listen(PORT, () => console.log(`Server is listing on port : ${PORT}`));
