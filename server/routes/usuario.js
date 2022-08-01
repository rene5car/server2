const { request } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const usuarioModel = require("../models/usuario");
const ObjectId = require("mongoose").Types.ObjectId;

//consulta GLOBAL por id 
router.get("/:id", (request, response) => {

    const idUsuario = request.params.id;
    //consulta con params sin desEstructuracion

    if(!ObjectId.isValid(idUsuario)){
        return response.status(400).json({
            ok: false, 
            status: 400, 
            msg: "el id no es valido", 
        })
    }
    return response.status(200).json({
        idUsuario
    })
});

//consulta GLOBAL de un registro en BD
router.get("/", (request, response) => {

    usuarioModel.find()
    .then((usuarios) => {
        return response.status(200).json({
        ok: true, 
        status: 200, 
        msg: "se ah consultado a los usuarios correctamente", 
        cont: {usuarios}
    });
})    
    .catch((error) => {
        return response.status(400).json({
        ok: false, 
        status: 400, 
        msg: "Hubo un error al consultar los usuarios", 
        cont: {error}
    });
})
});

router.get("/:nombre", (request, response) => {

    //consulta con desEstructuracion {personaD}
    const {nombre} = request.params;
    //const id = request.params.id;
    //const nombre = request.params.nombre;
    //const apellido = request.params.apellido;
    return response.status(200).json({
        "response": "se ah consultado correctamente el cliente",
        nombre
    });
});

//peticion para guardar un documento en BD
router.post("/", (request, response) => {

    const usuarioBody = request.body; 
    const usuario = new usuarioModel(usuarioBody /* o poner request.body*/);
    //response.send("data received")
    usuario.save()
    .then((documento) => {
        return response.status(200).json({
        ok: true, 
        status: 200, 
        msg: "El usuario se registro correctamente", 
        cont: {documento}
    });
})
    .catch((error) => {
        return response.status(400).json({
        ok: false, 
        status: 400, 
        msg: "Hubo un problema al registrar al usuario", 
        cont: {error}
    });
})
});

router.put("/:id", (request, response) => {

    const idUsuario = request.params.id;
    const usuarioBody = request.body;
    usuarioModel.findByIdAndUpdate(idUsuario, usuarioBody, {new: true, runValidators: true, context: 'query'}, (error, usuario) => {
        if(error){
            return response.status(400).json({
                ok: false,
                status: 400,
                msg: "Error al actualizar usuario",
                cont:{
                    error
                }
            });
        }
        return response.status(200).json({
            ok: true,
            status: 200,
            msg: "usuario actualizado correctamente",
            cont:{
                usuario
            }
        });
    });
});

router.delete("/:id", (request, response) => {

    const idUsuario = request.params.id;
    
    usuarioModel.findByIdAndDelete(idUsuario, (error, usuario) => {
        if(error){
            return response.status(400).json({
                ok: false,
                status: 400,
                msg: "Error al eliminar usuario",
                cont:{
                    error
                }
            });
        }
        return response.status(200).json({
            ok: true,
            status: 200,
            msg: "usuario eliminado correctamente",
            cont:{
                usuario
            }
        });
    });
});

module.exports = router;