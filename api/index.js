const express = require("express");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000; //Heroku用

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  //console.log(req.body);
  const data = req.body["events"][0]["message"]["id"];
  console.log("req.body", data);
  res.send("api: ok");
});

const options = {
  url: `https://api-data.line.me/v2/bot/message/${req.body.events[0].message.id}/content`,
  method: "get",
  headers: {
    Authorization: "Bearer " + accessToken,
  },
  encoding: null,
};

request(options, function (error, response, body) {
  const buffer = new Buffer.from(body);
  console.log(buffer);
});

process.env.NOW_REGION ? (module.express = app) : app.listen(PORT); //Heroku用
