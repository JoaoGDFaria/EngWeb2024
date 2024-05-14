const mongoose = require('mongoose');
var {modelName} = require('../models/periodo');
var Periodo = require('../models/periodo');

module.exports.list = () => {
    return Periodo
        .find()
        .sort({nome: 1})
        .exec();
}

module.exports.findById = id => {
    return Periodo.findOne({_id: id}).exec();
}

module.exports.insert = periodo => {
    var novo = new Periodo(periodo);
    //Verificar se o id já existe
    return Periodo.findOne({id: periodo.id})
        .then(dados => {
            if(dados)
                return null;
            else
                return novo.save();
        });
}

module.exports.update = (id, periodo) => {
    return Periodo
        .findOneAndUpdate({id : id}, periodo, {new : true})
        .exec()
}

module.exports.remove = id => {
    return Periodo.delete.findOne({id: id}).exec();
}

