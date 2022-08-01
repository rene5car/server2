const mongoose = require("mongoose");

let usuarioSchema = new mongoose.Schema({

    Nombre: {
        type: String,
        required: [true, "Es necesario espeficar el campo Nombre"]
    },
    apellidos: {
        type : String,
        required: [true, "Es necesario espeficar el campo apellidos"]
    },
    userName: {
        type : String,
        required: [true, "Es necesario espeficar el campo userName"]
    },
    Email: {
        type : String,
        required: [true, "Es necesario espeficar el campo Email"]
    },
    Password: {
        type : String,
        required: [true, "Es necesario espeficar el campo Password"]
    },
    numTel: {
        type : integer,
        required: [true, "Es necesario espeficar el campo numTel"]
    },
});

module.exports = mongoose.model("usuario", usuarioSchema)