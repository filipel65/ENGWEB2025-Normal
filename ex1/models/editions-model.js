const mongoose = require("mongoose");

const music_schema = new mongoose.Schema({
  id: { type: String, required: true },
  link: String,
  título: String,
  país: String,
  compositor: String,
  intérprete: String,
  letra: String
}, { _id: false });

const edition_schema = new mongoose.Schema({
  _id: { type: String, required: true },
  anoEdição: { type: String, required: true },
  musicas: [music_schema],
  organizacao: { type: String, required: true },
  vencedor: String
});

module.exports = mongoose.model("Edicoes", edition_schema);
