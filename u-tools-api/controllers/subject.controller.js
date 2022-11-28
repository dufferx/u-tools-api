const Subject = require("../models/subject.model");
const debug = require("debug")("app:subject-controller");

const controller = {};

controller.create = async (req, res) => {

    try{
        
        const {id, name, uv, correlative } = req.body;
     
        //Validacion de los campos 
    
        const subject = new Subject({
            id: id,
            name: name,
            uv: uv,
            correlative: correlative
        });
    
        const newSubject = await subject.save();
    
        if(!newSubject){
            return res.status(409).json({error: "Ocurrio un error al crear el post"});
        }
        return res.status(201).json(newSubject);
    }catch(error){
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"});
    }
}

controller.findAll = async (req, res) => {
    try{
        const subjects = await Subject.find({}); 
        return res.status(200).json({subjects});
    }catch(error){
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

controller.findOneById = async (req, res) => {
    try {
        const {identifier} = req.params;
        const subject = await Subject.find({name:identifier});

        if (!subject) {
            return res.status(404).json({error: "Materia no encontrada"})
        }

        return res.status(200).json(subject);
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
}
 


 



module.exports = controller;