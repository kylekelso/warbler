const express = require("express");

const app = express();

app.use("/", function(req, res) {
  res.send("App");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server starting on ${PORT}`);
});
