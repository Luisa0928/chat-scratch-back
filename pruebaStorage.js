const express = require('express');
const multer = require('multer'); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const { storage } = require('./src/configs/Configs');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bucket = storage.bucket();

const uploadUtility = multer();

const destPath = 'chats/luisaDavid/';

async function uploadImage(image) {
  await bucket.file(destPath + image.originalname).save(image.buffer);
  console.log(`Uploaded ${image.originalname} to fb`);
}

app.post('/upload', uploadUtility.single('image'), (req, res) => {
  const image = req.file;
  uploadImage(image);
  res.status(200).send('OK');
});

app.listen(port);
