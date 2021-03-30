const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const token = "1361519128:AAEhyW4IYxgAk-sad7Ou41arlolrQ-EhYys";

// const bot = new TelegramBot(token, { polling: true });
require("dotenv").config();
let bot;

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

function getRandomInt() {
  const min = Math.ceil(1);
  const max = Math.floor(1600);
  return Math.floor(Math.random() * (1600 - 1)) + 1;
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.onText(/\b(\w*biblioteca\w*)\b/g, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Você quis dizer bibllioteca?");
});

bot.onText(/\b(\w*versões\w*)\b/g, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Existem muitas duas versões");
});

bot.onText(/\/redpill/, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];
  axios
    .get("https://type.fit/api/quotes")
    .then((res) => {
      const random = getRandomInt();
      const parse = res.data[random].text;
      bot.sendMessage(chatId, `${parse}`);
    })
    .catch((e) => console.log(e));
});

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.post("/" + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});