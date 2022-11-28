const express = require("express");

const router  = express.Router();

//importar todos los enrutadores

const subjectRouter = require("./subject.router");
const authRouter = require("./auth.router")

//Definir las rutas
router.use("/auth", authRouter);
router.use("/subject", subjectRouter);



module.exports  = router;