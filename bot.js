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

bot.onText(/\b(\w*biblioteca\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Você quis dizer bibllioteca?");
});

bot.onText(/\b(\w*versões\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Existem muitas duas versões");
});

bot.onText(/\b(\w*daily\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Me diga o q fez ontem e o q planeja fazer hj");
});

bot.onText(/\b(\w*leandro\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendMessage(chatId, "Vai começar a dentadura");
});

bot.onText(/\b(\w*rita\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendPhoto(
    chatId,
    "https://ca.slack-edge.com/TQZR39SET-U017CNVS9P0-bab37137197f-512"
  );
  bot.sendMessage(chatId, "Always on my mind");
});

bot.onText(/\b(\w*victor\w*)\b/gi, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];

  bot.sendPhoto(
    chatId,
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.letras.mus.br%2Fhumberto-gessinger%2F&psig=AOvVaw0-ZNL3W3kuJKVzgI36b5Ci&ust=1617218815759000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCqyt7f2O8CFQAAAAAdAAAAABAE"
  );
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
