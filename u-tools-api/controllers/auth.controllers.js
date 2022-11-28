const User = require("./../models/User.model");
const debug = require("debug")("app:auth=controller");
const { createToken, verifyToken } = require("../utils/jwt.tools")

const controller = {};

controller.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        

        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

        if (user) {
            return res.status(409).json({ error: "Este usuario ya existe" });
        }


        const newUser = new User({
            username: username,
            email: email,
            password: password  
        })

        await newUser.save();

        return res.status(201).json({ message: "Usuario creado con éxito!" })
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error inesperado" })
    }
}

controller.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

       debug(`Post creado por: ${identifier}`);

        //Paso 01: Verificar si el usuario existe
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }

        //Paso 02: Comparar las contraseñas
        if (!user.comparePassword(password)) {
            return res.status(401).json({ error: "Contraseña no coincide" });
        }


        //Pasa 03: Loggearlo
        const token = createToken(user._id);
        user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0, 4)];

        await user.save();
        //Paso 04: Registrar los tokens de usuario

    return res.status(200).json({ token: token });
    } catch (error) {
      debug(error);
      return res.status(500).json({ error: "Error inesperado" })
    }


}

controller.FindOneByName = async (req, res) => {
    try {
        const{identifier} = req.params;
        const user = await User.find({username:identifier});

        if (!user) {
            return res.status(404).json({error: "User no encontrado"})
        }

        return res.status(200).json(user);
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

controller.FindOneByToken = async (req, res) => {
    try {
        const{identifier} = req.params;
        const user = await User.find({tokens:identifier});

        if (!user) {
            return res.status(404).json({error: "User no encontrado"})
        }

        return res.status(200).json(user);
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
}


controller.UpdateUser = async (req, res) => {
    try {
        const{identifier} = req.params;
        const user = await User.findOne({tokens:identifier});
        Object.assign(user, req.body);
        user.save();
        res.send({data: user});
    }catch {
        res.status(404).send({error: "User is not found"});
    }
}

controller.deleteUser = async (req, res) => {
    try {
        const{identifier} = req.params;
        const user = await User.findById(req.params._id);
        await user.remove();
        res.send({data: true});
    }catch {
        res.status(404).send({error: "User is not found"});
    }
}

/* controller.whoami = async (req, res) => {
    try {
      const { _id, email, username} = req.user;
      return res.status(200).json({ _id, email, username});
    } catch (error) {
      debug(error);
      return res.status(500).json({ error: "Error inesperado" })
    }
}  */

controller.whoami = async (req, res) => {
    try {
        //
        //const {email, username} = req.user;
        const{identifier} = req.params;
        user = await User.findOne({tokens:identifier});

        if (!user) {
            return res.status(404).json({error: "User no encontrado"})
        }

        return res.status(200).json({user}); //Buscar forma de llamar a cosas especificas del user
    } catch (error) {
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
} 

/* controller.whoami = async (req, res) => {
    try {
        const { _id, username, email } = req.users;
        return res.status(200).json({_id, username, email});

    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inesperado" })
    }
} */

controller.findAll = async (req, res) => {
    try{
        const users = await User.find({}); 
        return res.status(200).json({users});
    }catch(error){
        debug({error});
        return res.status(500).json({error: "Error interno de servidor"})
    }
}

module.exports = controller;













