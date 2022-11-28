const { body, param } = require("express-validator");
const validators = {};

validators.createSubjectValidator = [
    body("id")
        .notEmpty().withMessage("El id no debe de ser vacio"),
    body("name")
        .notEmpty().withMessage("El nombre no debe de ser vacio"),
    body("uv")
        .notEmpty().withMessage("Las uv's no debe de ser vacio"),
    body("correlative")
        .notEmpty().withMessage("El correlativo no debe de ser vacio"),

];

validators.findSubjectByIdValidator = [
    param("identifier")
      .notEmpty().withMessage("El id no debe de ir vacío")
      //.isMongoId().withMessage("El id debe de ser de mongo")
] 

module.exports = validators;