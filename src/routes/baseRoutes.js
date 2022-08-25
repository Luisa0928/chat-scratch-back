const express = require('express');

const baseRoute = express.Router();
const chat = require('../models/schema');

baseRoute.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  chat.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

baseRoute.get('/messages/idChat', (req, res) => {
  const idChat = req.body;
  chat.findOne(idChat, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
