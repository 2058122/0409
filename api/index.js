const express = require("express");
//const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000; //Heroku用

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  //console.log(req.body);
  const data = req.body;
  console.log("req.body", data);
  res.send("api: ok");
});
process.env.NOW_REGION ? (module.express = app) : app.listen(PORT); //Heroku用
