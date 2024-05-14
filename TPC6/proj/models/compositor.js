var mongoose = require('mongoose');

var compositorSchema = new mongoose.Schema({
    id: String,
    nome: String,
    bio: String,
    dataObito: Date,
    periodo: String
}, {versionKey: false});

module.exports = mongoose.model('Compositor', compositorSchema);