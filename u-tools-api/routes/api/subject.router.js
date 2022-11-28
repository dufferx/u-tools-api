const express = require("express");
const router =  express.Router();

const subjects = require('../../data/subject.examples.json');
const subjectController = require("../../controllers/subject.controller");
const subjectValidators = require("../../validators/subject.validators");
const runValidations = require("../../validators/index.middleware")
/* router.get("/", (req, res, next)=> {
    return res.status(200).json({subjects});
}); */



router.get("/", subjectController.findAll);

router.get("/:identifier", 
    subjectValidators.findSubjectByIdValidator,
    runValidations,
    subjectController.findOneById); 

   /*  router.get("/:identifier",subjectController.findOneById,  subjectValidators.findSubjectByIdValidator,
   runValidations,
   subjectController.findOneById); ); */

//router.subject("/", subjectController.create);
router.post("/", 
    subjectValidators.createSubjectValidator, 
    runValidations, 
    subjectController.create);

module.exports = router;

