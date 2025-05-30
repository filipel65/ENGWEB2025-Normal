const Edition = require("../models/editions-model");

// método pra obter todos os objetos
exports.getEditions = () => {
  return Edition.find().exec();
};

// métodos para obter um conjunto de categorias

// métodos para obter por params.
exports.getbyOrg = (a) => {
  return Edition
      .find({organizacao : a})
      .exec();
};

exports.getPaisesByOrg = () => {
  return Edition.aggregate([
    { $group: {
        _id: "$organizacao",
        anos: { $addToSet: "$anoEdição" }
      }
    },
    { $project: { _id: 0, pais: "$_id", anos: 1 } },
    { $sort: { pais: 1 } }
  ]);
};

exports.getPaisesByVenc = () => {
  return Edition.aggregate([
    { $match: { vencedor: { $exists: true, $ne: null } } },
    { $group: {
        _id: "$vencedor",
        anos: { $addToSet: "$anoEdição" }
      }
    },
    { $project: { _id: 0, pais: "$_id", anos: 1 } },
    { $sort: { pais: 1 } }
  ]);
};

exports.getInterpretes = () => {
  return Edition.aggregate([
    { $unwind: "$musicas" },
    { $group: {
        _id: { nome: "$musicas.intérprete", pais: "$musicas.país" }
      }
    },
    { $project: { _id: 0, nome: "$_id.nome", pais: "$_id.pais" } },
    { $sort: { nome: 1 } }
  ]);
};


// método para obter pelo iD
exports.getEditionbyID = (iD) => {
  return Edition.findById(iD).exec();
};

exports.insert = (b) => {
  var to_save = new Edition(b);
  return to_save.save();
};

exports.update = (b,iD) => {
  return Edition.findByIdAndUpdate(iD,b, {new:true}).exec();
};

exports.delete = (iD) => {
  return Edition.findByIdAndDelete(iD, {new:true}).exec();
};
