const express = require("express");
const request = require("request");
const app = express();
const accessToken =
  "mT1PIkPaE29mNovFkm0MhTeRF+5V9bXK0EU8iwMgS4K1OBrry+NW6FQpY/67tNTDG339pv0rVRaESIlIJPO4XrbqoliIZaZQkLdgDtJlr1eZqEg/Mh13NtCgPyfF4vOE/OS7yaT/63VLSCpPZtEFqgdB04t89/1O/w1cDnyilFU=";
//const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000; //Heroku用

app.use(express.json());
//app.use(bodyParser.json()); //必須
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  console.log(req.body);
  const data = req.body["events"][0]["message"]["id"];
  const replyToken = req.body["events"][0]["replyToken"];

  console.log("req.body", data);
  res.send("api: ok");
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
    const option = {
      uri: "https://leadhacktesteastaustralia-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/f1340660-50a3-46ea-b35d-b058301e2bac/classify/iterations/Iteration1/url",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Prediction-Key": "79b82d8d56a94d17a05830b51c1daeb8",
      },
      body: buffer,
    };

    request.post(option, function (error, res, body) {
      console.log(body);
      console.log(replyToken);
      //const resBody = JSON.parse(body);

      const messageData = {
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: "res.OK",
          },
        ],
      };

      const optionsLine = {
        uri: "https://api.line.me/v2/bot/message/reply",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        json: messageData,
      };

      // const optionLINE = JSON.stringify(optionsLine);
      request.post(optionsLine, function (error, res, body) {
        console.log("test OK");
      });
    });
  });
});

process.env.NOW_REGION ? (module.exports = app) : app.listen(PORT); //Heroku用
