const mongoose = require('mongoose');
var {modelName} = require('../models/compositor');
var Compositor = require('../models/compositor');

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome: 1})
        .exec();
}

module.exports.findById = id => {
    return Compositor.findOne({_id: id}).exec();
}

module.exports.insert = compositor => {
    var novo = new Compositor(compositor);
    //Verificar se o id já existe
    return Compositor.findOne({id: compositor.id})
        .then(dados => {
            if(dados)
                return null;
            else
                return novo.save();
        });
}

module.exports.update = (id, compositor) => {
    return Compositor
        .findOneAndUpdate({id : id}, compositor, {new : true})
        .exec()
}

module.exports.remove = id => {
    return Compositor.deleteOne({id: id}).exec();
}
