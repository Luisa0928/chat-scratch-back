const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  id_user: String,
  name: String,
  profile_photo: String,
  messages: {
    id_sender: String,
    received: Boolean,
    images: String,
    created_at: { type: Date, default: Date.now() },
  },
});

module.exports = mongoose.model('chat', chatSchema);
